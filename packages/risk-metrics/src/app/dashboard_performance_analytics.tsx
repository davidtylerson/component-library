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
  Heading,
  Text,
  LineChart,
  HorizontalBarChart,
  StackedBarChart,
  MetricCard,
  CellText,
  CellPerformance,
} from '@float-vibe-foundry/design-system';
import {
  IconDownload,
  IconAlertCircle,
} from '@tabler/icons-react';
import { ColumnDef } from '@tanstack/react-table';

const PerformanceAnalyticsDashboard = () => {
  const [dateRange, setDateRange] = useState('90d');
  const [counterpartyFilter, setCounterpartyFilter] = useState('all');
  const [productFilter, setProductFilter] = useState('all');

  // Top KPI Cards - EXACTLY matching the spec
  const kpis = [
    {
      label: 'Total Trades',
      value: '148',
      change: 12,
      trend: 'up' as const,
      comparison: 'vs prior period',
      status: 'good' as const,
    },
    {
      label: '24hr SLA Rate',
      value: '93%',
      change: 2,
      trend: 'up' as const,
      comparison: 'vs prior period',
      status: 'good' as const,
    },
    {
      label: 'Dispute Rate',
      value: '31%',
      change: -3,
      trend: 'down' as const,
      comparison: 'vs prior period',
      status: 'warning' as const,
    },
  ];

  // Affirmation Metrics - NEW DATA
  const affirmationSummary = {
    avgTimeToAffirm: 1.8, // days
    slaRate: 87, // percentage
    paperPct: 77,
    electronicPct: 23,
  };

  const affirmationTrend = [
    { date: 'Jul 1', avgTime: 2.1, slaRate: 82 },
    { date: 'Jul 15', avgTime: 1.9, slaRate: 85 },
    { date: 'Aug 1', avgTime: 2.3, slaRate: 78 },
    { date: 'Aug 15', avgTime: 1.8, slaRate: 88 },
    { date: 'Sep 1', avgTime: 1.7, slaRate: 90 },
    { date: 'Sep 15', avgTime: 1.6, slaRate: 92 },
    { date: 'Sep 30', avgTime: 1.8, slaRate: 87 },
  ];

  const affirmationByCounterparty = [
    {
      counterparty: 'GS',
      trades: 72,
      avgTime: 2.1,
      slaRate: 78,
      paperPct: 85,
      electronicPct: 15,
    },
    {
      counterparty: 'JPM',
      trades: 61,
      avgTime: 1.9,
      slaRate: 82,
      paperPct: 80,
      electronicPct: 20,
    },
    {
      counterparty: 'MS',
      trades: 54,
      avgTime: 1.5,
      slaRate: 93,
      paperPct: 65,
      electronicPct: 35,
    },
    {
      counterparty: 'BAML',
      trades: 52,
      avgTime: 1.7,
      slaRate: 88,
      paperPct: 72,
      electronicPct: 28,
    },
    {
      counterparty: 'Citi',
      trades: 38,
      avgTime: 1.6,
      slaRate: 89,
      paperPct: 76,
      electronicPct: 24,
    },
  ];

  // Confirmation Metrics - ENHANCED EXISTING DATA
  const confirmationSummary = {
    disputed: 31,
    disputedPct: 31,
    timeToReceive: 7.6,
    timeToConfirm: 7.6,
  };

  const confirmationTrend = [
    { date: 'Jul 1', avgTime: 8.2, disputeRate: 35 },
    { date: 'Jul 15', avgTime: 7.8, disputeRate: 32 },
    { date: 'Aug 1', avgTime: 8.5, disputeRate: 38 },
    { date: 'Aug 15', avgTime: 7.2, disputeRate: 28 },
    { date: 'Sep 1', avgTime: 7.1, disputeRate: 25 },
    { date: 'Sep 15', avgTime: 6.8, disputeRate: 22 },
    { date: 'Sep 30', avgTime: 7.6, disputeRate: 31 },
  ];

  const confirmationByCounterparty = [
    {
      counterparty: 'GS',
      traded: 72,
      confirmed: 38,
      disputed: 18,
      disputePct: 47,
      timeToDoc: '256d 8h',
      status: 'high' as const,
    },
    {
      counterparty: 'MS',
      traded: 54,
      confirmed: 31,
      disputed: 25,
      disputePct: 46,
      timeToDoc: '163d 16h',
      status: 'high' as const,
    },
    {
      counterparty: 'JPM',
      traded: 61,
      confirmed: 1,
      disputed: 0,
      disputePct: 0,
      timeToDoc: '3d 22h',
      status: 'good' as const,
    },
    {
      counterparty: 'BAML',
      traded: 52,
      confirmed: 0,
      disputed: 1,
      disputePct: 11,
      timeToDoc: '75d',
      status: 'warning' as const,
    },
    {
      counterparty: 'Citi',
      traded: 38,
      confirmed: 0,
      disputed: 0,
      disputePct: 0,
      timeToDoc: '6d',
      status: 'good' as const,
    },
  ];

  // Break Analysis - FUTURE DATA (with placeholder)
  const breakAnalysis = {
    severity: {
      high: { count: 12, pct: 26.7 },
      medium: { count: 18, pct: 40.0 },
      low: { count: 15, pct: 33.3 },
    },
    ownership: {
      counterparty: 68,
      alta: 32,
    },
    byField: [
      {
        field: 'Strike',
        severity: 'high' as const,
        breakRate: 8.2,
        topCounterparties: 'GS(4), JPM(3), Citi(2)',
      },
      {
        field: 'Notional',
        severity: 'high' as const,
        breakRate: 4.1,
        topCounterparties: 'BAML(3), MS(2)',
      },
      {
        field: 'Spread',
        severity: 'high' as const,
        breakRate: 3.5,
        topCounterparties: 'GS(2), DB(2)',
      },
      {
        field: 'Eff Date',
        severity: 'medium' as const,
        breakRate: 2.9,
        topCounterparties: 'JPM(2), Citi(1)',
      },
      {
        field: 'Term Amt',
        severity: 'medium' as const,
        breakRate: 6.8,
        topCounterparties: 'GS(5), BAML(3)',
      },
    ],
  };

  // Trading Activity Context - EXISTING DATA
  // Generate 90 days of daily trading data
  const tradingVolume = Array.from({ length: 90 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (89 - i)); // Start from 90 days ago
    const dayOfWeek = date.getDay();
    
    // Simulate realistic trading patterns: lower on weekends, some variation
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseVolume = isWeekend ? 0 : 45 + Math.floor(Math.random() * 15);
    
    return {
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      trades: baseVolume,
    };
  });

  const counterpartyActivity = [
    { name: 'GS', trades: 72, volume: '$18.2B', trend: 15 },
    { name: 'JPM', trades: 61, volume: '$15.1B', trend: 8 },
    { name: 'MS', trades: 54, volume: '$12.8B', trend: 22 },
    { name: 'BAML', trades: 52, volume: '$11.9B', trend: -3 },
    { name: 'Citi', trades: 38, volume: '$8.7B', trend: 12 },
  ];

  // Column definitions
  const affirmationColumns: ColumnDef<(typeof affirmationByCounterparty)[0]>[] = [
    {
      accessorKey: 'counterparty',
      header: 'CP',
      cell: ({ row }) => <CellText>{row.getValue('counterparty')}</CellText>,
    },
    {
      accessorKey: 'trades',
      header: 'Trades',
      cell: ({ row }) => <CellText>{row.getValue('trades')}</CellText>,
    },
    {
      accessorKey: 'avgTime',
      header: 'Avg Time',
      cell: ({ row }) => <CellText>{row.getValue('avgTime')}d</CellText>,
    },
    {
      accessorKey: 'slaRate',
      header: '<24hr SLA',
      cell: ({ row }) => {
        const rate = row.getValue('slaRate') as number;
        return (
          <div className="flex items-center gap-2">
            <CellText>{rate}%</CellText>
            {rate < 80 && <IconAlertCircle className="h-4 w-4 text-text-warning-primary" />}
          </div>
        );
      },
    },
    {
      accessorKey: 'paperPct',
      header: 'Paper',
      cell: ({ row }) => <CellText>{row.getValue('paperPct')}%</CellText>,
    },
    {
      accessorKey: 'electronicPct',
      header: 'Electronic',
      cell: ({ row }) => <CellText>{row.getValue('electronicPct')}%</CellText>,
    },
  ];

  const confirmationColumns: ColumnDef<(typeof confirmationByCounterparty)[0]>[] = [
    {
      accessorKey: 'counterparty',
      header: 'CP',
      cell: ({ row }) => <CellText>{row.getValue('counterparty')}</CellText>,
    },
    {
      accessorKey: 'traded',
      header: 'Traded',
      cell: ({ row }) => <CellText>{row.getValue('traded')}</CellText>,
    },
    {
      accessorKey: 'confirmed',
      header: 'Confirmed',
      cell: ({ row }) => <CellText>{row.getValue('confirmed')}</CellText>,
    },
    {
      accessorKey: 'disputed',
      header: 'Disputed',
      cell: ({ row }) => <CellText>{row.getValue('disputed')}</CellText>,
    },
    {
      accessorKey: 'disputePct',
      header: 'Disp%',
      cell: ({ row }) => {
        const pct = row.getValue('disputePct') as number;
        const status = row.original.status;
        return (
          <div className="flex items-center gap-2">
            <CellText>{pct}%</CellText>
            {status === 'high' && <CellPerformance level="bottom" />}
            {status === 'warning' && <CellPerformance level="middle" />}
            {status === 'good' && <CellPerformance level="top" />}
          </div>
        );
      },
    },
    {
      accessorKey: 'timeToDoc',
      header: 'Time to Doc',
      cell: ({ row }) => <CellText>{row.getValue('timeToDoc')}</CellText>,
    },
  ];

  const breakFieldColumns: ColumnDef<(typeof breakAnalysis.byField)[0]>[] = [
    {
      accessorKey: 'field',
      header: 'Field',
      cell: ({ row }) => <CellText>{row.getValue('field')}</CellText>,
    },
    {
      accessorKey: 'severity',
      header: 'Severity',
      cell: ({ row }) => {
        const severity = row.getValue('severity') as string;
        return (
          <Badge variant={severity === 'high' ? 'error' : 'warning'}>
            {severity === 'high' ? 'High' : 'Medium'}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'breakRate',
      header: 'Break Rate',
      cell: ({ row }) => <CellText>{row.getValue('breakRate')}%</CellText>,
    },
    {
      accessorKey: 'topCounterparties',
      header: 'Top Counterparties',
      cell: ({ row }) => <CellText>{row.getValue('topCounterparties')}</CellText>,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Heading level={1}>Performance Analytics</Heading>
          <Text className="text-text-tertiary">
            Trend analysis - "How are our processes performing over time?"
          </Text>
        </div>
        <Button variant="outline" size="sm">
          <IconDownload className="h-4 w-4 mr-2" />
          Export PDF
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30d">Last 30 Days</SelectItem>
            <SelectItem value="90d">Last 90 Days</SelectItem>
            <SelectItem value="180d">Last 180 Days</SelectItem>
            <SelectItem value="1y">Last Year</SelectItem>
          </SelectContent>
        </Select>
        <Select value={counterpartyFilter} onValueChange={setCounterpartyFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Counterparties" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Counterparties</SelectItem>
            <SelectItem value="gs">Goldman Sachs</SelectItem>
            <SelectItem value="jpm">JPMorgan</SelectItem>
            <SelectItem value="ms">Morgan Stanley</SelectItem>
            <SelectItem value="baml">Bank of America</SelectItem>
            <SelectItem value="citi">Citigroup</SelectItem>
          </SelectContent>
        </Select>
        <Select value={productFilter} onValueChange={setProductFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Products" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Products</SelectItem>
            <SelectItem value="rates">Rates</SelectItem>
            <SelectItem value="fx">FX</SelectItem>
            <SelectItem value="equity">Equity</SelectItem>
            <SelectItem value="credit">Credit</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpis.map((kpi, index) => (
          <MetricCard
            key={index}
            title={kpi.label}
            value={kpi.value}
            change={kpi.change}
            trend={kpi.trend}
            comparison={kpi.comparison}
            status={kpi.status}
          />
        ))}
      </div>

      {/* Affirmation Metrics Section */}
      <Card>
        <CardHeader>
          <CardTitle>Affirmation Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard
              title="Avg Time"
              value={`${affirmationSummary.avgTimeToAffirm}d`}
            />
            <MetricCard
              title="<24hr SLA"
              value={`${affirmationSummary.slaRate}%`}
            />
            <MetricCard
              title="Electronic"
              value={`${affirmationSummary.electronicPct}%`}
            />
          </div>

          {/* Trend Chart */}
          <div>
            <Heading level={3} className="mb-4">
              Affirmation Time Trend (Last 90 Days)
            </Heading>
            <div className="h-64">
              <LineChart
                data={affirmationTrend}
        dataKeys={[
          { key: 'avgTime', label: 'Average Time (days)', color: 'var(--fg-primary)' },
          { key: 'slaRate', label: 'SLA Rate (%)', color: 'var(--fg-primary)' }
        ]}
                xAxisKey="date"
                height={256}
              />
            </div>
          </div>

          {/* Counterparty Table */}
          <div>
            <Heading level={3} className="mb-4">
              By Counterparty
            </Heading>
            <DataTable
              data={affirmationByCounterparty}
              columns={affirmationColumns}
              pageSize={5}
            />
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Metrics Section */}
      <Card>
        <CardHeader>
          <CardTitle>Confirmation Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard
              title="Disputed"
              value={`${confirmationSummary.disputedPct}%`}
              subValue={`${confirmationSummary.disputed} of 148`}
            />
            <MetricCard
              title="Time to Receive"
              value={`${confirmationSummary.timeToReceive}d`}
            />
            <MetricCard
              title="Time to Confirm"
              value={`${confirmationSummary.timeToConfirm}d`}
            />
          </div>

          {/* Trend Chart */}
          <div>
            <Heading level={3} className="mb-4">
              Confirmation Time Trend (Last 90 Days)
            </Heading>
            <div className="h-64">
              <LineChart
                data={confirmationTrend}
        dataKeys={[
          { key: 'avgTime', label: 'Average Time (days)', color: 'var(--fg-primary)' },
          { key: 'disputeRate', label: 'Dispute Rate (%)', color: 'var(--fg-primary)' }
        ]}
                xAxisKey="date"
                height={256}
              />
            </div>
          </div>

          {/* Counterparty Table */}
          <div>
            <Heading level={3} className="mb-4">
              By Counterparty
            </Heading>
            <DataTable
              data={confirmationByCounterparty}
              columns={confirmationColumns}
              pageSize={5}
            />
          </div>
        </CardContent>
      </Card>

      {/* Break Analysis Section */}
      <Card>
        <CardHeader>
          <CardTitle>Break Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Severity Distribution */}
          <div>
            <Heading level={3} className="mb-4">
              Break Severity Distribution
            </Heading>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>High: {breakAnalysis.severity.high.count} ({breakAnalysis.severity.high.pct}%)</span>
                <div className="w-32 h-4 rounded" style={{ backgroundColor: 'var(--fg-primary)' }}></div>
              </div>
              <div className="flex items-center justify-between">
                <span>Med: {breakAnalysis.severity.medium.count} ({breakAnalysis.severity.medium.pct}%)</span>
                <div className="w-40 h-4 rounded" style={{ backgroundColor: 'var(--fg-primary)' }}></div>
              </div>
              <div className="flex items-center justify-between">
                <span>Low: {breakAnalysis.severity.low.count} ({breakAnalysis.severity.low.pct}%)</span>
                <div className="w-36 h-4 rounded" style={{ backgroundColor: 'var(--fg-primary)' }}></div>
              </div>
            </div>
          </div>

          {/* Ownership */}
          <div>
            <Heading level={3} className="mb-4">
              Break Ownership
            </Heading>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Counterparty: {breakAnalysis.ownership.counterparty}%</span>
                <div className="w-48 h-4 rounded" style={{ backgroundColor: 'var(--fg-primary)' }}></div>
              </div>
              <div className="flex items-center justify-between">
                <span>Alta: {breakAnalysis.ownership.alta}%</span>
                <div className="w-24 h-4 rounded" style={{ backgroundColor: 'var(--fg-primary)' }}></div>
              </div>
            </div>
          </div>

          {/* Field-Level Break Frequency */}
          <div>
            <Heading level={3} className="mb-4">
              Field-Level Break Frequency
            </Heading>
            <DataTable
              data={breakAnalysis.byField}
              columns={breakFieldColumns}
              pageSize={10}
            />
          </div>
        </CardContent>
      </Card>

      {/* Trading Activity Context */}
      <Card>
        <CardHeader>
          <CardTitle>Trading Activity Context</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Trading Volume Over Time */}
          <div>
            <Heading level={3} className="mb-4">
              Trading Volume Over Time
            </Heading>
            <div className="h-64 overflow-hidden">
              <StackedBarChart
                data={tradingVolume}
                dataKeys={[
                  { key: 'trades', label: 'Trades', color: 'var(--fg-primary)' }
                ]}
                xAxisKey="date"
                height={256}
                showLegend={false}
              />
            </div>
          </div>

          {/* By Counterparty */}
          <div>
            <Heading level={3} className="mb-4">
              By Counterparty
            </Heading>
            <div className="h-48 overflow-hidden">
              <HorizontalBarChart
                data={counterpartyActivity.map(cp => ({
                  name: cp.name,
                  value: cp.trades
                }))}
                dataKey="trades"
                color="var(--fg-primary)"
                height={192}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceAnalyticsDashboard;
