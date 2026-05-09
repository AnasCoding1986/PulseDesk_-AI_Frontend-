import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

export const CTASection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="py-28 px-4">
      <div className="container-strict max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative glass-premium border border-white/[0.08] rounded-[2.5rem] p-16 sm:p-20 text-center overflow-hidden shadow-2xl"
        >
          {/* Background orbs inside card */}
          <div className="orb w-96 h-96 bg-blue-600/20 -top-20 -left-20" />
          <div className="orb w-96 h-96 bg-purple-600/20 -bottom-20 -right-20" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(59,130,246,0.5)]">
              <Zap size={36} className="text-white" />
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white mb-6 tracking-tight leading-[1.05]">
              Ready to run your <br className="hidden sm:block"/> ops smarter?
            </h2>
            <p className="text-blue-100/70 text-xl font-light mx-auto mb-12">
              Join teams using PulseDesk AI to ship faster, communicate better, and never miss a deadline again.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate('/register')}
                iconRight={<ArrowRight size={20} />}
                className="px-10 py-5 text-lg font-semibold bg-white text-blue-900 hover:bg-slate-100 hover:text-blue-950 border-none shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              >
                Start for free
              </Button>
              <Button
                size="lg"
                variant="ghost"
                onClick={() => navigate('/dashboard')}
                className="px-8 py-5 text-lg text-white hover:bg-white/10"
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
      <div className="container-strict flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Zap size={14} className="text-white" />
          </div>
          <span className="font-display font-bold text-white">PulseDesk <span className="text-blue-400">AI</span></span>
        </div>
        <p className="text-slate-500 text-sm text-center">
          Built by <a href="https://github.com/AnasCoding1986" className="text-blue-400 hover:text-blue-300 transition-colors">Azizul Rabby</a> · A MERN SaaS portfolio showcase
        </p>
        <div className="flex items-center gap-6 text-sm text-slate-500 font-medium">
          {['Privacy', 'Terms', 'GitHub'].map((l) => (
            <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
};
