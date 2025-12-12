'use client';

import React, { useState, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Group } from '@visx/group';
import { Bar as VisxBar } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { GridRows } from '@visx/grid';
import { LinePath } from '@visx/shape';
import { curveMonotoneX } from '@visx/curve';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { useTooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';

// Sample data for charts
const barData = [
  { month: 'Jan', revenue: 4200, target: 5000 },
  { month: 'Feb', revenue: 5800, target: 5000 },
  { month: 'Mar', revenue: 7200, target: 5000 },
  { month: 'Apr', revenue: 6500, target: 5000 },
  { month: 'May', revenue: 8100, target: 5000 },
  { month: 'Jun', revenue: 9400, target: 5000 },
];

const lineData = [
  { month: 'Jan', value: 85, benchmark: 80 },
  { month: 'Feb', value: 88, benchmark: 80 },
  { month: 'Mar', value: 82, benchmark: 80 },
  { month: 'Apr', value: 90, benchmark: 80 },
  { month: 'May', value: 93, benchmark: 80 },
  { month: 'Jun', value: 95, benchmark: 80 },
];

// Visx Bar Chart Component
function VisxBarChart({ width, height }: { width: number; height: number }) {
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip<{ month: string; type: string; value: number }>();

  const margin = { top: 20, right: 20, bottom: 40, left: 60 };
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // Scales
  const xScale = scaleBand<string>({
    domain: barData.map(d => d.month),
    range: [0, xMax],
    padding: 0.3,
  });

  const yScale = scaleLinear<number>({
    domain: [
      0,
      Math.max(...barData.map(d => Math.max(d.revenue, d.target))) * 1.1,
    ],
    range: [yMax, 0],
    nice: true,
  });

  const handleMouseMove = useCallback(
    (
      event: React.MouseEvent<SVGRectElement>,
      data: { month: string; type: string; value: number }
    ) => {
      const point = localPoint(event);
      if (point) {
        showTooltip({
          tooltipData: data,
          tooltipLeft: point.x,
          tooltipTop: point.y,
        });
      }
    },
    [showTooltip]
  );

  const tooltipStyles = {
    ...defaultStyles,
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border-primary)',
    borderRadius: '8px',
    color: 'var(--text-primary)',
    padding: '8px 12px',
    fontSize: '12px',
  };

  return (
    <div style={{ position: 'relative' }}>
      <svg width={width} height={height}>
        <Group left={margin.left} top={margin.top}>
          {/* Grid */}
          <GridRows
            scale={yScale}
            width={xMax}
            strokeDasharray="3,3"
            stroke="var(--border-tertiary)"
            strokeOpacity={0.5}
          />

          {/* Revenue Bars */}
          {barData.map(d => {
            const barWidth = xScale.bandwidth() / 2;
            const barX = xScale(d.month) ?? 0;
            const barHeight = yMax - (yScale(d.revenue) ?? 0);
            const barY = yScale(d.revenue) ?? 0;

            return (
              <VisxBar
                key={`bar-revenue-${d.month}`}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill="var(--color-brand-600)"
                rx={4}
                onMouseMove={event =>
                  handleMouseMove(event, {
                    month: d.month,
                    type: 'Revenue',
                    value: d.revenue,
                  })
                }
                onMouseLeave={hideTooltip}
                style={{ cursor: 'pointer' }}
              />
            );
          })}

          {/* Target Bars */}
          {barData.map(d => {
            const barWidth = xScale.bandwidth() / 2;
            const barX = (xScale(d.month) ?? 0) + barWidth;
            const barHeight = yMax - (yScale(d.target) ?? 0);
            const barY = yScale(d.target) ?? 0;

            return (
              <VisxBar
                key={`bar-target-${d.month}`}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill="var(--color-gray-400)"
                rx={4}
                onMouseMove={event =>
                  handleMouseMove(event, {
                    month: d.month,
                    type: 'Target',
                    value: d.target,
                  })
                }
                onMouseLeave={hideTooltip}
                style={{ cursor: 'pointer' }}
              />
            );
          })}

          {/* Axes */}
          <AxisBottom
            top={yMax}
            scale={xScale}
            stroke="var(--border-tertiary)"
            tickStroke="var(--border-tertiary)"
            tickLabelProps={() => ({
              fill: 'var(--text-tertiary)',
              fontSize: 11,
              textAnchor: 'middle',
            })}
          />
          <AxisLeft
            scale={yScale}
            stroke="var(--border-tertiary)"
            tickStroke="var(--border-tertiary)"
            tickLabelProps={() => ({
              fill: 'var(--text-tertiary)',
              fontSize: 11,
              textAnchor: 'end',
              dx: -4,
            })}
            numTicks={5}
          />
        </Group>
      </svg>
      {tooltipOpen && tooltipData && (
        <TooltipWithBounds
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          <div>
            <strong>{tooltipData.month}</strong>
          </div>
          <div style={{ marginTop: '4px' }}>
            {tooltipData.type}:{' '}
            <strong>${tooltipData.value.toLocaleString()}</strong>
          </div>
        </TooltipWithBounds>
      )}
    </div>
  );
}

