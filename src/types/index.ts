// ─── User Types ───────────────────────────────────────────────
export type UserRole = 'owner' | 'admin' | 'member' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  workspaces: string[];
  createdAt: string;
}

// ─── Workspace Types ───────────────────────────────────────────
export type WorkspacePlan = 'free' | 'pro' | 'enterprise';

export interface WorkspaceMember {
  user: string;
  role: Exclude<UserRole, 'owner'>;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  owner: string;
  members: WorkspaceMember[];
  plan: WorkspacePlan;
  createdAt: string;
}

// ─── Project Types ─────────────────────────────────────────────
export type ProjectStatus = 'planning' | 'active' | 'review' | 'completed' | 'on-hold';
export type Priority = 'low' | 'medium' | 'high' | 'critical';

export interface Project {
  id: string;
  workspace: string;
  name: string;
  description?: string;
  client?: string;
  status: ProjectStatus;
  priority: Priority;
  health: number;
  startDate: string;
  dueDate: string;
  assignedTo: string[];
  tags: string[];
  budget?: number;
  progress: number;
  createdAt: string;
}

// ─── Client Types ──────────────────────────────────────────────
export type ClientStatus = 'active' | 'inactive' | 'lead' | 'churned';

export interface Client {
  id: string;
  workspace: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  avatar?: string;
  status: ClientStatus;
  totalRevenue: number;
  projects: string[];
  tags: string[];
  createdAt: string;
}

// ─── Task Types ────────────────────────────────────────────────
export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done';

export interface Task {
  id: string;
  project: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  assignee?: string;
  dueDate?: string;
  order: number;
  labels: string[];
  createdAt: string;
}

// ─── Insight Types ─────────────────────────────────────────────
export type InsightType = 'risk' | 'opportunity' | 'performance' | 'suggestion';
export type InsightSeverity = 'low' | 'medium' | 'high';

export interface Insight {
  id: string;
  workspace: string;
  type: InsightType;
  title: string;
  body: string;
  severity: InsightSeverity;
  relatedProject?: string;
  isRead: boolean;
  createdAt: string;
}

// ─── Report Types ──────────────────────────────────────────────
export type ReportType = 'weekly' | 'monthly' | 'client' | 'performance';
export type ReportStatus = 'draft' | 'sent' | 'archived';

export interface Report {
  id: string;
  workspace: string;
  project?: string;
  client?: string;
  generatedBy: string;
  title: string;
  content: string;
  type: ReportType;
  period: { from: string; to: string };
  status: ReportStatus;
  createdAt: string;
}

// ─── Activity Types ────────────────────────────────────────────
export interface Activity {
  id: string;
  workspace: string;
  user: { id: string; name: string; avatar?: string };
  action: string;
  target: { type: string; id: string; name: string };
  metadata?: Record<string, unknown>;
  createdAt: string;
}

// ─── Analytics Types ───────────────────────────────────────────
export interface MetricStat {
  label: string;
  value: number | string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  prefix?: string;
  suffix?: string;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  secondary?: number;
}
