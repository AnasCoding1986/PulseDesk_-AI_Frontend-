import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe, CheckCircle2, Clock, Circle, AlertTriangle,
  Download, FileText, ExternalLink, ChevronDown, ChevronUp,
  Calendar, DollarSign, Send, Star,
} from 'lucide-react';
import { TopBar } from '../../components/layout/TopBar';
import { Button } from '../../components/ui/Button';
import { mockClientPortal } from '../../data/portalData';
import type {
  MilestoneStatus, DeliverableStatus, InvoiceStatus,
  ApprovalStatus, UpdateType,
} from '../../data/portalData';


// ── helpers ──────────────────────────────────────────────────
const fmt = (d: string) =>
  new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const milestoneIcon: Record<MilestoneStatus, React.ReactNode> = {
  completed:   <CheckCircle2 size={16} className="text-emerald-400" />,
  'in-progress':<Clock size={16} className="text-blue-400" />,
  upcoming:    <Circle size={16} className="text-slate-600" />,
  'at-risk':   <AlertTriangle size={16} className="text-red-400" />,
};
const milestoneRing: Record<MilestoneStatus, string> = {
  completed:   'border-emerald-500/40 bg-emerald-500/10',
  'in-progress':'border-blue-500/40 bg-blue-500/10',
  upcoming:    'border-white/10 bg-white/[0.03]',
  'at-risk':   'border-red-500/40 bg-red-500/10',
};
const milestoneBar: Record<MilestoneStatus, string> = {
  completed:   'bg-emerald-500',
  'in-progress':'bg-blue-500',
  upcoming:    'bg-slate-700',
  'at-risk':   'bg-red-500',
};

const delivBadge: Record<DeliverableStatus, string> = {
  approved:        'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  'pending-review':'bg-blue-500/15 text-blue-400 border-blue-500/25',
  'in-progress':   'bg-blue-500/15 text-blue-400 border-blue-500/25',
  'not-started':   'bg-slate-500/15 text-slate-400 border-slate-500/25',
};
const delivLabel: Record<DeliverableStatus, string> = {
  approved: 'Approved', 'pending-review': 'In Review',
  'in-progress': 'In Progress', 'not-started': 'Not Started',
};

const invBadge: Record<InvoiceStatus, string> = {
  paid:    'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  pending: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
  overdue: 'bg-red-500/15 text-red-400 border-red-500/25',
  draft:   'bg-slate-500/15 text-slate-400 border-slate-500/25',
};

const aprvBadge: Record<ApprovalStatus, string> = {
  approved:            'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  pending:             'bg-blue-500/15 text-blue-400 border-blue-500/25',
  'revision-requested':'bg-orange-500/15 text-orange-400 border-orange-500/25',
  rejected:            'bg-red-500/15 text-red-400 border-red-500/25',
};
const aprvLabel: Record<ApprovalStatus, string> = {
  approved: 'Approved', pending: 'Awaiting Approval',
  'revision-requested': 'Revision Requested', rejected: 'Rejected',
};

const updateIcon: Record<UpdateType, React.ReactNode> = {
  milestone:   <Star size={13} className="text-emerald-400" />,
  progress:    <Clock size={13} className="text-blue-400" />,
  deliverable: <FileText size={13} className="text-purple-400" />,
  meeting:     <Calendar size={13} className="text-teal-400" />,
  alert:       <AlertTriangle size={13} className="text-red-400" />,
};
const updateBg: Record<UpdateType, string> = {
  milestone:   'bg-emerald-500/10 border-emerald-500/20',
  progress:    'bg-blue-500/10 border-blue-500/20',
  deliverable: 'bg-purple-500/10 border-purple-500/20',
  meeting:     'bg-teal-500/10 border-teal-500/20',
  alert:       'bg-red-500/10 border-red-500/20',
};

// ── Section wrapper ───────────────────────────────────────────
const Section: React.FC<{ title: string; subtitle?: string; children: React.ReactNode; delay?: number }> = ({ title, subtitle, children, delay = 0 }) => (
  <motion.section
    initial={{ opacity: 0, y: 22 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5, ease: 'easeOut' }}
    className="glass border border-white/[0.08] rounded-2xl p-6"
  >
    <div className="mb-5">
      <h2 className="text-sm font-bold text-white">{title}</h2>
      {subtitle && <p className="text-[11px] text-slate-500 mt-0.5">{subtitle}</p>}
    </div>
    {children}
  </motion.section>
);

