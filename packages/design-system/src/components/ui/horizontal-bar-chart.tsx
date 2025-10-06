"use client";

import * as React from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
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

export interface HorizontalBarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  data: Array<{
    name: string;
    value: number;
    max?: number;
  }>;
  dataKey?: string;
  color?: string;
  showMaxValue?: boolean;
  height?: number;
}

const HorizontalBarChart = React.forwardRef<HTMLDivElement, HorizontalBarChartProps>(
  ({ 
    className, 
    title, 
    description, 
    data, 
    dataKey = "value",
    color = "var(--color-brand-600)",
    showMaxValue = true,
    height = 300,
    ...props 
  }, ref) => {
    // Transform data for recharts
    const chartData = data.map(item => ({
      name: item.name,
      [dataKey]: item.value,
      max: item.max || Math.max(...data.map(d => d.value))
    }));

    const chartConfig = {
      [dataKey]: {
        label: "Value",
        color: color,
      },
    } satisfies ChartConfig;

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
              data={chartData}
              layout="vertical"
              margin={{
                left: -20,
                right: 20,
                top: 20,
                bottom: 20,
              }}
              width={undefined}
              height={height}
            >
              <XAxis 
                type="number" 
                dataKey={dataKey} 
                hide 
                domain={[0, 'dataMax']}
                stroke="var(--border-tertiary)"
                tick={{ fill: "var(--text-tertiary)" }}
              />
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value}
                width={80}
                stroke="var(--border-tertiary)"
                tick={{ fill: "var(--text-tertiary)" }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar 
                dataKey={dataKey} 
                fill={`var(--color-${dataKey})`} 
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
        {showMaxValue && (
          <CardContent className="pt-0">
            <div className="text-xs text-[var(--text-secondary)]">
              Max value: {Math.max(...data.map(d => d.value)).toLocaleString()}
            </div>
          </CardContent>
        )}
      </Card>
    );
  }
);

HorizontalBarChart.displayName = "HorizontalBarChart";

export { HorizontalBarChart };
