import React from 'react';
import { Bell, Search, Plus } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Avatar } from '../ui/Avatar';
import { mockInsights } from '../../data/mockData';

interface TopBarProps {
  title: string;
  subtitle?: string;
}

export const TopBar: React.FC<TopBarProps> = ({ title, subtitle }) => {
  const { user } = useAuthStore();
  const unread = mockInsights.filter((i) => !i.isRead).length;

  return (
    <header className="h-16 border-b border-white/[0.06] bg-[#070B14]/80 backdrop-blur-xl flex items-center justify-between px-6 flex-shrink-0 sticky top-0 z-20">
      {/* Page title */}
      <div>
        <h1 className="text-base font-display font-bold text-white leading-tight">{title}</h1>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 glass border border-white/[0.08] rounded-xl px-3 py-2 text-sm text-slate-500 cursor-pointer hover:border-white/15 transition-all w-48">
          <Search size={14} />
          <span className="text-xs">Search... </span>
          <span className="ml-auto text-[10px] bg-white/5 border border-white/10 rounded px-1 py-0.5">⌘K</span>
        </div>

        {/* New project quick action */}
        <button className="w-8 h-8 rounded-xl glass border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/40 transition-all">
          <Plus size={15} />
        </button>

        {/* Notifications */}
        <button className="relative w-8 h-8 rounded-xl glass border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-white/15 transition-all">
          <Bell size={15} />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-500 text-white text-[9px] font-bold flex items-center justify-center">
              {unread}
            </span>
          )}
        </button>

        {/* Avatar */}
        <Avatar name={user?.name ?? 'User'} src={user?.avatar} size="sm" />
      </div>
    </header>
  );
};
