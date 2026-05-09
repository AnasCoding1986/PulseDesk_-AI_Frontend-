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
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold text-blue-400 tracking-widest uppercase mb-4 px-3 py-1.5 glass border border-blue-500/20 rounded-full">
            Pricing
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold gradient-text mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            Start free. Scale as your team grows. No hidden fees, no surprises.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative glass border ${plan.border} rounded-2xl p-7 flex flex-col ${
                plan.popular ? 'ring-1 ring-blue-500/40 shadow-[0_0_40px_rgba(59,130,246,0.12)]' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 ${plan.color}`}>
                <plan.icon size={20} />
              </div>

              <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
              <p className="text-slate-400 text-sm mb-5">{plan.description}</p>

              <div className="flex items-end gap-1 mb-6">
                <span className="text-4xl font-display font-extrabold text-white">
                  {plan.price === 0 ? 'Free' : `$${plan.price}`}
                </span>
                {plan.price > 0 && (
                  <span className="text-slate-500 text-sm mb-1">{plan.period}</span>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3 text-sm text-slate-300">
                    <Check size={14} className="text-emerald-400 flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.variant}
                className="w-full justify-center"
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
