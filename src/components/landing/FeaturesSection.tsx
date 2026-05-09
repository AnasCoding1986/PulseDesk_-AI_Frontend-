import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, Brain, Users2, FileText, Kanban,
  Bell, Globe, ShieldCheck, Zap
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI Insights Engine',
    description: 'Proactive risk detection, opportunity spotting, and team performance signals — all generated automatically before issues happen.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    className: 'lg:col-span-2 lg:row-span-2',
    graphic: (
      <div className="absolute right-0 bottom-0 w-2/3 h-2/3 opacity-40 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tl from-purple-500/20 to-transparent blur-3xl rounded-full" />
        <div className="absolute bottom-4 right-4 space-y-2 w-full max-w-[200px] border border-white/10 bg-[#0A101E]/80 backdrop-blur-md rounded-xl p-3 shadow-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <span className="text-[10px] text-slate-300 font-medium">Risk Detected</span>
          </div>
          <div className="h-1.5 w-full bg-white/10 rounded-full" />
          <div className="h-1.5 w-3/4 bg-white/10 rounded-full" />
        </div>
      </div>
    )
  },
  {
    icon: BarChart3,
    title: 'Analytics Command Center',
    description: 'Revenue trends, project health scores, and client ROI in real-time charts.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    className: 'lg:col-span-1 lg:row-span-1',
    graphic: null
  },
  {
    icon: Kanban,
    title: 'Kanban Project Board',
    description: 'Drag-and-drop tasks across stages with priority, assignee, and deadline tracking.',
    color: 'text-teal-400',
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/30',
    className: 'lg:col-span-1 lg:row-span-1',
    graphic: null
  },
  {
    icon: FileText,
    title: 'AI Report Generator',
    description: 'One-click client reports powered by AI. Professional, branded, and always on time.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    className: 'lg:col-span-1 lg:row-span-1',
    graphic: null
  },
  {
    icon: Users2,
    title: 'Team Performance',
    description: 'Workload distribution, velocity tracking, and burnout prevention — all in one view.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    className: 'lg:col-span-1 lg:row-span-1',
    graphic: null
  },
  {
    icon: Globe,
    title: 'Client Portal',
    description: 'Give clients a dedicated view into their project progress without exposing internal ops.',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    className: 'lg:col-span-1 lg:row-span-1',
    graphic: null
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    description: 'Context-aware alerts that fire only when something actually needs your attention.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    className: 'lg:col-span-2 lg:row-span-1',
    graphic: (
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:block">
        <div className="glass-premium border-white/10 px-4 py-2 rounded-xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
            <Bell size={14} className="text-cyan-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400">Just now</span>
            <span className="text-xs font-medium text-white">Client approved designs</span>
          </div>
        </div>
      </div>
    )
  },
  {
    icon: ShieldCheck,
    title: 'Role-Based Access',
    description: 'Owners, admins, members, viewers — granular permissions for every workspace.',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/30',
    className: 'lg:col-span-2 lg:row-span-1',
    graphic: null
  },
  {
    icon: Zap,
    title: 'Real-Time Sync',
    description: 'Live updates across your entire workspace — no page refresh required.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    className: 'lg:col-span-1 lg:row-span-1',
    graphic: null
  },
];

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }),
};

const SpotlightCard: React.FC<{ feature: typeof features[0]; index: number }> = ({ feature, index }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeUp}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
      className={`relative glass-premium border border-white/[0.08] rounded-3xl p-8 sm:p-10 cursor-default overflow-hidden spotlight-wrapper ${feature.className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />
      
      <div className="relative z-10">
        <div className={`w-14 h-14 rounded-2xl ${feature.bg} ${feature.border} border flex items-center justify-center mb-6 shadow-lg ${feature.color}`}>
          <feature.icon size={28} />
        </div>
        <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{feature.title}</h3>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light max-w-sm">{feature.description}</p>
      </div>

      {feature.graphic && feature.graphic}
    </motion.div>
  );
};

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-32 px-4 relative">
      <div className="container-strict relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="inline-block text-xs font-semibold text-blue-400 tracking-widest uppercase mb-6 px-4 py-2 glass-premium border border-blue-500/20 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.15)]">
            Everything you need
          </span>
          <h2 className="text-5xl sm:text-6xl font-display font-extrabold gradient-text mb-6 tracking-tight">
            Built for serious teams
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-xl font-light">
            Every feature in PulseDesk AI is designed around one goal — giving your team total operational clarity.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <SpotlightCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
