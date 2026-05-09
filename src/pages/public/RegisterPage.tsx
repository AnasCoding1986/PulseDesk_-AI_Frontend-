import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Mail, Lock, User, Building2, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import { mockTeam } from '../../data/mockData';
import { authService } from '../../services/authService';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [form, setForm] = useState({ name: '', email: '', workspace: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { user, token } = await authService.register({
        name: form.name,
        email: form.email,
        workspaceName: form.workspace,
        password: form.password,
      });
      login(user, token);
      navigate('/dashboard');
    } catch (err: any) {
      console.warn('Backend registration failed, attempting mock register', err);
      // Fallback to mock
      await new Promise((r) => setTimeout(r, 900));
      login({ ...mockTeam[0], name: form.name || 'New User', email: form.email || mockTeam[0].email }, 'mock-jwt-' + Date.now());
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="orb w-[500px] h-[500px] bg-purple-600/10 -top-40 -right-40" />
      <div className="orb w-[400px] h-[400px] bg-blue-600/10 -bottom-40 -left-40" />
      <div className="dot-grid absolute inset-0 opacity-40" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <Link to="/" className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)]">
            <Zap size={18} className="text-white" />
          </div>
          <span className="font-display font-bold text-xl text-white">PulseDesk<span className="text-blue-400"> AI</span></span>
        </Link>

        <div className="glass border border-white/[0.08] rounded-2xl p-8">
          <h1 className="text-2xl font-display font-bold text-white mb-1">Create your workspace</h1>
          <p className="text-slate-400 text-sm mb-8">Start managing your team in minutes</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { name: 'name', label: 'Full name', icon: User, type: 'text', placeholder: 'Azizul Rabby' },
              { name: 'email', label: 'Work email', icon: Mail, type: 'email', placeholder: 'you@company.com' },
              { name: 'workspace', label: 'Workspace name', icon: Building2, type: 'text', placeholder: 'Acme Agency' },
              { name: 'password', label: 'Password', icon: Lock, type: 'password', placeholder: '8+ characters' },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-xs font-medium text-slate-400 mb-2">{field.label}</label>
                <div className="relative">
                  <field.icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name as keyof typeof form]}
                    onChange={handleChange}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/60 focus:bg-white/[0.06] transition-all"
                    placeholder={field.placeholder}
                  />
                </div>
              </div>
            ))}

            <Button type="submit" loading={loading} className="w-full justify-center mt-2" iconRight={<ArrowRight size={16} />}>
              Create workspace
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
              Sign in
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-slate-600 mt-4">
          By creating an account you agree to our Terms and Privacy Policy
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
