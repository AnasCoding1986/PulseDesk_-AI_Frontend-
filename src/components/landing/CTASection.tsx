import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

export const CTASection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="py-28 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative glass border border-white/[0.08] rounded-3xl p-12 text-center overflow-hidden"
        >
          {/* Background orbs inside card */}
          <div className="orb w-80 h-80 bg-blue-600/15 -top-20 -left-20" />
          <div className="orb w-80 h-80 bg-purple-600/15 -bottom-20 -right-20" />

          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(59,130,246,0.4)]">
              <Zap size={26} className="text-white" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-bold gradient-text mb-4">
              Ready to run your ops smarter?
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10">
              Join teams using PulseDesk AI to ship faster, communicate better, and never miss a deadline again.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate('/register')}
                iconRight={<ArrowRight size={18} />}
                className="px-8"
              >
                Start for free — no credit card
              </Button>
              <Button
                size="lg"
                variant="ghost"
                onClick={() => navigate('/dashboard')}
              >
                View live demo →
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const LandingFooter: React.FC = () => {
  return (
    <footer className="border-t border-white/[0.06] py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Zap size={14} className="text-white" />
          </div>
          <span className="font-display font-bold text-white">PulseDesk <span className="text-blue-400">AI</span></span>
        </div>
        <p className="text-slate-500 text-sm text-center">
          Built by <a href="https://github.com/AnasCoding1986" className="text-blue-400 hover:text-blue-300 transition-colors">Azizul Rabby</a> · A MERN SaaS portfolio showcase
        </p>
        <div className="flex items-center gap-6 text-sm text-slate-500">
          {['Privacy', 'Terms', 'GitHub'].map((l) => (
            <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
};
