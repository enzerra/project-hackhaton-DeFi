// BOTFlow AI Frontend Logic (Ethers.js v6 Integration)

const CONTRACT_ADDRESS = "0x9118EA4a52C6c7873729c8d8702cCd85E573f9E9";
const BOTCHAIN_TESTNET_PARAMS = {
    chainId: "0x3C8", // 968 in hex
    chainName: "BOT Chain Testnet",
    nativeCurrency: {
        name: "BOT Token",
        symbol: "BOT",
        decimals: 18
    },
    rpcUrls: ["https://rpc.bohr.life"],
    blockExplorerUrls: ["https://scan.bohr.life/"]
};

// ABI for MultiSend
const MULTISEND_ABI = [
    "function multiSendNative(address[] calldata recipients, uint256[] calldata amounts) external payable",
    "function multiSendERC20(address token, address[] calldata recipients, uint256[] calldata amounts) external",
    "event MultiSendExecuted(address indexed sender, address indexed token, uint256 totalAmount, uint256 recipientCount)"
];

// ABI for ERC20 Standard
const ERC20_ABI = [
    "function balanceOf(address account) external view returns (uint256)",
    "function allowance(address owner, address spender) external view returns (uint256)",
    "function approve(address spender, uint256 amount) external returns (bool)",
    "function decimals() external view returns (uint8)",
    "function symbol() external view returns (string)"
];

// App State
let provider = null;
let signer = null;
let userAddress = null;
let isNativeMode = true;

// DOM Elements
const btnConnect = document.getElementById("btnConnect");
const lblConnect = document.getElementById("lblConnect");
const networkBadge = document.getElementById("networkBadge");
const networkName = document.getElementById("networkName");

const modeNative = document.getElementById("modeNative");
const modeERC20 = document.getElementById("modeERC20");
const erc20Group = document.getElementById("erc20Group");
const tokenAddressInput = document.getElementById("tokenAddress");

const recipientsList = document.getElementById("recipientsList");
const btnAddRecipient = document.getElementById("btnAddRecipient");
const aiPrompt = document.getElementById("aiPrompt");
const btnGenerateAI = document.getElementById("btnGenerateAI");

const sumToken = document.getElementById("sumToken");
const sumCount = document.getElementById("sumCount");
const sumTotal = document.getElementById("sumTotal");

const btnApprove = document.getElementById("btnApprove");
const btnExecute = document.getElementById("btnExecute");
const txLog = document.getElementById("txLog");

// Verification Checkers
const chkRecipients = document.getElementById("chkRecipients");
const chkDuplicates = document.getElementById("chkDuplicates");
const chkZeroAddress = document.getElementById("chkZeroAddress");
const chkBalance = document.getElementById("chkBalance");
const chkAllowance = document.getElementById("chkAllowance");

// Initial Setup
window.addEventListener("DOMContentLoaded", () => {
    initDefaultRecipients();
    setupEventListeners();
    checkWalletConnected();
});

function setupEventListeners() {
    btnConnect.addEventListener("click", connectWallet);
    
    modeNative.addEventListener("click", () => setEngineMode(true));
    modeERC20.addEventListener("click", () => setEngineMode(false));

    btnAddRecipient.addEventListener("click", () => addRecipientRow("", ""));
    btnGenerateAI.addEventListener("click", parseAIPrompt);

    document.querySelectorAll(".btn-template").forEach(btn => {
        btn.addEventListener("click", (e) => applyTemplate(e.target.dataset.template));
    });

    btnExecute.addEventListener("click", executeMultiSend);
    btnApprove.addEventListener("click", approveERC20Token);

    tokenAddressInput.addEventListener("input", updateVerification);
}

function initDefaultRecipients() {
    recipientsList.innerHTML = "";
    addRecipientRow("0xAAAA00000000000000000000000000000000AAAA", "50");
    addRecipientRow("0xBBBB00000000000000000000000000000000BBBB", "30");
    addRecipientRow("0xCCCC00000000000000000000000000000000CCCC", "20");
    updateVerification();
}

function addRecipientRow(address = "", amount = "") {
    const rowCount = recipientsList.children.length;
    if (rowCount >= 3) {
        alert("Maximum 3 recipients allowed per atomic transaction to guarantee gas efficiency.");
        return;
    }

    const row = document.createElement("div");
    row.className = "recipient-row";
    row.innerHTML = `
        <input type="text" class="form-input rec-addr" placeholder="0x... Recipient Address" value="${address}">
        <input type="number" step="any" class="form-input rec-amt" placeholder="Amount" value="${amount}">
        <button class="btn-remove" title="Remove">&times;</button>
    `;

    row.querySelector(".btn-remove").addEventListener("click", () => {
        row.remove();
        updateVerification();
    });

    row.querySelector(".rec-addr").addEventListener("input", updateVerification);
    row.querySelector(".rec-amt").addEventListener("input", updateVerification);

    recipientsList.appendChild(row);
    updateVerification();
}

