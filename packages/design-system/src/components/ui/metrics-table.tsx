"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export interface MetricItem {
  name: string;
  value: number;
  percentage: number;
  label?: string; // Optional label like "trades" for counterparties
  icon?: React.ReactNode; // Optional icon or logo to display before the name
}

export interface MetricsTableProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  items: MetricItem[];
  showRanking?: boolean; // For numbered lists like counterparties
}

const MetricsTable = React.forwardRef<HTMLDivElement, MetricsTableProps>(
  ({ className, title, items, showRanking = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-3", className)}
        {...props}
      >
        <div className="text-sm font-medium text-text-primary">
          {title}
        </div>
        <div className="space-y-1">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                {item.icon && (
                  <div className="flex-shrink-0 w-4 h-4 text-text-secondary">
                    {item.icon}
                  </div>
                )}
                <span className="text-text-primary">
                  {showRanking ? `${index + 1}. ` : ''}{item.name}
                </span>
              </div>
              <span className="text-text-secondary">
                {item.value.toLocaleString()}
                {item.label && ` ${item.label}`}
                <span className="ml-1 text-text-tertiary">
                  ({item.percentage}%)
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

MetricsTable.displayName = "MetricsTable";

export { MetricsTable };
