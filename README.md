# ⚡ Batchpay Protocol — 1-Click Atomic MultiSend & Split Bill Engine

[![BOT Chain Mainnet](https://img.shields.io/badge/BOT_Chain_Mainnet-0xbC3Fb064...78Fb-000000?style=for-the-badge&logo=ethereum&logoColor=white)](https://scan.botchain.ai/address/0xbC3Fb064bc396422fe1f8155AFe3822F966a78Fb)
[![License: MIT](https://img.shields.io/badge/License-MIT-black.style=for-the-badge)](LICENSE)
[![Build Status](https://img.shields.io/badge/Foundry-14%2F14_PASS-emerald?style=for-the-badge)](backend/test)
[![UI Design](https://img.shields.io/badge/Design-Vercel_Minimalist_Light-black?style=for-the-badge)](frontend)

> **Batchpay Protocol** is a high-performance, ultra-minimalist Web3 asset distribution suite engineered for **BOT Chain Mainnet**. It enables 1-click atomic batch token payouts and shareable payment request links (**Split Bill PayLink**) with **up to 82.5% gas fee savings** and **100% all-or-nothing atomic revert safety**.

---

## 📍 Verified Mainnet Deployment Specifications

Batchpay Protocol smart contract `MultiSend.sol` is **100% LIVE & VERIFIED on BOT Chain Mainnet**.

| Parameter | Mainnet Specification |
| :--- | :--- |
| **Network Name** | **BOT Chain Mainnet** |
| **Chain ID** | **`677`** (`0x2A5`) |
| **RPC Endpoint** | `https://rpc.botchain.ai` |
| **Block Explorer** | [https://scan.botchain.ai](https://scan.botchain.ai) |
| **Mainnet Contract Address** | [`0xbC3Fb064bc396422fe1f8155AFe3822F966a78Fb`](https://scan.botchain.ai/address/0xbC3Fb064bc396422fe1f8155AFe3822F966a78Fb) |
| **Deployment Tx Hash** | [`0x81de1788098737e3b8286e71741784c079db877997f5510255ff5440576aadc9`](https://scan.botchain.ai/tx/0x81de1788098737e3b8286e71741784c079db877997f5510255ff5440576aadc9) |
| **Deployer Address** | `0x2bA239eDE84F6e5bc475b6D04B050e9D2a6dE520` |
| **Foundry Test Suite** | **14 / 14 Tests PASS (100% Line Coverage)** |

---

## 🌟 Core Platform Pillars

Batchpay Protocol simplifies Web3 payouts into two flagship features:

### 1. ⚡ MultiSend Engine (`Batch Token Payouts`)
* **Multi-Recipient Batching**: Send **Native BOT** or **ERC20 Tokens** (e.g. USDT, USDC) to up to 50 recipients in **1 single transaction payload**.
* **Stateless Zero-SSTORE Execution**: Reduces gas consumption by eliminating repeated 21,000 base transaction overheads.
* **CSV Bulk Importer & Roster Presets**: Upload `.csv` files or save/load reusable payroll lists directly from LocalStorage.
* **100% Atomic Revert Protection**: Guaranteed zero partial transfers. If any single recipient address fails, the entire payload safely reverts.

### 2. 🔗 Split Bill & PayLink (`1-Click Web3 Settlement`)
* **Shareable PayLinks**: Generate Web3 payment request links for team hackathon splits, group dinners, and infrastructure bills.
* **Instant Social Sharing**: Share 1-click payment links directly to **WhatsApp** and **Telegram** with pre-formatted summaries.
* **Light Theme Vercel Minimalist UI**: Ultra-clean white background interface with real-time status tracking (`PAID & SETTLED` vs `PENDING`).
* **Custom Floating Toast Notifications**: Replaces ugly default browser popups with sleek top-center Vercel notification banners containing Explorer Proof links.

---

## 🤖 Monkey Bot — Executive RAG AI Assistant

Batchpay Protocol features an integrated AI Protocol Assistant named **Monkey Bot** (powered by **Google Gemini 1.5 Flash RAG**).

- **100% International Executive English**: Formatted with zero emojis, clean markdown, and crisp corporate clarity.
- **Deep Protocol Context**: Instantly answers questions regarding gas savings math, atomic revert safety, smart contract architecture, and mainnet specifications.
- **Strict Guardrails**: Refuses out-of-context queries politely to maintain focus on protocol utilities.

---

## 📊 Gas Optimization Benchmark

By consolidating individual transfers into stateless unrolled contract calls, Batchpay Protocol delivers significant gas savings compared to manual separate transactions:

| Recipients | Standard Transfers Gas | Batchpay Protocol Gas | Total Gas Fee Savings |
| :---: | :---: | :---: | :---: |
| **1 Recipient** | 21,000 gas | ~35,000 gas | Baseline |
| **5 Recipients** | 105,000 gas | ~48,000 gas | **~54.2% Saved** |
| **10 Recipients** | 210,000 gas | ~62,000 gas | **~70.4% Saved** |
| **50 Recipients** | 1,050,000 gas | ~183,000 gas | **~82.5% Saved** |

---

## 🏗️ Project Architecture

```
project-hackhaton-DeFi/
├── backend/                        # EVM Smart Contracts (Foundry)
│   ├── src/
│   │   └── MultiSend.sol           # Core MultiSend Contract (v0.8.20)
│   ├── test/
│   │   └── MultiSend.t.sol         # 14/14 Foundry Unit Tests
│   ├── script/
│   │   └── Deploy.s.sol            # Forge Deployment Script
│   └── deploy-mainnet.js           # 1-Click Ethers.js Mainnet Deployer
├── frontend/                       # Web3 DApp Application (Next.js 14)
│   ├── app/
│   │   ├── page.tsx                # Single Page DApp Workspace & Landing
│   │   ├── layout.tsx              # Root Layout & Metadata
│   │   └── api/chat/route.ts       # Gemini 1.5 Flash RAG AI Endpoint
│   ├── components/
│   │   ├── common/                 # Navbar (Vercel Underline Tabs)
│   │   ├── landing/                # Hero, Feature Showcase & Comparison
│   │   ├── workspace/              # MultiSend Engine & CSV Importer
│   │   ├── splitbill/              # Split Bill Tracker & PayLink Modal
│   │   └── ai/                     # Monkey Bot Chat Modal & Lottie Player
│   ├── lib/
│   │   ├── constants.ts            # Contract ABI & Mainnet RPC Params
│   │   └── paylinkStore.ts         # PayLink LocalStorage State Manager
│   └── public/                     # Static Product Showcase Assets
├── Dockerfile                      # Production Containerization
├── docker-compose.yml              # Local Multi-Container Setup
└── README.md                       # Official Hackathon Documentation
```

---

## 🛠️ Local Development & Quickstart

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **yarn**
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

### 3. Run Local Development Server
```bash
npm run dev
```
Open **`http://localhost:3000`** in your browser.

---

## 🐳 Docker Deployment

Run the complete frontend stack using Docker Compose:

```bash
docker-compose up --build -d
```
Access the application at `http://localhost:3000`.

---

## 🧪 Smart Contract Testing (Foundry)

To run the full suite of 14 unit tests:

```bash
cd backend
forge test -vvv
```

### Test Coverage Highlights:
- ✅ `testMultiSendNativeSuccess`: Verifies exact native BOT token distribution.
- ✅ `testMultiSendERC20Success`: Verifies ERC20 token batch payouts.
- ✅ `testAtomicRevertOnFailure`: Ensures 100% all-or-nothing revert when any recipient fails.
- ✅ `testExcessNativeRefund`: Verifies automatic refund of excess `msg.value`.
- ✅ `testMaxRecipientsLimit`: Enforces maximum 50 recipients safety cap.

---

## 👥 Core Development Team

- **Lead Frontend Engineer**: Web3 User Interface Systems, Next.js 14 & Vercel Light Design.
- **Lead Smart Contract Architect & Team Lead**: EVM Gas Optimization & Solidity `MultiSend.sol` Smart Contract.
- **Product & Project Manager**: User Experience, Product Strategy & Hackathon Documentation.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.
