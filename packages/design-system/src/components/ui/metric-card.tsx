"use client";

import * as React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { cn } from '../../lib/utils';

export interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string;
  description?: string;
  icon?: React.ReactNode;
  // Enhanced props
  subValue?: string;
  change?: number;
  trend?: 'up' | 'down';
  comparison?: string;
  status?: 'good' | 'warning' | 'danger';
}

const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  ({ className, title, value, description, icon, subValue, change, trend, comparison, status, ...props }, ref) => {
    // Get status-based styling
    const getStatusStyling = (status?: string) => {
      switch (status) {
        case 'good':
          return 'border-[var(--color-success-200)] bg-[var(--color-success-50)]';
        case 'warning':
          return 'border-[var(--color-warning-200)] bg-[var(--color-warning-50)]';
        case 'danger':
          return 'border-[var(--color-error-200)] bg-[var(--color-error-50)]';
        default:
          return 'border-[var(--card-border-default)] bg-[var(--card-bg-default)]';
      }
    };

    const getStatusTextColor = (status?: string) => {
      switch (status) {
        case 'good':
          return 'text-[var(--color-success-600)]';
        case 'warning':
          return 'text-[var(--color-warning-600)]';
        case 'danger':
          return 'text-[var(--color-error-600)]';
        default:
          return 'text-[var(--text-primary)]';
      }
    };

    return (
      <Card
        ref={ref}
        className={cn(
          'border-2 transition-colors',
          getStatusStyling(status),
          className
        )}
        {...props}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-[var(--card-title-text)]">
            {title}
          </CardTitle>
          {icon && (
            <div className="h-4 w-4 text-[var(--text-secondary)]">
              {icon}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-[var(--text-primary)]">
              {value}
            </div>
            {subValue && (
              <div className="text-lg font-medium text-[var(--text-secondary)]">
                {subValue}
              </div>
            )}
            {description && (
              <p className="text-xs text-[var(--text-secondary)]">
                {description}
              </p>
            )}
            {(change !== undefined && trend && comparison) && (
              <div className="flex items-center text-sm">
                {trend === 'up' ? (
                  <ArrowUp className="mr-1 h-4 w-4 text-[var(--color-success-600)]" />
                ) : (
                  <ArrowDown className="mr-1 h-4 w-4 text-[var(--color-error-600)]" />
                )}
                <span className={cn(
                  "font-medium",
                  trend === 'up' ? 'text-[var(--color-success-600)]' : 'text-[var(--color-error-600)]'
                )}>
                  {Math.abs(change)}% {comparison}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);

MetricCard.displayName = "MetricCard";

export { MetricCard };