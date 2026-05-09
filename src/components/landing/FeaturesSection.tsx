import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, Brain, Users2, FileText, Kanban,
  Bell, Globe, ShieldCheck, Zap
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI Insights Engine',
    description: 'Proactive risk detection, opportunity spotting, and team performance signals — all generated automatically.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    wide: true,
  },
  {
    icon: BarChart3,
    title: 'Analytics Command Center',
    description: 'Revenue trends, project health scores, and client ROI in real-time charts.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    wide: false,
  },
  {
    icon: Kanban,
    title: 'Kanban Project Board',
    description: 'Drag-and-drop tasks across stages with priority, assignee, and deadline tracking.',
    color: 'text-teal-400',
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/20',
    wide: false,
  },
  {
    icon: FileText,
    title: 'AI Report Generator',
    description: 'One-click client reports powered by AI. Professional, branded, and always on time.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    wide: false,
  },
  {
    icon: Users2,
    title: 'Team Performance',
    description: 'Workload distribution, velocity tracking, and burnout prevention — all in one view.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    wide: false,
  },
  {
    icon: Globe,
    title: 'Client Portal',
    description: 'Give clients a dedicated view into their project progress without exposing internal ops.',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    wide: false,
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    description: 'Context-aware alerts that fire only when something actually needs your attention.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    wide: false,
  },
  {
    icon: ShieldCheck,
    title: 'Role-Based Access',
    description: 'Owners, admins, members, viewers — granular permissions for every workspace.',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    wide: false,
  },
  {
    icon: Zap,
    title: 'Real-Time Sync',
    description: 'Live updates across your entire workspace — no page refresh required.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    wide: true,
  },
];

const fadeUp: any = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' } }),
};

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-28 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold text-blue-400 tracking-widest uppercase mb-4 px-3 py-1.5 glass border border-blue-500/20 rounded-full">
            Everything you need
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold gradient-text mb-4">
            Built for serious teams
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Every feature in PulseDesk AI is designed around one goal — giving your team total operational clarity.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`glass border ${feature.border} rounded-2xl p-6 cursor-default ${
                feature.wide ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className={`w-11 h-11 rounded-xl ${feature.bg} ${feature.border} border flex items-center justify-center mb-5 ${feature.color}`}>
                <feature.icon size={22} />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
