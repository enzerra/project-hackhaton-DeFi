// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title MockERC20
 * @dev Simple ERC20 token for testing MultiSend functionality.
 */
contract MockERC20 is ERC20 {
    constructor(string memory name, string memory symbol, uint8 decimals) ERC20(name, symbol) {
        _mint(msg.sender, 1_000_000 * 10 ** decimals);
    }

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}

/**
 * @title MockRevertingERC20
 * @dev ERC20 token that simulates a transfer failure when transferring to a specific bad recipient.
 */
contract MockRevertingERC20 is ERC20 {
    address public badRecipient;

    constructor(address _badRecipient) ERC20("Reverting Token", "RVT") {
        badRecipient = _badRecipient;
        _mint(msg.sender, 1_000_000 * 10 ** 18);
    }

    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        if (to == badRecipient) {
            revert("TRANSFER_FAILED_FOR_BAD_RECIPIENT");
        }
        return super.transferFrom(from, to, amount);
    }
}

/**
 * @title RejectingReceiver
 * @dev Contract that intentionally rejects incoming native transfers to test atomic revert on native BOT transfers.
 */
contract RejectingReceiver {
    receive() external payable {
        revert("NATIVE_RECEIVE_REJECTED");
    }
}
