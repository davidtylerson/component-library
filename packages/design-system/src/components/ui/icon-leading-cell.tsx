import * as React from 'react';
import { cn } from '../../lib/utils';
import {
  IconArrowDownRight,
  IconArrowsRightLeft,
  IconArrowBarToRight,
  IconChartCircles,
} from '@tabler/icons-react';

interface IconLeadingCellProps {
  icon: React.ComponentType<{
    className?: string;
    size?: number;
    style?: React.CSSProperties;
  }>;
  text: string;
  className?: string;
  iconSize?: number;
  iconColor?: string;
}

export function IconLeadingCell({
  icon: Icon,
  text,
  className,
  iconSize = 16,
  iconColor = 'var(--text-brand-secondary)', // #6063bd - design system semantic color
}: IconLeadingCellProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <Icon
        size={iconSize}
        style={{ color: iconColor }}
        className="flex-shrink-0"
      />
      <span className="truncate font-normal text-[var(--text-disabled)]">
        {text}
      </span>
    </div>
  );
}

// Trade Type specific component based on Figma specs
interface TradeTypeCellProps {
  type: 'full-term' | 'partial-term' | 'novation' | 'execution';
  className?: string;
}

export function TradeTypeCell({ type, className }: TradeTypeCellProps) {
  const tradeTypeConfig = {
    'full-term': {
      icon: IconArrowBarToRight,
      text: 'Full Termination',
      iconColor: 'var(--fg-brand-primary)',
      textColor: 'var(--text-disabled)',
    },
    'partial-term': {
      icon: IconArrowDownRight,
      text: 'Partial Termination',
      iconColor: 'var(--fg-brand-primary)',
      textColor: 'var(--text-disabled)',
    },
    novation: {
      icon: IconChartCircles,
      text: 'Novation',
      iconColor: 'var(--fg-brand-primary)',
      textColor: 'var(--text-disabled)',
    },
    execution: {
      icon: IconArrowsRightLeft,
      text: 'Execution',
      iconColor: 'var(--fg-brand-primary)',
      textColor: 'var(--text-disabled)',
    },
  };

  const config = tradeTypeConfig[type];
  const Icon = config.icon;

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <Icon
        size={16}
        style={{ color: config.iconColor }}
        className="flex-shrink-0"
      />
      <span className="font-normal" style={{ color: config.textColor }}>
        {config.text}
      </span>
    </div>
  );
}
