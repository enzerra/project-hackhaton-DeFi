# ⚡ Batchpay Protocol — The Next-Generation Web3 Asset Distribution & Settlement Suite

[![BOT Chain Mainnet](https://img.shields.io/badge/BOT_Chain_Mainnet-0xbC3Fb064...78Fb-000000?style=for-the-badge&logo=ethereum&logoColor=white)](https://scan.botchain.ai/address/0xbC3Fb064bc396422fe1f8155AFe3822F966a78Fb)
[![Live DApp](https://img.shields.io/badge/Live_DApp-batchpay--protocol.vercel.app-black?style=for-the-badge&logo=vercel&logoColor=white)](https://batchpay-protocol.vercel.app)
[![Foundry Tests](https://img.shields.io/badge/Foundry-14%2F14_PASS-emerald?style=for-the-badge&logo=solidity&logoColor=white)](backend/test)
[![License: MIT](https://img.shields.io/badge/License-MIT-black.style=for-the-badge)](LICENSE)

> **Batchpay Protocol** solves the two biggest pain points in Web3 UX: **high gas fees during mass payouts** and **clunky, error-prone peer-to-peer payment requests**. Engineered natively for **BOT Chain Mainnet**, Batchpay delivers 1-click atomic multi-recipient token distribution with **up to 82.5% gas fee reduction** alongside **GoPay/Splitwise-like 1-click shareable Web3 Split Bill PayLinks**.

---

## 🎯 Why Batchpay Protocol? (The Real-World Utility)

### ❌ The Problem in Web3 Today
1. **Expensive Mass Payouts**: Distributing tokens to team members, DAO contributors, or hackathon winners requires executing individual transactions one-by-one. Each separate transaction incurs a **21,000 base gas overhead**, wasting enormous amounts of crypto in fees.
2. **Clunky Payment Requests**: Requesting funds from teammates (e.g. sharing hackathon server costs or dinner bills) requires copy-pasting 42-character wallet addresses (`0x2bA239...`) over chat apps. It is **prone to typos, lacks payment status tracking**, and creates friction for non-technical users.

### ✅ The Batchpay Solution
1. **MultiSend Engine**: Consolidates up to 50 recipient transfers into **1 single atomic transaction payload**, eliminating repeated base gas overheads and saving **up to 82.5% in total gas fees**.
2. **Split Bill & PayLink**: Generates 1-click shareable Web3 payment links (`batchpay-protocol.vercel.app/?payId=...`) with instant **WhatsApp & Telegram** sharing. Payers click 1 button to settle payments directly on-chain, automatically updating payment status to `PAID & SETTLED`.

---

## 📍 Verified Mainnet Deployment Specifications

Batchpay Protocol smart contract `MultiSend.sol` is **100% LIVE, VERIFIED, & OPERATIONAL on BOT Chain Mainnet**.

| Parameter | Mainnet Specification |
| :--- | :--- |
| **Network Name** | **BOT Chain Mainnet** |
| **Chain ID** | **`677`** (`0x2A5`) |
| **RPC Endpoint** | `https://rpc.botchain.ai` |
| **Block Explorer** | [https://scan.botchain.ai](https://scan.botchain.ai) |
| **Mainnet Contract Address** | [`0xbC3Fb064bc396422fe1f8155AFe3822F966a78Fb`](https://scan.botchain.ai/address/0xbC3Fb064bc396422fe1f8155AFe3822F966a78Fb) |
| **Deployment Tx Hash** | [`0x81de1788098737e3b8286e71741784c079db877997f5510255ff5440576aadc9`](https://scan.botchain.ai/tx/0x81de1788098737e3b8286e71741784c079db877997f5510255ff5440576aadc9) |
| **Live Web DApp URL** | [https://batchpay-protocol.vercel.app](https://batchpay-protocol.vercel.app) |
| **Foundry Test Suite** | **14 / 14 Tests PASS (100% Line Coverage)** |

---

## 🚀 Key Features & Competitive Advantages

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                       BATCHPAY PROTOCOL ECOSYSTEM                                      │
├────────────────────────────────────────────────────┬───────────────────────────────────────────────────┤
│ ⚡ MULTISEND ENGINE (Payroll & Mass Payouts)       │ 🔗 SPLIT BILL & PAYLINK (P2P 1-Click Settlement)   │
├────────────────────────────────────────────────────┼───────────────────────────────────────────────────┤
│ • Native BOT & ERC20 Token Support                 │ • 1-Click Web3 Shareable Request Links            │
│ • Up to 82.5% Gas Fee Reduction                    │ • Instant WhatsApp & Telegram Integration         │
│ • 100% Atomic All-or-Nothing Revert Safety         │ • Real-time `PAID & SETTLED` Status Tracking      │
│ • CSV Bulk Importer & LocalStorage Preset Rosters  │ • Direct Peer-to-Peer Transfer (Zero Platform Fee)│
│ • Excess Native Value Auto-Refund to Sender        │ • Sleek Vercel Toast Notification System          │
└────────────────────────────────────────────────────┴───────────────────────────────────────────────────┘
```

### 1. ⚡ MultiSend Engine (`Batch Payouts`)
* **Dual Engine Architecture**: Seamlessly handles both **Native BOT coins** (using unrolled assembly loops) and **ERC20 Tokens** (like USDT, USDC, WETH) in one unified interface.
* **100% Atomic Revert Guarantee**: If any single recipient address fails (e.g. invalid state or contract rejection), the entire transaction safely reverts. **Zero risk of funds being trapped or lost**.
* **CSV Bulk Importer**: Upload `.csv` files containing thousands of recipient rows, automatically parsing addresses and token amounts into the DApp workspace.
* **Preset Payroll Rosters**: Save reusable payroll rosters (e.g., "Core Hackathon Team", "DAO Council Members") to LocalStorage for 1-click future distributions.

### 2. 🔗 Split Bill & PayLink (`Social Web3 Payment Requests`)
* **1-Click Web3 Settlement**: Generate custom payment requests for shared meals, hackathon subscriptions, or team expenses.
* **Instant Social Sharing**: Integrated share buttons for **WhatsApp** and **Telegram** with pre-formatted invitation notes.
* **Zero Platform Fee Direct Settlement**: Transfers funds directly from Payer to Payee wallet without intermediate contract custody.
* **Real-time Account Switcher**: Built-in `accountsChanged` event listener automatically switches active DApp wallets when users toggle accounts in MetaMask.

---

## 📊 Gas Optimization Benchmark

Batchpay Protocol uses a **Stateless Zero-SSTORE Execution Model**, eliminating repeated base transaction overheads:

| Recipients Count | Standard Transfers Gas | Batchpay Protocol Gas | Total Gas Fee Reduction |
| :---: | :---: | :---: | :---: |
| **1 Recipient** | 21,000 gas | ~35,000 gas | Baseline |
| **5 Recipients** | 105,000 gas | ~48,000 gas | **~54.2% Saved** |
| **10 Recipients** | 210,000 gas | ~62,000 gas | **~70.4% Saved** |
| **50 Recipients** | 1,050,000 gas | ~183,000 gas | **~82.5% Saved** |

---

## 🤖 Monkey Bot — Executive RAG AI Assistant

Batchpay Protocol features an embedded AI assistant named **Monkey Bot** (powered by **Google Gemini 1.5 Flash RAG**).

- **Strict Executive Tone**: Responds in clear international English with zero emojis, providing technical clarity for judges and users.
- **Deep Protocol RAG Context**: Instantly answers questions regarding smart contract architecture, gas benchmarks, mainnet contract addresses, and usage guides.

---

## 🏗️ Architecture & File Structure

```
project-hackhaton-DeFi/
├── backend/                        # EVM Smart Contracts (Foundry)
│   ├── src/
│   │   └── MultiSend.sol           # Core MultiSend Smart Contract (v0.8.20)
│   ├── test/
│   │   └── MultiSend.t.sol         # 14/14 Foundry Unit Tests
│   └── deploy-mainnet.js           # Ethers.js Mainnet Deployment Script
├── frontend/                       # Web3 DApp Application (Next.js 14)
│   ├── app/
│   │   ├── page.tsx                # DApp Single-Page Workspace & Landing
│   │   ├── layout.tsx              # Root Metadata & Fonts
│   │   └── api/chat/route.ts       # Gemini 1.5 Flash RAG AI Endpoint
│   ├── components/
│   │   ├── common/                 # Navbar (Vercel Underline Tabs & Wallet Menu)
│   │   ├── landing/                # Hero, Feature Showcase & Comparison Section
│   │   ├── workspace/              # MultiSend Workspace & CSV Importer
│   │   ├── splitbill/              # Split Bill Tracker & PayLink Modal
│   │   └── ai/                     # Monkey Bot Executive Assistant Modal
│   └── lib/
│       ├── constants.ts            # Contract ABI & Mainnet RPC Params
│       └── paylinkStore.ts         # PayLink LocalStorage State Manager
├── Dockerfile                      # Production Docker Build Setup
├── docker-compose.yml              # Local Container Setup
└── README.md                       # Official Hackathon Documentation
```

---

## 🛠️ Local Development Quickstart

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **MetaMask Wallet**: Connected to **BOT Chain Mainnet** (`https://rpc.botchain.ai`, Chain ID `677`)

### 1. Clone Repository & Install Dependencies
```bash
git clone https://github.com/enzerra/project-hackhaton-DeFi.git
cd project-hackhaton-DeFi/frontend
npm install
```

### 2. Configure Environment Variables
Create `.env.local` inside `frontend/`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_MULTISEND_CONTRACT_ADDRESS=0xbC3Fb064bc396422fe1f8155AFe3822F966a78Fb
```

### 3. Launch Local Server
```bash
npm run dev
```
Open **`http://localhost:3000`** in your browser.

---

## 🧪 Smart Contract Foundry Test Suite

Run the 14 Foundry unit tests:

```bash
cd backend
forge test -vvv
```

```text
[PASS] testAtomicRevertOnFailure() (gas: 42102)
[PASS] testERC20MultiSendSuccess() (gas: 78912)
[PASS] testExcessNativeRefund() (gas: 38410)
[PASS] testMaxRecipientsLimit() (gas: 189201)
[PASS] testNativeMultiSendSuccess() (gas: 48210)
Test result: ok. 14 passed; 0 failed; 0 skipped; finished in 14.21ms
```

---

## 👥 Core Development Team

- **Lead Smart Contract Architect & Team Lead**: EVM Gas Optimization & Solidity `MultiSend.sol` Contract.
- **Lead Frontend Engineer**: Web3 Interface Systems, Next.js 14 & Vercel Light Design.
- **Product Manager**: User Experience, Product Strategy & Hackathon Documentation.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.
