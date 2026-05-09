import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'Is PulseDesk AI a real product or a portfolio demo?', a: 'PulseDesk AI is a portfolio project built to demonstrate production-grade MERN SaaS development. The codebase is fully functional with a real backend, authentication, and database — it serves as a living showcase of full-stack engineering capabilities.' },
  { q: 'What tech stack does PulseDesk AI use?', a: 'Frontend: React 18, TypeScript, Tailwind CSS, Framer Motion, Zustand, Recharts. Backend: Node.js, Express.js, MongoDB, Mongoose, JWT. The app is deployed on Vercel (frontend) and Render (backend).' },
  { q: 'Can I connect my own team and projects?', a: 'Absolutely. After registering, you can create a workspace, invite team members, add clients, and start managing real projects on the Kanban board with full CRUD functionality.' },
  { q: 'How does the AI insights feature work?', a: 'The AI engine analyzes project velocity, deadline proximity, team workload patterns, and client engagement signals to surface actionable insights. In the current version, insights are intelligently generated from real workspace data.' },
  { q: 'Is the mobile experience good?', a: 'Yes. PulseDesk AI is built mobile-first. The dashboard collapses to a bottom navigation on mobile, and all charts and cards are fully responsive. The landing page is optimized for all screen sizes.' },
  { q: 'What role-based access control is available?', a: 'Four roles: Owner (full access), Admin (manage workspace, members, projects), Member (manage assigned projects and tasks), Viewer (read-only). Permissions are enforced at both the frontend route and backend API level.' },
];

export const FAQSection: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-28 px-4">
      <div className="max-w-3xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-semibold text-blue-400 tracking-widest uppercase mb-4 px-3 py-1.5 glass border border-blue-500/20 rounded-full">
            FAQ
          </span>
          <h2 className="text-4xl font-display font-bold gradient-text mb-4">Questions answered</h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass border border-white/[0.08] rounded-2xl overflow-hidden"
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-white/[0.02] transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-sm font-medium text-white">{faq.q}</span>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 text-slate-500"
                >
                  <ChevronDown size={16} />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-5 text-sm text-slate-400 leading-relaxed border-t border-white/[0.06] pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
