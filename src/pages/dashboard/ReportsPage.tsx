import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, FileText, Clock, 
  Download, Share2, ChevronRight, CheckCircle2,
  AlertTriangle, ArrowUpRight, Zap, ListChecks,
  Calendar, Building2, Target, History, RefreshCcw, Circle
} from 'lucide-react';
import { TopBar } from '../../components/layout/TopBar';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { mockReportHistory, mockGeneratedReport, type ReportSummary, type GeneratedReport } from '../../data/reportsData';
import { mockProjects } from '../../data/mockData';

// ─── Constants ────────────────────────────────────────────────
const REPORT_TYPES = [
  { id: 'monthly', label: 'Monthly Performance', desc: 'Full overview of project health and progress' },
  { id: 'weekly', label: 'Weekly Update', desc: 'Sprint progress, tasks completed, and blockers' },
  { id: 'client', label: 'Client Summary', desc: 'High-level executive summary for stakeholders' },
  { id: 'performance', label: 'Team Performance', desc: 'Workload analysis and productivity metrics' },
];

const statusBadgeColors: Record<string, 'blue' | 'green' | 'yellow' | 'purple' | 'gray'> = {
  draft: 'yellow',
  generated: 'blue',
  shared: 'purple',
  exported: 'green',
  archived: 'gray',
};

// ─── Components ───────────────────────────────────────────────

const TypewriterText: React.FC<{ text: string; delay?: number; onComplete?: () => void }> = ({ text, delay = 2, onComplete }) => {
  const [displayed, setDisplayed] = useState('');
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i += 3;
      if (i >= text.length + 3) {
        clearInterval(interval);
        onComplete?.();
      }
    }, delay);
    return () => clearInterval(interval);
  }, [text, delay, onComplete]);

  return <span>{displayed}</span>;
};

const MetricCard: React.FC<{ metric: GeneratedReport['metrics'][0] }> = ({ metric }) => (
  <div className="glass border border-white/[0.08] rounded-xl p-3">
    <p className="text-[10px] text-slate-500 mb-1">{metric.label}</p>
    <div className="flex items-end justify-between">
      <span className="text-lg font-bold text-white">{metric.value}</span>
      <div className={`flex items-center gap-0.5 text-[10px] font-medium ${
        metric.trend === 'up' ? 'text-emerald-400' : metric.trend === 'down' ? 'text-red-400' : 'text-slate-400'
      }`}>
        {metric.trend === 'up' ? <ArrowUpRight size={10} /> : metric.trend === 'down' ? <ArrowUpRight size={10} className="rotate-90" /> : null}
        {metric.change}%
      </div>
    </div>
  </div>
);

