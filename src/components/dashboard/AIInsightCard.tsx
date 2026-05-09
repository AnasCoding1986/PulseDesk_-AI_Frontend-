import React from 'react';
import { motion } from 'framer-motion';
import { Brain, AlertTriangle, TrendingUp, Lightbulb, Star, ChevronRight } from 'lucide-react';
import type { Insight } from '../../types';

const iconMap = {
  risk: { icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
  opportunity: { icon: Star, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  performance: { icon: TrendingUp, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
  suggestion: { icon: Lightbulb, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
};

interface AIInsightCardProps {
  insights: Insight[];
}

export const AIInsightCard: React.FC<AIInsightCardProps> = ({ insights }) => {
  const unread = insights.filter((i) => !i.isRead);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="glass border border-purple-500/20 rounded-2xl p-5 h-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center">
            <Brain size={16} className="text-purple-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">AI Insights</h3>
            <p className="text-[10px] text-slate-500">{unread.length} new signals</p>
          </div>
        </div>
        <span className="text-[10px] glass border border-purple-500/25 text-purple-400 px-2 py-1 rounded-lg font-medium">
          Live
        </span>
      </div>

      {/* Insight list */}
      <div className="space-y-2.5">
        {insights.slice(0, 4).map((insight, i) => {
          const cfg = iconMap[insight.type];
          const Icon = cfg.icon;
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
              className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-white/[0.04] ${
                !insight.isRead ? 'border border-white/[0.06]' : 'opacity-60'
              }`}
            >
              <div className={`w-7 h-7 rounded-lg ${cfg.bg} border flex items-center justify-center flex-shrink-0 ${cfg.color}`}>
                <Icon size={13} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white leading-snug truncate">{insight.title}</p>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed line-clamp-2">{insight.body}</p>
              </div>
              {!insight.isRead && (
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0 mt-1" />
              )}
            </motion.div>
          );
        })}
      </div>

      <button className="w-full mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-500 hover:text-blue-400 transition-colors py-2">
        View all insights <ChevronRight size={12} />
      </button>
    </motion.div>
  );
};
