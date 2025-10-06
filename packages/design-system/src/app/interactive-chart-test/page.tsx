"use client";

import React, { useState } from 'react';
import { LineChart } from '@/components/ui/line-chart';
import { AreaChart } from '@/components/ui/area-chart';
import { HorizontalBarChart } from '@/components/ui/horizontal-bar-chart';
import { StackedBarChart } from '@/components/ui/stacked-bar-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';

export default function InteractiveChartTestPage() {
  // Chart type selection
  const [chartType, setChartType] = useState<'line' | 'area' | 'horizontal' | 'stacked'>('line');
  
  // Common props
  const [height, setHeight] = useState(300);
  const [showGrid, setShowGrid] = useState(true);
  const [showDots, setShowDots] = useState(true);
  const [strokeWidth, setStrokeWidth] = useState(2);
  
  // Line chart specific props
  const [lineType, setLineType] = useState<'monotone' | 'linear' | 'step' | 'stepBefore' | 'stepAfter'>('monotone');
  const [showAxes, setShowAxes] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [customDots, setCustomDots] = useState(false);
  
  // Area chart specific props
  const [areaType, setAreaType] = useState<'monotone' | 'linear' | 'step' | 'stepBefore' | 'stepAfter'>('monotone');
  const [showLegend, setShowLegend] = useState(false);
  const [gradient, setGradient] = useState(false);
  const [stacked, setStacked] = useState(false);
  
  // Sample data
  const sampleData = [
    { label: 'Jan', value: 80, risk: 1200, target: 1000 },
    { label: 'Feb', value: 82, risk: 1500, target: 1000 },
    { label: 'Mar', value: 85, risk: 1800, target: 1000 },
    { label: 'Apr', value: 88, risk: 1600, target: 1000 },
    { label: 'May', value: 90, risk: 1400, target: 1000 },
    { label: 'Jun', value: 92, risk: 1200, target: 1000 },
  ];

  const horizontalData = [
    { name: 'GS', value: 8900, max: 10000 },
    { name: 'JPM', value: 5200, max: 10000 },
    { name: 'Citi', value: 4100, max: 10000 },
    { name: 'BAML', value: 2800, max: 10000 },
    { name: 'MS', value: 1900, max: 10000 },
  ];

  const stackedData = [
    { name: 'Rates', count: 112, pct: 43 },
    { name: 'FX', count: 68, pct: 26 },
    { name: 'Equity', count: 52, pct: 20 },
    { name: 'Credit', count: 26, pct: 11 },
  ];

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <LineChart
            title="Interactive Line Chart"
            description="Test different line chart configurations"
            data={sampleData}
            dataKeys={[
              { key: 'value', label: 'SLA %', color: 'var(--color-success-600)' },
            ]}
            xAxisKey="label"
            height={height}
            showGrid={showGrid}
            showDots={showDots}
            strokeWidth={strokeWidth}
            lineType={lineType}
            showAxes={showAxes}
            interactive={interactive}
            customDots={customDots}
          />
        );
      
      case 'area':
        return (
          <AreaChart
            title="Interactive Area Chart"
            description="Test different area chart configurations"
            data={sampleData}
            dataKeys={[
              { key: 'risk', label: 'Risk Score', color: 'var(--color-error-600)' },
              { key: 'target', label: 'Target', color: 'var(--color-success-600)' },
            ]}
            xAxisKey="label"
            height={height}
            showGrid={showGrid}
            showDots={showDots}
            strokeWidth={strokeWidth}
            areaType={areaType}
            showAxes={showAxes}
            showLegend={showLegend}
            gradient={gradient}
            interactive={interactive}
            customDots={customDots}
            stacked={stacked}
          />
        );
      
      case 'horizontal':
        return (
          <HorizontalBarChart
            title="Interactive Horizontal Bar Chart"
            description="Test different horizontal bar chart configurations"
            data={horizontalData}
            color="var(--color-brand-600)"
            height={height}
          />
        );
      
      case 'stacked':
        return (
          <StackedBarChart
            title="Interactive Stacked Bar Chart"
            description="Test different stacked bar chart configurations"
            data={stackedData}
            dataKeys={[
              { key: 'count', label: 'Count', color: 'var(--color-brand-600)' },
              { key: 'pct', label: 'Percentage', color: 'var(--color-success-600)' },
            ]}
            xAxisKey="name"
            height={height}
            showLegend={showLegend}
            showGrid={showGrid}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Interactive Chart Testing</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Chart Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Chart Type */}
              <div className="space-y-2">
                <Label htmlFor="chart-type">Chart Type</Label>
                <Select value={chartType} onValueChange={(value: any) => setChartType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="line">Line Chart</SelectItem>
                    <SelectItem value="area">Area Chart</SelectItem>
                    <SelectItem value="horizontal">Horizontal Bar</SelectItem>
                    <SelectItem value="stacked">Stacked Bar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Common Controls */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="height">Height: {height}px</Label>
                  <Slider
                    id="height"
                    min={100}
                    max={500}
                    step={10}
                    value={[height]}
                    onValueChange={(value) => setHeight(value[0])}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stroke-width">Stroke Width: {strokeWidth}</Label>
                  <Slider
                    id="stroke-width"
                    min={1}
                    max={5}
                    step={0.5}
                    value={[strokeWidth]}
                    onValueChange={(value) => setStrokeWidth(value[0])}
                    className="w-full"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="show-grid"
                    checked={showGrid}
                    onCheckedChange={setShowGrid}
                  />
                  <Label htmlFor="show-grid">Show Grid</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="show-dots"
                    checked={showDots}
                    onCheckedChange={setShowDots}
                  />
                  <Label htmlFor="show-dots">Show Dots</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="show-axes"
                    checked={showAxes}
                    onCheckedChange={setShowAxes}
                  />
                  <Label htmlFor="show-axes">Show Axes</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="interactive"
                    checked={interactive}
                    onCheckedChange={setInteractive}
                  />
                  <Label htmlFor="interactive">Interactive</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="custom-dots"
                    checked={customDots}
                    onCheckedChange={setCustomDots}
                  />
                  <Label htmlFor="custom-dots">Custom Dots</Label>
                </div>
              </div>

              {/* Line Chart Specific */}
              {(chartType === 'line' || chartType === 'area') && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="line-type">Line/Area Type</Label>
                    <Select 
                      value={chartType === 'line' ? lineType : areaType} 
                      onValueChange={(value: any) => {
                        if (chartType === 'line') setLineType(value);
                        else setAreaType(value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monotone">Monotone</SelectItem>
                        <SelectItem value="linear">Linear</SelectItem>
                        <SelectItem value="step">Step</SelectItem>
                        <SelectItem value="stepBefore">Step Before</SelectItem>
                        <SelectItem value="stepAfter">Step After</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Area Chart Specific */}
              {chartType === 'area' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="show-legend"
                      checked={showLegend}
                      onCheckedChange={setShowLegend}
                    />
                    <Label htmlFor="show-legend">Show Legend</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="gradient"
                      checked={gradient}
                      onCheckedChange={setGradient}
                    />
                    <Label htmlFor="gradient">Gradient</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="stacked"
                      checked={stacked}
                      onCheckedChange={setStacked}
                    />
                    <Label htmlFor="stacked">Stacked</Label>
                  </div>
                </div>
              )}

              {/* Stacked Bar Chart Specific */}
              {chartType === 'stacked' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="stacked-legend"
                      checked={showLegend}
                      onCheckedChange={setShowLegend}
                    />
                    <Label htmlFor="stacked-legend">Show Legend</Label>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Chart Display */}
        <div className="lg:col-span-2">
          {renderChart()}
        </div>
      </div>
    </div>
  );
}
