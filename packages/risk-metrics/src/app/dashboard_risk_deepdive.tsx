'use client';

import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Badge,
  DataTable,
  SortableColumnHeader,
  Heading,
  Text,
  Separator,
  StackedBarChart,
  HorizontalBarChart,
} from '@float-vibe-foundry/design-system';
import { IconDownload, IconAlertHexagon } from '@tabler/icons-react';

const RiskDeepDiveDashboard = () => {
  const [dateRange, setDateRange] = useState('90d');
  const [productFilter, setProductFilter] = useState('all');

  const breakSummary = {
    totalTrades: 758,
    totalBreaks: 45,
    breakRate: 17.4,
    byseverity: {
      high: { count: 12, pct: 26.7 },
      medium: { count: 18, pct: 40.0 },
      low: { count: 15, pct: 33.3 },
    },
    trendVsPrior: -3.2,
  };

  const disputeMetrics = {
    activeDisputes: 8,
    avgTimeInDispute: 2.3,
    longestDispute: { trade: '10234', counterparty: 'GS', days: 6.2 },
    resolvedUnder48hrs: 73,
    trendVsPrior: 8,
  };

  const severityTrend = [
    { month: 'Jul', high: 8, medium: 12, low: 10 },
    { month: 'Aug', high: 10, medium: 15, low: 12 },
    { month: 'Sep', high: 12, medium: 18, low: 15 },
  ];

  const breakOwnership = [
    { owner: 'Counterparty', pct: 68, color: 'bg-[var(--color-error-500)]' },
    { owner: 'Rokos', pct: 23, color: 'bg-[var(--color-warning-500)]' },
    { owner: 'AI', pct: 9, color: 'bg-[var(--color-brand-500)]' },
  ];

  const fieldBreaks = [
    {
      field: 'Strike',
      severity: 5,
      breakRate: 8.2,
      counterparties: 'GS (4), JPM (3), Citi (2)',
    },
    {
      field: 'Notional',
      severity: 5,
      breakRate: 4.1,
      counterparties: 'BAML (3), MS (2)',
    },
    {
      field: 'Spread',
      severity: 5,
      breakRate: 3.5,
      counterparties: 'GS (2), DB (2)',
    },
    {
      field: 'Effective Date',
      severity: 5,
      breakRate: 2.9,
      counterparties: 'JPM (2), Citi (1)',
    },
    {
      field: 'Term Amount',
      severity: 4,
      breakRate: 6.8,
      counterparties: 'GS (5), BAML (3)',
    },
    {
      field: 'Payment Freq',
      severity: 3,
      breakRate: 4.2,
      counterparties: 'MS (3), Citi (2)',
    },
  ];

  const getSeverityBadge = (severity: number) => {
    if (severity === 5)
      return (
        <Badge variant="destructive" className="gap-1">
          🔴 {severity}
        </Badge>
      );
    if (severity === 4)
      return (
        <Badge variant="outline" className="text-text-warning-primary gap-1">
          🟡 {severity}
        </Badge>
      );
    return (
      <Badge variant="outline" className="text-text-success-primary gap-1">
        🟢 {severity}
      </Badge>
    );
  };

  return (
    <div className="bg-background min-h-screen p-6">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <Heading level={1} className="text-text-primary">
            Risk Analysis - Break Details
          </Heading>
          <Text className="text-text-secondary">
            Detailed breakdown of breaks and disputes
          </Text>
        </div>
        <div className="flex gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
              <SelectItem value="180d">Last 180 Days</SelectItem>
              <SelectItem value="365d">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={productFilter} onValueChange={setProductFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="rates">Rates</SelectItem>
              <SelectItem value="fx">FX</SelectItem>
              <SelectItem value="equity">Equity</SelectItem>
              <SelectItem value="credit">Credit</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <IconDownload className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Break Severity Distribution */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Break Severity Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <div className="mb-4 flex items-baseline gap-4">
                <div>
                  <div className="text-text-primary text-3xl font-bold">
                    {breakSummary.totalTrades}
                  </div>
                  <div className="text-text-secondary text-sm">
                    Total Trades
                  </div>
                </div>
                <div className="text-border-tertiary text-2xl">|</div>
                <div>
                  <div className="text-text-primary text-3xl font-bold">
                    {breakSummary.totalBreaks}
                  </div>
                  <div className="text-text-secondary text-sm">
                    Breaks ({breakSummary.breakRate}%)
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconAlertHexagon className="text-fg-error-primary h-4 w-4" />
                    <Text className="text-sm">High Severity:</Text>
                  </div>
                  <Text className="font-semibold">
                    {breakSummary.byseverity.high.count} breaks (
                    {breakSummary.byseverity.high.pct}%)
                  </Text>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconAlertHexagon className="text-text-warning-primary h-4 w-4" />
                    <Text className="text-sm">Medium Severity:</Text>
                  </div>
                  <Text className="font-semibold">
                    {breakSummary.byseverity.medium.count} breaks (
                    {breakSummary.byseverity.medium.pct}%)
                  </Text>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconAlertHexagon className="text-fg-tertiary h-4 w-4" />
                    <Text className="text-sm">Low Severity:</Text>
                  </div>
                  <Text className="font-semibold">
                    {breakSummary.byseverity.low.count} breaks (
                    {breakSummary.byseverity.low.pct}%)
                  </Text>
                </div>
              </div>

              <div className="border-border-tertiary mt-4 border-t pt-4">
                <div className="text-text-success-primary text-sm font-medium">
                  Break Rate Trend: ↓ {Math.abs(breakSummary.trendVsPrior)}% vs.
                  prior 90 days
                </div>
              </div>
            </div>

            {/* Dispute Metrics */}
            <div className="p-4">
              <h3 className="mb-3 font-semibold">Dispute Metrics</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <Text className="text-text-secondary">Active Disputes:</Text>
                  <Text className="font-semibold">
                    {disputeMetrics.activeDisputes}
                  </Text>
                </div>
                <div className="flex justify-between">
                  <Text className="text-text-secondary">
                    Avg Time in Dispute:
                  </Text>
                  <Text className="font-semibold">
                    {disputeMetrics.avgTimeInDispute} days
                  </Text>
                </div>
                <div className="flex justify-between">
                  <Text className="text-text-secondary">Longest Open:</Text>
                  <Text className="font-semibold text-red-600">
                    {disputeMetrics.longestDispute.days}d (#
                    {disputeMetrics.longestDispute.trade},{' '}
                    {disputeMetrics.longestDispute.counterparty})
                  </Text>
                </div>
                <div className="flex justify-between">
                  <Text className="text-text-secondary">
                    Resolved &lt;48hrs:
                  </Text>
                  <Text className="font-semibold text-green-600">
                    {disputeMetrics.resolvedUnder48hrs}% (↑
                    {disputeMetrics.trendVsPrior}%)
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Breaks by Severity Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Breaks by Severity (Trend)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <StackedBarChart
                data={severityTrend}
                dataKeys={[
                  {
                    key: 'high',
                    label: 'High',
                    color: 'var(--color-error-500)',
                  },
                  {
                    key: 'medium',
                    label: 'Medium',
                    color: 'var(--color-warning-500)',
                  },
                  {
                    key: 'low',
                    label: 'Low',
                    color: 'var(--color-success-500)',
                  },
                ]}
                xAxisKey="month"
                height={200}
              />
            </div>
          </CardContent>
        </Card>

        {/* Break Ownership */}
        <Card>
          <CardHeader>
            <CardTitle>Who Owns the Breaks?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <HorizontalBarChart
                data={breakOwnership.map(item => ({
                  name: item.owner,
                  value: item.pct,
                }))}
                dataKey="value"
                color="var(--color-brand-600)"
                height={200}
              />
            </div>
            <div className="border-border-tertiary mt-6 border-t pt-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-brand-600 hover:text-brand-800"
              >
                View by Counterparty →
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Field-Level Break Frequency */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              Field-Level Break Frequency (High & Medium Severity Only)
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-brand-600 hover:text-brand-800"
            >
              Show All Fields (23) →
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              {
                accessorKey: 'field',
                header: ({ column }) => (
                  <SortableColumnHeader column={column} title="Field" />
                ),
                cell: ({ row }) => (
                  <Text className="font-medium">{row.getValue('field')}</Text>
                ),
              },
              {
                accessorKey: 'severity',
                header: 'Severity',
                cell: ({ row }) => getSeverityBadge(row.getValue('severity')),
              },
              {
                accessorKey: 'breakRate',
                header: 'Break Rate',
                cell: ({ row }) => {
                  const breakRate = row.getValue('breakRate') as number;
                  const severity = row.getValue('severity') as number;
                  return (
                    <div className="flex items-center gap-2">
                      <Text className="font-semibold">{breakRate}%</Text>
                      <div className="bg-background-secondary h-2 w-24 rounded-full">
                        <div
                          className={`h-2 rounded-full ${
                            severity === 5 ? 'bg-red-500' : 'bg-yellow-500'
                          }`}
                          style={{ width: `${(breakRate / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                },
              },
              {
                accessorKey: 'counterparties',
                header: 'Top Counterparties',
                cell: ({ row }) => (
                  <Text className="text-text-secondary">
                    {row.getValue('counterparties')}
                  </Text>
                ),
              },
            ]}
            data={fieldBreaks}
            searchKey="field"
            searchPlaceholder="Search fields..."
            showPagination={false}
            showSearch={true}
          />
        </CardContent>
      </Card>

      {/* Break Concentration Analysis */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle>Break Concentration Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <Text>
              Top 3 Counterparties account for{' '}
              <Text className="font-bold">62%</Text> of all breaks
            </Text>
            <Text>
              Top 2 Product Types account for{' '}
              <Text className="font-bold">71%</Text> of all breaks
            </Text>
          </div>
          <Separator className="my-4 border-yellow-300" />
          <Text className="text-sm font-medium">
            ⚠️ Recommendation: Focus on GS (CMS Options) and JPM (FX)
          </Text>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskDeepDiveDashboard;