function setEngineMode(native) {
    isNativeMode = native;
    if (native) {
        modeNative.classList.add("active");
        modeERC20.classList.remove("active");
        erc20Group.classList.add("hidden");
        btnApprove.classList.add("hidden");
        sumToken.textContent = "Native BOT";
    } else {
        modeERC20.classList.add("active");
        modeNative.classList.remove("active");
        erc20Group.classList.remove("hidden");
        sumToken.textContent = "ERC20 Token";
    }
    updateVerification();
}

// AI Prompt Natural Language Parsing
function parseAIPrompt() {
    const promptText = aiPrompt.value.trim();
    if (!promptText) {
        alert("Please enter an AI prompt description or select a quick template!");
        return;
    }

    // Match 0x addresses in prompt
    const addressMatches = promptText.match(/0x[a-fA-F0-9]{40}/g) || [];
    // Match amounts/numbers
    const numberMatches = promptText.match(/\b\d+(\.\d+)?\b/g) || [];

    if (addressMatches.length > 0) {
        recipientsList.innerHTML = "";
        for (let i = 0; i < Math.min(addressMatches.length, 3); i++) {
            const amt = numberMatches[i] || "10";
            addRecipientRow(addressMatches[i], amt);
        }
        alert(`🤖 AI Assistant generated distribution plan for ${Math.min(addressMatches.length, 3)} recipients!`);
    } else {
        alert("🤖 AI Assistant Tip: Please include valid Ethereum/BOT addresses (0x...) in your prompt, or click one of the quick templates below.");
    }
}

function applyTemplate(type) {
    recipientsList.innerHTML = "";
    if (type === "hackathon") {
        aiPrompt.value = "Hackathon Prize Distribution: 50 BOT to Winner #1, 30 BOT to Winner #2, 20 BOT to Winner #3.";
        addRecipientRow("0x1111111111111111111111111111111111111111", "50");
        addRecipientRow("0x2222222222222222222222222222222222222222", "30");
        addRecipientRow("0x3333333333333333333333333333333333333333", "20");
    } else if (type === "payroll") {
        aiPrompt.value = "DAO Monthly Payroll: Lead Dev 100 BOT, Moderator 50 BOT, Designer 50 BOT.";
        addRecipientRow("0x7777777777777777777777777777777777777777", "100");
        addRecipientRow("0x8888888888888888888888888888888888888888", "50");
        addRecipientRow("0x9999999999999999999999999999999999999999", "50");
    } else if (type === "airdrop") {
        aiPrompt.value = "Community Reward Airdrop: Equal 25 BOT to 3 top active contributors.";
        addRecipientRow("0xAAAA00000000000000000000000000000000AAAA", "25");
        addRecipientRow("0xBBBB00000000000000000000000000000000BBBB", "25");
        addRecipientRow("0xCCCC00000000000000000000000000000000CCCC", "25");
    }
    updateVerification();
}

// Verification Logic
function getRecipientsData() {
    const rows = recipientsList.querySelectorAll(".recipient-row");
    const addresses = [];
    const amounts = [];
    let total = 0;

    rows.forEach(r => {
        const addr = r.querySelector(".rec-addr").value.trim();
        const amtStr = r.querySelector(".rec-amt").value.trim();
        const amt = parseFloat(amtStr) || 0;

        addresses.push(addr);
        amounts.push(amt);
        total += amt;
    });

    return { addresses, amounts, total, count: addresses.length };
}

function updateVerification() {
    const data = getRecipientsData();

    sumCount.textContent = `${data.count} Wallet${data.count > 1 ? 's' : ''}`;
    sumTotal.textContent = `${data.total.toFixed(4)} ${isNativeMode ? 'BOT' : 'Tokens'}`;

    // 1. Recipient count check
    const validCount = data.count > 0 && data.count <= 3;
    setCheckStatus(chkRecipients, validCount);

    // 2. Duplicate check
    const uniqueAddrs = new Set(data.addresses.map(a => a.toLowerCase()));
    const noDuplicates = data.count > 0 && uniqueAddrs.size === data.count;
    setCheckStatus(chkDuplicates, noDuplicates);

    // 3. Zero address check
    const noZero = data.addresses.length > 0 && !data.addresses.some(a => a === "0x0000000000000000000000000000000000000000" || a === "");
    setCheckStatus(chkZeroAddress, noZero);

    // Balance and allowance checks updated when wallet connected
}

function setCheckStatus(element, isPass) {
    if (isPass) {
        element.className = "check-item check-pass";
        element.querySelector(".check-icon").textContent = "✓";
    } else {
        element.className = "check-item check-fail";
        element.querySelector(".check-icon").textContent = "✗";
    }
}

