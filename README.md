# 🤖 BOTFlow AI — MultiSend Atomic Transfer Protocol

**BOTFlow AI** is an intelligent, high-performance asset distribution platform designed for **BOT Chain (EVM)**. It enables atomic batch transfers of **Native BOT Tokens** and **ERC20 Tokens** (e.g. USDT/USDC) to up to 3 recipients in a single transaction with **100% All-or-Nothing atomicity** and **Auto-Refund** mechanisms.

---

## 🌟 Key Features

- ⚡ **Dual-Engine Execution**: Native BOT Token transfers (`multiSendNative`) and ERC20 Token transfers (`multiSendERC20`).
- 🛡️ **Guaranteed Atomicity**: If any single recipient transfer fails, the entire transaction reverts automatically. 0% partial transfer risk.
- 💵 **Auto-Refund Excess `msg.value`**: Automatically returns excess BOT sent by `msg.sender` above the required distribution amount.
- ⛽ **Gas Optimized**: Uses `calldata`, unchecked array increments, custom error selectors, and zero storage allocation.
- 🧪 **100% Test Coverage**: Verified with 14/14 Foundry unit & failure test scenarios.

---

## 🛠️ Quick Start with Docker (Recommended for Teammates)

No need to install Rust, Foundry, or local dependencies manually. You can run the entire environment using Docker!

### 1. Clone & Run Tests in Docker

```bash
# Clone repository
git clone https://github.com/enzerra/project-hackhaton-DeFi.git
cd project-hackhaton-DeFi

# Build Docker image and run full Foundry test suite
docker compose up --build
```

---

## 💻 Local Setup (Without Docker)

### Prerequisites

- Node.js >= 18
- Foundry (`forge`) installed (or WSL on Windows)

### Installation & Running Tests

```bash
# 1. Install dependencies
npm install

# 2. Build contract
forge build

# 3. Run test suite
forge test -vvv
```

---

## 📁 Repository Structure

```
├── backend/                  # Smart Contract & Foundry Test Environment
│   ├── src/
│   │   └── MultiSend.sol     # Core MultiSend Smart Contract (Native BOT + ERC20)
│   ├── test/
│   │   ├── MultiSend.t.sol   # 14/14 Foundry Unit & Revert Tests
│   │   └── mocks/
│   │       └── MockERC20.sol # Test mocks
│   ├── script/
│   │   └── Deploy.s.sol      # Deployment script
│   ├── foundry.toml          # Foundry config (Solc 0.8.24)
│   ├── remappings.txt        # Import path mappings
│   └── package.json          # OpenZeppelin dependencies
├── frontend/                 # Web DApp User Interface
│   ├── index.html            # Web DApp HTML Layout
│   ├── styles.css            # Dark Theme Glassmorphism UI
│   └── app.js                # Ethers.js v6 Wallet & Contract Integration
├── Dockerfile                # Docker build definition
├── docker-compose.yml        # Docker Compose configuration
├── .env.example              # Environment variables template
└── README.md                 # Documentation
```

---

## 🚀 How to Push to GitHub

To push this repository to GitHub so your team can clone it:

```bash
# 1. Initialize git repository (if not already done)
git init

# 2. Add all files
git add .

# 3. Commit changes
git commit -m "feat: initial commit for BOTFlow AI MultiSend Protocol with Docker setup"

# 4. Set main branch & add remote repository
git branch -M main
git remote add origin https://github.com/enzerra/project-hackhaton-DeFi.git
git push -u origin main
```

---

## 🌐 BOT Chain Deployment Quick Reference

| Field | BOT Chain Testnet | BOT Chain Mainnet |
|---|---|---|
| **Chain ID** | `968` | `677` |
| **RPC URL** | `https://rpc.bohr.life` | `https://rpc.botchain.ai` |
| **Currency** | `BOT` | `BOT` |
| **Explorer** | [scan.bohr.life](https://scan.bohr.life/) | [scan.botchain.ai](https://scan.botchain.ai) |
