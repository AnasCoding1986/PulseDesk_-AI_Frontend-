// ─── Client Portal Types ───────────────────────────────────────
export type MilestoneStatus   = 'completed' | 'in-progress' | 'upcoming' | 'at-risk';
export type DeliverableStatus = 'approved' | 'pending-review' | 'in-progress' | 'not-started';
export type InvoiceStatus     = 'paid' | 'pending' | 'overdue' | 'draft';
export type ApprovalStatus    = 'approved' | 'pending' | 'revision-requested' | 'rejected';
export type UpdateType        = 'progress' | 'milestone' | 'deliverable' | 'meeting' | 'alert';

export interface PortalMilestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completedDate?: string;
  status: MilestoneStatus;
  progress: number;
}

export interface PortalDeliverable {
  id: string;
  title: string;
  description: string;
  type: 'design' | 'development' | 'document' | 'video' | 'report';
  status: DeliverableStatus;
  submittedDate?: string;
  dueDate: string;
  fileSize?: string;
  fileType?: string;
  feedback?: string;
  version: number;
}

export interface PortalInvoice {
  id: string;
  invoiceNumber: string;
  description: string;
  amount: number;
  issuedDate: string;
  dueDate: string;
  paidDate?: string;
  status: InvoiceStatus;
  items: { label: string; amount: number }[];
}

export interface PortalApproval {
  id: string;
  title: string;
  description: string;
  type: 'design' | 'content' | 'scope' | 'budget' | 'timeline';
  status: ApprovalStatus;
  requestedDate: string;
  resolvedDate?: string;
  submittedBy: string;
  attachmentLabel?: string;
  feedback?: string;
}

export interface PortalUpdate {
  id: string;
  type: UpdateType;
  title: string;
  body: string;
  author: string;
  authorAvatar: string;
  createdAt: string;
}

export interface PortalReport {
  id: string;
  title: string;
  period: string;
  type: 'weekly' | 'monthly' | 'milestone';
  fileSize: string;
  generatedDate: string;
  status: 'ready' | 'generating';
}

export interface ClientPortalData {
  clientId: string;
  projectId: string;
  projectName: string;
  clientName: string;
  clientCompany: string;
  clientAvatar: string;
  accountManager: string;
  startDate: string;
  endDate: string;
  totalBudget: number;
  budgetSpent: number;
  overallProgress: number;
  healthScore: number;
  milestones: PortalMilestone[];
  deliverables: PortalDeliverable[];
  invoices: PortalInvoice[];
  approvals: PortalApproval[];
  updates: PortalUpdate[];
  reports: PortalReport[];
}

