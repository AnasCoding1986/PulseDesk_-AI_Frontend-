import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Analytics', href: '#analytics' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export const LandingNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'pt-4' : 'pt-0'
        }`}
      >
        <div className={`mx-auto transition-all duration-500 ${
          scrolled 
            ? 'container-strict max-w-4xl glass-premium rounded-full border border-white/[0.08] shadow-[0_0_40px_rgba(0,0,0,0.3)]' 
            : 'max-w-7xl px-4 sm:px-6 lg:px-8 bg-transparent border-b border-white/[0.03]'
        }`}>
          <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? 'h-14 px-6' : 'h-20'}`}>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                <Zap size={16} className="text-white" />
              </div>
              <span className="font-display font-bold text-lg text-white tracking-tight">
                PulseDesk<span className="text-blue-400"> AI</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => navigate('/login')}
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                Sign in
              </button>
              <Button
                size="sm"
                onClick={() => navigate('/register')}
                iconRight={<ChevronRight size={14} />}
              >
                Get Started
              </Button>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 text-slate-400 hover:text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-40 glass-strong border-b border-white/[0.06] p-4 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="border-t border-white/[0.08] mt-2 pt-2 flex flex-col gap-2">
                <button
                  onClick={() => { navigate('/login'); setMobileOpen(false); }}
                  className="px-4 py-3 text-sm text-slate-400 hover:text-white text-left rounded-xl hover:bg-white/5"
                >
                  Sign in
                </button>
                <Button onClick={() => { navigate('/register'); setMobileOpen(false); }}>
                  Get Started Free
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
