import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, FolderKanban, BarChart3,
  FileText, UserCircle, Settings, Zap, ChevronLeft,
  ChevronRight, LogOut, Building2, Globe
} from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { useAuthStore } from '../../store/authStore';
import { Avatar } from '../ui/Avatar';

const navItems = [
  { to: '/dashboard',                icon: LayoutDashboard, label: 'Overview',      exact: true },
  { to: '/dashboard/projects',       icon: FolderKanban,    label: 'Projects',      exact: false },
  { to: '/dashboard/clients',        icon: Building2,       label: 'Clients',       exact: false },
  { to: '/dashboard/analytics',      icon: BarChart3,       label: 'Analytics',     exact: false },
  { to: '/dashboard/reports',        icon: FileText,        label: 'Reports',       exact: false },
  { to: '/dashboard/team',           icon: UserCircle,      label: 'Team',          exact: false },
  { to: '/dashboard/client-portal',  icon: Globe,           label: 'Client Portal', exact: false },
  { to: '/dashboard/settings',       icon: Settings,        label: 'Settings',      exact: false },
];

export const Sidebar: React.FC = () => {
  const { sidebarCollapsed, collapseSidebar } = useUIStore();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.aside
      animate={{ width: sidebarCollapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="hidden md:flex flex-col h-screen bg-[#080D1A] border-r border-white/[0.06] relative flex-shrink-0"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-white/[0.06] flex-shrink-0">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-[0_0_16px_rgba(59,130,246,0.3)]">
          <Zap size={15} className="text-white" />
        </div>
        <AnimatePresence initial={false}>
          {!sidebarCollapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="font-display font-bold text-base text-white whitespace-nowrap overflow-hidden"
            >
              PulseDesk<span className="text-blue-400"> AI</span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Workspace chip */}
      <AnimatePresence initial={false}>
        {!sidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mx-3 mt-3 mb-1 glass border border-white/[0.08] rounded-xl px-3 py-2"
          >
            <p className="text-[10px] text-slate-500 mb-0.5">Workspace</p>
            <p className="text-xs font-semibold text-white truncate">PulseDesk Agency</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label, exact }) => (
          <NavLink
            key={to}
            to={to}
            end={exact}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-blue-500/15 text-blue-400 border border-blue-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={18} className={`flex-shrink-0 ${isActive ? 'text-blue-400' : 'group-hover:text-white'}`} />
                <AnimatePresence initial={false}>
                  {!sidebarCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="whitespace-nowrap overflow-hidden"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-white/[0.06] p-3 flex-shrink-0">
        <div className={`flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/[0.05] cursor-pointer transition-all ${sidebarCollapsed ? 'justify-center' : ''}`}>
          <Avatar name={user?.name ?? 'User'} src={user?.avatar} size="sm" />
          <AnimatePresence initial={false}>
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="flex-1 min-w-0 overflow-hidden"
              >
                <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
                <p className="text-[10px] text-slate-500 truncate capitalize">{user?.role}</p>
              </motion.div>
            )}
          </AnimatePresence>
          {!sidebarCollapsed && (
            <button onClick={handleLogout} className="text-slate-500 hover:text-red-400 transition-colors flex-shrink-0">
              <LogOut size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => collapseSidebar(!sidebarCollapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:border-white/20 z-10"
      >
        {sidebarCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </motion.aside>
  );
};
