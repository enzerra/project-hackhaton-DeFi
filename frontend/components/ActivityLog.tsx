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
    <div className="glass-panel p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
          <History className="w-5 h-5 text-cyan-400" />
          <span>Activity Log</span>
        </h3>
      </div>

      <div className="max-h-44 overflow-y-auto space-y-2 pr-1 text-xs">
        {logs.length === 0 ? (
          <p className="text-slate-500 italic text-center py-4">No transactions executed in this session.</p>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className={`p-2.5 rounded-lg border text-xs flex justify-between items-center gap-2 ${
                log.type === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : log.type === 'error'
                  ? 'bg-red-500/10 border-red-500/30 text-red-300'
                  : 'bg-white/5 border-white/10 text-slate-300'
              }`}
            >
              <div>
                <span className="text-[10px] text-slate-400 block">{log.time}</span>
                <span>{log.message}</span>
              </div>
              {log.txHash && (
                <a
                  href={`https://scan.bohr.life/tx/${log.txHash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-cyan-400 hover:underline font-mono text-[11px]"
                >
                  <span>Explorer</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
