import React from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { TopBar } from '../../components/layout/TopBar';
import { MetricCard } from '../../components/dashboard/MetricCard';
import { AIInsightCard } from '../../components/dashboard/AIInsightCard';
import { ActivityFeed } from '../../components/dashboard/ActivityFeed';
import { ClientStatusTable } from '../../components/dashboard/ClientStatusTable';
import { StatusBadge } from '../../components/ui/Badge';
import {
  mockMetrics, mockInsights, mockActivity,
  mockClients, mockProjects, mockRevenueData,
  mockWorkloadData
} from '../../data/mockData';
import { useAuthStore } from '../../store/authStore';

const WORKLOAD_COLORS = ['#3B82F6', '#8B5CF6', '#22C55E', '#F59E0B', '#EF4444'];

const OverviewPage: React.FC = () => {
  const { user } = useAuthStore();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="min-h-full">
      <TopBar
        title="Dashboard Overview"
        subtitle={`${greeting}, ${user?.name?.split(' ')[0]} 👋`}
      />

      <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
        {/* Metric cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {mockMetrics.map((metric, i) => (
            <MetricCard key={metric.label} {...metric} delay={i * 0.08} />
          ))}
        </div>

        {/* Main grid: charts + AI insights */}
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Revenue chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-2 glass border border-white/[0.08] rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-semibold text-white">Revenue Overview</h3>
                <p className="text-[10px] text-slate-500 mt-0.5">Revenue vs Expenses · Last 7 months</p>
              </div>
              <div className="flex items-center gap-4 text-[10px]">
                <span className="flex items-center gap-1.5 text-slate-400"><span className="w-2 h-2 rounded-full bg-blue-400" />Revenue</span>
                <span className="flex items-center gap-1.5 text-slate-400"><span className="w-2 h-2 rounded-full bg-purple-400" />Expenses</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={mockRevenueData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="revGradDash" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expGradDash" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="label" tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ background: '#0F172A', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, fontSize: 11 }}
                  labelStyle={{ color: '#94A3B8' }}
                  itemStyle={{ color: '#F8FAFC' }}
                />
                <Area type="monotone" dataKey="value" name="Revenue" stroke="#3B82F6" strokeWidth={2} fill="url(#revGradDash)" />
                <Area type="monotone" dataKey="secondary" name="Expenses" stroke="#8B5CF6" strokeWidth={1.5} strokeDasharray="4 2" fill="url(#expGradDash)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* AI Insights */}
          <div className="lg:col-span-1">
            <AIInsightCard insights={mockInsights} />
          </div>
        </div>

        {/* Second row: workload + projects + activity */}
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Team Workload */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="glass border border-white/[0.08] rounded-2xl p-5"
          >
            <h3 className="text-sm font-semibold text-white mb-4">Team Workload</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={mockWorkloadData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                <XAxis dataKey="name" tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ background: '#0F172A', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, fontSize: 11 }}
                  labelStyle={{ color: '#94A3B8' }}
                  itemStyle={{ color: '#F8FAFC' }}
                />
                <Bar dataKey="tasks" name="Tasks" radius={[6, 6, 0, 0]} barSize={22}>
                  {mockWorkloadData.map((_, i) => (
                    <Cell key={i} fill={WORKLOAD_COLORS[i % WORKLOAD_COLORS.length]} fillOpacity={0.75} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Active Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="glass border border-white/[0.08] rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">Active Projects</h3>
              <button className="text-xs text-blue-400 hover:text-blue-300">View all →</button>
            </div>
            <div className="space-y-3">
              {mockProjects.filter((p) => p.status === 'active' || p.status === 'review').map((p) => (
                <div key={p.id} className="group">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-xs font-medium text-white truncate flex-1 mr-2">{p.name}</p>
                    <StatusBadge status={p.status} />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${p.progress}%` }}
                        transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
                        className={`h-full rounded-full ${p.health > 80 ? 'bg-emerald-500' : p.health > 60 ? 'bg-blue-500' : 'bg-amber-500'}`}
                      />
                    </div>
                    <span className="text-[10px] text-slate-500 w-7 text-right">{p.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Activity Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <ActivityFeed activities={mockActivity} />
          </motion.div>
        </div>

        {/* Client table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
        >
          <ClientStatusTable clients={mockClients} />
        </motion.div>
      </div>
    </div>
  );
};

export default OverviewPage;
