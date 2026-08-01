export interface PayLinkItem {
  id: string;
  title: string;
  payeeAddress: string;
  amount: string;
  isNative: boolean;
  tokenAddress?: string;
  tokenSymbol?: string;
  status: 'PENDING' | 'PAID';
  paidBy: string | null;
  paidTxHash: string | null;
  createdAt: number;
  paidAt: number | null;
}

const STORAGE_KEY = 'botflow_paylink_items';

const DEFAULT_SAMPLE_PAYLINKS: PayLinkItem[] = [
  {
    id: 'PAY-DEMO1',
    title: 'Patungan Coffee & Lunch Hackathon',
    payeeAddress: '0x9118EA4a52C6c7873729c8d8702cCd85E573f9E9',
    amount: '2.5',
    isNative: true,
    tokenSymbol: 'BOT',
    status: 'PENDING',
    paidBy: null,
    paidTxHash: null,
    createdAt: Date.now() - 3600000,
    paidAt: null,
  },
  {
    id: 'PAY-DEMO2',
    title: 'Sewa Server Cloud & Domain Split',
    payeeAddress: '0x9118EA4a52C6c7873729c8d8702cCd85E573f9E9',
    amount: '10.0',
    isNative: true,
    tokenSymbol: 'BOT',
    status: 'PAID',
    paidBy: '0x3248fd7fb3f66523d79d5f1c41f641db49b60fa5',
    paidTxHash: '0x9f83a21b47c0e81726a5d4829102c9183d2a74c102931b28',
    createdAt: Date.now() - 86400000,
    paidAt: Date.now() - 43200000,
  },
];

export function getPayLinks(): PayLinkItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SAMPLE_PAYLINKS));
      return DEFAULT_SAMPLE_PAYLINKS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading paylinks from localStorage:', err);
    return DEFAULT_SAMPLE_PAYLINKS;
  }
}

export function savePayLinks(links: PayLinkItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
    window.dispatchEvent(new CustomEvent('paylink-updated', { detail: links }));
  } catch (err) {
    console.error('Error saving paylinks to localStorage:', err);
  }
}

export function createPayLink(
  data: Omit<PayLinkItem, 'status' | 'paidBy' | 'paidTxHash' | 'createdAt' | 'paidAt'>
): PayLinkItem {
  const links = getPayLinks();
  const newItem: PayLinkItem = {
    ...data,
    status: 'PENDING',
    paidBy: null,
    paidTxHash: null,
    createdAt: Date.now(),
    paidAt: null,
  };

  links.unshift(newItem);
  savePayLinks(links);
  return newItem;
}

export function getPayLinkById(id: string): PayLinkItem | null {
  const links = getPayLinks();
  return links.find((l) => l.id === id) || null;
}

export function markPayLinkAsPaid(id: string, paidBy: string, txHash: string): PayLinkItem | null {
  const links = getPayLinks();
  let updatedItem: PayLinkItem | null = null;

  const updatedLinks = links.map((l) => {
    if (l.id === id) {
      updatedItem = {
        ...l,
        status: 'PAID' as const,
        paidBy,
        paidTxHash: txHash,
        paidAt: Date.now(),
      };
      return updatedItem;
    }
    return l;
  });

  if (updatedItem) {
    savePayLinks(updatedLinks);
    window.dispatchEvent(new CustomEvent('paylink-paid', { detail: updatedItem }));
  }

  return updatedItem;
}

export function generatePayLinkUrl(id: string): string {
  if (typeof window === 'undefined') return '';
  const origin = window.location.origin;
  return `${origin}/?payId=${encodeURIComponent(id)}`;
}
