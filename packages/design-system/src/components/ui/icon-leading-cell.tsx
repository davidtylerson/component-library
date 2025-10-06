import * as React from 'react';
import { cn } from '../../lib/utils';
import { IconAlignRight, IconArrowDownRight, IconCoins, IconSwitchHorizontal } from '@tabler/icons-react';

interface IconLeadingCellProps {
  icon: React.ComponentType<{ className?: string; size?: number; style?: React.CSSProperties }>;
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
      <span className="text-sm font-normal text-[var(--text-disabled)] truncate">
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
      icon: IconAlignRight,
      text: 'Full Termination',
      iconColor: 'var(--text-brand-secondary)', // #6063bd - design system semantic color
      textColor: 'var(--text-disabled)', // #A0A0AB - matches Figma --colors-text-text-tertiary-600
    },
    'partial-term': {
      icon: IconArrowDownRight,
      text: 'Partial Termination',
      iconColor: 'var(--text-brand-secondary)', // #6063bd - design system semantic color
      textColor: 'var(--text-disabled)', // #A0A0AB - matches Figma --colors-text-text-tertiary-600
    },
    'novation': {
      icon: IconCoins,
      text: 'Novation',
      iconColor: 'var(--text-brand-secondary)', // #6063bd - design system semantic color
      textColor: 'var(--text-disabled)', // #A0A0AB - matches Figma --colors-text-text-tertiary-600
    },
    'execution': {
      icon: IconSwitchHorizontal,
      text: 'Execution',
      iconColor: 'var(--text-brand-secondary)', // #6063bd - design system semantic color
      textColor: 'var(--text-disabled)', // #A0A0AB - matches Figma --colors-text-text-tertiary-600
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
      <span
        className="text-sm font-normal"
        style={{ color: config.textColor }}
      >
        {config.text}
      </span>
    </div>
  );
}