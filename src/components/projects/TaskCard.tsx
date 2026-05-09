import React from 'react';
import { motion } from 'framer-motion';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Calendar, GripVertical, AlertCircle } from 'lucide-react';
import type { Task, User, Project } from '../../types';
import { PriorityBadge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';

// ─── Priority color ring ───────────────────────────────────────
const priorityRing: Record<string, string> = {
  critical: 'border-l-red-500',
  high:     'border-l-amber-500',
  medium:   'border-l-blue-500',
  low:      'border-l-slate-600',
};

// ─── Label pill colors (cycle) ────────────────────────────────
const labelColors = [
  'bg-blue-500/15 text-blue-400 border-blue-500/20',
  'bg-purple-500/15 text-purple-400 border-purple-500/20',
  'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  'bg-amber-500/15 text-amber-400 border-amber-500/20',
  'bg-teal-500/15 text-teal-400 border-teal-500/20',
  'bg-rose-500/15 text-rose-400 border-rose-500/20',
];

function getLabelColor(label: string) {
  let hash = 0;
  for (let i = 0; i < label.length; i++) hash = label.charCodeAt(i) + ((hash << 5) - hash);
  return labelColors[Math.abs(hash) % labelColors.length];
}

function isOverdue(dateStr?: string) {
  if (!dateStr) return false;
  return new Date(dateStr) < new Date();
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// ─── Props ────────────────────────────────────────────────────
interface TaskCardProps {
  task: Task;
  teamMap: Record<string, User>;
  projectMap: Record<string, Project>;
  clientMap: Record<string, string>; // clientId → company name
  onOpen: (task: Task) => void;
  isDragging?: boolean;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task, teamMap, projectMap, clientMap, onOpen, isDragging = false,
}) => {
  const {
    attributes, listeners, setNodeRef, transform, transition, isDragging: sortableDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: sortableDragging ? 0.4 : 1,
  };

  const assignee = task.assignee ? teamMap[task.assignee] : undefined;
  const project  = projectMap[task.project];
  const clientName = project?.client ? clientMap[project.client] : undefined;
  const overdue = task.status !== 'done' && isOverdue(task.dueDate);

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <motion.div
        layout
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{ y: -2, transition: { duration: 0.15 } }}
        onClick={() => onOpen(task)}
        className={`
          group relative bg-[#0C1525] border border-l-[3px] rounded-xl p-4 cursor-pointer
          transition-colors duration-200
          hover:border-white/20 hover:bg-[#0F1A2E]
          ${priorityRing[task.priority]}
          ${isDragging ? 'shadow-[0_20px_60px_rgba(0,0,0,0.5)] ring-1 ring-blue-500/40 rotate-1' : 'border-r-white/[0.08] border-t-white/[0.08] border-b-white/[0.08]'}
        `}
      >
        {/* Drag handle */}
        <div
          {...listeners}
          onClick={(e) => e.stopPropagation()}
          className="absolute right-2 top-3.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing text-slate-600 hover:text-slate-400 p-0.5"
        >
          <GripVertical size={14} />
        </div>

        {/* Priority badge + overdue flag */}
        <div className="flex items-center justify-between mb-3">
          <PriorityBadge priority={task.priority} />
          {overdue && (
            <span className="flex items-center gap-1 text-[10px] text-red-400 font-medium">
              <AlertCircle size={10} />
              Overdue
            </span>
          )}
        </div>

        {/* Title */}
        <h4 className="text-sm font-medium text-white leading-snug mb-2 pr-4 group-hover:text-blue-400 transition-colors line-clamp-2">
          {task.title}
        </h4>

        {/* Client name */}
        {clientName && (
          <p className="text-[10px] text-slate-500 mb-2.5 truncate">↳ {clientName}</p>
        )}

        {/* Labels */}
        {task.labels.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {task.labels.slice(0, 3).map((label) => (
              <span
                key={label}
                className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-md border uppercase tracking-wide ${getLabelColor(label)}`}
              >
                {label}
              </span>
            ))}
            {task.labels.length > 3 && (
              <span className="text-[9px] text-slate-600 px-1 py-0.5">+{task.labels.length - 3}</span>
            )}
          </div>
        )}

        {/* Footer: due date + assignee */}
        <div className="flex items-center justify-between mt-1 pt-2.5 border-t border-white/[0.05]">
          {task.dueDate ? (
            <span className={`flex items-center gap-1 text-[10px] font-medium ${overdue ? 'text-red-400' : 'text-slate-500'}`}>
              <Calendar size={10} />
              {formatDate(task.dueDate)}
            </span>
          ) : (
            <span className="text-[10px] text-slate-700">No deadline</span>
          )}

          {assignee && (
            <Avatar name={assignee.name} src={assignee.avatar} size="xs" />
          )}
        </div>
      </motion.div>
    </div>
  );
};

// ─── Ghost overlay (shown while dragging) ────────────────────
export const TaskCardOverlay: React.FC<{ task: Task; teamMap: Record<string, User> }> = ({ task, teamMap }) => {
  const assignee = task.assignee ? teamMap[task.assignee] : undefined;
  return (
    <div
      className={`
        bg-[#0C1525] border border-l-[3px] rounded-xl p-4 cursor-grabbing
        shadow-[0_24px_64px_rgba(0,0,0,0.6)] ring-1 ring-blue-500/50 rotate-1
        ${priorityRing[task.priority]}
        border-r-blue-500/20 border-t-blue-500/20 border-b-blue-500/20
        w-[260px]
      `}
    >
      <div className="flex items-center justify-between mb-2">
        <PriorityBadge priority={task.priority} />
      </div>
      <h4 className="text-sm font-medium text-white leading-snug mb-2 line-clamp-2">{task.title}</h4>
      {task.labels.slice(0, 2).map((label) => (
        <span key={label} className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-md border uppercase tracking-wide mr-1 ${getLabelColor(label)}`}>
          {label}
        </span>
      ))}
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/[0.05]">
        {task.dueDate && (
          <span className="flex items-center gap-1 text-[10px] text-slate-500">
            <Calendar size={10} />{formatDate(task.dueDate)}
          </span>
        )}
        {assignee && <Avatar name={assignee.name} src={assignee.avatar} size="xs" />}
      </div>
    </div>
  );
};
