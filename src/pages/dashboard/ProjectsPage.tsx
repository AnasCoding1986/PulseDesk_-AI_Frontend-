import React, { useState, useEffect } from 'react';
import { projectService } from '../../services/projectService';
import { taskService } from '../../services/taskService';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, LayoutGrid, List, Filter, Kanban } from 'lucide-react';
import { TopBar } from '../../components/layout/TopBar';
import { Button } from '../../components/ui/Button';
import { StatusBadge, PriorityBadge } from '../../components/ui/Badge';
import { AvatarGroup } from '../../components/ui/Avatar';
import { KanbanBoard } from '../../components/projects/KanbanBoard';
import { mockProjects, mockTeam, mockTasks } from '../../data/mockData';

// ─── Tab definitions ──────────────────────────────────────────
type Tab = 'cards' | 'kanban';

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'cards',  label: 'Project Cards', icon: <LayoutGrid size={14} /> },
  { id: 'kanban', label: 'Kanban Board',  icon: <Kanban size={14} /> },
];

// ─── Project Cards View ───────────────────────────────────────
const ProjectCardsView: React.FC<{ projects: typeof mockProjects; tasks: typeof mockTasks }> = ({ projects, tasks }) => {
  const [cardView, setCardView] = useState<'grid' | 'list'>('grid');

  return (
    <>
      {/* Sub-actions */}
      <div className="flex items-center gap-2 mb-6">
        <button
          className={`p-2 rounded-lg transition-all ${cardView === 'grid' ? 'glass border border-blue-500/30 text-blue-400' : 'text-slate-500 hover:text-white'}`}
          onClick={() => setCardView('grid')}
          title="Grid view"
        >
          <LayoutGrid size={15} />
        </button>
        <button
          className={`p-2 rounded-lg transition-all ${cardView === 'list' ? 'glass border border-blue-500/30 text-blue-400' : 'text-slate-500 hover:text-white'}`}
          onClick={() => setCardView('list')}
          title="List view"
        >
          <List size={15} />
        </button>
        <button className="flex items-center gap-1.5 px-3 py-2 text-xs text-slate-400 hover:text-white glass border border-white/[0.08] rounded-xl transition-all">
          <Filter size={12} /> Filter
        </button>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-slate-500">{projects.length} projects</span>
        </div>
      </div>

      {/* Cards grid / list */}
      <div className={`grid gap-4 ${cardView === 'grid' ? 'sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1 max-w-3xl'}`}>
        {projects.map((project, i) => {
          const assignees = project.assignedTo
            .map((id) => mockTeam.find((u) => u.id === id))
            .filter(Boolean) as typeof mockTeam;
          const projectTaskCount = tasks.filter((t) => t.project === project.id).length;
          const doneTasks = tasks.filter((t) => t.project === project.id && t.status === 'done').length;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="glass border border-white/[0.08] rounded-2xl p-5 hover:border-white/15 transition-all cursor-pointer group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0 mr-3">
                  <h3 className="text-sm font-semibold text-white truncate group-hover:text-blue-400 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{project.description}</p>
                </div>
                <PriorityBadge priority={project.priority} />
              </div>

              {/* Progress */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] text-slate-500">Progress</span>
                  <span className="text-[10px] font-semibold text-white">{project.progress}%</span>
                </div>
                <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.07, ease: 'easeOut' }}
                    className={`h-full rounded-full ${
                      project.health > 80 ? 'bg-emerald-500' : project.health > 60 ? 'bg-blue-500' : 'bg-amber-500'
                    }`}
                  />
                </div>
              </div>

              {/* Task count mini */}
              <div className="flex items-center gap-1.5 mb-3">
                <div className="flex gap-1">
                  {Array.from({ length: Math.min(projectTaskCount, 8) }).map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 w-3 rounded-full ${
                        idx < doneTasks ? 'bg-emerald-500' : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-slate-600">{doneTasks}/{projectTaskCount} tasks</span>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <StatusBadge status={project.status} />
                <div className="flex items-center gap-2">
                  <AvatarGroup
                    users={assignees.map((u) => ({ name: u.name, avatar: u.avatar }))}
                    max={3}
                    size="xs"
                  />
                  {project.budget && (
                    <span className="text-[10px] text-slate-500">${(project.budget / 1000).toFixed(0)}K</span>
                  )}
                </div>
              </div>

              {/* Due date */}
              <div className="mt-3 pt-3 border-t border-white/[0.04]">
                <span className="text-[10px] text-slate-600">
                  Due{' '}
                  {new Date(project.dueDate).toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric', year: 'numeric',
                  })}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
};

// ─── Main Page ────────────────────────────────────────────────
const ProjectsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('cards');
  const [projects, setProjects] = useState<typeof mockProjects>([]);
  const [tasks, setTasks] = useState<typeof mockTasks>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [fetchedProjects, fetchedTasks] = await Promise.all([
          projectService.getAllProjects(),
          // For now fetch all tasks for simplicity, or we could fetch per project
          // But our KanbanBoard takes initialTasks
          taskService.getProjectTasks(mockProjects[0].id) // Example
        ]);
        setProjects(fetchedProjects);
        setTasks(fetchedTasks);
      } catch (err) {
        console.error('Failed to fetch from backend, using mock fallback');
        setProjects(mockProjects);
        setTasks(mockTasks);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-full">
      <TopBar title="Projects" subtitle="Manage all active and upcoming projects" />

      <div className="p-6 max-w-[1600px] mx-auto">
        {/* Page header: tabs + actions */}
        <div className="flex items-center justify-between mb-6">
          {/* Tabs */}
          <div className="flex items-center gap-1 glass border border-white/[0.08] rounded-xl p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute inset-0 bg-blue-500/20 border border-blue-500/30 rounded-lg"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {tab.icon}
                  {tab.label}
                </span>
              </button>
            ))}
          </div>

          {/* Action button */}
          <Button size="sm" icon={<Plus size={14} />}>
            {activeTab === 'kanban' ? 'New Task' : 'New Project'}
          </Button>
        </div>

        {/* Tab content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4" />
            <p className="text-sm text-slate-500">Syncing with backend...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {activeTab === 'cards' ? (
                <ProjectCardsView projects={projects} tasks={tasks} />
              ) : (
                <KanbanBoard initialTasks={tasks} />
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
