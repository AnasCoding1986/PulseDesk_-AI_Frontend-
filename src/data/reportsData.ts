import type { Project, User } from '../types';

export type ReportStatus = 'draft' | 'generated' | 'shared' | 'exported' | 'archived';
export type ReportType = 'monthly' | 'weekly' | 'client' | 'performance' | 'quarterly';

export interface ReportSummary {
  id: string;
  title: string;
  type: ReportType;
  clientId: string;
  projectId: string;
  period: string;
  status: ReportStatus;
  generatedAt: string;
  createdBy: string;
}

export interface GeneratedReport extends ReportSummary {
  executiveSummary: string;
  metrics: {
    label: string;
    value: string | number;
    change: number;
    trend: 'up' | 'down' | 'neutral';
  }[];
  milestones: {
    title: string;
    status: 'completed' | 'in-progress' | 'upcoming';
    date: string;
  }[];
  taskProgress: {
    total: number;
    completed: number;
    inProgress: number;
    backlog: number;
  };
  aiInsights: {
    wins: string[];
    risks: string[];
    nextActions: string[];
    blockers: string[];
  };
}

export const mockReportHistory: ReportSummary[] = [
  { id: 'r1', title: 'NovaTech April Performance', type: 'monthly', clientId: 'c1', projectId: 'p1', period: 'Apr 2024', status: 'shared', generatedAt: '2024-05-07T10:00:00Z', createdBy: 'u1' },
  { id: 'r2', title: 'Bloom Weekly Update - W18', type: 'weekly', clientId: 'c2', projectId: 'p3', period: 'Week 18', status: 'draft', generatedAt: '2024-05-06T14:30:00Z', createdBy: 'u1' },
  { id: 'r3', title: 'ShipFast Logistics Q1 Review', type: 'quarterly', clientId: 'c3', projectId: 'p4', period: 'Q1 2024', status: 'exported', generatedAt: '2024-04-01T09:00:00Z', createdBy: 'u2' },
  { id: 'r4', title: 'Internal Team Performance', type: 'performance', clientId: 'internal', projectId: 'all', period: 'Apr 2024', status: 'shared', generatedAt: '2024-05-02T11:15:00Z', createdBy: 'u1' },
  { id: 'r5', title: 'NovaTech March Review', type: 'monthly', clientId: 'c1', projectId: 'p1', period: 'Mar 2024', status: 'archived', generatedAt: '2024-04-05T16:45:00Z', createdBy: 'u1' },
];

export const mockGeneratedReport: GeneratedReport = {
  id: 'r_new',
  title: 'NovaTech Platform Redesign — May Update',
  type: 'monthly',
  clientId: 'c1',
  projectId: 'p1',
  period: 'May 2024 (To Date)',
  status: 'generated',
  generatedAt: new Date().toISOString(),
  createdBy: 'u1',
  executiveSummary: "The NovaTech Platform Redesign has maintained strong momentum through May. We have successfully transitioned from the core design phase into active frontend development. The component library is now 100% complete, and we are currently 72% through the dashboard implementation phase. While we have encountered some minor API-related bottlenecks, overall project velocity remains high and we are on track for our June delivery targets.",
  metrics: [
    { label: 'Project Health', value: '82%', change: 4, trend: 'up' },
    { label: 'Overall Progress', value: '67%', change: 12, trend: 'up' },
    { label: 'Tasks Completed', value: 47, change: 15, trend: 'up' },
    { label: 'Budget Utilized', value: '$18.7K', change: 2.4, trend: 'neutral' },
  ],
  milestones: [
    { title: 'Discovery & Design System', status: 'completed', date: 'Mar 28' },
    { title: 'Component Library & Prototypes', status: 'completed', date: 'Apr 25' },
    { title: 'Dashboard Core Implementation', status: 'in-progress', date: 'May 31' },
    { title: 'API Integration & QA', status: 'upcoming', date: 'Jun 15' },
  ],
  taskProgress: {
    total: 22,
    completed: 7,
    inProgress: 6,
    backlog: 9,
  },
  aiInsights: {
    wins: [
      "Component library delivered ahead of schedule with 48 production-ready elements.",
      "Design tokens successfully integrated across the new dashboard shell.",
      "Positive client feedback on the interactive Figma prototypes."
    ],
    risks: [
      "Third-party API rate limits could impact analytics data synchronization.",
      "Stripe webhook signature validation mismatch is causing local testing delays."
    ],
    nextActions: [
      "Schedule Bi-weekly check-in for May 14 to review Sprint 2 progress.",
      "Finalize the 'AI Insights' dashboard module development.",
      "Prepare technical handover documentation for Phase 1."
    ],
    blockers: [
      "Mixpanel SDK authentication issues are blocking live event tracking implementation."
    ],
  }
};
