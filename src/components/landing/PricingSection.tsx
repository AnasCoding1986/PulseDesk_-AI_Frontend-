import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Building2, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

const plans = [
  {
    name: 'Starter',
    icon: Zap,
    price: 0,
    period: 'forever',
    description: 'Perfect for freelancers and solo operators.',
    color: 'text-blue-400',
    border: 'border-white/[0.08]',
    features: [
      '1 workspace',
      'Up to 5 projects',
      'Up to 3 clients',
      'Basic analytics',
      'Kanban board',
      'Activity feed',
    ],
    cta: 'Get started free',
    variant: 'outline' as const,
    popular: false,
  },
  {
    name: 'Pro',
    icon: Building2,
    price: 29,
    period: '/month',
    description: 'For growing agencies and product teams.',
    color: 'text-blue-400',
    border: 'border-blue-500/40',
    features: [
      'Unlimited projects',
      'Unlimited clients',
      'AI insights engine',
      'Advanced analytics',
      'Report generator',
      'Role-based access',
      'Priority support',
    ],
    cta: 'Start Pro trial',
    variant: 'primary' as const,
    popular: true,
  },
  {
    name: 'Enterprise',
    icon: Crown,
    price: 99,
    period: '/month',
    description: 'For large teams with advanced security needs.',
    color: 'text-purple-400',
    border: 'border-white/[0.08]',
    features: [
      'Everything in Pro',
      'Multiple workspaces',
      'Custom AI models',
      'Client portal',
      'SSO / SAML',
      'Dedicated CSM',
      'SLA guarantee',
    ],
    cta: 'Contact sales',
    variant: 'secondary' as const,
    popular: false,
  },
];

export const PricingSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-28 px-4">
      <div className="container-strict">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="inline-block text-xs font-semibold text-blue-400 tracking-widest uppercase mb-6 px-4 py-2 glass-premium border border-blue-500/20 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.15)]">
            Pricing
          </span>
          <h2 className="text-5xl sm:text-6xl font-display font-extrabold gradient-text mb-6 tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-xl font-light">
            Start free. Scale as your team grows. No hidden fees, no surprises.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`relative glass-premium border ${plan.border} rounded-[2rem] p-8 sm:p-10 flex flex-col ${
                plan.popular 
                  ? 'ring-2 ring-blue-500/50 shadow-[0_0_80px_rgba(59,130,246,0.2)] lg:scale-105 z-10 bg-[#0B1221]' 
                  : 'z-0 opacity-90 hover:opacity-100 transition-opacity'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 shadow-lg">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-5 py-1.5 rounded-full tracking-wide">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner ${plan.color}`}>
                <plan.icon size={24} />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{plan.name}</h3>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed font-light">{plan.description}</p>

              <div className="flex items-end gap-1 mb-8">
                <span className="text-5xl font-display font-extrabold text-white tracking-tighter">
                  {plan.price === 0 ? 'Free' : `$${plan.price}`}
                </span>
                {plan.price > 0 && (
                  <span className="text-slate-500 text-base mb-1.5 font-medium">{plan.period}</span>
                )}
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3 text-sm text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-emerald-400" />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.variant}
                size="lg"
                className="w-full justify-center py-6 text-base"
                onClick={() => navigate('/register')}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
