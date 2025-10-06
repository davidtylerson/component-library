import * as React from 'react';
import { cn } from '../../lib/utils';
import { Badge } from './badge';
import {
  IconCheck,
  IconArrowBack,
  IconCircleDashed,
  IconLinkOff,
  IconSend,
  IconCancel,
  IconLink,
  IconCircleDotted,
} from '@tabler/icons-react';

interface StatusCellProps {
  status:
    | 'pending'
    | 'in-progress'
    | 'completed'
    | 'cancelled'
    | 'in-dispute'
    | 'matched'
    | 'unmatched'
    | 'pending-return';
  className?: string;
  showIcon?: boolean;
}

export function StatusCell({
  status,
  className,
  showIcon = true,
}: StatusCellProps) {
  const statusConfig = {
    pending: {
      label: 'Pending',
      icon: IconCircleDotted,
      iconColor: 'var(--fg-tertiary)', // rgba(160, 160, 171, 1)
      textColor: 'var(--text-secondary)', // #A0A0AB - matches Figma --colors-text-text-tertiary-600
    },
    'in-progress': {
      label: 'In Progress',
      icon: IconCircleDashed,
      iconColor: 'var(--text-brand-secondary)', // #6063bd - design system semantic color
      textColor: 'var(--text-secondary)', // #A0A0AB - matches Figma --colors-text-text-tertiary-600
    },
    completed: {
      label: 'Completed',
      icon: IconCheck,
      iconColor: 'var(--text-success-primary)', // #15803d - design system semantic color
      textColor: 'var(--text-secondary)', // #A0A0AB - matches Figma --colors-text-text-tertiary-600
    },
    cancelled: {
      label: 'Cancelled',
      icon: IconCancel,
      iconColor: 'var(--fg-secondary)', // rgba(209, 209, 214, 1)
      textColor: 'var(--text-secondary)', // #A0A0AB - matches Figma --colors-text-text-tertiary-600
    },
    'in-dispute': {
      label: 'In Dispute',
      icon: IconArrowBack,
      iconColor: 'var(--text-error-primary)', // #bd3e1e - design system semantic color
      textColor: 'var(--text-secondary)', // #A0A0AB - matches Figma --colors-text-text-tertiary-600
    },
    matched: {
      label: 'Matched',
      icon: IconLink,
      iconColor: 'var(--text-success-primary)', // #15803d - design system semantic color
      textColor: 'var(--text-secondary)', // #A0A0AB - matches Figma --colors-text-text-tertiary-600
    },
    unmatched: {
      label: 'Unmatched',
      icon: IconLinkOff,
      iconColor: 'var(--fg-tertiary)', // rgba(160, 160, 171, 1)
      textColor: 'var(--text-secondary)', // #A0A0AB - matches Figma --colors-text-text-tertiary-600
    },
    'pending-return': {
      label: 'Pending Return',
      icon: IconSend,
      iconColor: 'var(--fg-tertiary)', // rgba(160, 160, 171, 1)
      textColor: 'var(--text-secondary)', // #A0A0AB - matches Figma --colors-text-text-tertiary-600
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {showIcon && (
        <Icon
          size={16}
          style={{ color: config.iconColor }}
          className="flex-shrink-0"
        />
      )}
      <span className="text-sm font-normal" style={{ color: config.textColor }}>
        {config.label}
      </span>
    </div>
  );
}

// Document Review State component based on Figma specs
interface DocumentReviewStateProps {
  state: 'in-dispute' | 'in-review' | 'not-matched' | 'return';
  className?: string;
}

export function DocumentReviewState({
  state,
  className,
}: DocumentReviewStateProps) {
  const stateConfig = {
    'in-dispute': {
      label: 'Disputed',
      icon: IconArrowBack,
      iconColor: 'var(--text-error-primary)', // #bd3e1e - design system semantic color
      textColor: 'var(--text-secondary)', // #A0A0AB - matches Figma --colors-text-text-tertiary-600
    },
    'in-review': {
      label: 'In Review',
      icon: IconCircleDashed,
      iconColor: 'var(--text-brand-secondary)', // #6063bd - design system semantic color
      textColor: 'var(--text-secondary)', // #A0A0AB - matches Figma --colors-text-text-tertiary-600
    },
    'not-matched': {
      label: 'Not Matched',
      icon: IconLinkOff,
      iconColor: 'var(--text-disabled)', // #A0A0AB - matches Figma --colors-text-text-tertiary-600
      textColor: 'var(--text-secondary)', // #A0A0AB - matches Figma --colors-text-text-tertiary-600
    },
    return: {
      label: 'Return',
      icon: IconSend,
      iconColor: 'var(--text-disabled)', // #A0A0AB - matches Figma --colors-text-text-tertiary-600
      textColor: 'var(--text-secondary)', // #A0A0AB - matches Figma --colors-text-text-tertiary-600
    },
  };

  const config = stateConfig[state];
  const Icon = config.icon;

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <Icon
        size={16}
        style={{ color: config.iconColor }}
        className="flex-shrink-0"
      />
      <span className="text-sm font-normal" style={{ color: config.textColor }}>
        {config.label}
      </span>
    </div>
  );
}

// Aged State component for priority levels
interface AgedStateProps {
  level: 'high' | 'medium' | 'low';
  className?: string;
}

export function AgedState({ level, className }: AgedStateProps) {
  const levelConfig = {
    high: {
      label: 'High',
      variant: 'destructive' as const,
      size: 'sm' as const,
    },
    medium: {
      label: 'Medium',
      variant: 'outline' as const,
      size: 'sm' as const,
    },
    low: {
      label: 'Low',
      variant: 'primary' as const,
      size: 'sm' as const,
    },
  };

  const config = levelConfig[level];

  return (
    <Badge
      variant={config.variant}
      size={config.size}
      className={cn('text-xs font-normal', className)}
    >
      {config.label}
    </Badge>
  );
}
