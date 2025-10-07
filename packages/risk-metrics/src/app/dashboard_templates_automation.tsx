'use client';

import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  DataTable,
  SortableColumnHeader,
  Heading,
  Text,
  LineChart,
  MetricCard,
  CellText,
  CellTrend,
  CellPerformance,
} from '@float-vibe-foundry/design-system';
import { ColumnDef } from '@tanstack/react-table';

const TemplatesAutomationDashboard = () => {
  const [dateRange, setDateRange] = useState('6m');
  const [showAllCovCP, setShowAllCovCP] = useState(false);
  const [showAllCovProduct, setShowAllCovProduct] = useState(false);
  const [showAllAutoCP, setShowAllAutoCP] = useState(false);
  const [showAllAutoProduct, setShowAllAutoProduct] = useState(false);

  // Strategic Impact Data
  const strategicImpact = {
    breakRateReduction: {
      current: 13.2,
      sixMonthsAgo: 17.4,
      change: -4.2,
    },
    confirmTimeReduction: {
      current: 2.8,
      sixMonthsAgo: 4.1,
      change: -1.3,
    },
    combinedProgress: {
      templateCoverage: 67,
      autoMatchRate: 45,
      templateCoverageChange: 27,
      autoMatchChange: 18,
    },
  };

  // Template Coverage Data
  const templateCoverage = {
    byTrades: { value: 67, change: 5 },
    electronicAffirmation: { value: 23, change: 18 },
    byVolume: { covered: 51, total: 76, pct: 67, change: 12 },
  };

  // Template coverage trend data
  const coverageTrend = [
    { month: 'Apr', coverage: 40 },
    { month: 'May', coverage: 48 },
    { month: 'Jun', coverage: 52 },
    { month: 'Jul', coverage: 58 },
    { month: 'Aug', coverage: 63 },
    { month: 'Sep', coverage: 67 },
  ];

  // Coverage by Counterparty
  const coverageByCounterparty = [
    { cp: 'GS', trades: 72, coverage: 38, trend: 1, status: 'error' as const },
    { cp: 'JPM', trades: 61, coverage: 45, trend: -2, status: 'error' as const },
    { cp: 'Citi', trades: 38, coverage: 72, trend: 1, status: 'warning' as const },
    { cp: 'BAML', trades: 52, coverage: 88, trend: 5, status: 'good' as const },
    { cp: 'MS', trades: 45, coverage: 95, trend: 3, status: 'good' as const },
    { cp: 'DB', trades: 28, coverage: 82, trend: 2, status: 'good' as const },
    { cp: 'CS', trades: 19, coverage: 65, trend: 4, status: 'warning' as const },
  ];

  // Coverage by Product Type
  const coverageByProduct = [
    { product: 'CMS Option', trades: 98, coverage: 42, trend: 8, status: 'error' as const },
    { product: 'Equity Opt', trades: 87, coverage: 65, trend: 2, status: 'warning' as const },
    { product: 'Swaption', trades: 76, coverage: 71, trend: 3, status: 'warning' as const },
    { product: 'FX Option', trades: 112, coverage: 78, trend: 6, status: 'good' as const },
    { product: 'IRS', trades: 145, coverage: 92, trend: 4, status: 'good' as const },
    { product: 'Cap/Floor', trades: 34, coverage: 58, trend: 1, status: 'warning' as const },
    { product: 'CDS', trades: 22, coverage: 45, trend: 3, status: 'error' as const },
  ];

  // Automation Performance Data
  const automationMetrics = {
    autoMatchRate: { value: 45, change: 12 },
    avgMatchScore: { value: 88.64, change: 2.3 },
  };

  // Automation trend data
  const automationTrend = [
    { month: 'Apr', autoMatch: 33, matchScore: 86.3 },
    { month: 'May', autoMatch: 37, matchScore: 87.1 },
    { month: 'Jun', autoMatch: 39, matchScore: 87.8 },
    { month: 'Jul', autoMatch: 41, matchScore: 88.2 },
    { month: 'Aug', autoMatch: 43, matchScore: 88.5 },
    { month: 'Sep', autoMatch: 45, matchScore: 88.64 },
  ];

  // Match Score by Counterparty
  const matchScoreByCP = [
    { cp: 'GS', traded: 51, matched: 38, auto: 18, autoPct: 35, matchScore: 94.75 },
    { cp: 'MS', traded: 67, matched: 33, auto: 15, autoPct: 22, matchScore: 86.10 },
    { cp: 'JPM', traded: 15, matched: 2, auto: 1, autoPct: 7, matchScore: 95.12 },
    { cp: 'BAML', traded: 10, matched: 1, auto: 0, autoPct: 0, matchScore: 43.40 },
    { cp: 'Citi', traded: 3, matched: 0, auto: 0, autoPct: 0, matchScore: 0.00 },
    { cp: 'DB', traded: 28, matched: 12, auto: 5, autoPct: 18, matchScore: 89.23 },
    { cp: 'CS', traded: 19, matched: 8, auto: 3, autoPct: 16, matchScore: 82.45 },
  ];

  // Match Score by Product Type
  const matchScoreByProduct = [
    { product: 'Dual Binary', traded: 112, matched: 73, auto: 33, autoPct: 29, matchScore: 91.03 },
    { product: 'FX Dual Bin', traded: 23, matched: 3, auto: 1, autoPct: 4, matchScore: 40.05 },
    { product: 'FX Option', traded: 38, matched: 1, auto: 0, autoPct: 0, matchScore: 0.00 },
    { product: 'IRS', traded: 65, matched: 42, auto: 21, autoPct: 32, matchScore: 93.12 },
    { product: 'Swaption', traded: 45, matched: 28, auto: 12, autoPct: 27, matchScore: 88.56 },
    { product: 'CMS Option', traded: 32, matched: 15, auto: 6, autoPct: 19, matchScore: 85.34 },
  ];

  // Column definitions
  const coverageCPColumns: ColumnDef<(typeof coverageByCounterparty)[0]>[] = [
    {
      accessorKey: 'cp',
      header: 'CP',
      cell: ({ row }) => <CellText>{row.getValue('cp')}</CellText>,
    },
    {
      accessorKey: 'trades',
      header: ({ column }) => (
        <SortableColumnHeader column={column} title="Trades (90d)" />
      ),
      cell: ({ row }) => <CellText>{row.getValue('trades')}</CellText>,
    },
    {
      accessorKey: 'coverage',
      header: ({ column }) => (
        <SortableColumnHeader column={column} title="Coverage" />
      ),
      cell: ({ row }) => {
        const coverage = row.getValue('coverage') as number;
        const status = row.original.status;
        
        return (
          <div className="flex items-center gap-2">
            <span className="text-sm">{coverage}%</span>
            {status === 'error' && <CellPerformance level="bottom" />}
            {status === 'warning' && <CellPerformance level="middle" />}
            {status === 'good' && <CellPerformance level="top" />}
          </div>
        );
      },
    },
    {
      accessorKey: 'trend',
      header: 'Trend',
      cell: ({ row }) => <CellTrend value={row.getValue('trend')} suffix="pp" />,
    },
  ];

  const coverageProductColumns: ColumnDef<(typeof coverageByProduct)[0]>[] = [
    {
      accessorKey: 'product',
      header: 'Product',
      cell: ({ row }) => <CellText>{row.getValue('product')}</CellText>,
    },
    {
      accessorKey: 'trades',
      header: ({ column }) => (
        <SortableColumnHeader column={column} title="Trades (90d)" />
      ),
      cell: ({ row }) => <CellText>{row.getValue('trades')}</CellText>,
    },
    {
      accessorKey: 'coverage',
      header: ({ column }) => (
        <SortableColumnHeader column={column} title="Coverage" />
      ),
      cell: ({ row }) => {
        const coverage = row.getValue('coverage') as number;
        const status = row.original.status;
        
        return (
          <div className="flex items-center gap-2">
            <span className="text-sm">{coverage}%</span>
            {status === 'error' && <CellPerformance level="bottom" />}
            {status === 'warning' && <CellPerformance level="middle" />}
            {status === 'good' && <CellPerformance level="top" />}
          </div>
        );
      },
    },
    {
      accessorKey: 'trend',
      header: 'Trend',
      cell: ({ row }) => <CellTrend value={row.getValue('trend')} suffix="pp" />,
    },
  ];

  const matchScoreCPColumns: ColumnDef<(typeof matchScoreByCP)[0]>[] = [
    {
      accessorKey: 'cp',
      header: 'CP',
      cell: ({ row }) => <CellText>{row.getValue('cp')}</CellText>,
    },
    {
      accessorKey: 'traded',
      header: 'Traded',
      cell: ({ row }) => <CellText>{row.getValue('traded')}</CellText>,
    },
    {
      accessorKey: 'matched',
      header: 'Matched',
      cell: ({ row }) => <CellText>{row.getValue('matched')}</CellText>,
    },
    {
      accessorKey: 'auto',
      header: 'Auto',
      cell: ({ row }) => <CellText>{row.getValue('auto')}</CellText>,
    },
    {
      accessorKey: 'autoPct',
      header: 'Auto %',
      cell: ({ row }) => <CellText>{row.getValue('autoPct')}%</CellText>,
    },
    {
      accessorKey: 'matchScore',
      header: ({ column }) => (
        <SortableColumnHeader column={column} title="Match Score" />
      ),
      cell: ({ row }) => <CellText>{row.getValue('matchScore')}%</CellText>,
    },
  ];

  const matchScoreProductColumns: ColumnDef<(typeof matchScoreByProduct)[0]>[] = [
    {
      accessorKey: 'product',
      header: 'Product Type',
      cell: ({ row }) => <CellText>{row.getValue('product')}</CellText>,
    },
    {
      accessorKey: 'traded',
      header: 'Traded',
      cell: ({ row }) => <CellText>{row.getValue('traded')}</CellText>,
    },
    {
      accessorKey: 'matched',
      header: 'Matched',
      cell: ({ row }) => <CellText>{row.getValue('matched')}</CellText>,
    },
    {
      accessorKey: 'auto',
      header: 'Auto',
      cell: ({ row }) => <CellText>{row.getValue('auto')}</CellText>,
    },
    {
      accessorKey: 'autoPct',
      header: 'Auto %',
      cell: ({ row }) => <CellText>{row.getValue('autoPct')}%</CellText>,
    },
    {
      accessorKey: 'matchScore',
      header: ({ column }) => (
        <SortableColumnHeader column={column} title="Match Score" />
      ),
      cell: ({ row }) => <CellText>{row.getValue('matchScore')}%</CellText>,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Heading level={1}>Templates & Automation</Heading>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="6m">Last 6 Months</SelectItem>
            <SelectItem value="3m">Last 3 Months</SelectItem>
            <SelectItem value="12m">Last 12 Months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Strategic Impact Section */}
      <Card>
        <CardHeader>
          <CardTitle>Strategic Impact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              title="Break Rate Reduction"
              value={`${strategicImpact.breakRateReduction.change}pp`}
              comparison="Since Apr"
              trend="down"
              status="good"
            />
            <MetricCard
              title="Avg Confirm Time Reduction"
              value={`${strategicImpact.confirmTimeReduction.change} days`}
              comparison="Since Apr"
              trend="down"
              status="good"
            />
            <MetricCard
              title="Template Cov + Auto-Match"
              value={`${strategicImpact.combinedProgress.templateCoverage}% + ${strategicImpact.combinedProgress.autoMatchRate}%`}
              comparison="Since Apr"
              trend="up"
              status="good"
            />
          </div>

          {/* Key Insight */}
          <div className="rounded-lg bg-[var(--bg-secondary)] p-4">
            <Text className="text-sm">
              <span className="font-semibold">Key Insight:</span> As template coverage increased{' '}
              {strategicImpact.combinedProgress.templateCoverageChange}pp and automation increased{' '}
              {strategicImpact.combinedProgress.autoMatchChange}pp, break rates decreased{' '}
              {Math.abs(strategicImpact.breakRateReduction.change)}pp and avg confirmation time
              improved by {Math.abs(strategicImpact.confirmTimeReduction.change)} days. Strategic
              initiatives are working.
            </Text>
          </div>
        </CardContent>
      </Card>

      {/* Template Coverage Section */}
      <Card>
        <CardHeader>
          <CardTitle>Template Coverage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Coverage Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              title="Coverage (by trades)"
              value={`${templateCoverage.byTrades.value}%`}
              change={templateCoverage.byTrades.change}
              trend="up"
              comparison="vs prior"
            />
            <MetricCard
              title="Electronic Affirmation"
              value={`${templateCoverage.electronicAffirmation.value}%`}
              change={templateCoverage.electronicAffirmation.change}
              trend="up"
              comparison="(6mo)"
            />
            <MetricCard
              title="Coverage by Volume"
              value={`$${templateCoverage.byVolume.covered}B / $${templateCoverage.byVolume.total}B`}
              subValue={`(${templateCoverage.byVolume.pct}%)`}
              change={templateCoverage.byVolume.change}
              trend="up"
            />
          </div>

          {/* Coverage Trend */}
          <div>
            <Heading level={3} className="mb-4">
              Template Coverage Trend
            </Heading>
            <div className="h-64 overflow-hidden">
              <LineChart
                data={coverageTrend}
                dataKeys={[{ key: 'coverage', label: 'Coverage %', color: 'var(--fg-primary)' }]}
                xAxisKey="month"
                height={256}
                showLegend={false}
              />
            </div>
          </div>

          {/* Coverage by Counterparty */}
          <div>
            <Heading level={3} className="mb-4">
              Coverage by Counterparty
            </Heading>
            <DataTable
              data={showAllCovCP ? coverageByCounterparty : coverageByCounterparty.slice(0, 5)}
              columns={coverageCPColumns}
              pageSize={10}
            />
            {!showAllCovCP && coverageByCounterparty.length > 5 && (
              <button
                onClick={() => setShowAllCovCP(true)}
                className="mt-2 text-sm text-[var(--fg-tertiary)] hover:text-[var(--fg-primary)]"
              >
                Show more ({coverageByCounterparty.length - 5} more)
              </button>
            )}
          </div>

          {/* Coverage by Product Type */}
          <div>
            <Heading level={3} className="mb-4">
              Coverage by Product Type
            </Heading>
            <DataTable
              data={showAllCovProduct ? coverageByProduct : coverageByProduct.slice(0, 5)}
              columns={coverageProductColumns}
              pageSize={10}
            />
            {!showAllCovProduct && coverageByProduct.length > 5 && (
              <button
                onClick={() => setShowAllCovProduct(true)}
                className="mt-2 text-sm text-[var(--fg-tertiary)] hover:text-[var(--fg-primary)]"
              >
                Show more ({coverageByProduct.length - 5} more)
              </button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Automation Performance Section */}
      <Card>
        <CardHeader>
          <CardTitle>Automation Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Automation Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MetricCard
              title="Auto-Match Rate"
              value={`${automationMetrics.autoMatchRate.value}%`}
              change={automationMetrics.autoMatchRate.change}
              trend="up"
            />
            <MetricCard
              title="Avg Match Score"
              value={`${automationMetrics.avgMatchScore.value}%`}
              change={automationMetrics.avgMatchScore.change}
              trend="up"
            />
          </div>

          {/* Automation Trends */}
          <div>
            <Heading level={3} className="mb-4">
              Automation Trends
            </Heading>
            <div className="h-64 overflow-hidden">
              <LineChart
                data={automationTrend}
                dataKeys={[
                  { key: 'autoMatch', label: 'Auto-Match %', color: 'var(--fg-primary)' },
                  { key: 'matchScore', label: 'Match Score %', color: 'var(--fg-primary)' },
                ]}
                xAxisKey="month"
                height={256}
              />
            </div>
          </div>

          {/* Match Score by Counterparty */}
          <div>
            <Heading level={3} className="mb-4">
              Match Score by Counterparty
            </Heading>
            <DataTable
              data={showAllAutoCP ? matchScoreByCP : matchScoreByCP.slice(0, 5)}
              columns={matchScoreCPColumns}
              pageSize={10}
            />
            {!showAllAutoCP && matchScoreByCP.length > 5 && (
              <button
                onClick={() => setShowAllAutoCP(true)}
                className="mt-2 text-sm text-[var(--fg-tertiary)] hover:text-[var(--fg-primary)]"
              >
                Show more ({matchScoreByCP.length - 5} more)
              </button>
            )}
          </div>

          {/* Match Score by Product Type */}
          <div>
            <Heading level={3} className="mb-4">
              Match Score by Product Type
            </Heading>
            <DataTable
              data={showAllAutoProduct ? matchScoreByProduct : matchScoreByProduct.slice(0, 5)}
              columns={matchScoreProductColumns}
              pageSize={10}
            />
            {!showAllAutoProduct && matchScoreByProduct.length > 5 && (
              <button
                onClick={() => setShowAllAutoProduct(true)}
                className="mt-2 text-sm text-[var(--fg-tertiary)] hover:text-[var(--fg-primary)]"
              >
                Show more ({matchScoreByProduct.length - 5} more)
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TemplatesAutomationDashboard;

