import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { MetricStat } from '../../types';

interface MetricCardProps extends MetricStat {
  delay?: number;
}

function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label, value, change, trend, prefix = '', suffix = '', delay = 0
}) => {
  const numVal = typeof value === 'number' ? value : 0;
  const animated = useCountUp(numVal);
  const display = typeof value === 'number'
    ? `${prefix}${animated.toLocaleString()}${suffix}`
    : value;

  const trendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-red-400' : 'text-slate-400';
  const TrendIcon = trendIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      className="glass border border-white/[0.08] rounded-2xl p-5 hover:border-white/15 transition-all duration-300 group"
    >
      <p className="text-xs text-slate-500 mb-3 font-medium">{label}</p>
      <p className="text-3xl font-display font-bold text-white mb-2 tracking-tight">{display}</p>
      <div className={`flex items-center gap-1.5 text-xs font-medium ${trendColor}`}>
        <TrendIcon size={13} />
        <span>{Math.abs(change)}% {trend === 'up' ? 'increase' : trend === 'down' ? 'decrease' : 'no change'}</span>
      </div>
    </motion.div>
  );
};
