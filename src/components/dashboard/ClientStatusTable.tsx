import React from 'react';
import { motion } from 'framer-motion';
import type { Client } from '../../types';
import { StatusBadge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';

interface ClientTableProps {
  clients: Client[];
}

export const ClientStatusTable: React.FC<ClientTableProps> = ({ clients }) => {
  return (
    <div className="glass border border-white/[0.08] rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">Client Overview</h3>
        <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">View all →</button>
      </div>
      <div className="overflow-x-auto -mx-1">
        <table className="w-full min-w-[420px]">
          <thead>
            <tr className="text-[10px] text-slate-500 uppercase tracking-wider">
              <th className="text-left pb-3 px-1">Client</th>
              <th className="text-left pb-3 px-1">Status</th>
              <th className="text-right pb-3 px-1">Revenue</th>
              <th className="text-right pb-3 px-1">Projects</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {clients.map((client, i) => (
              <motion.tr
                key={client.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="hover:bg-white/[0.02] transition-colors cursor-pointer"
              >
                <td className="py-3 px-1">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={client.name} src={client.avatar} size="xs" />
                    <div>
                      <p className="text-xs font-medium text-white">{client.name}</p>
                      <p className="text-[10px] text-slate-500">{client.company}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-1">
                  <StatusBadge status={client.status} />
                </td>
                <td className="py-3 px-1 text-right">
                  <span className="text-xs font-semibold text-white">
                    ${client.totalRevenue.toLocaleString()}
                  </span>
                </td>
                <td className="py-3 px-1 text-right">
                  <span className="text-xs text-slate-400">{client.projects.length}</span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
