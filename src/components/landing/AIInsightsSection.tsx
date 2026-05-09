import React from 'react';
import { motion } from 'framer-motion';
import { Brain, AlertTriangle, TrendingUp, Lightbulb, Star } from 'lucide-react';

const insights = [
  {
    type: 'risk',
    icon: AlertTriangle,
    iconColor: 'text-red-400',
    iconBg: 'bg-red-500/10 border-red-500/20',
    title: 'API Sprint deadline at risk',
    body: 'At current velocity, the May 15 deadline may slip by 3–5 days. 2 critical blockers remain unresolved.',
    tag: 'High Risk',
    tagColor: 'bg-red-500/15 text-red-400 border-red-500/25',
    relatedProject: 'API Integration Sprint',
  },
  {
    type: 'opportunity',
    icon: Star,
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10 border-emerald-500/20',
    title: 'Upsell opportunity — NovaTech',
    body: 'NovaTech has consumed 85% of contracted deliverables ahead of schedule. Strong signal for a Phase 2 conversation.',
    tag: 'Opportunity',
    tagColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
    relatedProject: 'NovaTech Platform Redesign',
  },
  {
    type: 'performance',
    icon: TrendingUp,
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10 border-blue-500/20',
    title: 'James Nguyen at peak output',
    body: 'James closed 12 tasks this week — 40% above team average. Consider assigning him lead on ShipFast MVP.',
    tag: 'Performance',
    tagColor: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
    relatedProject: 'Team Performance',
  },
  {
    type: 'suggestion',
    icon: Lightbulb,
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10 border-amber-500/20',
    title: 'Send Bloom a progress update',
    body: "The last client update was 10 days ago. A proactive status email could strengthen Bloom's confidence in delivery.",
    tag: 'Suggestion',
    tagColor: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
    relatedProject: 'Bloom Marketing Microsite',
  },
];

export const AIInsightsSection: React.FC = () => {
  return (
    <section className="py-28 px-4 relative">
      <div className="orb w-[500px] h-[500px] bg-purple-600/8 top-1/2 right-0 -translate-y-1/2 -translate-x-1/2" />
      <div className="container-strict">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Insight cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent blur-3xl -z-10 rounded-full" />
            
            {insights.map((insight, i) => (
              <motion.div
                key={insight.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="glass-premium border border-white/[0.08] rounded-3xl p-6 hover:border-white/20 transition-all duration-300 cursor-default group"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl ${insight.iconBg} border flex items-center justify-center flex-shrink-0 ${insight.iconColor} group-hover:scale-110 transition-transform`}>
                    <insight.icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <h4 className="text-sm font-semibold text-white truncate">{insight.title}</h4>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md border flex-shrink-0 ${insight.tagColor}`}>
                        {insight.tag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed mb-2">{insight.body}</p>
                    <span className="text-[10px] text-slate-600">↳ {insight.relatedProject}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right: text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-16 h-16 rounded-[20px] bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
              <Brain size={32} className="text-purple-400" />
            </div>
            <span className="inline-block text-xs font-semibold text-purple-400 tracking-widest uppercase mb-6 px-4 py-2 glass-premium border border-purple-500/20 rounded-full">
              AI Insights Engine
            </span>
            <h2 className="text-5xl sm:text-6xl font-display font-extrabold gradient-text mb-6 leading-[1.1] tracking-tight">
              Your AI co-pilot for operations
            </h2>
            <p className="text-slate-400 text-xl font-light leading-relaxed mb-10 max-w-lg">
              PulseDesk AI continuously monitors your workspace and surfaces what matters — risks before they become problems, opportunities before they slip away.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: '3.4×', label: 'faster risk detection', color: 'from-blue-500 to-cyan-400' },
                { stat: '28%', label: 'fewer missed deadlines', color: 'from-purple-500 to-pink-500' },
                { stat: '92%', label: 'insight accuracy', color: 'from-emerald-500 to-teal-400' },
                { stat: '40+', label: 'signals monitored', color: 'from-blue-500 to-indigo-500' },
              ].map((item) => (
                <div key={item.label} className="glass-premium border border-white/[0.08] rounded-3xl p-6 group hover:border-white/20 transition-all duration-500">
                  <div className={`text-3xl font-display font-extrabold bg-gradient-to-br ${item.color} bg-clip-text text-transparent mb-2`}>{item.stat}</div>
                  <div className="text-sm text-slate-400 font-medium tracking-tight">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
