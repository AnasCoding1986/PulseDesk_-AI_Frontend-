import type { Project, Client, User, Activity, Insight, MetricStat, ChartDataPoint, Task } from '../types';

// ─── Team Members ──────────────────────────────────────────────
export const mockTeam: User[] = [
  { id: 'u1', name: 'Azizul Rabby', email: 'anas@pulsedesk.io', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anas', role: 'owner', workspaces: ['ws1'], createdAt: '2024-01-01' },
  { id: 'u2', name: 'Sara Mitchell', email: 'sara@pulsedesk.io', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sara', role: 'admin', workspaces: ['ws1'], createdAt: '2024-01-15' },
  { id: 'u3', name: 'James Nguyen', email: 'james@pulsedesk.io', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james', role: 'member', workspaces: ['ws1'], createdAt: '2024-02-01' },
  { id: 'u4', name: 'Priya Sharma', email: 'priya@pulsedesk.io', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya', role: 'member', workspaces: ['ws1'], createdAt: '2024-02-10' },
  { id: 'u5', name: 'Leo Fernandez', email: 'leo@pulsedesk.io', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=leo', role: 'viewer', workspaces: ['ws1'], createdAt: '2024-03-01' },
];

// ─── Clients ───────────────────────────────────────────────────
export const mockClients: Client[] = [
  { id: 'c1', workspace: 'ws1', name: 'Alex Thornton', company: 'NovaTech Solutions', email: 'alex@novatech.io', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex', status: 'active', totalRevenue: 48500, projects: ['p1', 'p2'], tags: ['enterprise', 'saas'], createdAt: '2024-01-10' },
  { id: 'c2', workspace: 'ws1', name: 'Morgan Lee', company: 'Bloom Digital', email: 'morgan@bloomdigital.co', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=morgan', status: 'active', totalRevenue: 32000, projects: ['p3'], tags: ['agency'], createdAt: '2024-02-05' },
  { id: 'c3', workspace: 'ws1', name: 'Isabelle Cruz', company: 'Finlo App', email: 'isabel@finlo.app', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=isabel', status: 'lead', totalRevenue: 0, projects: [], tags: ['fintech', 'startup'], createdAt: '2024-03-20' },
  { id: 'c4', workspace: 'ws1', name: 'Chen Wei', company: 'ShipFast Logistics', email: 'chen@shipfast.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chen', status: 'active', totalRevenue: 19200, projects: ['p4'], tags: ['logistics'], createdAt: '2024-01-28' },
  { id: 'c5', workspace: 'ws1', name: 'Omar Hassan', company: 'Grova Health', email: 'omar@grovahealth.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=omar', status: 'inactive', totalRevenue: 8700, projects: [], tags: ['health'], createdAt: '2023-12-01' },
];

// ─── Projects ──────────────────────────────────────────────────
export const mockProjects: Project[] = [
  { id: 'p1', workspace: 'ws1', name: 'NovaTech Platform Redesign', description: 'Complete UI/UX overhaul of the NovaTech SaaS dashboard.', client: 'c1', status: 'active', priority: 'high', health: 82, startDate: '2024-03-01', dueDate: '2024-06-30', assignedTo: ['u1', 'u2', 'u3'], tags: ['ui', 'redesign'], budget: 28000, progress: 67, createdAt: '2024-03-01' },
  { id: 'p2', workspace: 'ws1', name: 'API Integration Sprint', description: 'Connect third-party payment and analytics APIs.', client: 'c1', status: 'review', priority: 'critical', health: 61, startDate: '2024-04-01', dueDate: '2024-05-15', assignedTo: ['u1', 'u4'], tags: ['api', 'backend'], budget: 12000, progress: 90, createdAt: '2024-04-01' },
  { id: 'p3', workspace: 'ws1', name: 'Bloom Marketing Microsite', description: 'Campaign landing page with A/B testing and animations.', client: 'c2', status: 'active', priority: 'medium', health: 94, startDate: '2024-04-15', dueDate: '2024-05-31', assignedTo: ['u2', 'u5'], tags: ['marketing', 'frontend'], budget: 8500, progress: 45, createdAt: '2024-04-15' },
  { id: 'p4', workspace: 'ws1', name: 'ShipFast Dashboard MVP', description: 'Real-time logistics tracking dashboard.', client: 'c4', status: 'planning', priority: 'high', health: 70, startDate: '2024-05-01', dueDate: '2024-07-15', assignedTo: ['u1', 'u3', 'u4'], tags: ['dashboard', 'real-time'], budget: 22000, progress: 12, createdAt: '2024-05-01' },
  { id: 'p5', workspace: 'ws1', name: 'Internal Analytics Tool', description: 'In-house analytics for tracking team performance.', client: undefined, status: 'completed', priority: 'low', health: 100, startDate: '2024-01-15', dueDate: '2024-03-31', assignedTo: ['u1'], tags: ['internal'], budget: 5000, progress: 100, createdAt: '2024-01-15' },
];

// ─── Tasks ─────────────────────────────────────────────────────
export const mockTasks: Task[] = [
  // NovaTech Platform Redesign (p1)
  { id: 't1',  project: 'p1', title: 'Design system audit',             description: 'Audit all existing components and create a unified token system for colors, spacing, and typography.', status: 'done',        priority: 'high',     assignee: 'u2', order: 0, labels: ['design', 'tokens'],           dueDate: '2024-03-20', createdAt: '2024-03-05' },
  { id: 't2',  project: 'p1', title: 'Component library setup',         description: 'Scaffold a shared component library with Storybook docs, covering Button, Card, Badge, Input, and Modal.', status: 'done',        priority: 'high',     assignee: 'u3', order: 1, labels: ['frontend', 'library'],        dueDate: '2024-03-25', createdAt: '2024-03-08' },
  { id: 't3',  project: 'p1', title: 'Dashboard layout rebuild',        description: 'Rebuild the main dashboard shell with sidebar, topbar, and responsive grid layout using the new design tokens.', status: 'in-progress', priority: 'critical', assignee: 'u1', order: 0, labels: ['frontend', 'ui'],              dueDate: '2024-05-10', createdAt: '2024-03-12' },
  { id: 't4',  project: 'p1', title: 'Chart & analytics views',         description: 'Implement Recharts-based revenue trends, project health, and team workload visualizations.', status: 'in-progress', priority: 'high',     assignee: 'u3', order: 1, labels: ['frontend', 'charts'],          dueDate: '2024-05-15', createdAt: '2024-03-15' },
  { id: 't5',  project: 'p1', title: 'Mobile responsive polish',        description: 'Audit all pages at 375px, 768px, and 1280px breakpoints. Fix overflows, font sizes, and touch targets.', status: 'review',      priority: 'medium',   assignee: 'u2', order: 0, labels: ['responsive', 'qa'],           dueDate: '2024-05-12', createdAt: '2024-04-01' },
  { id: 't6',  project: 'p1', title: 'Client UAT walkthrough',          description: 'Guide NovaTech stakeholders through the new dashboard, collect feedback, and log change requests.', status: 'todo',        priority: 'medium',   assignee: 'u1', order: 0, labels: ['qa', 'client'],               dueDate: '2024-05-20', createdAt: '2024-04-05' },
  { id: 't7',  project: 'p1', title: 'Production deployment',           description: 'Deploy to Vercel + Render with environment variables, domain setup, and post-launch smoke tests.', status: 'todo',        priority: 'critical', assignee: 'u1', order: 1, labels: ['devops', 'deploy'],            dueDate: '2024-06-28', createdAt: '2024-04-10' },

  // API Integration Sprint (p2)
  { id: 't8',  project: 'p2', title: 'Stripe payment gateway',          description: 'Integrate Stripe Checkout and Webhooks for subscription billing with idempotency keys.', status: 'done',        priority: 'critical', assignee: 'u1', order: 0, labels: ['backend', 'payments'],         dueDate: '2024-04-20', createdAt: '2024-04-02' },
  { id: 't9',  project: 'p2', title: 'Mixpanel analytics SDK',          description: 'Instrument all key user interactions and funnel steps in the frontend with Mixpanel events.', status: 'in-progress', priority: 'high',     assignee: 'u4', order: 0, labels: ['analytics', 'sdk'],           dueDate: '2024-05-12', createdAt: '2024-04-05' },
  { id: 't10', project: 'p2', title: 'Rate limiting & API security',    description: 'Add express-rate-limit, helmet.js, and JWT refresh token rotation to harden the API layer.', status: 'review',      priority: 'critical', assignee: 'u1', order: 0, labels: ['security', 'backend'],         dueDate: '2024-05-08', createdAt: '2024-04-08' },
  { id: 't11', project: 'p2', title: 'API documentation (Swagger)',     description: 'Auto-generate OpenAPI 3.0 docs from Express routes and publish to /api/docs endpoint.', status: 'todo',        priority: 'low',      assignee: 'u4', order: 0, labels: ['docs', 'backend'],             dueDate: '2024-05-14', createdAt: '2024-04-10' },

  // Bloom Marketing Microsite (p3)
  { id: 't12', project: 'p3', title: 'Landing page hero section',       description: 'Build the hero with Framer Motion entrance animation, headline, subheadline, and dual CTA buttons.', status: 'done',        priority: 'high',     assignee: 'u2', order: 0, labels: ['frontend', 'animation'],      dueDate: '2024-04-25', createdAt: '2024-04-16' },
  { id: 't13', project: 'p3', title: 'A/B test variant setup',          description: 'Configure Vercel Edge Middleware for A/B routing. Implement two headline variants and track conversions.', status: 'in-progress', priority: 'medium',   assignee: 'u5', order: 0, labels: ['ab-test', 'analytics'],       dueDate: '2024-05-18', createdAt: '2024-04-20' },
  { id: 't14', project: 'p3', title: 'SEO & OG meta tags',              description: 'Add per-page title/description, Open Graph tags, Twitter card meta, and structured data JSON-LD.', status: 'review',      priority: 'medium',   assignee: 'u2', order: 1, labels: ['seo', 'marketing'],           dueDate: '2024-05-10', createdAt: '2024-04-22' },
  { id: 't15', project: 'p3', title: 'Contact form & email flow',       description: 'Build the contact form with React Hook Form, connect to SendGrid, and add spam protection via reCAPTCHA.', status: 'todo',        priority: 'low',      assignee: 'u5', order: 0, labels: ['forms', 'email'],             dueDate: '2024-05-28', createdAt: '2024-04-25' },

  // ShipFast Dashboard MVP (p4)
  { id: 't16', project: 'p4', title: 'Requirements & wireframes',       description: 'Produce low-fidelity wireframes for all 6 dashboard screens based on the ShipFast PRD v1.2.', status: 'done',        priority: 'high',     assignee: 'u1', order: 0, labels: ['planning', 'design'],         dueDate: '2024-05-08', createdAt: '2024-05-01' },
  { id: 't17', project: 'p4', title: 'Real-time shipment map',          description: 'Integrate Mapbox GL JS with WebSocket feed to show live driver locations and delivery ETAs on the map.', status: 'in-progress', priority: 'critical', assignee: 'u3', order: 0, labels: ['maps', 'websocket'],          dueDate: '2024-06-20', createdAt: '2024-05-05' },
  { id: 't18', project: 'p4', title: 'Driver status table',             description: 'Build an infinite-scroll driver table with status filters, last-ping timestamp, and route assignment controls.', status: 'in-progress', priority: 'high',     assignee: 'u4', order: 1, labels: ['frontend', 'table'],          dueDate: '2024-06-25', createdAt: '2024-05-06' },
  { id: 't19', project: 'p4', title: 'Notification alert system',       description: 'Build in-app toast notifications and email alerts for delayed deliveries using BullMQ job queues.', status: 'todo',        priority: 'medium',   assignee: 'u3', order: 0, labels: ['notifications', 'backend'],    dueDate: '2024-07-05', createdAt: '2024-05-08' },
  { id: 't20', project: 'p4', title: 'Role-based dashboard views',      description: 'Implement dispatcher vs. driver vs. manager views with feature flags and RBAC middleware.', status: 'todo',        priority: 'high',     assignee: 'u1', order: 1, labels: ['auth', 'rbac'],               dueDate: '2024-07-10', createdAt: '2024-05-09' },

  // Internal Analytics Tool (p5)
  { id: 't21', project: 'p5', title: 'PostgreSQL schema design',        description: 'Design normalized schema for events, sessions, and funnel tables with proper indexing strategy.', status: 'done',        priority: 'high',     assignee: 'u1', order: 0, labels: ['backend', 'database'],        dueDate: '2024-02-15', createdAt: '2024-01-16' },
  { id: 't22', project: 'p5', title: 'Dashboard charts & export',       description: 'Build the final analytics charts and add CSV/PDF export functionality for weekly reports.', status: 'done',        priority: 'medium',   assignee: 'u1', order: 1, labels: ['frontend', 'export'],         dueDate: '2024-03-28', createdAt: '2024-02-20' },
];

// ─── Activity Feed ─────────────────────────────────────────────
export const mockActivity: Activity[] = [
  { id: 'a1', workspace: 'ws1', user: { id: 'u2', name: 'Sara Mitchell', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sara' }, action: 'completed_task', target: { type: 'task', id: 't1', name: 'Design system audit' }, createdAt: '2024-05-08T14:30:00Z' },
  { id: 'a2', workspace: 'ws1', user: { id: 'u1', name: 'Azizul Rabby', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anas' }, action: 'created_project', target: { type: 'project', id: 'p4', name: 'ShipFast Dashboard MVP' }, createdAt: '2024-05-08T11:15:00Z' },
  { id: 'a3', workspace: 'ws1', user: { id: 'u3', name: 'James Nguyen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james' }, action: 'updated_task', target: { type: 'task', id: 't4', name: 'Chart & analytics views' }, createdAt: '2024-05-08T10:00:00Z' },
  { id: 'a4', workspace: 'ws1', user: { id: 'u4', name: 'Priya Sharma', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya' }, action: 'added_client', target: { type: 'client', id: 'c3', name: 'Finlo App' }, createdAt: '2024-05-07T16:45:00Z' },
  { id: 'a5', workspace: 'ws1', user: { id: 'u1', name: 'Azizul Rabby', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anas' }, action: 'sent_report', target: { type: 'report', id: 'r1', name: 'April Performance Report' }, createdAt: '2024-05-07T09:00:00Z' },
  { id: 'a6', workspace: 'ws1', user: { id: 'u2', name: 'Sara Mitchell', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sara' }, action: 'reviewed_task', target: { type: 'task', id: 't5', name: 'Mobile responsive polish' }, createdAt: '2024-05-06T13:30:00Z' },
];

// ─── AI Insights ───────────────────────────────────────────────
export const mockInsights: Insight[] = [
  { id: 'i1', workspace: 'ws1', type: 'risk', title: 'API Sprint deadline at risk', body: 'The API Integration Sprint is 90% complete but has 2 critical blockers unresolved. At the current velocity, the May 15 deadline may slip by 3–5 days.', severity: 'high', relatedProject: 'p2', isRead: false, createdAt: '2024-05-08T08:00:00Z' },
  { id: 'i2', workspace: 'ws1', type: 'opportunity', title: 'Upsell opportunity with NovaTech', body: 'NovaTech Solutions has consumed 85% of their contracted deliverables ahead of schedule. This is a strong signal for a phase 2 contract conversation.', severity: 'medium', relatedProject: 'p1', isRead: false, createdAt: '2024-05-07T10:00:00Z' },
  { id: 'i3', workspace: 'ws1', type: 'performance', title: 'James Nguyen at peak output', body: 'James has closed 12 tasks this week — 40% above team average. Consider assigning him as lead on the ShipFast MVP for faster ramp-up.', severity: 'low', isRead: true, createdAt: '2024-05-06T09:30:00Z' },
  { id: 'i4', workspace: 'ws1', type: 'suggestion', title: 'Send Bloom progress update', body: 'The Bloom Marketing Microsite is 45% done and the last client update was 10 days ago. A proactive status email could strengthen client confidence.', severity: 'medium', relatedProject: 'p3', isRead: false, createdAt: '2024-05-05T14:00:00Z' },
];

// ─── Dashboard Metrics ─────────────────────────────────────────
export const mockMetrics: MetricStat[] = [
  { label: 'Total Revenue', value: 108400, change: 14.2, trend: 'up', prefix: '$' },
  { label: 'Active Projects', value: 3, change: 0, trend: 'neutral' },
  { label: 'Tasks Completed', value: 47, change: 22.4, trend: 'up' },
  { label: 'Active Clients', value: 4, change: -1, trend: 'down' },
];

// ─── Revenue Chart Data ────────────────────────────────────────
export const mockRevenueData: ChartDataPoint[] = [
  { label: 'Nov', value: 14200, secondary: 9800 },
  { label: 'Dec', value: 18500, secondary: 12400 },
  { label: 'Jan', value: 22100, secondary: 15000 },
  { label: 'Feb', value: 19800, secondary: 13200 },
  { label: 'Mar', value: 28600, secondary: 19500 },
  { label: 'Apr', value: 32400, secondary: 22800 },
  { label: 'May', value: 37200, secondary: 26100 },
];

// ─── Project Health Data ───────────────────────────────────────
export const mockHealthData: ChartDataPoint[] = [
  { label: 'Week 1', value: 72, secondary: 68 },
  { label: 'Week 2', value: 78, secondary: 74 },
  { label: 'Week 3', value: 75, secondary: 80 },
  { label: 'Week 4', value: 83, secondary: 77 },
  { label: 'Week 5', value: 81, secondary: 85 },
  { label: 'Week 6', value: 88, secondary: 82 },
];

// ─── Team Workload Data ────────────────────────────────────────
export const mockWorkloadData = [
  { name: 'Azizul', tasks: 14, hours: 38 },
  { name: 'Sara', tasks: 11, hours: 32 },
  { name: 'James', tasks: 16, hours: 41 },
  { name: 'Priya', tasks: 9, hours: 28 },
  { name: 'Leo', tasks: 5, hours: 18 },
];
