import React from 'react';

type BadgeColor = 'blue' | 'purple' | 'green' | 'yellow' | 'red' | 'gray' | 'teal';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  children: React.ReactNode;
  color?: BadgeColor;
  size?: BadgeSize;
  dot?: boolean;
  className?: string;
}

const colorMap: Record<BadgeColor, string> = {
  blue:   'bg-blue-500/15 text-blue-400 border-blue-500/25',
  purple: 'bg-purple-500/15 text-purple-400 border-purple-500/25',
  green:  'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  yellow: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
  red:    'bg-red-500/15 text-red-400 border-red-500/25',
  gray:   'bg-white/5 text-slate-400 border-white/10',
  teal:   'bg-teal-500/15 text-teal-400 border-teal-500/25',
};

const dotColorMap: Record<BadgeColor, string> = {
  blue:   'bg-blue-400',
  purple: 'bg-purple-400',
  green:  'bg-emerald-400',
  yellow: 'bg-amber-400',
  red:    'bg-red-400',
  gray:   'bg-slate-400',
  teal:   'bg-teal-400',
};

const sizeMap: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  color = 'gray',
  size = 'sm',
  dot = false,
  className = '',
}) => {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-lg font-medium border ${colorMap[color]} ${sizeMap[size]} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColorMap[color]}`} />}
      {children}
    </span>
  );
};

// Convenience status badge
export const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const map: Record<string, { color: BadgeColor; label: string }> = {
    active:      { color: 'green',  label: 'Active' },
    planning:    { color: 'blue',   label: 'Planning' },
    review:      { color: 'yellow', label: 'In Review' },
    completed:   { color: 'teal',   label: 'Completed' },
    'on-hold':   { color: 'gray',   label: 'On Hold' },
    lead:        { color: 'purple', label: 'Lead' },
    inactive:    { color: 'gray',   label: 'Inactive' },
    churned:     { color: 'red',    label: 'Churned' },
    draft:       { color: 'gray',   label: 'Draft' },
    sent:        { color: 'green',  label: 'Sent' },
    archived:    { color: 'gray',   label: 'Archived' },
    'in-progress': { color: 'blue', label: 'In Progress' },
    todo:        { color: 'gray',   label: 'Todo' },
    done:        { color: 'green',  label: 'Done' },
  };
  const config = map[status] ?? { color: 'gray' as BadgeColor, label: status };
  return <Badge color={config.color} dot>{config.label}</Badge>;
};

// Priority badge
export const PriorityBadge: React.FC<{ priority: string }> = ({ priority }) => {
  const map: Record<string, BadgeColor> = {
    low: 'gray', medium: 'yellow', high: 'red', critical: 'purple',
  };
  return <Badge color={map[priority] ?? 'gray'}>{priority}</Badge>;
};
