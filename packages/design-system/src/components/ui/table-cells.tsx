'use client';

import * as React from 'react';
import { IconTrendingUp, IconTrendingDown, IconCheck, IconX } from '@tabler/icons-react';
import { cn } from '../../lib/utils';

interface CellTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'secondary' | 'success' | 'error' | 'warning';
}

export function CellText({
  children,
  className,
  variant = 'default',
}: CellTextProps) {
  const variantClasses = {
    default: 'text-text-secondary',
    secondary: 'text-text-secondary',
    success: 'text-text-success-primary',
    error: 'text-text-error-primary',
    warning: 'text-text-warning-primary',
  };

  return (
    <span className={cn(variantClasses[variant], className)}>{children}</span>
  );
}

interface CellTrendProps {
  direction: 'up' | 'down' | 'flat';
  value?: string | number;
  label?: string;
  variant?: 'default' | 'success' | 'error' | 'warning';
  className?: string;
}

export function CellTrend({
  direction,
  value,
  label,
  variant = 'default',
  className,
}: CellTrendProps) {
  const getVariantClasses = () => {
    if (variant === 'success') return 'text-text-success-primary';
    if (variant === 'error') return 'text-text-error-primary';
    if (variant === 'warning') return 'text-text-warning-primary';
    return 'text-text-secondary';
  };

  const getIcon = () => {
    if (direction === 'up') return <IconTrendingUp className="h-3 w-3" />;
    if (direction === 'down') return <IconTrendingDown className="h-3 w-3" />;
    return null;
  };

  return (
    <div
      className={cn('flex items-center gap-1', getVariantClasses(), className)}
    >
      {getIcon()}
      {value && <span>{value}</span>}
      {label && <span>{label}</span>}
    </div>
  );
}

interface CellBadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'outline';
  className?: string;
}

export function CellBadge({
  children,
  variant = 'default',
  className,
}: CellBadgeProps) {
  const variantClasses = {
    default: 'bg-bg-secondary text-text-secondary',
    success: 'bg-bg-success-secondary text-text-success-primary',
    error: 'bg-bg-error-secondary text-text-error-primary',
    warning: 'bg-bg-warning-secondary text-text-warning-primary',
    outline: 'border border-border-primary text-text-secondary',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded px-2 py-1 font-medium',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

interface CellPerformanceProps {
  level: 'top' | 'middle' | 'bottom';
  className?: string;
}

export function CellPerformance({
  level,
  className,
}: CellPerformanceProps) {
  const getConfig = () => {
    switch (level) {
      case 'top':
        return { 
          icon: IconCheck, 
          color: 'text-text-success-primary',
          label: 'Top Quartile'
        };
      case 'bottom':
        return { 
          icon: IconX, 
          color: 'text-text-error-primary',
          label: 'Bottom Quartile'
        };
      case 'middle':
        return { 
          icon: null, 
          color: 'text-text-secondary',
          label: 'Middle'
        };
    }
  };

  const config = getConfig();

  return (
    <div
      className={cn(
        'flex items-center gap-1',
        config.color,
        className
      )}
    >
      {config.icon && <config.icon className="h-3 w-3" />}
    </div>
  );
}

