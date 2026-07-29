// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/MultiSend.sol";
import "./mocks/MockERC20.sol";

contract MultiSendTest is Test {
    MultiSend public multiSend;
    MockERC20 public token;
    RejectingReceiver public rejector;

    address public sender = address(0x1111);
    address public walletA = address(0xAAAA);
    address public walletB = address(0xBBBB);
    address public walletC = address(0xCCCC);
    address public walletD = address(0xDDDD);

    event MultiSendExecuted(
        address indexed sender,
        address indexed token,
        uint256 totalAmount,
        uint256 recipientCount
    );

    event EmergencyRescued(address indexed token, address indexed to, uint256 amount);

    function setUp() public {
        multiSend = new MultiSend();
        token = new MockERC20("Test Tether", "USDT", 6);
        rejector = new RejectingReceiver();

        // Fund sender with 100 USDT (100 * 10^6) and 10 ETH/BOT
        token.mint(sender, 100 * 10 ** 6);
        vm.deal(sender, 10 ether);

        // Approve MultiSend contract to spend sender's USDT
        vm.prank(sender);
        token.approve(address(multiSend), 1000 * 10 ** 6);
    }

    // ==========================================
    // ERC20 SUCCESS TESTS
    // ==========================================

    function test_MultiSendERC20_Success_3Recipients() public {
        address[] memory recipients = new address[](3);
        recipients[0] = walletA;
        recipients[1] = walletB;
        recipients[2] = walletC;

        uint256[] memory amounts = new uint256[](3);
        amounts[0] = 30 * 10 ** 6; // 30 USDT
        amounts[1] = 40 * 10 ** 6; // 40 USDT
        amounts[2] = 30 * 10 ** 6; // 30 USDT

        vm.prank(sender);
        multiSend.multiSendERC20(address(token), recipients, amounts);

        // Verify balances
        assertEq(token.balanceOf(walletA), 30 * 10 ** 6, "Wallet A should receive 30 USDT");
        assertEq(token.balanceOf(walletB), 40 * 10 ** 6, "Wallet B should receive 40 USDT");
        assertEq(token.balanceOf(walletC), 30 * 10 ** 6, "Wallet C should receive 30 USDT");
        assertEq(token.balanceOf(sender), 0, "Sender balance should be 0");
    }

    function test_MultiSendERC20_ExactAmountBalances() public {
        address[] memory recipients = new address[](2);
        recipients[0] = walletA;
        recipients[1] = walletB;

        uint256[] memory amounts = new uint256[](2);
        amounts[0] = 15 * 10 ** 6;
        amounts[1] = 25 * 10 ** 6;

        vm.prank(sender);
        multiSend.multiSendERC20(address(token), recipients, amounts);

        assertEq(token.balanceOf(walletA), 15 * 10 ** 6);
        assertEq(token.balanceOf(walletB), 25 * 10 ** 6);
        assertEq(token.balanceOf(sender), 60 * 10 ** 6);
    }

    function test_MultiSendERC20_EmitsEvent() public {
        address[] memory recipients = new address[](3);
        recipients[0] = walletA;
        recipients[1] = walletB;
        recipients[2] = walletC;

        uint256[] memory amounts = new uint256[](3);
        amounts[0] = 30 * 10 ** 6;
        amounts[1] = 40 * 10 ** 6;
        amounts[2] = 30 * 10 ** 6;

        vm.expectEmit(true, true, false, true);
        emit MultiSendExecuted(sender, address(token), 100 * 10 ** 6, 3);

        vm.prank(sender);
        multiSend.multiSendERC20(address(token), recipients, amounts);
    }

    // ==========================================
    // NATIVE BOT SUCCESS & REFUND TESTS
    // ==========================================

    function test_MultiSendNative_Success_3Recipients() public {
        address[] memory recipients = new address[](3);
        recipients[0] = walletA;
        recipients[1] = walletB;
        recipients[2] = walletC;

        uint256[] memory amounts = new uint256[](3);
        amounts[0] = 1 ether;
        amounts[1] = 2 ether;
        amounts[2] = 3 ether;

        vm.prank(sender);
        multiSend.multiSendNative{value: 6 ether}(recipients, amounts);

        assertEq(walletA.balance, 1 ether, "Wallet A should receive 1 BOT");
        assertEq(walletB.balance, 2 ether, "Wallet B should receive 2 BOT");
        assertEq(walletC.balance, 3 ether, "Wallet C should receive 3 BOT");
        assertEq(sender.balance, 4 ether, "Sender balance should be 4 BOT");
    }

    function test_MultiSendNative_RefundsExcessMsgValue() public {
        address[] memory recipients = new address[](2);
        recipients[0] = walletA;
        recipients[1] = walletB;

        uint256[] memory amounts = new uint256[](2);
        amounts[0] = 1 ether;
        amounts[1] = 2 ether; // Total = 3 ether

        // Sender sends 5 ether (2 ether excess)
        vm.prank(sender);
        multiSend.multiSendNative{value: 5 ether}(recipients, amounts);

        assertEq(walletA.balance, 1 ether);
        assertEq(walletB.balance, 2 ether);
        assertEq(sender.balance, 7 ether, "Sender should receive 2 ether refund (10 - 3 = 7)");
    }

    // ==========================================
    // EMERGENCY RESCUE TESTS
    // ==========================================

    function test_EmergencyRescueERC20_Success() public {
        // Accidental token transfer to contract
        token.mint(address(multiSend), 500 * 10 ** 6);

        // Owner rescues funds
        multiSend.rescueERC20(address(token), walletA, 500 * 10 ** 6);

        assertEq(token.balanceOf(walletA), 500 * 10 ** 6);
    }

    function test_EmergencyRescueNative_Success() public {
        // Accidental native transfer to contract
        vm.deal(address(multiSend), 5 ether);

        // Owner rescues native funds
        multiSend.rescueNative(payable(walletA), 5 ether);

        assertEq(walletA.balance, 5 ether);
    }

    // ==========================================
    // FAILURE TESTS & REVERT SCENARIOS
    // ==========================================

    function test_RevertIf_InsufficientBalance() public {
        address userWithLowBalance = address(0x2222);
        token.mint(userWithLowBalance, 50 * 10 ** 6); // Only 50 USDT

        vm.prank(userWithLowBalance);
        token.approve(address(multiSend), 1000 * 10 ** 6);

        address[] memory recipients = new address[](3);
        recipients[0] = walletA;
        recipients[1] = walletB;
        recipients[2] = walletC;

        uint256[] memory amounts = new uint256[](3);
        amounts[0] = 30 * 10 ** 6;
        amounts[1] = 40 * 10 ** 6;
        amounts[2] = 30 * 10 ** 6; // Total = 100 USDT > 50 USDT

        vm.expectRevert(
            abi.encodeWithSelector(
                MultiSend.InsufficientBalance.selector,
                100 * 10 ** 6,
                50 * 10 ** 6
            )
        );

        vm.prank(userWithLowBalance);
        multiSend.multiSendERC20(address(token), recipients, amounts);
    }

    function test_RevertIf_InsufficientAllowance() public {
        address userWithLowAllowance = address(0x3333);
        token.mint(userWithLowAllowance, 200 * 10 ** 6);

        // Approve only 50 USDT
        vm.prank(userWithLowAllowance);
        token.approve(address(multiSend), 50 * 10 ** 6);

        address[] memory recipients = new address[](3);
        recipients[0] = walletA;
        recipients[1] = walletB;
        recipients[2] = walletC;

        uint256[] memory amounts = new uint256[](3);
        amounts[0] = 30 * 10 ** 6;
        amounts[1] = 40 * 10 ** 6;
        amounts[2] = 30 * 10 ** 6; // Total = 100 USDT > 50 USDT allowance

        vm.expectRevert(
            abi.encodeWithSelector(
                MultiSend.InsufficientAllowance.selector,
                100 * 10 ** 6,
                50 * 10 ** 6
            )
        );

        vm.prank(userWithLowAllowance);
        multiSend.multiSendERC20(address(token), recipients, amounts);
    }

    function test_RevertIf_RecipientLimitExceeded() public {
        address[] memory recipients = new address[](51);
        uint256[] memory amounts = new uint256[](51);
        for (uint256 i = 0; i < 51; i++) {
            recipients[i] = address(uint160(i + 1));
            amounts[i] = 10 * 10 ** 6;
        }

        vm.expectRevert(
            abi.encodeWithSelector(
                MultiSend.RecipientLimitExceeded.selector,
                51,
                50
            )
        );

        vm.prank(sender);
        multiSend.multiSendERC20(address(token), recipients, amounts);
    }

    function test_RevertIf_RecipientZeroAddress() public {
        address[] memory recipients = new address[](3);
        recipients[0] = walletA;
        recipients[1] = address(0); // Zero address
        recipients[2] = walletC;

        uint256[] memory amounts = new uint256[](3);
        amounts[0] = 30 * 10 ** 6;
        amounts[1] = 40 * 10 ** 6;
        amounts[2] = 30 * 10 ** 6;

        vm.expectRevert(
            abi.encodeWithSelector(
                MultiSend.InvalidRecipient.selector,
                1
            )
        );

        vm.prank(sender);
        multiSend.multiSendERC20(address(token), recipients, amounts);
    }

    function test_RevertIf_AmountIsZero() public {
        address[] memory recipients = new address[](3);
        recipients[0] = walletA;
        recipients[1] = walletB;
        recipients[2] = walletC;

        uint256[] memory amounts = new uint256[](3);
        amounts[0] = 30 * 10 ** 6;
        amounts[1] = 0; // Invalid amount
        amounts[2] = 30 * 10 ** 6;

        vm.expectRevert(
            abi.encodeWithSelector(
                MultiSend.InvalidAmount.selector,
                1
            )
        );

        vm.prank(sender);
        multiSend.multiSendERC20(address(token), recipients, amounts);
    }

    function test_RevertIf_ArrayLengthMismatch() public {
        address[] memory recipients = new address[](3);
        recipients[0] = walletA;
        recipients[1] = walletB;
        recipients[2] = walletC;

        uint256[] memory amounts = new uint256[](2); // Length 2 vs 3
        amounts[0] = 30 * 10 ** 6;
        amounts[1] = 40 * 10 ** 6;

        vm.expectRevert(MultiSend.ArrayLengthMismatch.selector);

        vm.prank(sender);
        multiSend.multiSendERC20(address(token), recipients, amounts);
    }

    function test_RevertIf_EmptyRecipients() public {
        address[] memory recipients = new address[](0);
        uint256[] memory amounts = new uint256[](0);

        vm.expectRevert(MultiSend.EmptyRecipients.selector);

        vm.prank(sender);
        multiSend.multiSendERC20(address(token), recipients, amounts);
    }

    function test_RevertIf_NativeBOTTransferFails_AtomicRevert() public {
        address[] memory recipients = new address[](3);
        recipients[0] = walletA;
        recipients[1] = address(rejector); // Rejector contract
        recipients[2] = walletB;

        uint256[] memory amounts = new uint256[](3);
        amounts[0] = 1 ether;
        amounts[1] = 1 ether;
        amounts[2] = 1 ether;

        vm.expectRevert(
            abi.encodeWithSelector(
                MultiSend.NativeTransferFailed.selector,
                1
            )
        );

        vm.prank(sender);
        multiSend.multiSendNative{value: 3 ether}(recipients, amounts);

        // Verify atomic revert
        assertEq(walletA.balance, 0, "Wallet A must NOT receive native BOT");
        assertEq(walletB.balance, 0, "Wallet B must NOT receive native BOT");
        assertEq(sender.balance, 10 ether, "Sender balance must remain 10 ether");
    }

    function test_RevertIf_TokenTransferFails_AtomicRevert() public {
        // Create reverting token where transfer to walletC fails
        MockRevertingERC20 badToken = new MockRevertingERC20(walletC);
        badToken.transfer(sender, 100 * 10 ** 18);

        vm.prank(sender);
        badToken.approve(address(multiSend), 1000 * 10 ** 18);

        address[] memory recipients = new address[](3);
        recipients[0] = walletA;
        recipients[1] = walletB;
        recipients[2] = walletC; // Failing recipient

        uint256[] memory amounts = new uint256[](3);
        amounts[0] = 30 * 10 ** 18;
        amounts[1] = 40 * 10 ** 18;
        amounts[2] = 30 * 10 ** 18;

        // Transaction must revert completely
        vm.expectRevert("TRANSFER_FAILED_FOR_BAD_RECIPIENT");

        vm.prank(sender);
        multiSend.multiSendERC20(address(badToken), recipients, amounts);

        // Verify state is untouched (atomic revert)
        assertEq(badToken.balanceOf(walletA), 0, "Wallet A must NOT receive tokens");
        assertEq(badToken.balanceOf(walletB), 0, "Wallet B must NOT receive tokens");
        assertEq(badToken.balanceOf(walletC), 0, "Wallet C must NOT receive tokens");
        assertEq(badToken.balanceOf(sender), 100 * 10 ** 18, "Sender balance must remain 100");
    }
}
