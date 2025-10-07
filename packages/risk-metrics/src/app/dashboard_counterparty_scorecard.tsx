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
  MetricCard,
  CellText,
  CellPerformance,
} from '@float-vibe-foundry/design-system';
import { ColumnDef } from '@tanstack/react-table';

const CounterpartyScorecardDashboard = () => {
  const [selectedCP, setSelectedCP] = useState('GS');
  const [productFilter, setProductFilter] = useState('all');

  // Overall Rankings Data
  const rankings = [
    {
      rank: 1,
      cp: 'MS',
      trades: 45,
      volume: '$4.2B',
      disputePct: 6.7,
      disputePercentile: 'P80',
      breakRate: 4.2,
      breakPercentile: 'P75',
      timeToDoc: 0.8,
      docPercentile: 'P90',
      timeToConfirm: 18,
      confirmPercentile: 'P85',
      timeInDispute: 1.2,
      disputeTimePercentile: 'P80',
      status: 'top' as const,
    },
    {
      rank: 2,
      cp: 'BAML',
      trades: 52,
      volume: '$5.1B',
      disputePct: 9.6,
      disputePercentile: 'P70',
      breakRate: 6.1,
      breakPercentile: 'P60',
      timeToDoc: 1.2,
      docPercentile: 'P75',
      timeToConfirm: 22,
      confirmPercentile: 'P70',
      timeInDispute: 1.8,
      disputeTimePercentile: 'P65',
      status: 'top' as const,
    },
    {
      rank: 3,
      cp: 'Citi',
      trades: 38,
      volume: '$3.8B',
      disputePct: 13.2,
      disputePercentile: 'P50',
      breakRate: 8.9,
      breakPercentile: 'P45',
      timeToDoc: 2.1,
      docPercentile: 'P50',
      timeToConfirm: 28,
      confirmPercentile: 'P50',
      timeInDispute: 2.5,
      disputeTimePercentile: 'P50',
      status: 'middle' as const,
    },
    {
      rank: 4,
      cp: 'JPM',
      trades: 61,
      volume: '$6.2B',
      disputePct: 18.0,
      disputePercentile: 'P30',
      breakRate: 11.2,
      breakPercentile: 'P30',
      timeToDoc: 3.8,
      docPercentile: 'P30',
      timeToConfirm: 38,
      confirmPercentile: 'P35',
      timeInDispute: 3.9,
      disputeTimePercentile: 'P30',
      status: 'bottom' as const,
    },
    {
      rank: 5,
      cp: 'GS',
      trades: 72,
      volume: '$7.8B',
      disputePct: 22.2,
      disputePercentile: 'P15',
      breakRate: 15.3,
      breakPercentile: 'P15',
      timeToDoc: 5.2,
      docPercentile: 'P15',
      timeToConfirm: 45,
      confirmPercentile: 'P20',
      timeInDispute: 4.8,
      disputeTimePercentile: 'P20',
      status: 'bottom' as const,
    },
  ];

  // Detailed View Data (for selected counterparty)
  const detailedData = {
    GS: {
      trades: 72,
      volume: '$7.8B',
      breakRate: 15.3,
      summary: {
        highSevBreakRate: 4.2,
        peerAvg: 2.1,
        avgResolutionTime: 3.2,
        resolutionPeerAvg: 2.1,
        templateCompliance: 78,
        compliancePeerAvg: 92,
      },
      timing: {
        timeToDoc: { avg: 5.2, median: 4.1, within1hr: 28, peerAvg: 62 },
        timeToAffirm: { avg: 18.3, median: 14.2, sla: 78 },
        timeToConfirm: { avg: 45, median: 38, sla: 31 },
        timeInDispute: { avg: 4.8, median: 3.2, under48hr: 42, peerAvg: 68 },
      },
      quality: {
        disputeRate: 22.2,
        disputeCount: 16,
        breakBySeverity: { high: 4.2, medium: 6.8, low: 4.3 },
        templateCompliance: 78,
      },
      trend: [
        { quarter: "Q4'24", breakRate: 18.2, disputeRate: 25.1, timeToDoc: 6.1, timeInDispute: 5.8, slaRate: 28 },
        { quarter: "Q1'25", breakRate: 16.5, disputeRate: 23.8, timeToDoc: 5.8, timeInDispute: 5.4, slaRate: 29 },
        { quarter: "Q2'25", breakRate: 15.8, disputeRate: 22.9, timeToDoc: 5.5, timeInDispute: 5.1, slaRate: 30 },
        { quarter: "Q3'25", breakRate: 15.3, disputeRate: 22.2, timeToDoc: 5.2, timeInDispute: 4.8, slaRate: 31 },
      ],
      products: [
        { name: 'CMS Options', trades: 37, disputePct: 18.9, avgTimeToConf: 42, issues: 'Strike (4)', warning: false },
        { name: 'FX Options', trades: 24, disputePct: 29.2, avgTimeToConf: 51, issues: 'Notional (3)', warning: true },
        { name: 'IRS', trades: 11, disputePct: 18.2, avgTimeToConf: 38, issues: 'Term Fee (2)', warning: false },
      ],
    },
    // Add similar data for other counterparties (simplified for now)
    MS: {
      trades: 45,
      volume: '$4.2B',
      breakRate: 4.2,
      summary: { highSevBreakRate: 1.8, peerAvg: 2.1, avgResolutionTime: 1.5, resolutionPeerAvg: 2.1, templateCompliance: 95, compliancePeerAvg: 92 },
      timing: {
        timeToDoc: { avg: 0.8, median: 0.6, within1hr: 82, peerAvg: 62 },
        timeToAffirm: { avg: 12.5, median: 10.2, sla: 92 },
        timeToConfirm: { avg: 18, median: 15, sla: 85 },
        timeInDispute: { avg: 1.2, median: 0.9, under48hr: 88, peerAvg: 68 },
      },
      quality: { disputeRate: 6.7, disputeCount: 3, breakBySeverity: { high: 1.8, medium: 1.5, low: 0.9 }, templateCompliance: 95 },
      trend: [
        { quarter: "Q4'24", breakRate: 5.1, disputeRate: 8.2, timeToDoc: 1.2, timeInDispute: 1.8, slaRate: 78 },
        { quarter: "Q1'25", breakRate: 4.8, disputeRate: 7.5, timeToDoc: 1.0, timeInDispute: 1.5, slaRate: 82 },
        { quarter: "Q2'25", breakRate: 4.5, disputeRate: 7.1, timeToDoc: 0.9, timeInDispute: 1.3, slaRate: 84 },
        { quarter: "Q3'25", breakRate: 4.2, disputeRate: 6.7, timeToDoc: 0.8, timeInDispute: 1.2, slaRate: 85 },
      ],
      products: [
        { name: 'IRS', trades: 28, disputePct: 5.4, avgTimeToConf: 16, issues: 'None', warning: false },
        { name: 'Swaptions', trades: 17, disputePct: 8.8, avgTimeToConf: 22, issues: 'Spread (1)', warning: false },
      ],
    },
  };

  const currentData = detailedData[selectedCP as keyof typeof detailedData] || detailedData.GS;

  // Column definitions for Rankings Table
  const rankingsColumns: ColumnDef<(typeof rankings)[0]>[] = [
    {
      accessorKey: 'rank',
      header: 'Rank',
      cell: ({ row }) => <CellText className="font-semibold">{row.getValue('rank')}</CellText>,
    },
    {
      accessorKey: 'cp',
      header: 'CP',
      cell: ({ row }) => <CellText className="font-medium">{row.getValue('cp')}</CellText>,
    },
    {
      accessorKey: 'trades',
      header: ({ column }) => <SortableColumnHeader column={column} title="Trades" />,
      cell: ({ row }) => {
        const trades = row.getValue('trades') as number;
        const volume = row.original.volume;
        return (
          <div className="text-sm">
            <div className="font-medium">{trades}</div>
            <div className="text-xs text-[var(--fg-tertiary)]">{volume}</div>
          </div>
        );
      },
    },
    {
      accessorKey: 'disputePct',
      header: ({ column }) => <SortableColumnHeader column={column} title="Disp%" />,
      cell: ({ row }) => {
        const pct = row.getValue('disputePct') as number;
        const percentile = row.original.disputePercentile;
        const status = row.original.status;
        return (
          <div className="text-sm">
            <div className="flex items-center gap-2">
              <span>{pct}%</span>
              {status === 'top' && <CellPerformance level="top" />}
              {status === 'bottom' && <CellPerformance level="bottom" />}
            </div>
            <div className="text-xs text-[var(--fg-tertiary)]">({percentile})</div>
          </div>
        );
      },
    },
    {
      accessorKey: 'breakRate',
      header: ({ column }) => <SortableColumnHeader column={column} title="Break%" />,
      cell: ({ row }) => {
        const pct = row.getValue('breakRate') as number;
        const percentile = row.original.breakPercentile;
        const status = row.original.status;
        return (
          <div className="text-sm">
            <div className="flex items-center gap-2">
              <span>{pct}%</span>
              {status === 'top' && <CellPerformance level="top" />}
              {status === 'bottom' && <CellPerformance level="bottom" />}
            </div>
            <div className="text-xs text-[var(--fg-tertiary)]">({percentile})</div>
          </div>
        );
      },
    },
    {
      accessorKey: 'timeToDoc',
      header: ({ column }) => <SortableColumnHeader column={column} title="Time Doc" />,
      cell: ({ row }) => {
        const time = row.getValue('timeToDoc') as number;
        const percentile = row.original.docPercentile;
        const status = row.original.status;
        return (
          <div className="text-sm">
            <div className="flex items-center gap-2">
              <span>{time}h</span>
              {status === 'top' && <CellPerformance level="top" />}
              {status === 'bottom' && <CellPerformance level="bottom" />}
            </div>
            <div className="text-xs text-[var(--fg-tertiary)]">({percentile})</div>
          </div>
        );
      },
    },
    {
      accessorKey: 'timeToConfirm',
      header: ({ column }) => <SortableColumnHeader column={column} title="Time Conf" />,
      cell: ({ row }) => {
        const time = row.getValue('timeToConfirm') as number;
        const percentile = row.original.confirmPercentile;
        const status = row.original.status;
        return (
          <div className="text-sm">
            <div className="flex items-center gap-2">
              <span>{time}h</span>
              {status === 'top' && <CellPerformance level="top" />}
              {status === 'bottom' && <CellPerformance level="bottom" />}
            </div>
            <div className="text-xs text-[var(--fg-tertiary)]">({percentile})</div>
          </div>
        );
      },
    },
    {
      accessorKey: 'timeInDispute',
      header: ({ column }) => <SortableColumnHeader column={column} title="Time Dispute" />,
      cell: ({ row }) => {
        const time = row.getValue('timeInDispute') as number;
        const percentile = row.original.disputeTimePercentile;
        const status = row.original.status;
        return (
          <div className="text-sm">
            <div className="flex items-center gap-2">
              <span>{time}d</span>
              {status === 'top' && <CellPerformance level="top" />}
              {status === 'bottom' && <CellPerformance level="bottom" />}
            </div>
            <div className="text-xs text-[var(--fg-tertiary)]">({percentile})</div>
          </div>
        );
      },
    },
  ];

  // Column definitions for Trend Analysis Table
  const trendColumns: ColumnDef<(typeof currentData.trend)[0]>[] = [
    {
      accessorKey: 'quarter',
      header: 'Metric / Quarter',
      cell: ({ row }) => <CellText>{row.getValue('quarter')}</CellText>,
    },
    {
      accessorKey: 'breakRate',
      header: 'Break Rate',
      cell: ({ row }) => <CellText>{row.getValue('breakRate')}%</CellText>,
    },
    {
      accessorKey: 'disputeRate',
      header: 'Dispute Rate',
      cell: ({ row }) => <CellText>{row.getValue('disputeRate')}%</CellText>,
    },
    {
      accessorKey: 'timeToDoc',
      header: 'Time to Doc',
      cell: ({ row }) => <CellText>{row.getValue('timeToDoc')}h</CellText>,
    },
    {
      accessorKey: 'timeInDispute',
      header: 'Time Dispute',
      cell: ({ row }) => <CellText>{row.getValue('timeInDispute')}d</CellText>,
    },
    {
      accessorKey: 'slaRate',
      header: '<24hr SLA',
      cell: ({ row }) => <CellText>{row.getValue('slaRate')}%</CellText>,
    },
  ];

  // Column definitions for Product Breakdown Table
  const productColumns: ColumnDef<(typeof currentData.products)[0]>[] = [
    {
      accessorKey: 'name',
      header: 'Product',
      cell: ({ row }) => <CellText>{row.getValue('name')}</CellText>,
    },
    {
      accessorKey: 'trades',
      header: 'Trades',
      cell: ({ row }) => <CellText>{row.getValue('trades')}</CellText>,
    },
    {
      accessorKey: 'disputePct',
      header: 'Disp%',
      cell: ({ row }) => {
        const pct = row.getValue('disputePct') as number;
        const warning = row.original.warning;
        return (
          <div className="flex items-center gap-2">
            <span className="text-sm">{pct}%</span>
            {warning && <CellPerformance level="bottom" />}
          </div>
        );
      },
    },
    {
      accessorKey: 'avgTimeToConf',
      header: 'Avg Time Conf',
      cell: ({ row }) => {
        const time = row.getValue('avgTimeToConf') as number;
        const warning = row.original.warning;
        return (
          <div className="flex items-center gap-2">
            <span className="text-sm">{time}h</span>
            {warning && <CellPerformance level="bottom" />}
          </div>
        );
      },
    },
    {
      accessorKey: 'issues',
      header: 'Key Issues',
      cell: ({ row }) => {
        const issues = row.getValue('issues') as string;
        const warning = row.original.warning;
        return (
          <div className="flex items-center gap-2">
            <span className="text-sm">{issues}</span>
            {warning && <CellPerformance level="bottom" />}
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Heading level={1}>Counterparty Performance - Q3 2025</Heading>
        <div className="flex items-center gap-4">
          <Select value={productFilter} onValueChange={setProductFilter}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="rates">Rates Only</SelectItem>
              <SelectItem value="fx">FX Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Overall Rankings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Rankings (Volume-Weighted)</CardTitle>
          <Text className="text-sm text-[var(--fg-tertiary)]">
            Click any row for detailed view
          </Text>
        </CardHeader>
        <CardContent>
          <DataTable
            data={rankings}
            columns={rankingsColumns}
            showSearch={false}
          />
          <div className="mt-4 flex items-center gap-4 text-sm text-[var(--fg-tertiary)]">
            <div className="flex items-center gap-2">
              <span>Legend:</span>
              <CellPerformance level="top" />
              <span>Top Quartile</span>
              <span>- Middle</span>
              <CellPerformance level="bottom" />
              <span>Bottom Quartile</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed View */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{selectedCP} - Detailed Performance</CardTitle>
              <Text className="text-sm mt-2">
                {currentData.trades} Trades | {currentData.volume} Volume | {currentData.breakRate}% Break Rate
              </Text>
            </div>
            <Select value={selectedCP} onValueChange={setSelectedCP}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GS">GS</SelectItem>
                <SelectItem value="MS">MS</SelectItem>
                <SelectItem value="JPM">JPM</SelectItem>
                <SelectItem value="BAML">BAML</SelectItem>
                <SelectItem value="Citi">Citi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Summary Metrics */}
          <div>
            <Heading level={3} className="mb-4">
              Summary Metrics
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MetricCard
                title="High-Severity Break"
                value={`${currentData.summary.highSevBreakRate}%`}
                subValue={`vs ${currentData.summary.peerAvg}% peer avg`}
                status={currentData.summary.highSevBreakRate > currentData.summary.peerAvg ? 'danger' : 'good'}
              />
              <MetricCard
                title="Avg Resolution Time"
                value={`${currentData.summary.avgResolutionTime} days`}
                subValue={`vs ${currentData.summary.resolutionPeerAvg} day avg`}
                status={currentData.summary.avgResolutionTime > currentData.summary.resolutionPeerAvg ? 'danger' : 'good'}
              />
              <MetricCard
                title="Template Compliance"
                value={`${currentData.summary.templateCompliance}%`}
                subValue={`vs ${currentData.summary.compliancePeerAvg}% peer avg`}
                status={currentData.summary.templateCompliance < currentData.summary.compliancePeerAvg ? 'danger' : 'good'}
              />
            </div>
          </div>

          {/* Timing & Quality Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Timing Metrics */}
            <Card className="border border-[var(--border-secondary)]">
              <CardHeader>
                <CardTitle className="text-lg">Timing Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Text className="font-semibold mb-2">Time to Receive Doc</Text>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[var(--fg-tertiary)]">Avg:</span>
                      <span className={currentData.timing.timeToDoc.avg > 3 ? 'text-text-error-primary' : ''}>
                        {currentData.timing.timeToDoc.avg}h {currentData.timing.timeToDoc.avg > 3 && <CellPerformance level="bottom" />}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--fg-tertiary)]">Median:</span>
                      <span>{currentData.timing.timeToDoc.median}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--fg-tertiary)]">Within 1hr:</span>
                      <span>{currentData.timing.timeToDoc.within1hr}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--fg-tertiary)]">Peer avg:</span>
                      <span>{currentData.timing.timeToDoc.peerAvg}%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Text className="font-semibold mb-2">Time to Affirm</Text>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[var(--fg-tertiary)]">Avg:</span>
                      <span>{currentData.timing.timeToAffirm.avg}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--fg-tertiary)]">Median:</span>
                      <span>{currentData.timing.timeToAffirm.median}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--fg-tertiary)]">&lt;24hr SLA:</span>
                      <span>{currentData.timing.timeToAffirm.sla}%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Text className="font-semibold mb-2">Time to Confirm</Text>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[var(--fg-tertiary)]">Avg:</span>
                      <span className={currentData.timing.timeToConfirm.avg > 36 ? 'text-text-error-primary' : ''}>
                        {currentData.timing.timeToConfirm.avg}h {currentData.timing.timeToConfirm.avg > 36 && <CellPerformance level="bottom" />}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--fg-tertiary)]">Median:</span>
                      <span>{currentData.timing.timeToConfirm.median}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--fg-tertiary)]">&lt;24hr SLA:</span>
                      <span className={currentData.timing.timeToConfirm.sla < 50 ? 'text-text-error-primary' : ''}>
                        {currentData.timing.timeToConfirm.sla}% {currentData.timing.timeToConfirm.sla < 50 && <CellPerformance level="bottom" />}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <Text className="font-semibold mb-2">Time in Dispute</Text>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[var(--fg-tertiary)]">Avg:</span>
                      <span className={currentData.timing.timeInDispute.avg > 3 ? 'text-text-error-primary' : ''}>
                        {currentData.timing.timeInDispute.avg}d {currentData.timing.timeInDispute.avg > 3 && <CellPerformance level="bottom" />}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--fg-tertiary)]">Median:</span>
                      <span>{currentData.timing.timeInDispute.median}d</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--fg-tertiary)]">&lt;48hr resolution:</span>
                      <span>{currentData.timing.timeInDispute.under48hr}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--fg-tertiary)]">Peer avg:</span>
                      <span>{currentData.timing.timeInDispute.peerAvg}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quality Metrics */}
            <Card className="border border-[var(--border-secondary)]">
              <CardHeader>
                <CardTitle className="text-lg">Quality Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Text className="font-semibold mb-2">Confirm Dispute Rate</Text>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>{currentData.quality.disputeRate}%</span>
                      <CellPerformance level="bottom" />
                    </div>
                    <div className="text-[var(--fg-tertiary)]">
                      ({currentData.quality.disputeCount} of {currentData.trades})
                    </div>
                  </div>
                </div>

                <div>
                  <Text className="font-semibold mb-2">Break Rate by Severity</Text>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[var(--fg-tertiary)]">High:</span>
                      <span className="text-text-error-primary">
                        {currentData.quality.breakBySeverity.high}% <CellPerformance level="bottom" />
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--fg-tertiary)]">Medium:</span>
                      <span>{currentData.quality.breakBySeverity.medium}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--fg-tertiary)]">Low:</span>
                      <span>{currentData.quality.breakBySeverity.low}%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Text className="font-semibold mb-2">Template Compliance</Text>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>{currentData.quality.templateCompliance}%</span>
                      <CellPerformance level="bottom" />
                    </div>
                    <div className="text-[var(--fg-tertiary)]">
                      vs {currentData.summary.compliancePeerAvg}% peer avg
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trend Analysis */}
          <div>
            <Heading level={3} className="mb-4">
              Trend Analysis (Last 4 Quarters)
            </Heading>
            <DataTable
              data={currentData.trend}
              columns={trendColumns}
              showSearch={false}
            />
            <div className="mt-2 text-sm text-text-success-primary">
              <CellPerformance level="top" /> All metrics showing consistent improvement over 4 quarters
            </div>
          </div>

          {/* Product Breakdown */}
          <div>
            <Heading level={3} className="mb-4">
              Product Breakdown
            </Heading>
            <DataTable
              data={currentData.products}
              columns={productColumns}
              showSearch={false}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CounterpartyScorecardDashboard;

