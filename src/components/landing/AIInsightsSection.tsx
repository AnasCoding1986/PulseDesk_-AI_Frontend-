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
            transition={{ duration: 0.7 }}
            className="space-y-3"
          >
            {insights.map((insight, i) => (
              <motion.div
                key={insight.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass border border-white/[0.08] rounded-2xl p-5 hover:border-white/20 transition-all duration-300 cursor-default group"
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
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6">
              <Brain size={28} className="text-purple-400" />
            </div>
            <span className="inline-block text-xs font-semibold text-purple-400 tracking-widest uppercase mb-4">
              AI Insights Engine
            </span>
            <h2 className="text-4xl sm:text-5xl font-display font-bold gradient-text mb-6 leading-tight">
              Your AI co-pilot for operations
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              PulseDesk AI continuously monitors your workspace and surfaces what matters — risks before they become problems, opportunities before they slip away.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: '3.4×', label: 'faster risk detection' },
                { stat: '28%', label: 'fewer missed deadlines' },
                { stat: '92%', label: 'insight accuracy' },
                { stat: '40+', label: 'signals monitored' },
              ].map((item) => (
                <div key={item.label} className="glass border border-white/[0.06] rounded-xl p-4">
                  <div className="text-2xl font-bold gradient-text-blue mb-1">{item.stat}</div>
                  <div className="text-xs text-slate-400">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
