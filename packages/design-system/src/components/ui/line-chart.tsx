"use client";

import * as React from "react";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
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
  ChartTooltip,
  ChartTooltipContent,
} from "./chart";

export interface LineChartProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
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
  lineType?: 'monotone' | 'linear' | 'step' | 'stepBefore' | 'stepAfter';
  showAxes?: boolean;
  showLabels?: boolean;
  gradient?: boolean;
  interactive?: boolean;
  customDots?: boolean;
}

const LineChartComponent = React.forwardRef<HTMLDivElement, LineChartProps>(
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
    lineType = 'monotone',
    showAxes = false,
    showLabels = false,
    gradient = false,
    interactive = false,
    customDots = false,
    ...props 
  }, ref) => {
    // Build chart config from dataKeys
    const chartConfig = dataKeys.reduce((config, { key, label, color }) => {
      config[key] = { label, color };
      return config;
    }, {} as ChartConfig);

    return (
      <Card
        ref={ref}
        className={cn(className)}
        {...props}
      >
        <CardHeader>
          <CardTitle className="text-[var(--card-title-text)]">
            {title}
          </CardTitle>
          {description && (
            <CardDescription className="text-[var(--card-description-text)]">
              {description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="w-full">
            <LineChart 
              accessibilityLayer 
              data={data}
              width={undefined}
              height={height}
            >
              {showGrid && <CartesianGrid vertical={false} />}
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
              {dataKeys.map(({ key }) => (
                <Line
                  key={key}
                  type={lineType}
                  dataKey={key}
                  stroke={`var(--color-${key})`}
                  strokeWidth={strokeWidth}
                  dot={showDots ? (customDots ? { r: 6, fill: `var(--color-${key})` } : { r: 4 }) : false}
                  activeDot={interactive ? { r: 6, stroke: `var(--color-${key})`, strokeWidth: 2 } : { r: 6 }}
                  connectNulls={false}
                />
              ))}
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    );
  }
);

export { LineChartComponent as LineChart };