// Visx Line Chart Component with Crosshair
function VisxLineChart({ width, height }: { width: number; height: number }) {
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip<{ month: string; value: number; benchmark: number }>();

  const [hoveredData, setHoveredData] = useState<(typeof lineData)[0] | null>(
    null
  );

  const margin = { top: 20, right: 20, bottom: 40, left: 60 };
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // Scales
  const xScale = scaleBand<string>({
    domain: lineData.map(d => d.month),
    range: [0, xMax],
  });

  const yScale = scaleLinear<number>({
    domain: [
      0,
      Math.max(...lineData.map(d => Math.max(d.value, d.benchmark))) * 1.1,
    ],
    range: [yMax, 0],
  });

  // Accessors
  const getX = (d: (typeof lineData)[0]) =>
    (xScale(d.month) ?? 0) + xScale.bandwidth() / 2;
  const getY = (d: (typeof lineData)[0], key: 'value' | 'benchmark') =>
    yScale(d[key]) ?? 0;

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<SVGRectElement>) => {
      const point = localPoint(event);
      if (!point) return;

      // Find the closest data point based on x position
      const x0 = point.x - margin.left;
      const closestPoint = lineData.reduce((prev, curr) => {
        const prevX = getX(prev);
        const currX = getX(curr);
        return Math.abs(currX - x0) < Math.abs(prevX - x0) ? curr : prev;
      });

      setHoveredData(closestPoint);
      showTooltip({
        tooltipData: closestPoint,
        tooltipLeft: getX(closestPoint) + margin.left,
        tooltipTop: margin.top + 10,
      });
    },
    [showTooltip, margin.left, margin.top]
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredData(null);
    hideTooltip();
  }, [hideTooltip]);

  const tooltipStyles = {
    ...defaultStyles,
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border-primary)',
    borderRadius: '8px',
    color: 'var(--text-primary)',
    padding: '8px 12px',
    fontSize: '12px',
  };

  return (
    <div style={{ position: 'relative' }}>
      <svg width={width} height={height}>
        <Group left={margin.left} top={margin.top}>
          {/* Grid */}
          <GridRows
            scale={yScale}
            width={xMax}
            strokeDasharray="3,3"
            stroke="var(--border-tertiary)"
            strokeOpacity={0.5}
          />

          {/* Benchmark Line */}
          <LinePath
            data={lineData}
            x={getX}
            y={d => getY(d, 'benchmark')}
            stroke="var(--color-gray-400)"
            strokeWidth={2}
            strokeDasharray="5,5"
            curve={curveMonotoneX}
          />

          {/* Value Line */}
          <LinePath
            data={lineData}
            x={getX}
            y={d => getY(d, 'value')}
            stroke="var(--color-success-600)"
            strokeWidth={3}
            curve={curveMonotoneX}
          />

          {/* Crosshair line */}
          {hoveredData && (
            <line
              x1={getX(hoveredData)}
              x2={getX(hoveredData)}
              y1={0}
              y2={yMax}
              stroke="var(--border-primary)"
              strokeWidth={1}
              strokeDasharray="4,4"
              pointerEvents="none"
            />
          )}

          {/* Data points */}
          {lineData.map((d, i) => {
            const isHovered = hoveredData?.month === d.month;
            return (
              <circle
                key={`point-${i}`}
                cx={getX(d)}
                cy={getY(d, 'value')}
                r={isHovered ? 6 : 4}
                fill="var(--color-success-600)"
                stroke="var(--bg-primary)"
                strokeWidth={2}
                pointerEvents="none"
              />
            );
          })}

          {/* Benchmark points (show when hovered) */}
          {hoveredData && (
            <circle
              cx={getX(hoveredData)}
              cy={getY(hoveredData, 'benchmark')}
              r={5}
              fill="var(--color-gray-400)"
              stroke="var(--bg-primary)"
              strokeWidth={2}
              pointerEvents="none"
            />
          )}

          {/* Invisible overlay to capture mouse events */}
          <rect
            x={0}
            y={0}
            width={xMax}
            height={yMax}
            fill="transparent"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: 'crosshair' }}
          />

          {/* Axes */}
          <AxisBottom
            top={yMax}
            scale={xScale}
            stroke="var(--border-tertiary)"
            tickStroke="var(--border-tertiary)"
            tickLabelProps={() => ({
              fill: 'var(--text-tertiary)',
              fontSize: 11,
              textAnchor: 'middle',
            })}
          />
          <AxisLeft
            scale={yScale}
            stroke="var(--border-tertiary)"
            tickStroke="var(--border-tertiary)"
            tickLabelProps={() => ({
              fill: 'var(--text-tertiary)',
              fontSize: 11,
              textAnchor: 'end',
              dx: -4,
            })}
            numTicks={5}
          />
        </Group>
      </svg>
      {tooltipOpen && tooltipData && (
        <TooltipWithBounds
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          <div>
            <strong>{tooltipData.month}</strong>
          </div>
          <div
            style={{
              marginTop: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-success-600)',
                display: 'inline-block',
              }}
            />
            Performance: <strong>{tooltipData.value}%</strong>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: 'var(--text-secondary)',
              fontSize: '11px',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-gray-400)',
                display: 'inline-block',
              }}
            />
            Benchmark: {tooltipData.benchmark}%
          </div>
        </TooltipWithBounds>
      )}
    </div>
  );
}

