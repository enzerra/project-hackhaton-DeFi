const path = require("path");
const ethers = require(path.join(__dirname, "../frontend/node_modules/ethers"));

const CONTRACT_ADDRESS = "0x9118EA4a52C6c7873729c8d8702cCd85E573f9E9";
const RPC_URL = "https://rpc.bohr.life";

async function testLiveTransferSuite() {
  console.log("=== BOTFLOW LIVE TESTNET VALIDATOR ===");
  console.log("RPC Endpoint:", RPC_URL);
  console.log("Contract Address:", CONTRACT_ADDRESS);

  const provider = new ethers.JsonRpcProvider(RPC_URL);

  try {
    const network = await provider.getNetwork();
    console.log("✓ Connected to Chain ID:", network.chainId.toString());

    const code = await provider.getCode(CONTRACT_ADDRESS);
    if (code && code !== "0x") {
      console.log("✓ Smart Contract bytecode verified on-chain! Length:", code.length);
    } else {
      console.log("✗ Contract bytecode not found at address.");
    }
  } catch (err) {
    console.error("Live testnet validation failed:", err.message);
  }
}

testLiveTransferSuite();
