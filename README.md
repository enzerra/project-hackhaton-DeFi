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

### 1. Build and Run Tests in Docker

```bash
# Build Docker image and run full Foundry test suite
docker compose up --build

# Or run tests directly
docker compose run --rm app forge test -vvv
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

# 2. Clone forge-std library (if not present)
git clone --depth 1 https://github.com/foundry-rs/forge-std lib/forge-std

# 3. Build contract
forge build

# 4. Run test suite
forge test -vvv
```

---

## 📁 Repository Structure

```
├── src/
│   └── MultiSend.sol         # Core MultiSend Smart Contract (Native BOT + ERC20)
├── test/
│   ├── MultiSend.t.sol       # 14/14 Foundry Unit & Revert Tests
│   └── mocks/
│       └── MockERC20.sol     # Test mocks (ERC20, Reverting ERC20, Rejecting Receiver)
├── script/
│   └── Deploy.s.sol          # Foundry deployment script
├── Dockerfile                # Docker build definition
├── docker-compose.yml        # Docker Compose configuration
├── foundry.toml              # Foundry config (Solc 0.8.24)
└── remappings.txt            # Import path mappings
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
git remote add origin https://github.com/YOUR_USERNAME/botflow-multisend.git

# 5. Push to GitHub
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
