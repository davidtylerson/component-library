'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import {
  IconClock,
  IconX,
  IconAlertCircle,
  IconRotateClockwise,
  IconCircle,
  IconClockHour4,
  IconSignature,
  IconPlane,
} from '@tabler/icons-react';

// Workflow Status Cell for Affirmation and Confirmation workflows
export type ConfirmationStatus = 
  | 'pending_document'
  | 'in_review'
  | 'in_dispute'
  | 'pending_return'
  | 'pending_signature'
  | 'cancelled';

export type AffirmationStatus = 
  | 'pending_affirmation'
  | 'in_review'
  | 'in_dispute'
  | 'cancelled'
  | 'superceeded';

export type WorkflowStatusType = 'confirmation' | 'affirmation';

export interface WorkflowStatusCellProps {
  type: WorkflowStatusType;
  status: ConfirmationStatus | AffirmationStatus;
  className?: string;
}

const WorkflowStatusCell = React.forwardRef<HTMLDivElement, WorkflowStatusCellProps>(
  ({ type, status, className }, ref) => {
    const getStatusConfig = () => {
      if (type === 'confirmation') {
        switch (status as ConfirmationStatus) {
          case 'pending_document':
            return {
              icon: IconClock,
              color: 'var(--fg-tertiary)',
              label: 'Pending Document'
            };
          case 'in_review':
            return {
              icon: IconClockHour4,
              color: 'var(--fg-info)',
              label: 'In Review'
            };
          case 'in_dispute':
            return {
              icon: IconAlertCircle,
              color: 'var(--fg-warning)',
              label: 'In Dispute'
            };
          case 'pending_return':
            return {
              icon: IconPlane,
              color: 'var(--fg-warning)',
              label: 'Pending Return'
            };
          case 'pending_signature':
            return {
              icon: IconSignature,
              color: 'var(--fg-info)',
              label: 'Pending Signature'
            };
          case 'cancelled':
            return {
              icon: IconX,
              color: 'var(--fg-tertiary)',
              label: 'Cancelled'
            };
          default:
            return {
              icon: IconCircle,
              color: 'var(--fg-tertiary)',
              label: 'Unknown'
            };
        }
      } else {
        switch (status as AffirmationStatus) {
          case 'pending_affirmation':
            return {
              icon: IconClock,
              color: 'var(--fg-tertiary)',
              label: 'Pending Affirmation'
            };
          case 'in_review':
            return {
              icon: IconClockHour4,
              color: 'var(--fg-info)',
              label: 'In Review'
            };
          case 'in_dispute':
            return {
              icon: IconAlertCircle,
              color: 'var(--fg-warning)',
              label: 'In Dispute'
            };
          case 'cancelled':
            return {
              icon: IconX,
              color: 'var(--fg-tertiary)',
              label: 'Cancelled'
            };
          case 'superceeded':
            return {
              icon: IconRotateClockwise,
              color: 'var(--fg-tertiary)',
              label: 'Superceeded'
            };
          default:
            return {
              icon: IconCircle,
              color: 'var(--fg-tertiary)',
              label: 'Unknown'
            };
        }
      }
    };

    const config = getStatusConfig();
    const Icon = config.icon;

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-2 text-sm',
          className
        )}
      >
        <Icon className={cn('h-4 w-4')} style={{ color: config.color }} />
        <span className="text-text-secondary">{config.label}</span>
      </div>
    );
  }
);

WorkflowStatusCell.displayName = 'WorkflowStatusCell';

// AgedState Component - Clock icon with SLA-based colors and day counts
export type AgedLevel = 'within_sla' | 'approaching_sla' | 'over_sla';

export interface AgedStateProps {
  level: AgedLevel;
  days: number;
  className?: string;
}

const AgedState = React.forwardRef<HTMLDivElement, AgedStateProps>(
  ({ level, days, className }, ref) => {
    const getConfig = () => {
      switch (level) {
        case 'within_sla':
                return {
                  color: 'var(--fg-success)',
                  label: 'Within SLA'
                };
        case 'approaching_sla':
                return {
                  color: 'var(--fg-warning)',
                  label: 'Approaching SLA'
                };
        case 'over_sla':
                return {
                  color: 'var(--fg-error)',
                  label: 'Over SLA'
                };
      }
    };

    const config = getConfig();

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-1 text-sm',
          className
        )}
      >
        <IconClock className={cn('h-4 w-4')} style={{ color: config.color }} />
        <span className="text-text-secondary">{days}d</span>
      </div>
    );
  }
);

AgedState.displayName = 'AgedState';

export { WorkflowStatusCell, AgedState };