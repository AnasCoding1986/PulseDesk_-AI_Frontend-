import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, BarChart3, Globe, FileText } from 'lucide-react';

const mobileNav = [
  { to: '/dashboard',               icon: LayoutDashboard, label: 'Home',    exact: true },
  { to: '/dashboard/projects',      icon: FolderKanban,    label: 'Projects', exact: false },
  { to: '/dashboard/analytics',     icon: BarChart3,       label: 'Analytics',exact: false },
  { to: '/dashboard/client-portal', icon: Globe,           label: 'Portal',   exact: false },
  { to: '/dashboard/reports',       icon: FileText,        label: 'Reports',  exact: false },
];

export const MobileNav: React.FC = () => (
  <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-white/[0.06]">
    <div className="flex items-center justify-around px-2 py-2">
      {mobileNav.map(({ to, icon: Icon, label, exact }) => (
        <NavLink
          key={to}
          to={to}
          end={exact}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
              isActive ? 'text-blue-400' : 'text-slate-500'
            }`
          }
        >
          <Icon size={20} />
          <span className="text-[10px] font-medium">{label}</span>
        </NavLink>
      ))}
    </div>
  </nav>
);
