"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { cn } from "../../lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "./chart";

export interface AreaChartProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  data: Array<Record<string, any>>;
  dataKeys: Array<{
    key: string;
    label: string;
    color: string;
  }>;
  xAxisKey: string;
  height?: number;
  showGrid?: boolean;
  showDots?: boolean;
  strokeWidth?: number;
  // New props for variations
  areaType?: 'monotone' | 'linear' | 'step' | 'stepBefore' | 'stepAfter';
  showAxes?: boolean;
  showLegend?: boolean;
  gradient?: boolean;
  interactive?: boolean;
  customDots?: boolean;
  stacked?: boolean;
  stackedExpanded?: boolean;
  showIcons?: boolean;
}

const AreaChartComponent = React.forwardRef<HTMLDivElement, AreaChartProps>(
  ({ 
    className, 
    title, 
    description, 
    data, 
    dataKeys,
    xAxisKey,
    height = 300,
    showGrid = true,
    showDots = true,
    strokeWidth = 2,
    areaType = 'monotone',
    showAxes = false,
    showLegend = false,
    gradient = false,
    interactive = false,
    customDots = false,
    stacked = false,
    stackedExpanded = false,
    ...props 
  }, ref) => {
    // Build chart config from dataKeys
    const chartConfig = dataKeys.reduce((config, { key, label, color }) => {
      config[key] = { label, color };
      return config;
    }, {} as ChartConfig);

    return (
      <div
        ref={ref}
        className={cn(className)}
        {...props}
      >
        <ChartContainer config={chartConfig} className="w-full">
          <AreaChart 
            accessibilityLayer 
            data={data}
            width={undefined}
            height={height}
          >
            {showGrid && <CartesianGrid vertical={false} stroke="var(--border-tertiary)" />}
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              tickMargin={10}
              axisLine={showAxes}
              tickFormatter={(value) => value.slice(0, 3)}
              stroke="var(--border-tertiary)"
              tick={{ fill: "var(--text-tertiary)" }}
            />
            {showAxes && (
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                stroke="var(--border-tertiary)"
                tick={{ fill: "var(--text-tertiary)" }}
              />
            )}
            <ChartTooltip 
              content={<ChartTooltipContent hideLabel />}
              cursor={interactive ? { stroke: 'var(--color-border)', strokeWidth: 1 } : false}
            />
            {showLegend && <ChartLegend content={<ChartLegendContent />} />}
            {dataKeys.map(({ key }) => (
              <Area
                key={key}
                type={areaType}
                dataKey={key}
                stackId={stacked || stackedExpanded ? "a" : undefined}
                stroke={`var(--color-${key})`}
                fill={`var(--color-${key})`}
                strokeWidth={strokeWidth}
                dot={showDots ? (customDots ? { r: 6, fill: `var(--color-${key})` } : { r: 4 }) : false}
                activeDot={interactive ? { r: 6, stroke: `var(--color-${key})`, strokeWidth: 2 } : { r: 6 }}
                connectNulls={false}
                fillOpacity={gradient ? 0.8 : 1}
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </div>
    );
  }
);

export { AreaChartComponent as AreaChart };
