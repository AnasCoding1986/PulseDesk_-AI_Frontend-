import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCorners,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import type { Task, User, Project } from '../../types';
import { KanbanColumn, type ColumnId } from './KanbanColumn';
import { TaskCardOverlay } from './TaskCard';
import { TaskDetailModal } from './TaskDetailModal';
import { mockProjects, mockTeam, mockClients } from '../../data/mockData';
import { taskService } from '../../services/taskService';

// ─── Lookup maps (stable refs) ────────────────────────────────
const TEAM_MAP: Record<string, User>    = Object.fromEntries(mockTeam.map((u) => [u.id, u]));
const PROJECT_MAP: Record<string, Project> = Object.fromEntries(mockProjects.map((p) => [p.id, p]));
const CLIENT_MAP: Record<string, string>   = Object.fromEntries(mockClients.map((c) => [c.id, c.company]));

// ─── Column order ─────────────────────────────────────────────
const COLUMN_ORDER: ColumnId[] = ['todo', 'in-progress', 'review', 'done'];

// ─── Props ────────────────────────────────────────────────────
interface KanbanBoardProps {
  initialTasks: Task[];
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ initialTasks }) => {
  // ── State ──────────────────────────────────────────────────
  const [tasks, setTasks]             = useState<Task[]>(initialTasks);
  const [activeId, setActiveId]       = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filterProject, setFilterProject] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [search, setSearch]           = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // ── Sensors ────────────────────────────────────────────────
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor,   { activationConstraint: { delay: 180, tolerance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  // ── Filtered + grouped tasks ──────────────────────────────
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (filterProject !== 'all' && t.project !== filterProject) return false;
      if (filterPriority !== 'all' && t.priority !== filterPriority) return false;
      if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [tasks, filterProject, filterPriority, search]);

  const columnTasks = useMemo<Record<ColumnId, Task[]>>(() => {
    const grouped = { todo: [], 'in-progress': [], review: [], done: [] } as Record<ColumnId, Task[]>;
    for (const t of filteredTasks) {
      if (grouped[t.status as ColumnId]) {
        grouped[t.status as ColumnId].push(t);
      }
    }
    // Sort each column by order field
    for (const col of COLUMN_ORDER) {
      grouped[col].sort((a, b) => a.order - b.order);
    }
    return grouped;
  }, [filteredTasks]);

  // ── Active task (for DragOverlay) ─────────────────────────
  const activeTask = useMemo(() => tasks.find((t) => t.id === activeId) ?? null, [tasks, activeId]);

  // ── DnD handlers ──────────────────────────────────────────
  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  }, []);

  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeTaskId = active.id as string;
    const overId = over.id as string;

    // Find active task's current column
    const activeTask = tasks.find((t) => t.id === activeTaskId);
    if (!activeTask) return;

    // Determine the target column
    const targetColumn = COLUMN_ORDER.includes(overId as ColumnId)
      ? (overId as ColumnId)
      : tasks.find((t) => t.id === overId)?.status as ColumnId | undefined;

    if (!targetColumn || targetColumn === activeTask.status) return;

    // Move task to new column
    setTasks((prev) =>
      prev.map((t) =>
        t.id === activeTaskId ? { ...t, status: targetColumn } : t,
      ),
    );
  }, [tasks]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeTaskId = active.id as string;
    const overId = over.id as string;

    if (activeTaskId === overId) return;

    const activeTask = tasks.find((t) => t.id === activeTaskId);
    const overTask = tasks.find((t) => t.id === overId) || 
                     (COLUMN_ORDER.includes(overId as ColumnId) ? { status: overId } : null);

    if (!activeTask) return;

    // Persist to backend if status changed
    const newStatus = overTask?.status as ColumnId;
    if (newStatus && activeTask.status !== newStatus) {
      taskService.updateTask(activeTaskId, { status: newStatus }).catch(err => {
        console.error('Failed to persist task status update', err);
      });
    }

    setTasks((prev) => {
      const currentActiveTask = prev.find((t) => t.id === activeTaskId);
      if (!currentActiveTask) return prev;

      const activeColumn = currentActiveTask.status as ColumnId;
      const columnItems  = prev.filter((t) => t.status === activeColumn).sort((a, b) => a.order - b.order);

      const activeIndex = columnItems.findIndex((t) => t.id === activeTaskId);
      const overIndex   = columnItems.findIndex((t) => t.id === overId);

      if (overIndex === -1) return prev;

      const reordered = arrayMove(columnItems, activeIndex, overIndex).map((t, i) => ({
        ...t, order: i,
      }));

      return prev.map((t) => reordered.find((r) => r.id === t.id) ?? t);
    });
  }, []);

  // ── Status change from modal ───────────────────────────────
  const handleStatusChange = useCallback((taskId: string, newStatus: ColumnId) => {
    setTasks((prev) => prev.map((t) => t.id === taskId ? { ...t, status: newStatus } : t));
    setSelectedTask((prev) => prev && prev.id === taskId ? { ...prev, status: newStatus } : prev);
    
    // Persist to backend
    taskService.updateTask(taskId, { status: newStatus }).catch(err => {
      console.error('Failed to persist task status update', err);
    });
  }, []);

  // ── Column stats ──────────────────────────────────────────
  const totalTasks = filteredTasks.length;
  const doneCount  = columnTasks['done'].length;
  const progress   = totalTasks > 0 ? Math.round((doneCount / totalTasks) * 100) : 0;

  return (
    <>
      {/* Board header: search + filters + progress */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks…"
              className="w-full glass border border-white/[0.08] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all"
            />
          </div>

          {/* Project filter */}
          <div className="relative">
            <select
              value={filterProject}
              onChange={(e) => setFilterProject(e.target.value)}
              className="appearance-none glass border border-white/[0.08] rounded-xl pl-3 pr-8 py-2 text-xs text-slate-300 focus:outline-none focus:border-blue-500/50 bg-transparent cursor-pointer"
            >
              <option value="all" className="bg-[#0F172A]">All Projects</option>
              {mockProjects.map((p) => (
                <option key={p.id} value={p.id} className="bg-[#0F172A]">{p.name}</option>
              ))}
            </select>
            <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          </div>

          {/* Priority filter */}
          <div className="relative">
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="appearance-none glass border border-white/[0.08] rounded-xl pl-3 pr-8 py-2 text-xs text-slate-300 focus:outline-none focus:border-blue-500/50 bg-transparent cursor-pointer"
            >
              <option value="all" className="bg-[#0F172A]">All Priorities</option>
              {['critical', 'high', 'medium', 'low'].map((p) => (
                <option key={p} value={p} className="bg-[#0F172A] capitalize">{p.charAt(0).toUpperCase() + p.slice(1)}</option>
              ))}
            </select>
            <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          </div>

          <button
            onClick={() => setShowFilters((s) => !s)}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs rounded-xl border transition-all ${showFilters ? 'glass border-blue-500/30 text-blue-400' : 'glass border-white/[0.08] text-slate-400 hover:text-white'}`}
          >
            <SlidersHorizontal size={12} />
            Filters
          </button>

          {/* Stats */}
          <div className="ml-auto flex items-center gap-3">
            <span className="text-[10px] text-slate-500">{doneCount}/{totalTasks} done</span>
            <div className="w-24 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="h-full bg-emerald-500 rounded-full"
              />
            </div>
            <span className="text-[10px] font-semibold text-emerald-400">{progress}%</span>
          </div>
        </div>

        {/* Active filters display */}
        {(filterProject !== 'all' || filterPriority !== 'all' || search) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex items-center gap-2 flex-wrap"
          >
            <span className="text-[10px] text-slate-500">Filtered:</span>
            {filterProject !== 'all' && (
              <span className="text-[10px] bg-blue-500/15 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-lg">
                {mockProjects.find((p) => p.id === filterProject)?.name}
              </span>
            )}
            {filterPriority !== 'all' && (
              <span className="text-[10px] bg-amber-500/15 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-lg capitalize">
                {filterPriority}
              </span>
            )}
            {search && (
              <span className="text-[10px] bg-purple-500/15 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-lg">
                "{search}"
              </span>
            )}
            <button
              onClick={() => { setFilterProject('all'); setFilterPriority('all'); setSearch(''); }}
              className="text-[10px] text-slate-500 hover:text-red-400 transition-colors"
            >
              Clear all
            </button>
          </motion.div>
        )}
      </div>

      {/* Kanban columns */}
      <div className="overflow-x-auto pb-6 -mx-1 px-1">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-4 min-w-max">
            {COLUMN_ORDER.map((colId) => (
              <KanbanColumn
                key={colId}
                id={colId}
                tasks={columnTasks[colId]}
                teamMap={TEAM_MAP}
                projectMap={PROJECT_MAP}
                clientMap={CLIENT_MAP}
                onTaskOpen={setSelectedTask}
                activeTaskId={activeId}
              />
            ))}
          </div>

          {/* Drag overlay — shown above everything while dragging */}
          <DragOverlay dropAnimation={{ duration: 180, easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)' }}>
            {activeTask && (
              <TaskCardOverlay task={activeTask} teamMap={TEAM_MAP} />
            )}
          </DragOverlay>
        </DndContext>
      </div>

      {/* Task detail modal */}
      <TaskDetailModal
        task={selectedTask}
        teamMap={TEAM_MAP}
        projectMap={PROJECT_MAP}
        clientMap={CLIENT_MAP}
        onClose={() => setSelectedTask(null)}
        onStatusChange={handleStatusChange}
      />
    </>
  );
};
