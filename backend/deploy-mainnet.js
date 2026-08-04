const { ethers } = require('../frontend/node_modules/ethers');
const fs = require('fs');
const path = require('path');

const RPC_URL = 'https://rpc.bohr.life';
const PRIVATE_KEY = process.argv[2];

if (!PRIVATE_KEY) {
  console.error('Error: Please provide your private key.');
  console.error('Usage: node deploy-mainnet.js <YOUR_PRIVATE_KEY>');
  process.exit(1);
}

const artifactPath = path.join(__dirname, 'out', 'MultiSend.sol', 'MultiSend.json');
if (!fs.existsSync(artifactPath)) {
  console.error('Error: Compiled artifact not found at out/MultiSend.sol/MultiSend.json');
  process.exit(1);
}

const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
const abi = artifact.abi;
const bytecode = artifact.bytecode.object || artifact.bytecode;

async function main() {
  console.log('🌐 Connecting to BOT Chain Mainnet RPC:', RPC_URL);
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  console.log('👤 Deployer Address:', wallet.address);

  const balance = await provider.getBalance(wallet.address);
  console.log('💰 Deployer BOT Balance:', ethers.formatEther(balance), 'BOT');

  if (balance === BigInt(0)) {
    console.error('❌ Error: Deployer balance is 0 BOT. Please make sure you have BOT tokens in this wallet.');
    process.exit(1);
  }

  console.log('🚀 Deploying MultiSend.sol smart contract...');
  const factory = new ethers.ContractFactory(abi, bytecode, wallet);
  const contract = await factory.deploy();
  console.log('⏳ Deployment Transaction Hash:', contract.deploymentTransaction().hash);

  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();
  
  console.log('\n==================================================');
  console.log('🎉 SUCCESS! MultiSend Smart Contract Live on Mainnet!');
  console.log('📍 Mainnet Deployed Address:', contractAddress);
  console.log('==================================================\n');
}

main().catch((err) => {
  console.error('❌ Deployment Error:', err.reason || err.message || err);
});
