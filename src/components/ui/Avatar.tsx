import React from 'react';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
};

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

function getColor(name: string) {
  const colors = [
    'from-blue-500 to-blue-700',
    'from-purple-500 to-purple-700',
    'from-emerald-500 to-emerald-700',
    'from-amber-500 to-amber-700',
    'from-teal-500 to-teal-700',
    'from-rose-500 to-rose-700',
  ];
  const idx = name.charCodeAt(0) % colors.length;
  return colors[idx];
}

export const Avatar: React.FC<AvatarProps> = ({ src, name, size = 'md', className = '' }) => {
  const sizeClass = sizeMap[size];

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${sizeClass} rounded-full object-cover ring-2 ring-white/10 flex-shrink-0 ${className}`}
      />
    );
  }

  return (
    <div className={`${sizeClass} rounded-full bg-gradient-to-br ${getColor(name)} flex items-center justify-center font-semibold text-white flex-shrink-0 ring-2 ring-white/10 ${className}`}>
      {getInitials(name)}
    </div>
  );
};

interface AvatarGroupProps {
  users: Array<{ name: string; avatar?: string }>;
  max?: number;
  size?: AvatarProps['size'];
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({ users, max = 4, size = 'sm' }) => {
  const visible = users.slice(0, max);
  const rest = users.length - max;
  return (
    <div className="flex -space-x-2">
      {visible.map((u, i) => (
        <Avatar key={i} name={u.name} src={u.avatar} size={size} />
      ))}
      {rest > 0 && (
        <div className={`${sizeMap[size]} rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs font-medium text-slate-300`}>
          +{rest}
        </div>
      )}
    </div>
  );
};
