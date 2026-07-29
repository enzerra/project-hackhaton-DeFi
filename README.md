# 🤖 BOTFlow AI — MultiSend Atomic Transfer Protocol & Workspace

**BOTFlow AI** is an intelligent, high-performance asset distribution platform and Web3 DApp built for **BOT Chain (EVM)**. It enables atomic batch transfers of **Native BOT Tokens** and **ERC20 Tokens** (e.g. USDT/USDC) for up to **50 recipients** in a single transaction with **100% All-or-Nothing atomicity**, zero partial fund loss risk, and an integrated **Gemini 1.5 Flash RAG AI Assistant** ("Monkey Bot").

---

## 🌟 Key Features

- ⚡ **Single Unified Batch Transfer Engine**: Native BOT Token transfers (`multiSendNative`) and ERC20 Token transfers (`multiSendERC20`) in 1 single EVM block transaction.
- 📁 **CSV File Import (`.csv`)**: Upload `.csv` files (`address,amount`) to automatically populate recipient rows in 0.1s.
- 💾 **Save & Load Payroll Rosters**: Save recipient addresses & amounts into LocalStorage templates (e.g. *"July Core Team Payroll"*) and restore all rows dynamically.
- 🐒 **Gemini 1.5 Flash RAG AI Assistant**: Embedded "Monkey Bot" assistant to guide users through EVM gas math, smart contract safety, and batch transfer workflows.
- 🛡️ **Guaranteed EVM Atomicity**: OpenZeppelin `ReentrancyGuard` protected. If any single recipient transfer fails, the entire transaction reverts automatically.
- ⛽ **Gas Optimized**: Stateless zero-SSTORE architecture writing 0 bytes to contract storage, saving up to **82.5% gas** vs individual single transactions.
- 🧪 **100% Test Coverage**: Verified with 14/14 Foundry unit & revert test scenarios.

---

## 🛠️ Quick Start with Docker

Run the full smart contract build and Foundry test suite using Docker:

```bash
# Clone repository
git clone https://github.com/enzerra/project-hackhaton-DeFi.git
cd project-hackhaton-DeFi

# Build Docker image and run full Foundry test suite
docker compose up --build
```

---

## 💻 Local Setup & Development

### Prerequisites

- Node.js >= 18
- Foundry (`forge`) installed (or Docker / WSL on Windows)

### 1. Backend Smart Contracts (Foundry)

```bash
cd backend

# Compile contracts
forge build

# Run Foundry test suite (14/14 tests pass)
forge test -vvv
```

### 2. Frontend Next.js DApp Workspace

```bash
cd frontend

# Install dependencies
npm install

# Set environment variables in frontend/.env.local
# NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

# Run local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Repository Structure

```
├── backend/                      # Smart Contract & Foundry Test Suite
│   ├── src/
│   │   └── MultiSend.sol         # Core MultiSend Contract (Native BOT + ERC20)
│   ├── test/
│   │   ├── MultiSend.t.sol       # 14/14 Foundry Unit & Revert Tests
│   │   └── mocks/
│   │       └── MockERC20.sol     # Mock ERC20 Token for Testing
│   ├── script/
│   │   └── Deploy.s.sol          # Deployment Script
│   ├── foundry.toml              # Foundry Configuration (Solc 0.8.20)
│   └── package.json              # OpenZeppelin Dependencies (@openzeppelin/contracts)
├── frontend/                     # Next.js 14 DApp Workspace & AI Assistant
│   ├── app/
│   │   ├── page.tsx              # Landing Page & DApp Workspace Tab System
│   │   ├── layout.tsx            # Global Root Layout
│   │   ├── globals.css           # Vercel Monochrome Design Tokens
│   │   └── api/chat/route.ts     # Gemini 1.5 Flash RAG AI API Endpoint
│   ├── components/
│   │   ├── workspace/            # Ultra-Minimalist Batch Transfer Engine
│   │   ├── landing/              # High-End Landing Page Sections
│   │   ├── ai/                   # Gemini RAG AI Chatbot Modal ("Monkey Bot")
│   │   ├── common/               # Navbar & Common UI Components
│   │   └── ui/                   # Shadcn UI Base Primitives
│   ├── lib/
│   │   └── constants.ts          # BOT Chain Contract Addresses & ABIs
│   └── package.json              # Next.js 14 Dependencies (Ethers.js v6, Tailwind, Lucide)
├── scripts/                      # Helper & Deployment Verification Scripts
├── sample-payroll.csv            # Sample CSV File for Batch Import Testing
├── Dockerfile                    # Multi-stage Docker Container Configuration
├── docker-compose.yml            # Docker Compose Configuration
├── .gitignore                    # Git Exclusion Rules
└── README.md                     # Project Documentation
```

---

## 🌐 BOT Chain Deployment Reference

| Parameter | Value |
|---|---|
| **Deployed MultiSend Address** | `0x9118EA4a52C6c7873729c8d8702cCd85E573f9E9` |
| **Target Chain** | BOT Chain Testnet |
| **Chain ID** | `968` |
| **RPC URL** | `https://rpc.bohr.life` |
| **Currency** | `BOT` |
| **Block Explorer** | [scan.bohr.life](https://scan.bohr.life/) |

---

## 🏆 Hackathon Submission Details

Built for the **BOT Chain Build Week Hackathon (DeFi Track)**.
- **Stateless Smart Contract Architecture**: 0 storage writes, zero SSTORE overhead.
- **Unified Multi-Use Case Engine**: Hackathon split, DAO payroll, and community airdrops in 1 single transaction engine.
