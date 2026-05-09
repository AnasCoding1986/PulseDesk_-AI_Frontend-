import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, Users, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';

const floatingStats = [
  { icon: TrendingUp, label: 'Revenue this month', value: '$37,200', change: '+14.2%', color: 'text-emerald-400' },
  { icon: Users, label: 'Team Velocity', value: '94%', change: '↑ 8pts', color: 'text-blue-400' },
  { icon: CheckCircle, label: 'Tasks Shipped', value: '47', change: 'This week', color: 'text-purple-400' },
];

const DashboardPreview: React.FC = () => (
  <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(59,130,246,0.12),0_40px_120px_rgba(0,0,0,0.6)]">
    {/* Header bar */}
    <div className="absolute top-0 left-0 right-0 h-10 glass border-b border-white/[0.06] flex items-center px-4 gap-2 z-10">
      <div className="flex gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
      </div>
      <div className="flex-1 text-center text-[10px] text-slate-500">app.pulsedesk.io/dashboard</div>
    </div>

    {/* Sidebar */}
    <div className="absolute left-0 top-10 bottom-0 w-[15%] bg-[#0A101E] border-r border-white/[0.06] p-2 flex flex-col gap-1.5">
      {['Overview','Projects','Clients','Analytics','Reports','Team'].map((item, i) => (
        <div key={item} className={`h-5 rounded-md flex items-center px-2 ${i === 0 ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-white/5'}`}>
          <div className={`w-full h-1.5 rounded-full ${i === 0 ? 'bg-blue-400/60' : 'bg-white/10'}`} />
        </div>
      ))}
    </div>

    {/* Main content */}
    <div className="absolute left-[15%] top-10 right-0 bottom-0 bg-[#070B14] p-4 overflow-hidden">
      {/* Metric cards */}
      <div className="grid grid-cols-4 gap-2 mb-3">
        {[
          { color: 'blue', label: 'Revenue', val: '$37.2K' },
          { color: 'purple', label: 'Projects', val: '5 Active' },
          { color: 'emerald', label: 'Tasks', val: '47 Done' },
          { color: 'amber', label: 'Clients', val: '4 Active' },
        ].map((m) => (
          <div key={m.label} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-2.5">
            <div className={`text-[8px] text-${m.color}-400 mb-1`}>{m.label}</div>
            <div className="text-xs font-bold text-white">{m.val}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-5 gap-2 mb-3">
        {/* Area chart */}
        <div className="col-span-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-2.5 h-20">
          <div className="text-[8px] text-slate-500 mb-1">Revenue Trend</div>
          <svg viewBox="0 0 100 40" className="w-full h-full">
            <defs>
              <linearGradient id="gr" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,35 L14,30 L28,28 L42,22 L56,24 L70,15 L84,10 L100,6 L100,40 L0,40Z" fill="url(#gr)" />
            <path d="M0,35 L14,30 L28,28 L42,22 L56,24 L70,15 L84,10 L100,6" fill="none" stroke="#3B82F6" strokeWidth="1.5" />
          </svg>
        </div>
        {/* Bar chart */}
        <div className="col-span-2 rounded-xl border border-white/[0.06] bg-white/[0.03] p-2.5 h-20">
          <div className="text-[8px] text-slate-500 mb-1">Team Workload</div>
          <div className="flex items-end gap-1 h-10">
            {[70, 90, 55, 80, 40].map((h, i) => (
              <div key={i} className={`flex-1 rounded-sm ${i === 2 ? 'bg-purple-500/60' : 'bg-blue-500/40'}`} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>

      {/* Activity + AI */}
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-2.5">
          <div className="text-[8px] text-slate-500 mb-1.5">AI Insights</div>
          <div className="space-y-1">
            {['API Sprint deadline at risk — 3 blockers', 'Upsell opportunity with NovaTech', 'James at peak output this week'].map((t, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <div className={`w-1 h-1 rounded-full mt-1 flex-shrink-0 ${i===0?'bg-red-400':i===1?'bg-emerald-400':'bg-blue-400'}`} />
                <div className="text-[7px] text-slate-400 leading-tight">{t}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-2.5">
          <div className="text-[8px] text-slate-500 mb-1.5">Recent Activity</div>
          <div className="space-y-1">
            {['Sara completed design audit','New client: Finlo App added','Report sent to NovaTech'].map((t, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-white/10 flex-shrink-0" />
                <div className="text-[7px] text-slate-400">{t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Gradient overlay at bottom */}
    <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#070B14] to-transparent pointer-events-none" />
  </div>
);

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
      {/* Background orbs */}
      <div className="orb w-[600px] h-[600px] bg-blue-600/10 -top-40 -left-40" />
      <div className="orb w-[500px] h-[500px] bg-purple-600/10 -top-20 -right-40" />
      <div className="dot-grid absolute inset-0 opacity-40" />

      <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
        {/* Announcement badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="inline-flex items-center gap-2 glass border border-blue-500/30 rounded-full px-4 py-2 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          <Sparkles size={13} className="text-blue-400" />
          <span className="text-xs text-slate-300 font-medium">AI-powered operations for modern teams</span>
          <span className="text-xs text-blue-400 font-semibold">New →</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight leading-[1.08] mb-6"
        >
          <span className="gradient-text">One command center</span>
          <br />
          <span className="gradient-text-blue">for your entire agency</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          PulseDesk AI unifies project health, team performance, client management, and AI insights — so your team ships faster with fewer tools.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Button
            size="lg"
            onClick={() => navigate('/register')}
            iconRight={<ArrowRight size={18} />}
            className="text-base px-8 py-4"
          >
            Start for free
          </Button>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium group"
          >
            <span className="w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-all">
              ▶
            </span>
            View live demo
          </button>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.9, ease: 'easeOut' }}
          className="animate-float relative"
        >
          <DashboardPreview />

          {/* Floating stat chips */}
          {floatingStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.15, duration: 0.6 }}
              className={`absolute glass border border-white/10 rounded-2xl px-4 py-3 hidden lg:flex items-center gap-3 ${
                i === 0 ? '-left-16 top-16' :
                i === 1 ? '-right-16 top-32' :
                '-left-12 bottom-24'
              }`}
            >
              <div className={`w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                <stat.icon size={16} />
              </div>
              <div>
                <div className="text-[10px] text-slate-500">{stat.label}</div>
                <div className="text-sm font-bold text-white">{stat.value}</div>
                <div className={`text-[10px] font-medium ${stat.color}`}>{stat.change}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
