import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_RAG_INSTRUCTION = `
You are "Monkey Bot", the official, highly intelligent, articulate, warm, and professional AI Protocol Assistant for BOTFlow Protocol.

PERSONALITY & PROFESSIONALISM GUIDELINES:
- Maintain a warm, friendly, intelligent, and highly professional tone in Indonesian (or English if the user asks in English).
- DO NOT USE ANY EMOJIS in your responses to keep the interaction clean, sleek, and executive.
- Use clean markdown formatting (bold text, bullet points, numbered lists, code snippets) to make answers structured, crisp, and easy to read.

COMPLETE DEEP PROJECT RAG KNOWLEDGE BASE:

1. PROTOCOL IDENTITY & PURPOSE:
   - App Name: BOTFlow Protocol (v2.0)
   - Core Mission: 1-Click Atomic Batch Token Transfer Engine built for BOT Chain Build Week Hackathon.
   - Value Proposition: Eliminates manual separate transfers, saving up to 82.5% in gas fees with 100% atomic revert safety.

2. MAINNET & TESTNET COMPATIBILITY (DAPAT DIPAKAI DI MAINNET):
   - Testnet Status: Currently deployed & active on BOT Chain Testnet (Chain ID 968).
   - Mainnet Ready: YES, 100% MAINNET & MULTI-CHAIN READY!
   - Why Mainnet Ready: MultiSend.sol is written in standard EVM Solidity (v0.8.20) with zero external dependencies. It can be deployed seamlessly to BOT Chain Mainnet, Ethereum Mainnet, Arbitrum, Optimism, Polygon, or any EVM Mainnet simply by updating the contract address and RPC in constants.ts!

3. PRICING & FEES (GRATIS ATAU BAYAR):
   - BOTFlow Protocol is 100% FREE / GRATIS to use.
   - Protocol Platform Fee: 0% (BOTFlow charges ZERO platform fees).
   - Gas Fee: Users only pay the standard EVM network gas fee.

4. HOW IT WORKS (CARA KERJA STEP-BY-STEP):
   - Step 1: Connect MetaMask wallet to BOT Chain Testnet (Chain ID 968) or Mainnet.
   - Step 2: Choose engine mode (Native BOT or ERC20 Token like USDT/USDC).
   - Step 3: Enter recipient addresses & amounts, or select Quick Presets (Hackathon Split, DAO Payroll, Community Airdrop).
   - Step 4: Click "Execute Atomic Distribution".
   - Under the Hood (EVM Execution): Smart contract MultiSend.sol loops through recipient arrays in 1 low-level call execution inside 1 transaction block (< 2.5s). If all succeed, tokens settle instantly. If any 1 recipient fails, EVM reverts the ENTIRE transaction atomically.

5. ATOMIC REVERT SECURITY:
   - All-or-Nothing Execution: Single EVM transaction payload.
   - Zero Partial Loss Risk: If even 1 recipient address in a batch fails (invalid address, out of gas, or contract error), EVM Solidity reverts all transfers atomically, leaving 0% partial loss. All funds stay 100% safe.

6. GAS SAVINGS MATH & OPTIMIZATION:
   - Gas Reduction: Saves between 64.2% and 82.5% in gas fees.
   - Why it saves gas: Eliminates repeated base transaction overhead (21,000 gas per tx) and uses stateless zero-SSTORE execution (0 storage writes).

7. NETWORK & SMART CONTRACT SPECS:
   - Network Name: BOT Chain Testnet (BOHR Chain) / Mainnet Compatible
   - Chain ID: 968 (0x3C8 in hex)
   - RPC URL: https://rpc.bohr.life
   - Explorer URL: https://scan.bohr.life/
   - Contract Address: 0x9118EA4a52C6c7873729c8d8702cCd85E573f9E9 (100% Verified Source Code)
   - Smart Contract Language: Solidity v0.8.20 (MultiSend.sol)
   - Testing Suite: Tested with Foundry (14/14 Unit Tests PASS with 100% line coverage and invariant checks).

8. DUAL ENGINE & AUTO-REFUND:
   - Native BOT Mode: Batch transfers native BOT coins. Automatically refunds excess msg.value back to sender if overpaid.
   - ERC20 Token Mode: Batch transfers standard ERC20 tokens (USDT, USDC, custom tokens) after 1-click token allowance approval.

9. USE CASE PRESETS:
   - Hackathon Split: Automatically calculates 50% / 30% / 20% winner pool distribution for 3 recipients.
   - DAO Payroll: Monthly compensation batch for core team contributors in 1 transaction.
   - Community Airdrops: Equal token stream for community members.

10. CORE FOUNDERS & TEAM:
    - Founder 1: Lead Frontend Engineer — Expert in React 18, Next.js 14, TailwindCSS, & Web3 Interface Systems.
    - Founder 2 (Ketua Tim): Lead Smart Contract Architect & Ketua Tim — Expert in Solidity v0.8.20, EVM Gas Optimization, & Atomic Engine.
    - Founder 3: Project Manager — Expert in Agile Execution, Web3 Product Strategy, & User Experience.

STRICT GUARDRAIL INSTRUCTIONS:
1. You are allowed to answer ANY question related to BOTFlow Protocol, BOT Chain Testnet, Mainnet readiness, EVM gas savings, pricing/free status, how it works, smart contracts, atomic reverts, presets, dual engine, capacity, founders, and testing without limits.
2. DO NOT USE ANY EMOJIS IN YOUR RESPONSE.
3. If the user asks ANY question OUTSIDE of this project context (e.g. food recipes, sports, politics, movies, general entertainment, or coding unrelated to BOTFlow), politely & professionally refuse:
   "Maaf, saya adalah Monkey Bot, asisten resmi BOTFlow Protocol. Saya khusus dilatih untuk menjawab pertanyaan seputar BOTFlow Protocol, penghematan gas fee, cara kerja, kesiapan Mainnet, keamanan atomic revert, dan eksekusi jaringan BOT Chain. Ada yang dapat saya bantu terkait proyek BOTFlow hari ini?"
`;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message parameter is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const lowerMsg = message.toLowerCase();

    // Out-of-context keyword inspection for professional guardrail response
    const outOfContextKeywords = [
      'recipe', 'resep', 'pizza', 'cooking', 'masak', 'football', 'sepakbola', 'soccer',
      'weather', 'cuaca', 'movie', 'film', 'president', 'presiden', 'joke', 'lelucon',
      'lagu', 'song', 'capital of', 'who is elon', 'python code for game', 'cerita'
    ];

    const isOutOfContext = outOfContextKeywords.some((kw) => lowerMsg.includes(kw));

    if (isOutOfContext) {
      return NextResponse.json({
        reply: 'Maaf, saya adalah Monkey Bot, asisten resmi BOTFlow Protocol. Saya khusus dilatih untuk menjawab pertanyaan seputar BOTFlow Protocol, penghematan gas fee, cara kerja, kesiapan Mainnet, keamanan atomic revert, dan eksekusi jaringan BOT Chain. Ada yang dapat saya bantu terkait proyek BOTFlow hari ini?',
      });
    }

    // Call Google Gemini API if GEMINI_API_KEY is configured and valid
    if (apiKey && apiKey !== 'your_gemini_api_key_here') {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  { text: `${SYSTEM_RAG_INSTRUCTION}\n\nUser Question: ${message}` }
                ],
              },
            ],
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 450,
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (replyText) {
          // Remove any emojis if generated by AI
          const cleanReply = replyText.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
          return NextResponse.json({ reply: cleanReply });
        }
      }
    }

    // EMOJI-FREE PROFESSIONAL RAG MATRIX (Active for offline / standalone demo mode)
    let fallbackReply = '';

    // 1. MAINNET & TESTNET COMPATIBILITY
    if (
      lowerMsg.includes('mainnet') || lowerMsg.includes('testnet') || lowerMsg.includes('bisa mainnet') ||
      lowerMsg.includes('siap mainnet') || lowerMsg.includes('multi chain')
    ) {
      fallbackReply = 'BOTFlow Protocol **100% MAINNET READY**.\n\n**Spesifikasi Kesiapan Mainnet:**\n- Smart contract `MultiSend.sol` ditulis menggunakan standar EVM Solidity v0.8.20 murni tanpa ketergantungan pustaka eksternal (*zero external dependencies*).\n- Protokol ini dapat dideploy secara langsung (*drop-in deployment*) ke **BOT Chain Mainnet**, **Ethereum Mainnet**, **Arbitrum**, **Optimism**, **Polygon**, atau EVM Chain mana pun hanya dengan memperbarui alamat kontrak dan RPC di konfigurasi frontend.';
    }
    // 2. CARA KERJA / HOW IT WORKS
    else if (
      lowerMsg.includes('cara kerja') || lowerMsg.includes('gimana cara') || lowerMsg.includes('bagaimana cara') ||
      lowerMsg.includes('how it works') || lowerMsg.includes('caranya') || lowerMsg.includes('proses') ||
      lowerMsg.includes('langkah') || lowerMsg.includes('alur') || lowerMsg.includes('pakai') || lowerMsg.includes('penggunaan')
    ) {
      fallbackReply = 'Berikut adalah alur kerja BOTFlow Protocol:\n\n1. **Konek Wallet**: Hubungkan MetaMask ke jaringan BOT Chain Testnet/Mainnet.\n2. **Pilih Mode**: Pilih mode **Native BOT** atau **ERC20 Token** (USDT, USDC, dll).\n3. **Isi Penerima**: Masukkan alamat wallet & nominal, atau pilih **Quick Presets** (Hackathon Split, DAO Payroll, Airdrop).\n4. **Eksekusi 1-Klik**: Klik *Execute Atomic Distribution*. Smart contract (`MultiSend.sol`) memproses seluruh transfer dalam **1 transaksi tunggal** secara atomik (< 2.5 detik).';
    }
    // 3. PRICING / GRATIS ATAU BAYAR
    else if (
      lowerMsg.includes('gratis') || lowerMsg.includes('bayar') || lowerMsg.includes('biaya') ||
      lowerMsg.includes('free') || lowerMsg.includes('tarif') || lowerMsg.includes('cost') ||
      lowerMsg.includes('potongan') || lowerMsg.includes('sewa') || lowerMsg.includes('harga') || lowerMsg.includes('berbayar')
    ) {
      fallbackReply = 'BOTFlow Protocol **100% GRATIS** digunakan.\n\n- **Platform Fee**: **0%** (Sistem tidak mengambil potongan biaya sama sekali).\n- **Gas Fee**: Pengguna hanya membayar biaya gas standar jaringan, di mana untuk testnet token BOT dapat diperoleh secara gratis dari faucet resmi.';
    }
    // 4. GAS SAVINGS MATH
    else if (
      lowerMsg.includes('gas') || lowerMsg.includes('fee') || lowerMsg.includes('hemat') || lowerMsg.includes('save') || lowerMsg.includes('murah') || lowerMsg.includes('efisiensi')
    ) {
      fallbackReply = 'BOTFlow Protocol menghemat antara **64.2% hingga 82.5% total biaya gas**.\n\n**Mekanisme Penghematan:**\nBOTFlow menggabungkan puluhan transfer menjadi 1 transaksi tunggal (*stateless zero-SSTORE execution*), mengeliminasi pengulangan biaya dasar gas (*21,000 gas per transaksi*).';
    }
    // 5. ATOMIC REVERT SAFETY
    else if (
      lowerMsg.includes('revert') || lowerMsg.includes('atomic') || lowerMsg.includes('aman') ||
      lowerMsg.includes('safe') || lowerMsg.includes('keamanan') || lowerMsg.includes('security') || lowerMsg.includes('gagal') || lowerMsg.includes('hilang') || lowerMsg.includes('rugi')
    ) {
      fallbackReply = 'Keamanan BOTFlow terjamin dengan mekanisme **100% Atomic Revert Protection** di EVM Solidity.\n\n**Prinsip All-or-Nothing:**\nJika salah satu alamat penerima gagal (misal salah alamat atau out of gas), seluruh transaksi otomatis dibatalkan (*revert*) dan sisa dana 100% aman di wallet tanpa risiko kehilangan sebagian.';
    }
    // 6. SMART CONTRACT & NETWORK SPECS
    else if (
      lowerMsg.includes('contract') || lowerMsg.includes('alamat') || lowerMsg.includes('address') ||
      lowerMsg.includes('chain') || lowerMsg.includes('network') || lowerMsg.includes('rpc') || lowerMsg.includes('explorer') || lowerMsg.includes('bohr')
    ) {
      fallbackReply = 'Berikut detail Spesifikasi Smart Contract resmi BOTFlow:\n\n- **Network**: BOT Chain Testnet (Chain ID 968) / Mainnet Ready\n- **RPC**: `https://rpc.bohr.life`\n- **Contract Address**: `0x9118EA4a52C6c7873729c8d8702cCd85E573f9E9`\n- **Status**: 100% Verified Source Code & 14/14 Foundry Tests PASS.';
    }
    // 7. CORE FOUNDERS & TEAM
    else if (
      lowerMsg.includes('founder') || lowerMsg.includes('tim') || lowerMsg.includes('team') ||
      lowerMsg.includes('ketua') || lowerMsg.includes('leader') || lowerMsg.includes('pembuat') || lowerMsg.includes('developer')
    ) {
      fallbackReply = 'Berikut adalah tim pengembang BOTFlow Protocol:\n\n1. **Founder 1**: Lead Frontend Engineer (Spesialis React 18, Next.js & Web3 Interface Systems)\n2. **Founder 2 (Ketua Tim)**: Lead Smart Contract Architect & Ketua Tim (Spesialis Solidity v0.8.20 & EVM Gas Optimization)\n3. **Founder 3**: Project Manager (Spesialis Agile Strategy & Product UX)';
    }
    // FALLBACK GENERAL RESPONSE
    else {
      fallbackReply = 'Halo. Saya adalah **Monkey Bot**, asisten resmi BOTFlow Protocol.\n\nBOTFlow Protocol **100% Mainnet Ready** dan dapat digunakan di BOT Chain Testnet maupun Mainnet dengan efisiensi gas hingga 82.5% dan keamanan atomik 100%. Ada yang dapat saya bantu?';
    }

    return NextResponse.json({ reply: fallbackReply });
  } catch (err: any) {
    console.error('Gemini API Error:', err);
    return NextResponse.json(
      {
        reply: 'Maaf, saya adalah Monkey Bot, asisten resmi BOTFlow Protocol. Ada yang dapat saya bantu terkait proyek BOTFlow hari ini?',
      },
      { status: 200 }
    );
  }
}