const InsightCard: React.FC<{ title: string; items: string[]; type: 'win' | 'risk' | 'action' | 'blocker' }> = ({ title, items, type }) => {
  const colors = {
    win: 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400',
    risk: 'border-amber-500/20 bg-amber-500/5 text-amber-400',
    action: 'border-blue-500/20 bg-blue-500/5 text-blue-400',
    blocker: 'border-red-500/20 bg-red-500/5 text-red-400',
  };
  
  const icons = {
    win: <CheckCircle2 size={12} />,
    risk: <AlertTriangle size={12} />,
    action: <Zap size={12} />,
    blocker: <AlertTriangle size={12} />,
  };

  return (
    <div className={`rounded-xl border p-4 ${colors[type]}`}>
      <div className="flex items-center gap-2 mb-3">
        {icons[type]}
        <h4 className="text-[11px] font-bold uppercase tracking-wider">{title}</h4>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-xs leading-relaxed text-slate-300">
            <span className="mt-1.5 w-1 h-1 rounded-full bg-current opacity-40 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────

const ReportsPage: React.FC = () => {
  const [step, setStep] = useState<'setup' | 'generating' | 'preview'>('setup');
  const [selectedProject, setSelectedProject] = useState(mockProjects[0].id);
  const [selectedType, setSelectedType] = useState('monthly');
  const [selectedPeriod, setSelectedPeriod] = useState('May 2024');
  const [history, setHistory] = useState<ReportSummary[]>(mockReportHistory);
  
  const [genProgress, setGenProgress] = useState(0);
  const [genLogs, setGenLogs] = useState<string[]>([]);
  
  const handleGenerate = () => {
    setStep('generating');
    setGenProgress(0);
    setGenLogs([]);
    
    const logs = [
      "Accessing workspace data...",
      "Analyzing NovaTech project timeline...",
      "Calculating team workload distributions...",
      "Compiling financial budget metrics...",
      "Running AI summarization engine...",
      "Identifying project risks and blockers...",
      "Formatting executive summary...",
      "Generating visual performance indicators...",
    ];

    let logIdx = 0;
    const interval = setInterval(() => {
      setGenProgress(prev => Math.min(prev + 1.2, 100));
      if (Math.random() > 0.7 && logIdx < logs.length) {
        setGenLogs(prev => [...prev, logs[logIdx]]);
        logIdx++;
      }
    }, 40);

    setTimeout(() => {
      clearInterval(interval);
      setGenProgress(100);
      setTimeout(() => setStep('preview'), 500);
    }, 4000);
  };

  const handleExport = (format: string) => {
    // Mock export
    alert(`Exporting as ${format}...`);
    if (step === 'preview') {
      const newReport: ReportSummary = {
        id: `r${Date.now()}`,
        title: mockGeneratedReport.title,
        type: mockGeneratedReport.type,
        clientId: mockGeneratedReport.clientId,
        projectId: mockGeneratedReport.projectId,
        period: mockGeneratedReport.period,
        status: 'exported',
        generatedAt: new Date().toISOString(),
        createdBy: 'u1',
      };
      setHistory(prev => [newReport, ...prev]);
    }
  };

  return (
    <div className="min-h-full">
      <TopBar title="AI Reports" subtitle="Automated intelligence for client communications" />
      
      <div className="p-6 max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-4 gap-6">
          
          {/* Left Column: Workflow / Preview */}
          <div className="lg:col-span-3 space-y-6">
            
            <AnimatePresence mode="wait">
              {step === 'setup' && (
                <motion.div 
                  key="setup"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }}
                  className="glass border border-white/[0.08] rounded-3xl p-8"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                      <Sparkles size={24} className="text-purple-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-display font-bold text-white">AI Report Generator</h2>
                      <p className="text-sm text-slate-500">Configure your report parameters to begin AI analysis</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                          <Building2 size={12} /> Target Project
                        </label>
                        <div className="space-y-2">
                          {mockProjects.slice(0, 3).map(p => (
                            <button
                              key={p.id}
                              onClick={() => setSelectedProject(p.id)}
                              className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                                selectedProject === p.id 
                                  ? 'bg-blue-500/10 border-blue-500/40 text-white' 
                                  : 'bg-white/[0.02] border-white/[0.08] text-slate-400 hover:border-white/20'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${p.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                <span className="text-sm font-medium">{p.name}</span>
                              </div>
                              {selectedProject === p.id && <CheckCircle2 size={16} className="text-blue-400" />}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                          <Calendar size={12} /> Date Range
                        </label>
                        <select 
                          value={selectedPeriod}
                          onChange={(e) => setSelectedPeriod(e.target.value)}
                          className="w-full bg-[#0F172A] border border-white/[0.08] rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-blue-500/50"
                        >
                          <option>May 2024 (To Date)</option>
                          <option>April 2024</option>
                          <option>March 2024</option>
                          <option>Q1 2024 Review</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                        <Target size={12} /> Report Type
                      </label>
                      <div className="space-y-3">
                        {REPORT_TYPES.map(type => (
                          <button
                            key={type.id}
                            onClick={() => setSelectedType(type.id)}
                            className={`w-full text-left p-4 rounded-2xl border transition-all ${
                              selectedType === type.id 
                                ? 'bg-purple-500/10 border-purple-500/40' 
                                : 'bg-white/[0.02] border-white/[0.08] hover:border-white/20'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className={`text-sm font-semibold ${selectedType === type.id ? 'text-white' : 'text-slate-300'}`}>
                                {type.label}
                              </span>
                              {selectedType === type.id && <Sparkles size={14} className="text-purple-400" />}
                            </div>
                            <p className="text-[11px] text-slate-500">{type.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 pt-8 border-t border-white/[0.08] flex justify-end">
                    <Button 
                      size="lg" 
                      variant="secondary" 
                      onClick={handleGenerate}
                      icon={<Sparkles size={18} />}
                      className="px-8"
                    >
                      Generate AI Report
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 'generating' && (
                <motion.div 
                  key="generating"
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}
                  className="glass border border-purple-500/20 rounded-3xl p-12 flex flex-col items-center justify-center min-h-[500px] text-center"
                >
                  <div className="relative mb-8">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                      className="w-24 h-24 rounded-full border-2 border-dashed border-purple-500/30"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles size={32} className="text-purple-400 animate-pulse" />
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-display font-bold text-white mb-2">Analyzing Workspace Data</h2>
                  <p className="text-sm text-slate-500 mb-8 max-w-xs mx-auto">
                    Our AI is currently synthesizing project metrics and team performance to build your summary.
                  </p>

                  <div className="w-64 h-1.5 bg-white/[0.06] rounded-full overflow-hidden mb-6">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${genProgress}%` }}
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                    />
                  </div>

                  <div className="w-full max-w-sm space-y-2 h-20 overflow-hidden">
                    <AnimatePresence>
                      {genLogs.slice(-3).map((log) => (
                        <motion.div
                          key={log}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-[11px] font-mono text-slate-500 flex items-center justify-center gap-2"
                        >
                          <CheckCircle2 size={10} className="text-emerald-500/50" />
                          {log}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}

              {step === 'preview' && (
                <motion.div 
                  key="preview"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Actions Header */}
                  <div className="flex items-center justify-between glass border border-white/[0.08] rounded-2xl p-4 sticky top-0 z-10 backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="sm" onClick={() => setStep('setup')} icon={<RefreshCcw size={14} />}>
                        Regenerate
                      </Button>
                      <div className="h-4 w-px bg-white/10 mx-1" />
                      <span className="text-[10px] text-slate-500 font-medium">Auto-saved as draft</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleExport('CSV')} icon={<ListChecks size={14} />}>CSV</Button>
                      <Button size="sm" variant="outline" onClick={() => handleExport('PDF')} icon={<Download size={14} />}>Export PDF</Button>
                      <Button size="sm" icon={<Share2 size={14} />}>Share Link</Button>
                    </div>
                  </div>

                  {/* Report Content */}
                  <div className="glass border border-white/[0.08] rounded-3xl p-8 space-y-10 bg-[#080D1A]">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge color="blue" className="mb-3">Generated by PulseDesk AI</Badge>
                        <h1 className="text-2xl font-display font-bold text-white mb-2">{mockGeneratedReport.title}</h1>
                        <p className="text-sm text-slate-500">
                          Period: {mockGeneratedReport.period} · Project: {mockProjects[0].name}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Generated On</p>
                        <p className="text-xs font-semibold text-white">{new Date().toLocaleDateString()}</p>
                      </div>
                    </div>

                    {/* Executive Summary */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Sparkles size={14} className="text-purple-400" /> Executive Summary
                      </h3>
                      <div className="text-sm text-slate-300 leading-relaxed font-serif bg-white/[0.01] border-l-2 border-purple-500/30 pl-6 py-2">
                        <TypewriterText text={mockGeneratedReport.executiveSummary} delay={1} />
                      </div>
                    </div>

                    {/* Core Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {mockGeneratedReport.metrics.map(m => (
                        <MetricCard key={m.label} metric={m} />
                      ))}
                    </div>

                    {/* Milestones & Tasks */}
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Milestone Progress</h3>
                        <div className="space-y-3">
                          {mockGeneratedReport.milestones.map((m, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                              <div className="flex items-center gap-3">
                                {m.status === 'completed' ? (
                                  <CheckCircle2 size={14} className="text-emerald-500" />
                                ) : m.status === 'in-progress' ? (
                                  <Clock size={14} className="text-blue-500" />
                                ) : (
                                  <Circle size={14} className="text-slate-700" />
                                )}
                                <span className={`text-xs ${m.status === 'completed' ? 'text-slate-300' : 'text-white'}`}>{m.title}</span>
                              </div>
                              <span className="text-[10px] text-slate-600">{m.date}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Task Breakdown</h3>
                        <div className="glass border border-white/[0.08] rounded-xl p-5">
                          <div className="flex h-4 rounded-full overflow-hidden mb-4">
                            <div className="bg-emerald-500" style={{ width: `${(mockGeneratedReport.taskProgress.completed/mockGeneratedReport.taskProgress.total)*100}%` }} />
                            <div className="bg-blue-500" style={{ width: `${(mockGeneratedReport.taskProgress.inProgress/mockGeneratedReport.taskProgress.total)*100}%` }} />
                            <div className="bg-white/10" style={{ width: `${(mockGeneratedReport.taskProgress.backlog/mockGeneratedReport.taskProgress.total)*100}%` }} />
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div>
                              <p className="text-[10px] text-slate-500">Done</p>
                              <p className="text-xs font-bold text-emerald-400">{mockGeneratedReport.taskProgress.completed}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-slate-500">Active</p>
                              <p className="text-xs font-bold text-blue-400">{mockGeneratedReport.taskProgress.inProgress}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-slate-500">Backlog</p>
                              <p className="text-xs font-bold text-slate-400">{mockGeneratedReport.taskProgress.backlog}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AI Insights Grid */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <InsightCard title="Key Successes" items={mockGeneratedReport.aiInsights.wins} type="win" />
                      <InsightCard title="Critical Risks" items={mockGeneratedReport.aiInsights.risks} type="risk" />
                      <InsightCard title="Recommended Actions" items={mockGeneratedReport.aiInsights.nextActions} type="action" />
                      <InsightCard title="Active Blockers" items={mockGeneratedReport.aiInsights.blockers} type="blocker" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Right Column: History */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <History size={14} className="text-slate-500" /> History
              </h3>
              <span className="text-[10px] text-slate-500">{history.length} total</span>
            </div>
            
            <div className="space-y-3">
              {history.map((r, i) => (
                <motion.div 
                  key={r.id} 
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ delay: i * 0.05 }}
                  className="glass border border-white/[0.08] rounded-2xl p-4 hover:border-white/15 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FileText size={14} className="group-hover:text-blue-400 transition-colors" />
                      <span className="text-xs font-medium text-white truncate max-w-[120px]">{r.title}</span>
                    </div>
                    <Badge color={statusBadgeColors[r.status]} className="text-[9px] uppercase">{r.status}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>{r.period}</span>
                    <span>{new Date(r.generatedAt).toLocaleDateString()}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button variant="outline" className="w-full text-xs" icon={<ChevronRight size={14} />}>
              View All Archives
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
