'use client';

import React from 'react';
import { History, ExternalLink } from 'lucide-react';

export interface LogEntry {
  id: string;
  time: string;
  message: string;
  txHash?: string;
  type: 'info' | 'success' | 'error';
}

interface ActivityLogProps {
  logs: LogEntry[];
}

export const ActivityLog: React.FC<ActivityLogProps> = ({ logs }) => {
  return (
    <div className="vercel-card p-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-bold text-[#171717] flex items-center gap-2">
          <History className="w-4 h-4 text-sky-600" />
          <span>Activity Log</span>
        </h3>
      </div>

      <div className="max-h-40 overflow-y-auto space-y-2 text-xs">
        {logs.length === 0 ? (
          <p className="text-neutral-400 italic text-center py-4">No transactions executed in this session.</p>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className={`p-2.5 rounded-xl border flex justify-between items-center gap-2 ${
                log.type === 'success'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : log.type === 'error'
                  ? 'bg-rose-50 border-rose-200 text-rose-800'
                  : 'bg-neutral-50 border-black/[0.08] text-neutral-800'
              }`}
            >
              <div>
                <span className="text-[10px] text-neutral-400 block font-mono">{log.time}</span>
                <span>{log.message}</span>
              </div>
              {log.txHash && (
                <a
                  href={`https://scan.bohr.life/tx/${log.txHash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-sky-600 hover:underline font-mono text-[11px]"
                >
                  <span>Explorer</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400" />
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