// ── Page ─────────────────────────────────────────────────────
const ClientPortalPage: React.FC = () => {
  const p = mockClientPortal;
  const [openInv, setOpenInv] = useState<string | null>(null);
  const [tab, setTab] = useState<'updates' | 'approvals'>('updates');

  const budgetPct = Math.round((p.budgetSpent / p.totalBudget) * 100);
  const paidTotal = p.invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0);
  const pendingTotal = p.invoices.filter(i => i.status === 'pending').reduce((s, i) => s + i.amount, 0);
  const pendingApprovals = p.approvals.filter(a => a.status === 'pending').length;

  return (
    <div className="min-h-full">
      <TopBar title="Client Portal" subtitle="Shared project workspace for NovaTech Solutions" />

      <div className="p-6 space-y-6 max-w-[1400px] mx-auto">

        {/* ── Hero banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent p-6"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <img src={p.clientAvatar} alt={p.clientName} className="w-14 h-14 rounded-2xl ring-2 ring-blue-500/30 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Globe size={13} className="text-blue-400" />
                <span className="text-[11px] text-blue-400 font-semibold tracking-wide uppercase">Client Portal</span>
              </div>
              <h1 className="text-xl font-display font-bold text-white">{p.projectName}</h1>
              <p className="text-sm text-slate-400">{p.clientCompany} · Account Manager: {p.accountManager}</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0 flex-wrap">
              <Button size="sm" variant="outline" icon={<Send size={13} />}>Message Team</Button>
              <Button size="sm" icon={<ExternalLink size={13} />}>View Staging</Button>
            </div>
          </div>

          {/* Summary stats */}
          <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            {[
              { label: 'Overall Progress', value: `${p.overallProgress}%`, sub: `Health ${p.healthScore}/100`, color: 'text-blue-400' },
              { label: 'Budget Used', value: `${budgetPct}%`, sub: `$${p.budgetSpent.toLocaleString()} / $${p.totalBudget.toLocaleString()}`, color: 'text-purple-400' },
              { label: 'Milestones', value: `${p.milestones.filter(m => m.status === 'completed').length}/${p.milestones.length}`, sub: 'Completed on time', color: 'text-emerald-400' },
              { label: 'Pending Actions', value: String(pendingApprovals), sub: 'Awaiting your approval', color: pendingApprovals > 0 ? 'text-blue-400' : 'text-emerald-400' },
            ].map((s) => (
              <div key={s.label} className="glass border border-white/[0.08] rounded-xl p-4">
                <p className="text-[10px] text-slate-500 mb-1">{s.label}</p>
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-[10px] text-slate-600 mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Main 2-col grid ── */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Left col (2/3) */}
          <div className="lg:col-span-2 space-y-6">

            {/* Milestone Timeline */}
            <Section title="Project Timeline" subtitle={`${fmt(p.startDate)} → ${fmt(p.endDate)}`} delay={0.1}>
              <div className="space-y-3">
                {p.milestones.map((m, i) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                    className={`flex gap-4 p-4 rounded-xl border ${milestoneRing[m.status]}`}
                  >
                    {/* Line + icon */}
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#070B14] border border-white/10">
                        {milestoneIcon[m.status]}
                      </div>
                      {i < p.milestones.length - 1 && (
                        <div className={`w-px flex-1 min-h-[16px] ${m.status === 'completed' ? 'bg-emerald-500/30' : 'bg-white/[0.06]'}`} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-white">{m.title}</h3>
                        <span className="text-[10px] text-slate-500 flex-shrink-0">
                          {m.completedDate ? `✓ ${fmt(m.completedDate)}` : `Due ${fmt(m.dueDate)}`}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mb-2 leading-relaxed">{m.description}</p>
                      {m.progress > 0 && (
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${m.progress}%` }}
                              transition={{ duration: 0.8, delay: 0.3 + i * 0.07 }}
                              className={`h-full rounded-full ${milestoneBar[m.status]}`}
                            />
                          </div>
                          <span className="text-[10px] text-slate-500 w-8 text-right">{m.progress}%</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Section>

            {/* Deliverables */}
            <Section title="Deliverables" subtitle={`${p.deliverables.filter(d => d.status === 'approved').length} of ${p.deliverables.length} approved`} delay={0.15}>
              <div className="divide-y divide-white/[0.04]">
                {p.deliverables.map((d, i) => (
                  <motion.div
                    key={d.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                    className="py-3 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border ${delivBadge[d.status]}`}>
                            {delivLabel[d.status]}
                          </span>
                          {d.version > 0 && (
                            <span className="text-[10px] text-slate-600">v{d.version}</span>
                          )}
                        </div>
                        <p className="text-xs font-semibold text-white mt-1">{d.title}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed line-clamp-2">{d.description}</p>
                        {d.feedback && (
                          <p className="text-[10px] text-orange-400 mt-1 bg-orange-500/10 border border-orange-500/20 rounded-lg px-2 py-1">
                            💬 {d.feedback}
                          </p>
                        )}
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <p className="text-[10px] text-slate-600">Due {fmt(d.dueDate)}</p>
                        {d.fileType && d.status !== 'not-started' && (
                          <button className="mt-1.5 flex items-center gap-1 text-[10px] text-blue-400 hover:text-blue-300 transition-colors">
                            <ExternalLink size={10} />{d.fileType}
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Section>
          </div>

          {/* Right col (1/3) */}
          <div className="space-y-6">

            {/* Updates + Approvals tabs */}
            <Section title="" delay={0.2}>
              {/* Tabs */}
              <div className="flex gap-1 glass border border-white/[0.08] rounded-xl p-1 mb-4 -mt-1">
                {(['updates', 'approvals'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`relative flex-1 py-2 rounded-lg text-xs font-medium capitalize transition-all ${tab === t ? 'text-white' : 'text-slate-500 hover:text-white'}`}
                  >
                    {tab === t && (
                      <motion.div layoutId="portal-tab" className="absolute inset-0 bg-blue-500/15 border border-blue-500/25 rounded-lg" />
                    )}
                    <span className="relative z-10">
                      {t === 'approvals' ? `Approvals${pendingApprovals > 0 ? ` (${pendingApprovals})` : ''}` : 'Updates'}
                    </span>
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {tab === 'updates' ? (
                  <motion.div key="updates" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                    {p.updates.map((u) => (
                      <div key={u.id} className={`p-3 rounded-xl border ${updateBg[u.type]}`}>
                        <div className="flex items-center gap-2 mb-1.5">
                          {updateIcon[u.type]}
                          <span className="text-xs font-semibold text-white leading-snug">{u.title}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-relaxed">{u.body}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <img src={u.authorAvatar} className="w-4 h-4 rounded-full" alt={u.author} />
                          <span className="text-[10px] text-slate-600">{u.author} · {fmt(u.createdAt)}</span>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div key="approvals" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                    {p.approvals.map((a) => (
                      <div key={a.id} className="p-3 rounded-xl border border-white/[0.08] bg-white/[0.02]">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="text-xs font-semibold text-white leading-snug">{a.title}</p>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-lg border flex-shrink-0 ${aprvBadge[a.status]}`}>
                            {aprvLabel[a.status]}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-relaxed mb-2">{a.description}</p>
                        {a.feedback && (
                          <p className="text-[10px] text-orange-300 bg-orange-500/10 border border-orange-500/20 rounded-lg px-2 py-1 mb-2">
                            💬 "{a.feedback}"
                          </p>
                        )}
                        {a.status === 'pending' && (
                          <div className="flex gap-2 mt-2">
                            <button className="flex-1 text-[10px] font-semibold py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/25 transition-all">
                              Approve
                            </button>
                            <button className="flex-1 text-[10px] font-semibold py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all">
                              Request Changes
                            </button>
                          </div>
                        )}
                        {a.attachmentLabel && (
                          <button className="flex items-center gap-1 text-[10px] text-blue-400 hover:text-blue-300 transition-colors mt-1">
                            <ExternalLink size={9} />{a.attachmentLabel}
                          </button>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </Section>

            {/* Invoices */}
            <Section title="Invoice Summary" subtitle={`$${paidTotal.toLocaleString()} paid · $${pendingTotal.toLocaleString()} pending`} delay={0.25}>
              <div className="space-y-2">
                {p.invoices.map((inv) => (
                  <div key={inv.id}>
                    <button
                      onClick={() => setOpenInv(openInv === inv.id ? null : inv.id)}
                      className="w-full flex items-center justify-between py-2.5 hover:bg-white/[0.03] rounded-xl px-1 transition-all"
                    >
                      <div className="text-left">
                        <p className="text-xs font-semibold text-white">{inv.invoiceNumber}</p>
                        <p className="text-[10px] text-slate-500">{fmt(inv.dueDate)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">${inv.amount.toLocaleString()}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-lg border capitalize ${invBadge[inv.status]}`}>
                          {inv.status}
                        </span>
                        {openInv === inv.id ? <ChevronUp size={12} className="text-slate-500" /> : <ChevronDown size={12} className="text-slate-500" />}
                      </div>
                    </button>
                    <AnimatePresence>
                      {openInv === inv.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pb-2 px-1 space-y-1">
                            {inv.items.map((item) => (
                              <div key={item.label} className="flex justify-between text-[10px]">
                                <span className="text-slate-500">{item.label}</span>
                                <span className="text-slate-300">${item.amount.toLocaleString()}</span>
                              </div>
                            ))}
                            {inv.status === 'pending' && (
                              <Button size="sm" className="w-full mt-2" icon={<DollarSign size={12} />}>Pay Now</Button>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="h-px bg-white/[0.04] last:hidden" />
                  </div>
                ))}
              </div>
            </Section>

            {/* Downloadable Reports */}
            <Section title="Reports" subtitle="Download project reports" delay={0.3}>
              <div className="space-y-2">
                {p.reports.map((r) => (
                  <div key={r.id} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                        <FileText size={12} className="text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-white">{r.title}</p>
                        <p className="text-[10px] text-slate-500">{r.period} · {r.fileSize}</p>
                      </div>
                    </div>
                    <button className="w-7 h-7 rounded-lg glass border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/30 transition-all">
                      <Download size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPortalPage;