// ─── Mock Portal Data — NovaTech Platform Redesign ────────────
export const mockClientPortal: ClientPortalData = {
  clientId: 'c1',
  projectId: 'p1',
  projectName: 'NovaTech Platform Redesign',
  clientName: 'Alex Thornton',
  clientCompany: 'NovaTech Solutions',
  clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
  accountManager: 'Azizul Rabby',
  startDate: '2024-03-01',
  endDate: '2024-06-30',
  totalBudget: 28000,
  budgetSpent: 18760,
  overallProgress: 67,
  healthScore: 82,

  // ── Milestones ────────────────────────────────────────────
  milestones: [
    {
      id: 'm1',
      title: 'Discovery & Design System',
      description: 'Full audit of existing UI, creation of a unified design system including color tokens, typography, spacing, and component primitives.',
      dueDate: '2024-03-31',
      completedDate: '2024-03-28',
      status: 'completed',
      progress: 100,
    },
    {
      id: 'm2',
      title: 'Component Library & Prototypes',
      description: 'Build all 48 reusable components with interactive Figma prototypes for client review and sign-off.',
      dueDate: '2024-04-30',
      completedDate: '2024-04-25',
      status: 'completed',
      progress: 100,
    },
    {
      id: 'm3',
      title: 'Dashboard & Core Views',
      description: 'Implement the main dashboard shell, overview page, analytics views, and team management screens using the component library.',
      dueDate: '2024-05-31',
      status: 'in-progress',
      progress: 72,
    },
    {
      id: 'm4',
      title: 'API Integration & QA',
      description: 'Connect all frontend components to live API endpoints, run full regression testing, and fix all P0/P1 bugs before UAT.',
      dueDate: '2024-06-15',
      status: 'upcoming',
      progress: 0,
    },
    {
      id: 'm5',
      title: 'UAT, Launch & Handover',
      description: 'Client UAT session, final performance optimisation, production deployment, and full technical handover with documentation.',
      dueDate: '2024-06-30',
      status: 'upcoming',
      progress: 0,
    },
  ],

  // ── Deliverables ──────────────────────────────────────────
  deliverables: [
    {
      id: 'd1',
      title: 'Design System Documentation (v1.0)',
      description: 'Complete Figma file with all design tokens, spacing guidelines, colour palette, and component usage notes.',
      type: 'design',
      status: 'approved',
      submittedDate: '2024-03-27',
      dueDate: '2024-03-31',
      fileSize: '24.8 MB',
      fileType: 'Figma',
      version: 1,
    },
    {
      id: 'd2',
      title: 'Interactive Component Prototype',
      description: 'Full clickthrough Figma prototype covering all 6 dashboard screens with hover states, transitions, and empty states.',
      type: 'design',
      status: 'approved',
      submittedDate: '2024-04-22',
      dueDate: '2024-04-30',
      fileSize: '18.2 MB',
      fileType: 'Figma',
      version: 2,
    },
    {
      id: 'd3',
      title: 'Frontend Codebase (Sprint 1)',
      description: 'React + TypeScript source code for Overview, Projects, and Clients pages — deployed to staging for review.',
      type: 'development',
      status: 'approved',
      submittedDate: '2024-05-01',
      dueDate: '2024-05-05',
      fileSize: '—',
      fileType: 'GitHub',
      version: 1,
    },
    {
      id: 'd4',
      title: 'Analytics & Reports Module',
      description: 'Complete analytics page with Recharts integration — Revenue, Team Workload, Project Status, and Client Revenue charts.',
      type: 'development',
      status: 'pending-review',
      submittedDate: '2024-05-08',
      dueDate: '2024-05-12',
      fileSize: '—',
      fileType: 'Staging URL',
      version: 1,
    },
    {
      id: 'd5',
      title: 'AI Insights Module',
      description: 'AI-powered project insight engine with real-time signal feeds, risk detection, and opportunity flagging.',
      type: 'development',
      status: 'in-progress',
      dueDate: '2024-05-25',
      version: 0,
    },
    {
      id: 'd6',
      title: 'Technical Handover Document',
      description: 'Full architecture overview, API documentation, deployment guide, and environment setup instructions.',
      type: 'document',
      status: 'not-started',
      dueDate: '2024-06-28',
      version: 0,
    },
  ],

  // ── Invoices ──────────────────────────────────────────────
  invoices: [
    {
      id: 'inv1',
      invoiceNumber: 'INV-2024-001',
      description: 'Project Kickoff & Discovery Phase',
      amount: 7000,
      issuedDate: '2024-03-01',
      dueDate: '2024-03-15',
      paidDate: '2024-03-12',
      status: 'paid',
      items: [
        { label: 'Discovery Workshop (2 days)', amount: 2400 },
        { label: 'Stakeholder Interviews (5×)', amount: 1600 },
        { label: 'Design System Audit', amount: 3000 },
      ],
    },
    {
      id: 'inv2',
      invoiceNumber: 'INV-2024-002',
      description: 'Design System & Component Library',
      amount: 8400,
      issuedDate: '2024-04-01',
      dueDate: '2024-04-15',
      paidDate: '2024-04-10',
      status: 'paid',
      items: [
        { label: 'Design Tokens & Style Guide', amount: 2800 },
        { label: 'Component Library (48 components)', amount: 4200 },
        { label: 'Interactive Prototype', amount: 1400 },
      ],
    },
    {
      id: 'inv3',
      invoiceNumber: 'INV-2024-003',
      description: 'Sprint 1 — Core Dashboard Build',
      amount: 6800,
      issuedDate: '2024-05-01',
      dueDate: '2024-05-15',
      status: 'pending',
      items: [
        { label: 'Dashboard Layout & Sidebar', amount: 2200 },
        { label: 'Overview & Metrics Page', amount: 2000 },
        { label: 'Projects & Kanban Module', amount: 2600 },
      ],
    },
    {
      id: 'inv4',
      invoiceNumber: 'INV-2024-004',
      description: 'Sprint 2 — API Integration & Launch',
      amount: 5800,
      issuedDate: '2024-06-01',
      dueDate: '2024-06-15',
      status: 'draft',
      items: [
        { label: 'API Integration Sprint', amount: 2800 },
        { label: 'QA & Bug Fixes', amount: 1500 },
        { label: 'Production Deployment & Handover', amount: 1500 },
      ],
    },
  ],

  // ── Approvals ─────────────────────────────────────────────
  approvals: [
    {
      id: 'ap1',
      title: 'Design System v1.0 Sign-off',
      description: 'Approve the complete design system including colour tokens, typography scale, spacing grid, and primary component set.',
      type: 'design',
      status: 'approved',
      requestedDate: '2024-03-27',
      resolvedDate: '2024-03-29',
      submittedBy: 'Sara Mitchell',
      attachmentLabel: 'design-system-v1.fig',
    },
    {
      id: 'ap2',
      title: 'Figma Prototype — Dashboard Screens',
      description: 'Review and approve the interactive prototype for all 6 primary dashboard screens before development handoff.',
      type: 'design',
      status: 'approved',
      requestedDate: '2024-04-22',
      resolvedDate: '2024-04-25',
      submittedBy: 'Sara Mitchell',
      attachmentLabel: 'dashboard-prototype-v2.fig',
    },
    {
      id: 'ap3',
      title: 'Analytics & Reports Module (Staging)',
      description: 'Please review the Analytics page on staging and approve before we merge to production. Focus on chart accuracy and responsive behaviour on mobile.',
      type: 'design',
      status: 'pending',
      requestedDate: '2024-05-08',
      submittedBy: 'James Nguyen',
      attachmentLabel: 'staging.pulsedesk.io/dashboard/analytics',
    },
    {
      id: 'ap4',
      title: 'Scope Extension — AI Insights Module',
      description: 'Requesting sign-off on a scope extension to include the AI-powered insight engine. This adds 6 development days and $3,200 to the project budget.',
      type: 'scope',
      status: 'revision-requested',
      requestedDate: '2024-04-30',
      submittedBy: 'Azizul Rabby',
      attachmentLabel: 'scope-extension-SOW-v1.pdf',
      feedback: 'Can we reduce the AI scope to risk detection only for now? Happy to discuss the upsell in phase 2.',
    },
  ],

  // ── Updates ───────────────────────────────────────────────
  updates: [
    {
      id: 'upd1',
      type: 'milestone',
      title: 'Milestone 2 complete — Component Library shipped ✅',
      body: 'We delivered all 48 components ahead of schedule. The interactive Figma prototype is ready for your review in the Approvals tab. Overall project health is excellent at 82/100.',
      author: 'Azizul Rabby',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anas',
      createdAt: '2024-04-25T10:00:00Z',
    },
    {
      id: 'upd2',
      type: 'progress',
      title: 'Sprint 1 — Week 2 Progress Update',
      body: 'Dashboard layout, sidebar, topbar, and project cards are complete. The Kanban board with drag-and-drop is live on staging. We are tracking at 72% against the sprint goal.',
      author: 'James Nguyen',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james',
      createdAt: '2024-05-06T09:00:00Z',
    },
    {
      id: 'upd3',
      type: 'deliverable',
      title: 'Analytics module submitted for review',
      body: 'The full Analytics page is deployed to staging at staging.pulsedesk.io. It includes 4 chart types and is fully responsive. Please review and share feedback within 3 business days.',
      author: 'James Nguyen',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james',
      createdAt: '2024-05-08T14:30:00Z',
    },
    {
      id: 'upd4',
      type: 'alert',
      title: '⚠️ API integration deadline at risk',
      body: 'Two third-party API blockers have been raised. We estimate a 3–5 day slip to the June 15 milestone. Mitigation plan is in progress — full details in the next standup.',
      author: 'Azizul Rabby',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anas',
      createdAt: '2024-05-09T08:00:00Z',
    },
    {
      id: 'upd5',
      type: 'meeting',
      title: 'Bi-weekly check-in — May 14, 10:00 AM GMT',
      body: 'Our next sync is scheduled for Tuesday May 14. Agenda: Sprint 2 planning, API blocker review, staging walkthrough, and invoice discussion. Calendar invite sent.',
      author: 'Azizul Rabby',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anas',
      createdAt: '2024-05-09T09:00:00Z',
    },
  ],

  // ── Downloadable Reports ──────────────────────────────────
  reports: [
    { id: 'rpt1', title: 'March Performance Report',     period: 'March 2024',    type: 'monthly',    fileSize: '1.2 MB', generatedDate: '2024-04-02', status: 'ready' },
    { id: 'rpt2', title: 'April Performance Report',     period: 'April 2024',    type: 'monthly',    fileSize: '1.4 MB', generatedDate: '2024-05-02', status: 'ready' },
    { id: 'rpt3', title: 'Milestone 1 — Completion',     period: 'Mar 2024',      type: 'milestone',  fileSize: '0.8 MB', generatedDate: '2024-03-29', status: 'ready' },
    { id: 'rpt4', title: 'Milestone 2 — Completion',     period: 'Apr 2024',      type: 'milestone',  fileSize: '0.9 MB', generatedDate: '2024-04-26', status: 'ready' },
    { id: 'rpt5', title: 'Week 18 Progress Report',      period: 'Week 18, 2024', type: 'weekly',     fileSize: '0.6 MB', generatedDate: '2024-05-05', status: 'ready' },
  ],
};
