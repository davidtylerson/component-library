'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import {
  IconCheck,
  IconClock,
  IconX,
  IconAlertCircle,
  IconCircle,
  IconCircleCheck,
  IconCircleX,
  IconClockHour4,
  IconPlane,
} from '@tabler/icons-react';

export type StatusType = 
  | 'pending'
  | 'in-progress'
  | 'completed'
  | 'cancelled'
  | 'in-dispute'
  | 'matched'
  | 'unmatched'
  | 'pending-return';

export interface StatusCellProps {
  status: StatusType;
  className?: string;
}

const StatusCell = React.forwardRef<HTMLDivElement, StatusCellProps>(
  ({ status, className }, ref) => {
    const getStatusConfig = () => {
      switch (status) {
        case 'pending':
          return {
            icon: IconClock,
            color: 'var(--fg-tertiary)',
            label: 'Pending'
          };
        case 'in-progress':
          return {
            icon: IconClockHour4,
            color: 'var(--fg-info)',
            label: 'In Progress'
          };
        case 'completed':
          return {
            icon: IconCheck,
            color: 'var(--fg-success)',
            label: 'Completed'
          };
        case 'cancelled':
          return {
            icon: IconX,
            color: 'var(--fg-tertiary)',
            label: 'Cancelled'
          };
        case 'in-dispute':
          return {
            icon: IconAlertCircle,
            color: 'var(--fg-warning)',
            label: 'In Dispute'
          };
        case 'matched':
          return {
            icon: IconCircleCheck,
            color: 'var(--fg-success)',
            label: 'Matched'
          };
        case 'unmatched':
          return {
            icon: IconCircleX,
            color: 'var(--fg-error)',
            label: 'Unmatched'
          };
        case 'pending-return':
          return {
            icon: IconPlane,
            color: 'var(--fg-warning)',
            label: 'Pending Return'
          };
        default:
          return {
            icon: IconCircle,
            color: 'var(--fg-tertiary)',
            label: 'Unknown'
          };
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

StatusCell.displayName = 'StatusCell';

// DocumentReviewState component for document review states
export type DocumentReviewStatus = 
  | 'in-dispute'
  | 'in-review'
  | 'not-matched'
  | 'return';

export interface DocumentReviewStateProps {
  state: DocumentReviewStatus;
  className?: string;
}

const DocumentReviewState = React.forwardRef<HTMLDivElement, DocumentReviewStateProps>(
  ({ state, className }, ref) => {
    const getConfig = () => {
      switch (state) {
        case 'in-dispute':
          return {
            icon: IconAlertCircle,
            color: 'var(--fg-warning)',
            label: 'In Dispute'
          };
        case 'in-review':
          return {
            icon: IconClockHour4,
            color: 'var(--fg-info)',
            label: 'In Review'
          };
        case 'not-matched':
          return {
            icon: IconCircleX,
            color: 'var(--fg-error)',
            label: 'Not Matched'
          };
        case 'return':
          return {
            icon: IconPlane,
            color: 'var(--fg-warning)',
            label: 'Return'
          };
        default:
          return {
            icon: IconCircle,
            color: 'var(--fg-tertiary)',
            label: 'Unknown'
          };
      }
    };

    const config = getConfig();
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

DocumentReviewState.displayName = 'DocumentReviewState';

// AgedState component for priority indicators
export type AgedLevel = 'high' | 'medium' | 'low';

export interface AgedStateProps {
  level: AgedLevel;
  className?: string;
}

const AgedState = React.forwardRef<HTMLDivElement, AgedStateProps>(
  ({ level, className }, ref) => {
    const getConfig = () => {
      switch (level) {
        case 'high':
          return {
            icon: IconAlertCircle,
            color: 'var(--fg-error)',
            label: 'High'
          };
        case 'medium':
          return {
            icon: IconClock,
            color: 'var(--fg-warning)',
            label: 'Medium'
          };
        case 'low':
          return {
            icon: IconCheck,
            color: 'var(--fg-success)',
            label: 'Low'
          };
      }
    };

    const config = getConfig() || { icon: IconCircle, color: 'var(--fg-tertiary)', label: 'Unknown' };
    const Icon = config.icon;

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-1 text-sm',
          className
        )}
      >
        <Icon className={cn('h-4 w-4')} style={{ color: config.color }} />
      </div>
    );
  }
);

AgedState.displayName = 'AgedState';

export { StatusCell, DocumentReviewState, AgedState };