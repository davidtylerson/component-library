"use client";

import * as React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './card';
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
    return (
      <Card
        ref={ref}
        className={cn("h-full flex flex-col", className)}
        {...props}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-text-primary">
            {title}
          </CardTitle>
          {icon && (
            <div className="h-4 w-4 text-text-secondary">
              {icon}
            </div>
          )}
        </CardHeader>
        <CardContent className="flex-1">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-text-primary">
              {value}
            </div>
            {subValue && (
              <div className="text-lg font-medium text-text-secondary">
                {subValue}
              </div>
            )}
            {description && (
              <p className="text-xs text-text-secondary">
                {description}
              </p>
            )}
          </div>
        </CardContent>
        {(change !== undefined && trend && comparison) && (
          <CardFooter>
            <div className="flex items-center text-sm">
              {trend === 'up' ? (
                <ArrowUp className="mr-1 h-4 w-4 text-text-success-primary" />
              ) : (
                <ArrowDown className="mr-1 h-4 w-4 text-text-error-primary" />
              )}
              <span className={cn(
                "font-medium",
                trend === 'up' ? 'text-text-success-primary' : 'text-text-error-primary'
              )}>
                {Math.abs(change)}% {comparison}
              </span>
            </div>
          </CardFooter>
        )}
      </Card>
    );
  }
);

MetricCard.displayName = "MetricCard";

export { MetricCard };