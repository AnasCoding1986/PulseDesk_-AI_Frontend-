import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

const revenueData = [
  { month: 'Nov', revenue: 14200, expenses: 9800 },
  { month: 'Dec', revenue: 18500, expenses: 12400 },
  { month: 'Jan', revenue: 22100, expenses: 15000 },
  { month: 'Feb', revenue: 19800, expenses: 13200 },
  { month: 'Mar', revenue: 28600, expenses: 19500 },
  { month: 'Apr', revenue: 32400, expenses: 22800 },
  { month: 'May', revenue: 37200, expenses: 26100 },
];

const healthData = [
  { name: 'NovaTech', health: 82, color: '#3B82F6' },
  { name: 'Bloom', health: 94, color: '#22C55E' },
  { name: 'API Sprint', health: 61, color: '#F59E0B' },
  { name: 'ShipFast', health: 70, color: '#8B5CF6' },
];

const CustomTooltip: React.FC<{ active?: boolean; payload?: Array<{value: number}>; label?: string }> = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="glass border border-white/10 rounded-xl px-4 py-3 text-sm">
        <p className="text-slate-400 mb-1">{label}</p>
        <p className="text-blue-400 font-semibold">${(payload[0].value / 1000).toFixed(1)}K revenue</p>
        {payload[1] && <p className="text-purple-400">${(payload[1].value / 1000).toFixed(1)}K expenses</p>}
      </div>
    );
  }
  return null;
};

export const AnalyticsPreviewSection: React.FC = () => {
  return (
    <section id="analytics" className="py-28 px-4 relative overflow-hidden">
      <div className="orb w-[400px] h-[400px] bg-blue-600/8 top-1/2 -left-40 -translate-y-1/2" />
      <div className="container-strict">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-xs font-semibold text-blue-400 tracking-widest uppercase mb-4 px-3 py-1.5 glass border border-blue-500/20 rounded-full">
              Analytics
            </span>
            <h2 className="text-4xl sm:text-5xl font-display font-bold gradient-text mb-6 leading-tight">
              Every metric that matters — at a glance
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Revenue trends, project health scores, team velocity, and client ROI — all visualized in real-time dashboards that make decisions obvious.
            </p>
            <div className="space-y-4">
              {[
                { label: 'Revenue up 14.2% month-over-month', color: 'text-emerald-400' },
                { label: 'Automatic project health scoring 0-100', color: 'text-blue-400' },
                { label: 'Team workload balance recommendations', color: 'text-purple-400' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full bg-current ${item.color}`} />
                  <span className="text-slate-300 text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: charts */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-4"
          >
            {/* Revenue chart card */}
            <div className="glass border border-white/[0.08] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Total Revenue</p>
                  <p className="text-2xl font-bold text-white">$37,200</p>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 text-sm font-semibold">
                  <TrendingUp size={14} />
                  <span>+14.2%</span>
                  <ArrowUpRight size={14} />
                </div>
              </div>
              <ResponsiveContainer width="100%" height={130}>
                <AreaChart data={revenueData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} fill="url(#revGrad)" />
                  <Area type="monotone" dataKey="expenses" stroke="#8B5CF6" strokeWidth={1.5} strokeDasharray="4 2" fill="url(#expGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Project health card */}
            <div className="glass border border-white/[0.08] rounded-2xl p-5">
              <p className="text-xs text-slate-500 mb-4">Project Health Scores</p>
              <ResponsiveContainer width="100%" height={80}>
                <BarChart data={healthData} layout="vertical" margin={{ top: 0, right: 8, bottom: 0, left: 0 }}>
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis type="category" dataKey="name" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} width={65} />
                  <Bar dataKey="health" radius={[0, 6, 6, 0]} barSize={10}>
                    {healthData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} fillOpacity={0.7} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
