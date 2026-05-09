import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Calendar, Tag, User as UserIcon, Folder,
  Flag, Clock, CheckCircle2, AlertCircle, Circle, Eye,
} from 'lucide-react';
import type { Task, User, Project } from '../../types';
import { PriorityBadge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { COLUMNS, type ColumnId } from './KanbanColumn';

// ─── Label pill colors ────────────────────────────────────────
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

const statusIcons: Record<string, React.ReactNode> = {
  todo:          <Circle size={13} className="text-slate-500" />,
  'in-progress': <Clock size={13} className="text-blue-400" />,
  review:        <Eye size={13} className="text-amber-400" />,
  done:          <CheckCircle2 size={13} className="text-emerald-400" />,
};

interface TaskDetailModalProps {
  task: Task | null;
  teamMap: Record<string, User>;
  projectMap: Record<string, Project>;
  clientMap: Record<string, string>;
  onClose: () => void;
  onStatusChange: (taskId: string, newStatus: ColumnId) => void;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  task, teamMap, projectMap, clientMap, onClose, onStatusChange,
}) => {
  if (!task) return null;

  const assignee = task.assignee ? teamMap[task.assignee] : undefined;
  const project  = projectMap[task.project];
  const clientName = project?.client ? clientMap[project.client] : 'Internal';
  const colMeta = COLUMNS[task.status as ColumnId];
  const isOverdue = task.dueDate && task.status !== 'done' && new Date(task.dueDate) < new Date();

  const statusOrder: ColumnId[] = ['todo', 'in-progress', 'review', 'done'];

  return (
    <AnimatePresence>
      {task && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 bg-[#080D1A] border-l border-white/[0.08] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#080D1A]/95 backdrop-blur-xl border-b border-white/[0.06] px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span>{statusIcons[task.status]}</span>
                <span className={`text-xs font-semibold ${colMeta?.accent ?? 'text-slate-400'}`}>
                  {colMeta?.label ?? task.status}
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-xl glass border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all"
              >
                <X size={14} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Title & Priority */}
              <div>
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-1">
                    <h2 className="text-lg font-display font-bold text-white leading-snug">{task.title}</h2>
                    {task.description && (
                      <p className="text-sm text-slate-400 mt-2 leading-relaxed">{task.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <PriorityBadge priority={task.priority} />
                  {isOverdue && (
                    <span className="flex items-center gap-1 text-[10px] text-red-400 font-medium bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-lg">
                      <AlertCircle size={10} /> Overdue
                    </span>
                  )}
                </div>
              </div>

              {/* Change status */}
              <div>
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Move to column</p>
                <div className="flex gap-2 flex-wrap">
                  {statusOrder.map((status) => {
                    const m = COLUMNS[status];
                    const isCurrent = task.status === status;
                    return (
                      <button
                        key={status}
                        onClick={() => !isCurrent && onStatusChange(task.id, status)}
                        className={`
                          flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl font-medium transition-all border
                          ${isCurrent
                            ? `${m.headerBg} ${m.accent} border-current opacity-100 cursor-default`
                            : 'bg-white/[0.03] text-slate-400 border-white/[0.08] hover:border-white/20 hover:text-white cursor-pointer'
                          }
                        `}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${m.dotColor}`} />
                        {m.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Meta details */}
              <div className="space-y-3">
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Details</p>
                <div className="space-y-2.5">
                  {/* Assignee */}
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg glass border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                      <UserIcon size={12} className="text-slate-500" />
                    </div>
                    <span className="text-[10px] text-slate-500 w-16 flex-shrink-0">Assignee</span>
                    {assignee ? (
                      <div className="flex items-center gap-2">
                        <Avatar name={assignee.name} src={assignee.avatar} size="xs" />
                        <span className="text-xs text-white">{assignee.name}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-600">Unassigned</span>
                    )}
                  </div>

                  {/* Project */}
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg glass border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                      <Folder size={12} className="text-slate-500" />
                    </div>
                    <span className="text-[10px] text-slate-500 w-16 flex-shrink-0">Project</span>
                    <span className="text-xs text-white truncate">{project?.name ?? '—'}</span>
                  </div>

                  {/* Client */}
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg glass border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                      <UserIcon size={12} className="text-slate-500" />
                    </div>
                    <span className="text-[10px] text-slate-500 w-16 flex-shrink-0">Client</span>
                    <span className="text-xs text-slate-300">{clientName}</span>
                  </div>

                  {/* Priority */}
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg glass border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                      <Flag size={12} className="text-slate-500" />
                    </div>
                    <span className="text-[10px] text-slate-500 w-16 flex-shrink-0">Priority</span>
                    <PriorityBadge priority={task.priority} />
                  </div>

                  {/* Due date */}
                  {task.dueDate && (
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg glass border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                        <Calendar size={12} className="text-slate-500" />
                      </div>
                      <span className="text-[10px] text-slate-500 w-16 flex-shrink-0">Due date</span>
                      <span className={`text-xs font-medium ${isOverdue ? 'text-red-400' : 'text-white'}`}>
                        {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  )}

                  {/* Created */}
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg glass border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                      <Clock size={12} className="text-slate-500" />
                    </div>
                    <span className="text-[10px] text-slate-500 w-16 flex-shrink-0">Created</span>
                    <span className="text-xs text-slate-400">
                      {new Date(task.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Labels */}
              {task.labels.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Tag size={11} className="text-slate-500" />
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Labels</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {task.labels.map((label) => (
                      <span
                        key={label}
                        className={`text-[10px] font-semibold px-2 py-1 rounded-lg border uppercase tracking-wide ${getLabelColor(label)}`}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Divider */}
              <div className="border-t border-white/[0.06]" />

              {/* Activity stub */}
              <div>
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-3">Activity</p>
                <div className="space-y-3">
                  {[
                    { user: 'Azizul Rabby', seed: 'anas', action: 'created this task', time: task.createdAt },
                    ...(task.assignee && assignee ? [{ user: assignee.name, seed: task.assignee, action: 'was assigned', time: task.createdAt }] : []),
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.seed}`}
                        className="w-6 h-6 rounded-full ring-1 ring-white/10 flex-shrink-0"
                        alt={item.user}
                      />
                      <div>
                        <span className="text-xs font-medium text-white">{item.user}</span>
                        <span className="text-xs text-slate-500"> {item.action}</span>
                        <p className="text-[10px] text-slate-700 mt-0.5">
                          {new Date(item.time).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
