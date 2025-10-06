'use client';

import React from 'react';
import {
  IconTrendingUp,
  IconTrendingDown,
  IconChartBar,
  IconWorld,
  IconBuilding,
} from '@tabler/icons-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  MetricCard,
  Button,
  Heading,
  DataTable,
  SortableColumnHeader,
  AgedState,
  LineChart,
  HorizontalBarChart,
  StackedBarChart,
  MetricsTable,
} from '@float-vibe-foundry/design-system';
import { ColumnDef } from '@tanstack/react-table';

const ExecutiveDashboard = () => {
  // Sample data
  const kpis = [
    {
      label: 'Open Risk Score',
      value: '14,779',
      change: 12,
      trend: 'up' as const,
      comparison: 'vs. last week',
      status: 'warning' as const,
    },
    {
      label: 'Trades Outside SLA',
      value: '18 / 258',
      subValue: '7.0%',
      change: 1.2,
      trend: 'up' as const,
      comparison: 'vs. avg',
      status: 'danger' as const,
    },
    {
      label: 'High-Sev Open Breaks',
      value: '3',
      change: -2,
      trend: 'down' as const,
      comparison: 'vs. last week',
      status: 'good' as const,
    },
    {
      label: 'Template Coverage',
      value: '67%',
      change: 5,
      trend: 'up' as const,
      comparison: 'vs. last month',
      status: 'good' as const,
    },
  ];

  const priorityActions = [
    {
      rank: 'high',
      trade: '10234',
      counterparty: 'GS',
      product: 'CMS Opt',
      issue: 'Strike',
      age: '3d 4h',
      score: 7500,
    },
    {
      rank: 'high',
      trade: '10189',
      counterparty: 'JPM',
      product: 'FX Opt',
      issue: 'Notional',
      age: '2d 1h',
      score: 5200,
    },
    {
      rank: 'medium',
      trade: '10156',
      counterparty: 'Citi',
      product: 'IRS',
      issue: 'EffDate',
      age: '4d 2h',
      score: 3100,
    },
    {
      rank: 'medium',
      trade: '10298',
      counterparty: 'BAML',
      product: 'Equity',
      issue: 'Strike',
      age: '1d 8h',
      score: 2800,
    },
    {
      rank: 'medium',
      trade: '10245',
      counterparty: 'MS',
      product: 'CMS Opt',
      issue: 'Spread',
      age: '2d 5h',
      score: 1900,
    },
  ];

  const riskByCounterparty = [
    { name: 'GS', value: 8900, max: 10000 },
    { name: 'JPM', value: 5200, max: 10000 },
    { name: 'Citi', value: 4100, max: 10000 },
    { name: 'BAML', value: 2800, max: 10000 },
    { name: 'MS', value: 1900, max: 10000 },
  ];

  const riskByProduct = [
    { name: 'CMS Options', value: 9400, max: 10000 },
    { name: 'FX Options', value: 5200, max: 10000 },
    { name: 'IRS', value: 3100, max: 10000 },
    { name: 'Equity Opts', value: 2800, max: 10000 },
    { name: 'Swaptions', value: 900, max: 10000 },
  ];

  // Define columns for Priority Actions DataTable
  const priorityActionsColumns: ColumnDef<(typeof priorityActions)[0]>[] = [
    {
      accessorKey: 'rank',
      header: 'Rank',
      cell: ({ row }) => {
        const rank = row.getValue('rank') as string;
        return <AgedState level={rank === 'high' ? 'high' : 'medium'} />;
      },
    },
    {
      accessorKey: 'trade',
      header: ({ column }) => (
        <SortableColumnHeader column={column} title="Trade" />
      ),
      cell: ({ row }) => {
        const trade = row.getValue('trade') as string;
        return <div className="text-sm font-medium text-blue-600">{trade}</div>;
      },
    },
    {
      accessorKey: 'counterparty',
      header: 'Counterparty',
      cell: ({ row }) => {
        const counterparty = row.getValue('counterparty') as string;
        return <div className="text-sm">{counterparty}</div>;
      },
    },
    {
      accessorKey: 'product',
      header: 'Product',
      cell: ({ row }) => {
        const product = row.getValue('product') as string;
        return <div className="text-sm">{product}</div>;
      },
    },
    {
      accessorKey: 'issue',
      header: 'Issue',
      cell: ({ row }) => {
        const issue = row.getValue('issue') as string;
        return <div className="text-sm font-medium">{issue}</div>;
      },
    },
    {
      accessorKey: 'age',
      header: 'Age',
      cell: ({ row }) => {
        const age = row.getValue('age') as string;
        return <div className="text-sm text-gray-500">{age}</div>;
      },
    },
    {
      accessorKey: 'score',
      header: ({ column }) => (
        <SortableColumnHeader column={column} title="Score" />
      ),
      cell: ({ row }) => {
        const score = row.getValue('score') as number;
        return (
          <div className="text-sm font-semibold">{score.toLocaleString()}</div>
        );
      },
    },
  ];

  const activityData = {
    totalTrades: 258,
    change: 12,
    byFamily: [
      {
        name: 'Rates',
        value: 112,
        percentage: 43,
        icon: <IconTrendingUp size={16} />,
      },
      { name: 'FX', value: 68, percentage: 26, icon: <IconWorld size={16} /> },
      {
        name: 'Equity',
        value: 52,
        percentage: 20,
        icon: <IconChartBar size={16} />,
      },
      {
        name: 'Credit',
        value: 26,
        percentage: 11,
        icon: <IconTrendingDown size={16} />,
      },
    ],
    topCounterparties: [
      {
        name: 'GS',
        value: 72,
        percentage: 28,
        label: 'trades',
        icon: <IconBuilding size={16} />,
      },
      {
        name: 'JPM',
        value: 61,
        percentage: 24,
        label: 'trades',
        icon: <IconBuilding size={16} />,
      },
      {
        name: 'MS',
        value: 52,
        percentage: 20,
        label: 'trades',
        icon: <IconBuilding size={16} />,
      },
    ],
    volumeTrendData: [
      { name: 'Sep 15', value: 50 },
      { name: 'Sep 22', value: 65 },
      { name: 'Sep 29', value: 72 },
      { name: 'Oct 6', value: 68 },
      { name: 'Oct 13', value: 85 },
      { name: 'Oct 20', value: 92 },
    ],
  };

  const slaData = [
    { label: 'Sep 1', value: 80 },
    { label: 'Sep 8', value: 82 },
    { label: 'Sep 15', value: 85 },
    { label: 'Sep 22', value: 88 },
    { label: 'Sep 29', value: 90 },
    { label: 'Oct 6', value: 92 },
  ];

  return (
    <div className="bg-background min-h-screen p-6">
      {/* Header */}
      <div className="mb-6">
        <Heading level={1} className="text-text-primary">
          Risk Overview
        </Heading>
        <p className="text-text-secondary text-sm">Friday, October 03, 2025</p>
      </div>

      {/* KPIs */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, i) => (
          <MetricCard
            key={i}
            title={kpi.label}
            value={kpi.value}
            subValue={kpi.subValue}
            change={kpi.change}
            trend={kpi.trend}
            comparison={kpi.comparison}
            status={kpi.status}
          />
        ))}
      </div>

      {/* Priority Actions */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Priority Actions (Sorted by Risk Score)</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={priorityActionsColumns}
            data={priorityActions}
            searchKey="trade"
            searchPlaceholder="Search trades..."
            showPagination={false}
            showSearch={true}
            className="mb-4"
          />
          <div className="border-t p-4 text-center">
            <Button
              variant="ghost"
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              View All 18 Items →
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Trading Activity Summary */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Trading Activity (Last 30 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <div className="mb-2 text-3xl font-bold">
                {activityData.totalTrades}
                <span className="ml-2 text-sm text-green-600">
                  ↑ {activityData.change}%
                </span>
              </div>
              <div className="mb-4 text-sm text-gray-500">Total Trades</div>

              <MetricsTable
                title="By Product Family:"
                items={activityData.byFamily}
                className="mb-4"
              />

              <MetricsTable
                title="Top 3 Counterparties:"
                items={activityData.topCounterparties}
                showRanking={true}
              />
            </div>

            <div>
              <div className="mb-2 text-sm font-medium">Volume Trend</div>
              <div className="mb-4 text-xs text-gray-500">
                Weekly trading volume
              </div>
              <div className="h-40">
                <StackedBarChart
                  data={activityData.volumeTrendData}
                  dataKeys={[
                    {
                      key: 'value',
                      label: 'Volume',
                      color: 'var(--color-brand-600)',
                    },
                  ]}
                  xAxisKey="name"
                  height={160}
                  showLegend={false}
                  showGrid={true}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Distribution */}
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Risk by Counterparty</CardTitle>
          </CardHeader>
          <CardContent>
            <HorizontalBarChart
              data={riskByCounterparty}
              color="var(--color-error-600)"
              height={200}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Risk by Product Type</CardTitle>
          </CardHeader>
          <CardContent>
            <HorizontalBarChart
              data={riskByProduct}
              color="var(--color-brand-600)"
              height={200}
            />
          </CardContent>
        </Card>
      </div>

      {/* SLA Performance Trend */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>24-Hour SLA Performance (Last 30 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart
            data={slaData}
            dataKeys={[
              { key: 'value', label: 'SLA %', color: 'var(--color-brand-600)' },
            ]}
            xAxisKey="label"
            height={300}
            showGrid={true}
            showDots={true}
            strokeWidth={3}
            interactive={true}
            customDots={true}
            lineType="monotone"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ExecutiveDashboard;