export default function ChartComparisonPage() {
  return (
    <div className="bg-bg-primary text-text-primary min-h-screen p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Chart Library Comparison</h1>
          <p className="text-text-secondary mt-2">
            Side-by-side comparison of Recharts vs Visx implementations
          </p>
        </div>

        {/* Library Overview */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recharts</CardTitle>
              <CardDescription>
                React + D3 wrapper library with declarative API
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-text-secondary space-y-2 text-sm">
                <li>✓ Declarative, React-friendly components</li>
                <li>✓ Built-in responsive containers</li>
                <li>✓ Good TypeScript support</li>
                <li>✓ Lower learning curve</li>
                <li>✗ Less customization control</li>
                <li>✗ Larger bundle size</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Visx (Airbnb)</CardTitle>
              <CardDescription>
                Low-level React + D3 primitives for custom visualization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-text-secondary space-y-2 text-sm">
                <li>✓ Maximum customization control</li>
                <li>✓ Smaller, modular packages</li>
                <li>✓ Better for unique designs</li>
                <li>✓ Tree-shakeable</li>
                <li>✗ Steeper learning curve</li>
                <li>✗ More verbose code</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Bar Charts Comparison */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold">Bar Charts</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Recharts Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Recharts Bar Chart</CardTitle>
                <CardDescription>Monthly Revenue vs Target</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--border-tertiary)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="month"
                      stroke="var(--text-tertiary)"
                      tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }}
                    />
                    <YAxis
                      stroke="var(--text-tertiary)"
                      tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-primary)',
                        borderRadius: '8px',
                        color: 'var(--text-primary)',
                      }}
                      labelStyle={{ color: 'var(--text-primary)' }}
                    />
                    <Legend
                      wrapperStyle={{
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                      }}
                    />
                    <Bar
                      dataKey="revenue"
                      fill="var(--color-brand-600)"
                      radius={[4, 4, 0, 0]}
                      name="Revenue"
                    />
                    <Bar
                      dataKey="target"
                      fill="var(--color-gray-400)"
                      radius={[4, 4, 0, 0]}
                      name="Target"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Visx Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Visx Bar Chart</CardTitle>
                <CardDescription>Monthly Revenue vs Target</CardDescription>
              </CardHeader>
              <CardContent>
                <div style={{ height: 300 }}>
                  <ParentSize>
                    {({ width, height }) => (
                      <VisxBarChart width={width} height={height} />
                    )}
                  </ParentSize>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Line Charts Comparison */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold">Line Charts</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Recharts Line Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Recharts Line Chart</CardTitle>
                <CardDescription>
                  Performance vs Benchmark (with built-in crosshair)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={lineData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--border-tertiary)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="month"
                      stroke="var(--text-tertiary)"
                      tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }}
                    />
                    <YAxis
                      stroke="var(--text-tertiary)"
                      tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-primary)',
                        borderRadius: '8px',
                        color: 'var(--text-primary)',
                      }}
                      labelStyle={{ color: 'var(--text-primary)' }}
                      cursor={{
                        stroke: 'var(--border-primary)',
                        strokeWidth: 1,
                        strokeDasharray: '4 4',
                      }}
                    />
                    <Legend
                      wrapperStyle={{
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="benchmark"
                      stroke="var(--color-gray-400)"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                      name="Benchmark"
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="var(--color-success-600)"
                      strokeWidth={3}
                      dot={{ fill: 'var(--color-success-600)', r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Performance"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Visx Line Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Visx Line Chart</CardTitle>
                <CardDescription>
                  Performance vs Benchmark (custom crosshair implementation)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div style={{ height: 300 }}>
                  <ParentSize>
                    {({ width, height }) => (
                      <VisxLineChart width={width} height={height} />
                    )}
                  </ParentSize>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Summary Section */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Implementation Notes</CardTitle>
              <CardDescription>
                Key observations from both implementations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div>
                  <h3 className="text-text-primary mb-2 font-semibold">
                    Recharts
                  </h3>
                  <ul className="text-text-secondary space-y-1 text-sm">
                    <li>
                      • Simple declarative API - components map directly to
                      chart elements
                    </li>
                    <li>
                      • Built-in ResponsiveContainer handles sizing
                      automatically
                    </li>
                    <li>
                      • Tooltip and Legend work out of the box with minimal
                      config
                    </li>
                    <li>• Styling via props is straightforward but limited</li>
                    <li>
                      • Good for standard chart types with typical interactions
                    </li>
                    <li>
                      • Tooltips automatically track mouse over entire chart
                      area
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-text-primary mb-2 font-semibold">Visx</h3>
                  <ul className="text-text-secondary space-y-1 text-sm">
                    <li>
                      • More code required but full control over rendering
                    </li>
                    <li>
                      • Manual scale and accessor management with D3 primitives
                    </li>
                    <li>
                      • Need to calculate positions, dimensions, and margins
                      manually
                    </li>
                    <li>
                      • Axis scaling requires careful configuration (avoid
                      `nice: true` if you need zero baseline)
                    </li>
                    <li>
                      • Tooltips require useTooltip hook + manual event handlers
                    </li>
                    <li>
                      • TooltipWithBounds provides smart positioning to stay in
                      viewport
                    </li>
                    <li>
                      • Better for custom designs and non-standard
                      visualizations
                    </li>
                    <li>
                      • Smaller bundle size with tree-shaking (only import what
                      you need)
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Responsive Behavior */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold">Responsive Behavior</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recharts</CardTitle>
                <CardDescription>
                  ResponsiveContainer handles everything
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="bg-bg-secondary rounded-lg p-3">
                    <p className="text-text-primary mb-2 font-mono text-xs">
                      Built-in wrapper:
                    </p>
                    <code className="text-text-secondary text-xs">
                      {`<ResponsiveContainer width="100%" height={300}>`}
                      <br />
                      {`  <LineChart data={data}>`}
                      <br />
                      {`    {/* chart contents */}`}
                      <br />
                      {`  </LineChart>`}
                      <br />
                      {`</ResponsiveContainer>`}
                    </code>
                  </div>
                  <ul className="text-text-secondary space-y-1">
                    <li>✓ Automatically resizes on window resize</li>
                    <li>✓ Built into Recharts</li>
                    <li>✓ Works with percentage or pixel dimensions</li>
                    <li>✓ Debounces resize events</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Visx</CardTitle>
                <CardDescription>
                  Requires @visx/responsive package
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="bg-bg-secondary rounded-lg p-3">
                    <p className="text-text-primary mb-2 font-mono text-xs">
                      Render prop pattern:
                    </p>
                    <code className="text-text-secondary text-xs">
                      {`<ParentSize>`}
                      <br />
                      {`  {({ width, height }) => (`}
                      <br />
                      {`    <VisxChart width={width} height={height} />`}
                      <br />
                      {`  )}`}
                      <br />
                      {`</ParentSize>`}
                    </code>
                  </div>
                  <ul className="text-text-secondary space-y-1">
                    <li>✓ Provides width/height via render props</li>
                    <li>✓ Uses ResizeObserver for performance</li>
                    <li>✓ Must manually pass dimensions to chart</li>
                    <li>✗ Additional package (@visx/responsive)</li>
                    <li>✗ More boilerplate code</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Crosshair/Hover Line Comparison */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold">
            Crosshair Lines - Implementation Comparison
          </h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recharts</CardTitle>
                <CardDescription>
                  Built-in crosshair via cursor prop
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="bg-bg-secondary rounded-lg p-3">
                    <p className="text-text-primary mb-2 font-mono text-xs">
                      One line of code:
                    </p>
                    <code className="text-text-secondary text-xs">
                      {`<Tooltip cursor={{ stroke: 'color', strokeDasharray: '4 4' }} />`}
                    </code>
                  </div>
                  <ul className="text-text-secondary space-y-1">
                    <li>✓ Automatic tracking across entire chart</li>
                    <li>✓ Shows all series data at once</li>
                    <li>✓ No state management needed</li>
                    <li>✓ Works out-of-the-box</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Visx</CardTitle>
                <CardDescription>
                  Custom implementation required
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="bg-bg-secondary rounded-lg p-3">
                    <p className="text-text-primary mb-2 font-mono text-xs">
                      Custom implementation:
                    </p>
                    <code className="text-text-secondary text-xs">
                      {`// 1. Add state for hover tracking`}
                      <br />
                      {`const [hoveredData, setHoveredData] = useState(null);`}
                      <br />
                      <br />
                      {`// 2. Handle mouse position`}
                      <br />
                      {`const point = localPoint(event);`}
                      <br />
                      {`const closest = findClosestDataPoint(point);`}
                      <br />
                      <br />
                      {`// 3. Render crosshair line`}
                      <br />
                      {`<line x1={x} x2={x} y1={0} y2={height} />`}
                      <br />
                      <br />
                      {`// 4. Add invisible overlay for events`}
                      <br />
                      {`<rect onMouseMove={handler} />`}
                    </code>
                  </div>
                  <ul className="text-text-secondary space-y-1">
                    <li>✓ Full control over appearance</li>
                    <li>✓ Custom snapping behavior</li>
                    <li>✓ Can show/hide specific points</li>
                    <li>✗ ~40 lines of code to implement</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Customization Examples */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold">
            Styling System Integration
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>CSS Variable Support</CardTitle>
                <CardDescription>
                  Both libraries work well with our semantic color system using
                  CSS variables
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div className="bg-bg-secondary rounded-lg p-4">
                    <p className="text-text-primary mb-2 font-semibold">
                      Recharts Approach:
                    </p>
                    <code className="text-text-secondary text-xs">
                      {`<Bar fill="var(--color-brand-600)" />`}
                      <br />
                      {`<Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)' }} />`}
                    </code>
                  </div>
                  <div className="bg-bg-secondary rounded-lg p-4">
                    <p className="text-text-primary mb-2 font-semibold">
                      Visx Approach:
                    </p>
                    <code className="text-text-secondary text-xs">
                      {`<VisxBar fill="var(--color-brand-600)" />`}
                      <br />
                      {`<GridRows stroke="var(--border-tertiary)" />`}
                      <br />
                      {`tickLabelProps={() => ({ fill: 'var(--text-tertiary)' })}`}
                    </code>
                  </div>
                  <div className="border-border-primary bg-bg-tertiary mt-4 rounded-lg border p-4">
                    <p className="text-text-primary">
                      <strong>Key Finding:</strong> Both libraries integrate
                      seamlessly with CSS variables. Visx requires more manual
                      prop passing but offers finer control over individual
                      elements.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Decision Summary */}
        <section className="mb-12">
          <Card className="border-border-brand">
            <CardHeader>
              <CardTitle className="text-xl">Decision Framework</CardTitle>
              <CardDescription>
                When to choose each library based on your use case
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div>
                  <div className="mb-4 flex items-center gap-2">
                    <div className="bg-fg-success-primary h-3 w-3 rounded-full" />
                    <h3 className="text-text-primary font-semibold">
                      Choose Recharts If:
                    </h3>
                  </div>
                  <ul className="text-text-secondary space-y-2 text-sm">
                    <li>
                      ✓ You need standard chart types (bar, line, area, pie)
                    </li>
                    <li>✓ You want to ship features quickly</li>
                    <li>✓ Your team is less experienced with D3/SVG</li>
                    <li>✓ Built-in interactivity is sufficient</li>
                    <li>✓ You value declarative, React-style APIs</li>
                    <li>✓ Bundle size is not a critical concern</li>
                  </ul>
                  <div className="border-border-success bg-bg-success-secondary mt-4 rounded-lg border p-3">
                    <p className="text-text-success-primary text-xs font-semibold">
                      Best for: Business dashboards, standard reporting, rapid
                      prototyping
                    </p>
                  </div>
                </div>

                <div>
                  <div className="mb-4 flex items-center gap-2">
                    <div className="bg-fg-brand-primary h-3 w-3 rounded-full" />
                    <h3 className="text-text-primary font-semibold">
                      Choose Visx If:
                    </h3>
                  </div>
                  <ul className="text-text-secondary space-y-2 text-sm">
                    <li>✓ You need custom, non-standard visualizations</li>
                    <li>✓ You want maximum control over rendering</li>
                    <li>✓ Bundle size optimization is important</li>
                    <li>✓ Your team is comfortable with D3 concepts</li>
                    <li>✓ You need highly customized interactions</li>
                    <li>
                      ✓ You're building a design system with unique chart
                      patterns
                    </li>
                  </ul>
                  <div className="border-border-brand bg-bg-brand-secondary mt-4 rounded-lg border p-3">
                    <p className="text-text-brand-primary text-xs font-semibold">
                      Best for: Custom visualizations, design systems,
                      data-heavy applications
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-border-primary bg-bg-tertiary mt-6 rounded-lg border-2 p-4">
                <p className="text-text-primary text-sm font-semibold">
                  💡 Recommendation for Your Use Case:
                </p>
                <p className="text-text-secondary mt-2 text-sm">
                  Based on your requirements (Layer 1-2-3 architecture, future
                  configurability, fintech use case):
                  <strong className="text-text-primary">
                    {' '}
                    Start with Recharts for Layer 1
                  </strong>
                  . It provides the fastest path to replacing Mantine charts. If
                  you encounter customization limits, you can always build
                  specific chart types with Visx later—your three-layer
                  architecture makes this swap easy at the primitive layer
                  without touching business logic.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
