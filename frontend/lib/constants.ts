export const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_MULTISEND_CONTRACT_ADDRESS ||
  '0xbC3Fb064bc396422fe1f8155AFe3822F966a78Fb';

export const BOTCHAIN_TESTNET_PARAMS = {
  chainId: '0x2A5', // 677 in hex (BOT Chain Mainnet)
  chainName: 'BOT Chain Mainnet',
  nativeCurrency: {
    name: 'BOT',
    symbol: 'BOT',
    decimals: 18,
  },
  rpcUrls: ['https://rpc.botchain.ai'],
  blockExplorerUrls: ['https://scan.botchain.ai/'],
};

export const MULTISEND_ABI = [
  'function multiSendERC20(address token, address[] calldata recipients, uint256[] calldata amounts) external',
  'function multiSendNative(address[] calldata recipients, uint256[] calldata amounts) external payable',
  'function MAX_RECIPIENTS() external view returns (uint256)',
  'function owner() external view returns (address)',
  'event MultiSendExecuted(address indexed sender, address indexed token, uint256 totalAmount, uint256 recipientCount)',
  'event EmergencyRescued(address indexed token, address indexed to, uint256 amount)',
];

export const ERC20_ABI = [
  'function balanceOf(address owner) external view returns (uint256)',
  'function decimals() external view returns (uint8)',
  'function symbol() external view returns (string)',
  'function allowance(address owner, address spender) external view returns (uint256)',
  'function approve(address spender, uint256 amount) external returns (bool)',
  'function transfer(address to, uint256 amount) external returns (bool)',
  'function transferFrom(address from, address to, uint256 amount) external returns (bool)',
];