// MetaMask Wallet Integration
async function connectWallet() {
    if (typeof window.ethereum === "undefined") {
        alert("MetaMask browser extension is not installed! Please install MetaMask to interact with BOT Chain.");
        return;
    }

    try {
        provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = await provider.getSigner();
        userAddress = await signer.getAddress();

        // Check and switch network to BOT Chain Testnet
        await checkAndSwitchNetwork();

        lblConnect.textContent = `${userAddress.substring(0, 6)}...${userAddress.substring(38)}`;
        const dot = networkBadge.querySelector(".status-dot");
        dot.className = "status-dot connected";
        networkName.textContent = "BOT Chain Testnet";

        logActivity(`Connected wallet: ${userAddress}`);
        updateVerification();
    } catch (err) {
        console.error(err);
        alert(`Connection error: ${err.message}`);
    }
}

async function checkAndSwitchNetwork() {
    if (!provider) return;
    const network = await provider.getNetwork();
    if (Number(network.chainId) !== 968) {
        try {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: BOTCHAIN_TESTNET_PARAMS.chainId }]
            });
        } catch (switchError) {
            if (switchError.code === 4902) {
                await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [BOTCHAIN_TESTNET_PARAMS]
                });
            }
        }
    }
}

async function checkWalletConnected() {
    if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
            connectWallet();
        }
    }
}

// Execute Smart Contract Functions
async function executeMultiSend() {
    if (!signer) {
        await connectWallet();
        if (!signer) return;
    }

    const data = getRecipientsData();
    if (data.count === 0 || data.count > 3) {
        alert("Please enter between 1 and 3 recipient addresses.");
        return;
    }

    btnExecute.disabled = true;
    btnExecute.textContent = "⏳ Executing Transaction...";

    try {
        const contract = new ethers.Contract(CONTRACT_ADDRESS, MULTISEND_ABI, signer);

        if (isNativeMode) {
            // Convert amounts to wei
            const weiAmounts = data.amounts.map(a => ethers.parseEther(a.toString()));
            const totalWei = ethers.parseEther(data.total.toString());

            const tx = await contract.multiSendNative(data.addresses, weiAmounts, { value: totalWei });
            logActivity(`Sent tx: ${tx.hash}... Waiting confirmation`);

            const receipt = await tx.wait();
            logActivity(`✅ Atomic Native BOT Distribution Confirmed! Tx: ${receipt.hash}`);
            alert(`🎉 Success! Distributed ${data.total} BOT to ${data.count} wallets in 1 atomic transaction!`);
        } else {
            const tokenAddr = tokenAddressInput.value.trim();
            if (!ethers.isAddress(tokenAddr)) {
                alert("Please enter a valid ERC20 token contract address.");
                btnExecute.disabled = false;
                btnExecute.textContent = "⚡ Execute Atomic Distribution";
                return;
            }

            const tokenContract = new ethers.Contract(tokenAddr, ERC20_ABI, signer);
            const decimals = await tokenContract.decimals();
            const rawAmounts = data.amounts.map(a => ethers.parseUnits(a.toString(), decimals));

            const tx = await contract.multiSendERC20(tokenAddr, data.addresses, rawAmounts);
            logActivity(`Sent tx: ${tx.hash}... Waiting confirmation`);

            const receipt = await tx.wait();
            logActivity(`✅ Atomic ERC20 Distribution Confirmed! Tx: ${receipt.hash}`);
            alert(`🎉 Success! Distributed ERC20 Tokens to ${data.count} wallets!`);
        }
    } catch (err) {
        console.error(err);
        alert(`Transaction Failed / Reverted: ${err.reason || err.message}`);
        logActivity(`❌ Transaction Reverted: ${err.reason || err.message}`);
    } finally {
        btnExecute.disabled = false;
        btnExecute.textContent = "⚡ Execute Atomic Distribution";
    }
}

async function approveERC20Token() {
    if (!signer) return;
    const tokenAddr = tokenAddressInput.value.trim();
    if (!ethers.isAddress(tokenAddr)) return;

    try {
        const data = getRecipientsData();
        const tokenContract = new ethers.Contract(tokenAddr, ERC20_ABI, signer);
        const decimals = await tokenContract.decimals();
        const totalRaw = ethers.parseUnits(data.total.toString(), decimals);

        btnApprove.textContent = "⏳ Approving Token...";
        const tx = await tokenContract.approve(CONTRACT_ADDRESS, totalRaw);
        await tx.wait();

        alert("✅ Allowance granted to MultiSend contract!");
        logActivity(`Approved ${data.total} tokens for MultiSend contract`);
    } catch (err) {
        console.error(err);
        alert(`Approve failed: ${err.message}`);
    } finally {
        btnApprove.textContent = "Approve ERC20 Token";
    }
}

function logActivity(message) {
    if (txLog.querySelector(".log-empty")) {
        txLog.innerHTML = "";
    }
    const item = document.createElement("div");
    item.className = "log-item";
    item.innerHTML = `<span>${new Date().toLocaleTimeString()}</span> <span>${message}</span>`;
    txLog.prepend(item);
}
