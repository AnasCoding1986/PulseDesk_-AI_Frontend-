import React from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, CreditCard, Globe, Trash2 } from 'lucide-react';
import { TopBar } from '../../components/layout/TopBar';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { useAuthStore } from '../../store/authStore';

const sections = [
  { id: 'profile', icon: User, label: 'Profile' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'security', icon: Shield, label: 'Security' },
  { id: 'billing', icon: CreditCard, label: 'Billing' },
  { id: 'workspace', icon: Globe, label: 'Workspace' },
];

const SettingsPage: React.FC = () => {
  const { user } = useAuthStore();
  const [active, setActive] = React.useState('profile');

  return (
    <div className="min-h-full">
      <TopBar title="Settings" subtitle="Manage your account and workspace preferences" />
      <div className="p-6 max-w-[1000px] mx-auto">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Settings nav */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {sections.map((s) => (
                <button key={s.id} onClick={() => setActive(s.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    active === s.id ? 'glass border border-blue-500/25 text-blue-400' : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}>
                  <s.icon size={16} />{s.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Settings content */}
          <motion.div key={active} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}
            className="lg:col-span-3 glass border border-white/[0.08] rounded-2xl p-6">
            {active === 'profile' && (
              <div className="space-y-6">
                <h3 className="text-base font-semibold text-white">Profile Information</h3>
                <div className="flex items-center gap-5">
                  <Avatar name={user?.name ?? 'User'} src={user?.avatar} size="xl" />
                  <div>
                    <Button size="sm" variant="outline">Change photo</Button>
                    <p className="text-[10px] text-slate-500 mt-2">JPG, PNG or GIF — Max 2MB</p>
                  </div>
                </div>
                {[{ label: 'Full Name', value: user?.name }, { label: 'Email', value: user?.email }].map((f) => (
                  <div key={f.label}>
                    <label className="block text-xs font-medium text-slate-400 mb-2">{f.label}</label>
                    <input defaultValue={f.value ?? ''} className="w-full glass border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all" />
                  </div>
                ))}
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                  <Button>Save changes</Button>
                </div>
              </div>
            )}
            {active === 'billing' && (
              <div className="space-y-5">
                <h3 className="text-base font-semibold text-white">Billing & Plan</h3>
                <div className="glass border border-blue-500/25 rounded-xl p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white">Pro Plan</p>
                      <p className="text-xs text-slate-400">$29/month · Next billing Jun 9, 2024</p>
                    </div>
                    <Badge color="blue">Active</Badge>
                  </div>
                </div>
                <Button variant="outline">Manage subscription</Button>
              </div>
            )}
            {['notifications', 'security', 'workspace'].includes(active) && (
              <div className="text-center py-12 text-slate-500">
                <p className="text-sm">Settings for {sections.find((s) => s.id === active)?.label} coming soon.</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Danger zone */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="mt-6 glass border border-orange-500/20 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-orange-400">Danger Zone</p>
              <p className="text-xs text-slate-500 mt-0.5">Permanently delete your workspace and all data</p>
            </div>
            <Button variant="danger" size="sm" icon={<Trash2 size={13} />}>Delete workspace</Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;
