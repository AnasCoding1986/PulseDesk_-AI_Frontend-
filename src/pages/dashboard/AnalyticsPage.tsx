import React from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';
import { TopBar } from '../../components/layout/TopBar';
import { mockRevenueData, mockWorkloadData, mockProjects, mockClients } from '../../data/mockData';

const PIE_COLORS = ['#3B82F6', '#8B5CF6', '#22C55E', '#F59E0B', '#EF4444'];

const AnalyticsPage: React.FC = () => {
  const statusDist = [
    { name: 'Active', value: mockProjects.filter((p) => p.status === 'active').length },
    { name: 'Review', value: mockProjects.filter((p) => p.status === 'review').length },
    { name: 'Planning', value: mockProjects.filter((p) => p.status === 'planning').length },
    { name: 'Completed', value: mockProjects.filter((p) => p.status === 'completed').length },
  ];

  const clientRevenue = mockClients.filter((c) => c.totalRevenue > 0).map((c) => ({
    name: c.company, value: c.totalRevenue,
  }));

  return (
    <div className="min-h-full">
      <TopBar title="Analytics" subtitle="Deep insights into your agency's performance" />
      <div className="p-6 space-y-5 max-w-[1400px] mx-auto">

        {/* Revenue trend - full width */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass border border-white/[0.08] rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Revenue Trend</h3>
          <p className="text-[10px] text-slate-500 mb-4">7-month revenue vs expenses</p>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={mockRevenueData}>
              <defs>
                <linearGradient id="anlRevGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="label" tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} />
              <Tooltip contentStyle={{ background: '#0F172A', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, fontSize: 11 }} />
              <Area type="monotone" dataKey="value" name="Revenue" stroke="#3B82F6" strokeWidth={2} fill="url(#anlRevGrad)" />
              <Area type="monotone" dataKey="secondary" name="Expenses" stroke="#8B5CF6" strokeWidth={1.5} strokeDasharray="4 2" fill="none" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bottom row: 3 charts */}
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Team workload */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="glass border border-white/[0.08] rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Team Workload</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={mockWorkloadData} layout="vertical" margin={{ right: 12 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} width={48} />
                <Tooltip contentStyle={{ background: '#0F172A', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, fontSize: 11 }} />
                <Bar dataKey="tasks" name="Tasks" radius={[0, 6, 6, 0]} barSize={12}>
                  {mockWorkloadData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} fillOpacity={0.8} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Project status pie */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="glass border border-white/[0.08] rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Project Status</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={statusDist} cx="50%" cy="45%" outerRadius={70} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                  {statusDist.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#0F172A', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Client revenue */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="glass border border-white/[0.08] rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Revenue by Client</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={clientRevenue}>
                <XAxis dataKey="name" tick={{ fill: '#475569', fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ background: '#0F172A', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, fontSize: 11 }} formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']} />
                <Bar dataKey="value" name="Revenue" radius={[6, 6, 0, 0]} barSize={28}>
                  {clientRevenue.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} fillOpacity={0.75} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
          {/* AI Productivity Index */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="glass border border-white/[0.08] rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white mb-4">AI Productivity Index</h3>
            <div className="flex items-center justify-center">
              <div className="relative w-full aspect-square max-h-[180px]">
                {/* SVG Radar implementation for simplicity or use Recharts Radar */}
                <svg viewBox="0 0 100 100" className="w-full h-full opacity-80">
                  <path d="M50,5 L95,40 L78,95 L22,95 L5,40 Z" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  <path d="M50,20 L80,45 L68,80 L32,80 L20,45 Z" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  <path d="M50,35 L65,50 L58,65 L42,65 L35,50 Z" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  {/* The actual data path */}
                  <path d="M50,15 L90,40 L70,85 L30,90 L10,35 Z" fill="rgba(59,130,246,0.2)" stroke="#3B82F6" strokeWidth="2" />
                  <circle cx="50" cy="15" r="2" fill="#3B82F6" />
                  <circle cx="90" cy="40" r="2" fill="#3B82F6" />
                  <circle cx="70" cy="85" r="2" fill="#3B82F6" />
                  <circle cx="30" cy="90" r="2" fill="#3B82F6" />
                  <circle cx="10" cy="35" r="2" fill="#3B82F6" />
                  {/* Labels */}
                  <text x="50" y="10" fontSize="5" fill="#94A3B8" textAnchor="middle">Speed</text>
                  <text x="96" y="42" fontSize="5" fill="#94A3B8" textAnchor="start">Quality</text>
                  <text x="75" y="98" fontSize="5" fill="#94A3B8" textAnchor="middle">Review</text>
                  <text x="25" y="98" fontSize="5" fill="#94A3B8" textAnchor="middle">Tasks</text>
                  <text x="4" y="42" fontSize="5" fill="#94A3B8" textAnchor="end">Health</text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">88.4</div>
                    <div className="text-[8px] text-emerald-400 font-medium">+4.2 pts</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-between gap-2">
              <div className="flex-1 text-center">
                <div className="text-[10px] text-slate-500">Benchmark</div>
                <div className="text-xs font-semibold text-white">82.0</div>
              </div>
              <div className="w-px h-8 bg-white/[0.06]" />
              <div className="flex-1 text-center">
                <div className="text-[10px] text-slate-500">Efficiency</div>
                <div className="text-xs font-semibold text-white">94%</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
