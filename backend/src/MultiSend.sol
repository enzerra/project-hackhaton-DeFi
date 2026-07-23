// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title MultiSend Atomic Transfer Protocol (BOTFlow AI Engine)
 * @author Senior Solidity Engineer & Auditor
 * @notice Protocol to batch transfer ERC20 tokens or native BOT tokens to up to 3 recipients in a single atomic transaction.
 * @dev If any single transfer fails or validation rules are violated, the entire transaction reverts.
 */
contract MultiSend {
    using SafeERC20 for IERC20;

    /// @notice Maximum allowed recipients per transaction to prevent excessive gas consumption
    uint256 public constant MAX_RECIPIENTS = 3;

    // --- CUSTOM ERRORS ---
    error InvalidTokenAddress();
    error EmptyRecipients();
    error ArrayLengthMismatch();
    error RecipientLimitExceeded(uint256 length, uint256 maxLimit);
    error InvalidRecipient(uint256 index);
    error InvalidAmount(uint256 index);
    error InsufficientBalance(uint256 required, uint256 available);
    error InsufficientAllowance(uint256 required, uint256 available);
    error NativeTransferFailed(uint256 index);

    // --- EVENTS ---
    /**
     * @notice Emitted when a multi-send transaction is executed successfully.
     * @param sender Address of the token sender.
     * @param token Address of the token transferred (address(0) for native BOT).
     * @param totalAmount Total aggregate token amount transferred.
     * @param recipientCount Total number of recipients.
     */
    event MultiSendExecuted(
        address indexed sender,
        address indexed token,
        uint256 totalAmount,
        uint256 recipientCount
    );

    /**
     * @notice Executes atomic multi-send of ERC20 tokens to up to 3 recipients.
     * @dev User must grant sufficient allowance to this contract prior to invocation.
     * @param token ERC20 token contract address.
     * @param recipients Array of recipient wallet addresses.
     * @param amounts Array of token amounts to be sent to each corresponding recipient.
     */
    function multiSendERC20(
        address token,
        address[] calldata recipients,
        uint256[] calldata amounts
    ) external {
        // 1. Token validation
        if (token == address(0)) revert InvalidTokenAddress();

        // 2. Recipients array validation
        uint256 recipientCount = recipients.length;
        if (recipientCount == 0) revert EmptyRecipients();
        if (recipientCount != amounts.length) revert ArrayLengthMismatch();
        if (recipientCount > MAX_RECIPIENTS) {
            revert RecipientLimitExceeded(recipientCount, MAX_RECIPIENTS);
        }

        // 3. Recipient addresses, amounts, and total amount calculation loop
        uint256 totalAmount = 0;
        for (uint256 i = 0; i < recipientCount;) {
            address recipient = recipients[i];
            uint256 amount = amounts[i];

            if (recipient == address(0)) revert InvalidRecipient(i);
            if (amount == 0) revert InvalidAmount(i);

            totalAmount += amount;

            unchecked {
                ++i;
            }
        }

        IERC20 erc20Token = IERC20(token);

        // 4. Pre-execution balance check
        uint256 userBalance = erc20Token.balanceOf(msg.sender);
        if (userBalance < totalAmount) {
            revert InsufficientBalance(totalAmount, userBalance);
        }

        // 5. Pre-execution allowance check
        uint256 userAllowance = erc20Token.allowance(msg.sender, address(this));
        if (userAllowance < totalAmount) {
            revert InsufficientAllowance(totalAmount, userAllowance);
        }

        // 6. Execute atomic transfers directly from sender to recipients
        for (uint256 i = 0; i < recipientCount;) {
            erc20Token.safeTransferFrom(msg.sender, recipients[i], amounts[i]);

            unchecked {
                ++i;
            }
        }

        // 7. Emit execution event
        emit MultiSendExecuted(msg.sender, token, totalAmount, recipientCount);
    }

    /**
     * @notice Executes atomic multi-send of native BOT tokens to up to 3 recipients.
     * @dev Excess msg.value sent above total required amount is automatically refunded to msg.sender.
     * @param recipients Array of recipient wallet addresses.
     * @param amounts Array of native BOT amounts to be sent to each corresponding recipient.
     */
    function multiSendNative(
        address[] calldata recipients,
        uint256[] calldata amounts
    ) external payable {
        // 1. Recipients array validation
        uint256 recipientCount = recipients.length;
        if (recipientCount == 0) revert EmptyRecipients();
        if (recipientCount != amounts.length) revert ArrayLengthMismatch();
        if (recipientCount > MAX_RECIPIENTS) {
            revert RecipientLimitExceeded(recipientCount, MAX_RECIPIENTS);
        }

        // 2. Recipient addresses, amounts, and total amount calculation loop
        uint256 totalAmount = 0;
        for (uint256 i = 0; i < recipientCount;) {
            address recipient = recipients[i];
            uint256 amount = amounts[i];

            if (recipient == address(0)) revert InvalidRecipient(i);
            if (amount == 0) revert InvalidAmount(i);

            totalAmount += amount;

            unchecked {
                ++i;
            }
        }

        // 3. Pre-execution native balance check against msg.value
        if (msg.value < totalAmount) {
            revert InsufficientBalance(totalAmount, msg.value);
        }

        // 4. Execute atomic native transfers to recipients
        for (uint256 i = 0; i < recipientCount;) {
            (bool success, ) = recipients[i].call{value: amounts[i]}("");
            if (!success) revert NativeTransferFailed(i);

            unchecked {
                ++i;
            }
        }

        // 5. Refund excess native BOT tokens to sender if msg.value > totalAmount
        if (msg.value > totalAmount) {
            unchecked {
                uint256 excess = msg.value - totalAmount;
                (bool refundSuccess, ) = msg.sender.call{value: excess}("");
                if (!refundSuccess) revert NativeTransferFailed(type(uint256).max);
            }
        }

        // 6. Emit execution event with token address(0) indicating native BOT
        emit MultiSendExecuted(msg.sender, address(0), totalAmount, recipientCount);
    }

    /// @notice Allow contract to receive native BOT tokens if necessary
    receive() external payable {}
}
