"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
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

export interface StackedBarChartProps extends React.HTMLAttributes<HTMLDivElement> {
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
  showLegend?: boolean;
  showGrid?: boolean;
}

const StackedBarChart = React.forwardRef<HTMLDivElement, StackedBarChartProps>(
  ({ 
    className, 
    title, 
    description, 
    data, 
    dataKeys,
    xAxisKey,
    height = 300,
    showLegend = true,
    showGrid = true,
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
            <BarChart 
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
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
                stroke="var(--border-tertiary)"
                tick={{ fill: "var(--text-tertiary)" }}
              />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              {showLegend && <ChartLegend content={<ChartLegendContent />} />}
              {dataKeys.map(({ key, color }, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  stackId="a"
                  fill={`var(--color-${key})`}
                  radius={index === 0 ? [0, 0, 4, 4] : index === dataKeys.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                />
              ))}
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    );
  }
);

StackedBarChart.displayName = "StackedBarChart";

export { StackedBarChart };
