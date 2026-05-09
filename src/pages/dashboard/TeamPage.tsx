import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Shield } from 'lucide-react';
import { TopBar } from '../../components/layout/TopBar';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { mockTeam, mockWorkloadData } from '../../data/mockData';

const roleColors: Record<string, 'blue' | 'purple' | 'green' | 'gray'> = {
  owner: 'purple', admin: 'blue', member: 'green', viewer: 'gray',
};

const TeamPage: React.FC = () => {
  return (
    <div className="min-h-full">
      <TopBar title="Team" subtitle="Manage your workspace members and workload" />
      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-400">{mockTeam.length} members</p>
          <Button size="sm" icon={<UserPlus size={14} />}>Invite Member</Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockTeam.map((member, i) => {
            const workload = mockWorkloadData.find((w) => w.name === member.name.split(' ')[0]);
            return (
              <motion.div key={member.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="glass border border-white/[0.08] rounded-2xl p-5 hover:border-white/15 transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar name={member.name} src={member.avatar} size="lg" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white truncate">{member.name}</h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Mail size={10} className="text-slate-600" />
                      <span className="text-[10px] text-slate-500 truncate">{member.email}</span>
                    </div>
                    <div className="mt-2">
                      <Badge color={roleColors[member.role] ?? 'gray'} dot>
                        <Shield size={9} className="mr-0.5" />{member.role}
                      </Badge>
                    </div>
                  </div>
                </div>

                {workload && (
                  <div className="pt-3 border-t border-white/[0.04] space-y-2">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-slate-500">Tasks this week</span>
                      <span className="text-white font-semibold">{workload.tasks}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-slate-500">Hours logged</span>
                      <span className="text-white font-semibold">{workload.hours}h</span>
                    </div>
                    <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${workload.hours > 35 ? 'bg-amber-500' : 'bg-blue-500'}`}
                        style={{ width: `${Math.min((workload.hours / 45) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
