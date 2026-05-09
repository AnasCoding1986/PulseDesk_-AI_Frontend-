import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import type { Task, User, Project } from '../../types';
import { TaskCard } from './TaskCard';

// ─── Column metadata ──────────────────────────────────────────
export type ColumnId = 'todo' | 'in-progress' | 'review' | 'done';

interface ColumnMeta {
  label: string;
  accent: string;           // Tailwind text color
  glow: string;             // box-shadow / ring color
  dotColor: string;         // dot indicator color
  headerBg: string;         // column header bg
  countBg: string;          // task count pill bg
}

export const COLUMNS: Record<ColumnId, ColumnMeta> = {
  'todo':        { label: 'Backlog',     accent: 'text-slate-400',   glow: 'rgba(148,163,184,0.15)', dotColor: 'bg-slate-500',   headerBg: 'bg-slate-500/10',  countBg: 'bg-slate-500/20 text-slate-400' },
  'in-progress': { label: 'In Progress', accent: 'text-blue-400',    glow: 'rgba(59,130,246,0.15)',  dotColor: 'bg-blue-500',    headerBg: 'bg-blue-500/10',   countBg: 'bg-blue-500/20 text-blue-400' },
  'review':      { label: 'Review',      accent: 'text-amber-400',   glow: 'rgba(245,158,11,0.15)', dotColor: 'bg-amber-500',   headerBg: 'bg-amber-500/10',  countBg: 'bg-amber-500/20 text-amber-400' },
  'done':        { label: 'Completed',   accent: 'text-emerald-400', glow: 'rgba(34,197,94,0.15)',  dotColor: 'bg-emerald-500', headerBg: 'bg-emerald-500/10',countBg: 'bg-emerald-500/20 text-emerald-400' },
};

interface KanbanColumnProps {
  id: ColumnId;
  tasks: Task[];
  teamMap: Record<string, User>;
  projectMap: Record<string, Project>;
  clientMap: Record<string, string>;
  onTaskOpen: (task: Task) => void;
  activeTaskId: string | null;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  id, tasks, teamMap, projectMap, clientMap, onTaskOpen, activeTaskId,
}) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  const meta = COLUMNS[id];
  const taskIds = tasks.map((t) => t.id);

  return (
    <div className="flex flex-col min-w-[272px] w-[272px] flex-shrink-0">
      {/* Column header */}
      <div className={`flex items-center justify-between px-3 py-2.5 rounded-xl mb-3 ${meta.headerBg}`}>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${meta.dotColor}`} />
          <span className={`text-xs font-semibold ${meta.accent}`}>{meta.label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${meta.countBg}`}>
            {tasks.length}
          </span>
          <button
            onClick={() => {}}
            className="w-5 h-5 flex items-center justify-center rounded-md text-slate-600 hover:text-white hover:bg-white/10 transition-all"
          >
            <Plus size={12} />
          </button>
        </div>
      </div>

      {/* Droppable task list */}
      <div
        ref={setNodeRef}
        className={`
          flex-1 min-h-[400px] rounded-2xl p-2 transition-all duration-200 space-y-2
          ${isOver
            ? `border-2 border-dashed border-current ${meta.accent} bg-white/[0.02]`
            : 'border-2 border-dashed border-transparent'
          }
        `}
        style={isOver ? { boxShadow: `0 0 30px ${meta.glow}` } : undefined}
      >
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          <AnimatePresence>
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                teamMap={teamMap}
                projectMap={projectMap}
                clientMap={clientMap}
                onOpen={onTaskOpen}
                isDragging={task.id === activeTaskId}
              />
            ))}
          </AnimatePresence>
        </SortableContext>

        {/* Empty state */}
        {tasks.length === 0 && !isOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className={`w-10 h-10 rounded-xl ${meta.headerBg} flex items-center justify-center mb-3`}>
              <span className={`text-lg ${meta.accent}`}>✦</span>
            </div>
            <p className="text-xs text-slate-600">No tasks here</p>
            <p className="text-[10px] text-slate-700 mt-0.5">Drag tasks or add new ones</p>
          </motion.div>
        )}

        {/* Drop indicator */}
        {isOver && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0.8 }}
            animate={{ opacity: 1, scaleX: 1 }}
            className={`h-1 rounded-full mx-2 ${meta.dotColor} opacity-60`}
          />
        )}
      </div>
    </div>
  );
};
