import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Mail, Phone } from 'lucide-react';
import { TopBar } from '../../components/layout/TopBar';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { mockClients } from '../../data/mockData';

const ClientsPage: React.FC = () => {
  return (
    <div className="min-h-full">
      <TopBar title="Clients" subtitle="Manage your client relationships and revenue" />
      <div className="p-6 max-w-[1400px] mx-auto">
        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input className="glass border border-white/[0.08] rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 w-64" placeholder="Search clients..." />
          </div>
          <Button size="sm" icon={<Plus size={14} />}>Add Client</Button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Clients', value: mockClients.length },
            { label: 'Active', value: mockClients.filter((c) => c.status === 'active').length },
            { label: 'Leads', value: mockClients.filter((c) => c.status === 'lead').length },
            { label: 'Total Revenue', value: `$${mockClients.reduce((s, c) => s + c.totalRevenue, 0).toLocaleString()}` },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="glass border border-white/[0.08] rounded-2xl p-4">
              <p className="text-[10px] text-slate-500 mb-1">{s.label}</p>
              <p className="text-xl font-bold text-white">{s.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Client cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockClients.map((client, i) => (
            <motion.div key={client.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.07 }}
              className="glass border border-white/[0.08] rounded-2xl p-5 hover:border-white/15 transition-all cursor-pointer group">
              <div className="flex items-start gap-4 mb-4">
                <Avatar name={client.name} src={client.avatar} size="md" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">{client.name}</h3>
                  <p className="text-[11px] text-slate-500">{client.company}</p>
                  <div className="mt-1"><StatusBadge status={client.status} /></div>
                </div>
              </div>
              <div className="space-y-1.5 mb-4">
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <Mail size={11} className="text-slate-600" />{client.email}
                </div>
                {client.phone && (
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <Phone size={11} className="text-slate-600" />{client.phone}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                <span className="text-[10px] text-slate-500">{client.projects.length} project{client.projects.length !== 1 ? 's' : ''}</span>
                <span className="text-sm font-bold text-white">${client.totalRevenue.toLocaleString()}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientsPage;
