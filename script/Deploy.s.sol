// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/MultiSend.sol";

contract DeployMultiSend is Script {
    function run() external returns (MultiSend multiSend) {
        uint256 deployerPrivateKey = vm.envOr(
            "PRIVATE_KEY",
            uint256(0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80)
        );

        vm.startBroadcast(deployerPrivateKey);

        multiSend = new MultiSend();

        console.log("MultiSend contract deployed at:", address(multiSend));

        vm.stopBroadcast();
    }
}
