import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glassy?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  onClick?: () => void;
  animate?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  glassy = false,
  hoverable = false,
  bordered = true,
  onClick,
  animate = false,
}) => {
  const base = `rounded-2xl ${bordered ? 'border border-white/[0.08]' : ''} ${
    glassy
      ? 'bg-white/[0.04] backdrop-blur-xl'
      : 'bg-[#0F172A]'
  } ${hoverable ? 'cursor-pointer transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]' : ''} ${className}`;

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={base}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={base} onClick={onClick}>
      {children}
    </div>
  );
};
