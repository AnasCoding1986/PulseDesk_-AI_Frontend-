import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import type { Activity } from '../../types';
import { Avatar } from '../ui/Avatar';

const actionLabels: Record<string, string> = {
  completed_task: 'completed task',
  created_project: 'created project',
  updated_task: 'updated task',
  added_client: 'added client',
  sent_report: 'sent report',
  reviewed_task: 'moved to review',
};

interface ActivityFeedProps {
  activities: Activity[];
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  return (
    <div className="glass border border-white/[0.08] rounded-2xl p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">Recent Activity</h3>
        <span className="text-[10px] text-slate-500">{activities.length} events</span>
      </div>
      <div className="space-y-1">
        {activities.map((activity, i) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="flex items-start gap-3 py-2.5 border-b border-white/[0.04] last:border-0"
          >
            <Avatar name={activity.user.name} src={activity.user.avatar} size="xs" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-300 leading-snug">
                <span className="font-medium text-white">{activity.user.name.split(' ')[0]}</span>
                {' '}
                <span className="text-slate-400">{actionLabels[activity.action] ?? activity.action}</span>
                {' '}
                <span className="text-blue-400 font-medium truncate">{activity.target.name}</span>
              </p>
              <p className="text-[10px] text-slate-600 mt-0.5">
                {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
