'use client';

import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
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
  CellTrend,
} from '@float-vibe-foundry/design-system';
import { IconDownload, IconCalendar } from '@tabler/icons-react';

const CounterpartyScorecard = () => {
  const [selectedCP, setSelectedCP] = useState('GS');
  const [compareGroup, setCompareGroup] = useState('all');

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
      timeToAffirm: 18,
      affirmPercentile: 'P85',
      timeToConfirm: 18,
      confirmPercentile: 'P85',
      timeInDispute: 1.2,
      disputeTimePercentile: 'P80',
      status: 'top',
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
      timeToAffirm: 22,
      affirmPercentile: 'P70',
      timeToConfirm: 22,
      confirmPercentile: 'P70',
      timeInDispute: 1.8,
      disputeTimePercentile: 'P65',
      status: 'top',
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
      timeToAffirm: 28,
      affirmPercentile: 'P50',
      timeToConfirm: 28,
      confirmPercentile: 'P50',
      timeInDispute: 2.5,
      disputeTimePercentile: 'P50',
      status: 'middle',
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
      timeToAffirm: 38,
      affirmPercentile: 'P35',
      timeToConfirm: 38,
      confirmPercentile: 'P35',
      timeInDispute: 3.9,
      disputeTimePercentile: 'P30',
      status: 'bottom',
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
      timeToAffirm: 45,
      affirmPercentile: 'P20',
      timeToConfirm: 45,
      confirmPercentile: 'P20',
      timeInDispute: 4.8,
      disputeTimePercentile: 'P20',
      status: 'bottom',
    },
  ];

  const cpDetail = {
    GS: {
      trades: 72,
      volume: '$7.8B',
      breakRate: 15.3,
      highSevBreakRate: 4.2,
      peerAvg: 2.1,
      avgResolutionTime: 3.2,
      resolutionPeerAvg: 2.1,
      templateCompliance: 78,
      compliancePeerAvg: 92,
      timing: {
        timeToDoc: { avg: 5.2, median: 4.1, within1hr: 28, peerAvg: 62 },
        timeToAffirm: { avg: 18.3, median: 14.2, sla: 78 },
        timeToConfirm: { avg: 45, median: 38, sla: 31 },
        timeInReview: { avg: 3.2, median: 2.1 },
        timeInDispute: { avg: 4.8, median: 3.2, under48hr: 42, peerAvg: 68 },
      },
      quality: {
        disputeRate: 22.2,
        disputeCount: 16,
        breakBySeverity: { high: 4.2, medium: 6.8, low: 4.3 },
        templateCompliance: 78,
      },
      trend: [
        {
          quarter: "Q4'24",
          breakRate: 18.2,
          disputeRate: 25.1,
          timeToDoc: 6.1,
          timeInDispute: 5.8,
          slaRate: 28,
        },
        {
          quarter: "Q1'25",
          breakRate: 16.5,
          disputeRate: 23.8,
          timeToDoc: 5.8,
          timeInDispute: 5.4,
          slaRate: 29,
        },
        {
          quarter: "Q2'25",
          breakRate: 15.8,
          disputeRate: 22.9,
          timeToDoc: 5.5,
          timeInDispute: 5.1,
          slaRate: 30,
        },
        {
          quarter: "Q3'25",
          breakRate: 15.3,
          disputeRate: 22.2,
          timeToDoc: 5.2,
          timeInDispute: 4.8,
          slaRate: 31,
        },
      ],
      products: [
        {
          name: 'CMS Options',
          trades: 37,
          disputePct: 18.9,
          avgTimeToConf: 42,
          issues: 'Strike (4)',
        },
        {
          name: 'FX Options',
          trades: 24,
          disputePct: 29.2,
          avgTimeToConf: 51,
          issues: 'Notional (3)',
          warning: true,
        },
        {
          name: 'IRS',
          trades: 11,
          disputePct: 18.2,
          avgTimeToConf: 38,
          issues: 'Term Fee (2)',
        },
      ],
    },
  };

  const getStatusBadge = (status: string) => {
    if (status === 'top')
      return (
        <Badge variant="outline" className="text-text-success-primary">
          ✓
        </Badge>
      );
    if (status === 'bottom') return <Badge variant="destructive">⚠</Badge>;
    return <Badge variant="outline">-</Badge>;
  };

  const getStatusColor = (status: string) => {
    if (status === 'top') return 'text-text-success-primary';
    if (status === 'bottom') return 'text-text-error-primary';
    return 'text-text-secondary';
  };

  const selected = cpDetail[selectedCP as keyof typeof cpDetail];

  return (
    <div className="bg-bg-primary min-h-screen p-6 text-text-primary">
      {/* Header */}
      <div className="mb-6">
        <Heading level={1} className="text-text-primary">
          Counterparty Performance - Q3 2025
        </Heading>
        <Text className="text-text-secondary">
          Comprehensive scorecard with peer comparison
        </Text>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-3">
        <Select value={compareGroup} onValueChange={setCompareGroup}>
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Compare: All Counterparties</SelectItem>
            <SelectItem value="tier1">Tier 1 Banks Only</SelectItem>
            <SelectItem value="highvolume">
              High Volume (&gt;50 trades)
            </SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Products: All</SelectItem>
            <SelectItem value="rates">Rates Only</SelectItem>
            <SelectItem value="fx">FX Only</SelectItem>
            <SelectItem value="equity">Equity Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Rankings Table */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Overall Rankings (Volume-Weighted)</CardTitle>
          <CardDescription>Click any row for detailed view</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              {
                accessorKey: 'rank',
                header: ({ column }) => (
                  <SortableColumnHeader column={column} title="Rank" />
                ),
                cell: ({ row }) => (
                  <Text className="font-medium">{row.getValue('rank')}</Text>
                ),
              },
              {
                accessorKey: 'cp',
                header: 'Counterparty',
                cell: ({ row }) => (
                  <Text className="text-brand-600 font-semibold">
                    {row.getValue('cp')}
                  </Text>
                ),
              },
              {
                accessorKey: 'trades',
                header: 'Trades (Vol)',
                cell: ({ row }) => {
                  const trades = row.getValue('trades') as number;
                  const volume = row.getValue('volume') as string;
                  return (
                    <div>
                      <Text>{trades}</Text>
                      <Text className="text-text-secondary text-xs">
                        {volume}
                      </Text>
                    </div>
                  );
                },
              },
              {
                accessorKey: 'disputePct',
                header: 'Confirm Dispute %',
                cell: ({ row }) => {
                  const disputePct = row.getValue('disputePct') as number;
                  const disputePercentile = row.getValue(
                    'disputePercentile'
                  ) as string;
                  const status = row.getValue('status') as string;
                  return (
                    <div>
                      <div className={`font-medium ${getStatusColor(status)}`}>
                        {disputePct}% {getStatusBadge(status)}
                      </div>
                      <Text className="text-text-secondary text-xs">
                        ({disputePercentile})
                      </Text>
                    </div>
                  );
                },
              },
              {
                accessorKey: 'breakRate',
                header: 'Break Rate',
                cell: ({ row }) => {
                  const breakRate = row.getValue('breakRate') as number;
                  const breakPercentile = row.getValue(
                    'breakPercentile'
                  ) as string;
                  const status = row.getValue('status') as string;
                  return (
                    <div>
                      <div className={`font-medium ${getStatusColor(status)}`}>
                        {breakRate}% {getStatusBadge(status)}
                      </div>
                      <Text className="text-text-secondary text-xs">
                        ({breakPercentile})
                      </Text>
                    </div>
                  );
                },
              },
              {
                accessorKey: 'timeToDoc',
                header: 'Time to Doc (hrs)',
                cell: ({ row }) => {
                  const timeToDoc = row.getValue('timeToDoc') as number;
                  const docPercentile = row.getValue('docPercentile') as string;
                  const status = row.getValue('status') as string;
                  return (
                    <div>
                      <div className={`font-medium ${getStatusColor(status)}`}>
                        {timeToDoc}h {getStatusBadge(status)}
                      </div>
                      <Text className="text-text-secondary text-xs">
                        ({docPercentile})
                      </Text>
                    </div>
                  );
                },
              },
              {
                accessorKey: 'timeToConfirm',
                header: 'Time to Confirm (hrs)',
                cell: ({ row }) => {
                  const timeToConfirm = row.getValue('timeToConfirm') as number;
                  const confirmPercentile = row.getValue(
                    'confirmPercentile'
                  ) as string;
                  const status = row.getValue('status') as string;
                  return (
                    <div>
                      <div className={`font-medium ${getStatusColor(status)}`}>
                        {timeToConfirm}h {getStatusBadge(status)}
                      </div>
                      <Text className="text-text-secondary text-xs">
                        ({confirmPercentile})
                      </Text>
                    </div>
                  );
                },
              },
              {
                accessorKey: 'timeInDispute',
                header: 'Time in Dispute (days)',
                cell: ({ row }) => {
                  const timeInDispute = row.getValue('timeInDispute') as number;
                  const disputeTimePercentile = row.getValue(
                    'disputeTimePercentile'
                  ) as string;
                  const status = row.getValue('status') as string;
                  return (
                    <div>
                      <div className={`font-medium ${getStatusColor(status)}`}>
                        {timeInDispute}d {getStatusBadge(status)}
                      </div>
                      <Text className="text-text-secondary text-xs">
                        ({disputeTimePercentile})
                      </Text>
                    </div>
                  );
                },
              },
            ]}
            data={rankings}
            searchKey="cp"
            searchPlaceholder="Search counterparties..."
            showPagination={false}
            showSearch={true}
          />
          <div className="border-border-tertiary mt-4 border-t pt-3">
            <Text className="text-text-secondary text-sm">
              Legend:{' '}
              <Text className="text-text-success-primary font-medium">
                ✓ Top Quartile
              </Text>{' '}
              ·
              <Text className="text-text-secondary ml-2 font-medium">
                - Middle
              </Text>{' '}
              ·
              <Text className="text-text-error-primary ml-2 font-medium">
                ⚠ Bottom Quartile
              </Text>
            </Text>
          </div>
        </CardContent>
      </Card>

      {/* Detailed View */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">
                {selectedCP} - Detailed Performance
              </CardTitle>
              <div className="mt-2 flex gap-6 text-sm">
                <Text>
                  <Text className="font-bold">{selected.trades}</Text> Trades
                </Text>
                <Text>
                  <Text className="font-bold">{selected.volume}</Text> Volume
                </Text>
                <Text>
                  <Text className="font-bold">{selected.breakRate}%</Text> Break
                  Rate
                </Text>
              </div>
            </div>
            <Select value={selectedCP} onValueChange={setSelectedCP}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {rankings.map(r => (
                  <SelectItem key={r.cp} value={r.cp}>
                    {r.cp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Summary Stats */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Text className="text-text-secondary text-sm">
                    High-Severity Break Rate
                  </Text>
                  <div className="text-text-error-primary text-xl font-bold">
                    {selected.highSevBreakRate}%{' '}
                    <span className="text-sm">⚠</span>
                  </div>
                  <Text className="text-text-secondary text-xs">
                    vs. {selected.peerAvg}% peer avg
                  </Text>
                </div>
                <div>
                  <Text className="text-text-secondary text-sm">
                    Avg Resolution Time
                  </Text>
                  <div className="text-text-error-primary text-xl font-bold">
                    {selected.avgResolutionTime} days{' '}
                    <span className="text-sm">⚠</span>
                  </div>
                  <Text className="text-text-secondary text-xs">
                    vs. {selected.resolutionPeerAvg} day avg
                  </Text>
                </div>
                <div>
                  <Text className="text-text-secondary text-sm">
                    Template Compliance
                  </Text>
                  <div className="text-text-error-primary text-xl font-bold">
                    {selected.templateCompliance}%{' '}
                    <span className="text-sm">⚠</span>
                  </div>
                  <Text className="text-text-secondary text-xs">
                    vs. {selected.compliancePeerAvg}% peer avg
                  </Text>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timing & Quality Metrics */}
          <div className="mb-6 grid grid-cols-2 gap-6">
            {/* Timing */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Timing Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div>
                    <Text className="mb-1 font-medium">
                      Time to Receive Doc
                    </Text>
                    <div className="text-text-secondary grid grid-cols-2 gap-2 text-xs">
                      <div>
                        Avg:{' '}
                        <Text className="text-text-error-primary font-semibold">
                          {selected.timing.timeToDoc.avg}h ⚠
                        </Text>
                      </div>
                      <div>Median: {selected.timing.timeToDoc.median}h</div>
                      <div>
                        Within 1hr: {selected.timing.timeToDoc.within1hr}%
                      </div>
                      <div>Peer avg: {selected.timing.timeToDoc.peerAvg}%</div>
                    </div>
                  </div>
                  <div>
                    <Text className="mb-1 font-medium">Time to Affirm</Text>
                    <div className="text-text-secondary grid grid-cols-2 gap-2 text-xs">
                      <div>Avg: {selected.timing.timeToAffirm.avg}h</div>
                      <div>Median: {selected.timing.timeToAffirm.median}h</div>
                      <div>
                        &lt;24hr SLA:{' '}
                        <Text className="text-text-error-primary font-semibold">
                          {selected.timing.timeToAffirm.sla}% ⚠
                        </Text>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Text className="mb-1 font-medium">Time to Confirm</Text>
                    <div className="text-text-secondary grid grid-cols-2 gap-2 text-xs">
                      <div>
                        Avg:{' '}
                        <Text className="text-text-error-primary font-semibold">
                          {selected.timing.timeToConfirm.avg}h ⚠
                        </Text>
                      </div>
                      <div>Median: {selected.timing.timeToConfirm.median}h</div>
                      <div>
                        &lt;24hr SLA:{' '}
                        <Text className="text-text-error-primary font-semibold">
                          {selected.timing.timeToConfirm.sla}% ⚠
                        </Text>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Text className="mb-1 font-medium">Time in Dispute</Text>
                    <div className="text-text-secondary grid grid-cols-2 gap-2 text-xs">
                      <div>
                        Avg:{' '}
                        <Text className="text-text-error-primary font-semibold">
                          {selected.timing.timeInDispute.avg}d ⚠
                        </Text>
                      </div>
                      <div>Median: {selected.timing.timeInDispute.median}d</div>
                      <div>
                        &lt;48hr resolution:{' '}
                        <Text className="text-text-error-primary font-semibold">
                          {selected.timing.timeInDispute.under48hr}% ⚠
                        </Text>
                      </div>
                      <div>
                        Peer avg: {selected.timing.timeInDispute.peerAvg}%
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quality */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quality Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div>
                    <Text className="mb-1 font-medium">
                      Confirm Dispute Rate
                    </Text>
                    <div className="text-text-error-primary mb-1 text-2xl font-bold">
                      {selected.quality.disputeRate}%{' '}
                      <span className="text-sm">⚠</span>
                    </div>
                    <Text className="text-text-secondary text-xs">
                      ({selected.quality.disputeCount} of {selected.trades})
                    </Text>
                  </div>
                  <div>
                    <Text className="mb-2 font-medium">
                      Break Rate by Severity
                    </Text>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <Text>High:</Text>
                        <Text className="text-text-error-primary font-semibold">
                          {selected.quality.breakBySeverity.high}% ⚠
                        </Text>
                      </div>
                      <div className="flex justify-between">
                        <Text>Medium:</Text>
                        <Text className="font-semibold">
                          {selected.quality.breakBySeverity.medium}%
                        </Text>
                      </div>
                      <div className="flex justify-between">
                        <Text>Low:</Text>
                        <Text className="font-semibold">
                          {selected.quality.breakBySeverity.low}%
                        </Text>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Text className="mb-1 font-medium">
                      Template Compliance
                    </Text>
                    <div className="text-text-error-primary mb-1 text-2xl font-bold">
                      {selected.quality.templateCompliance}%{' '}
                      <span className="text-sm">⚠</span>
                    </div>
                    <Text className="text-text-secondary text-xs">
                      vs {selected.compliancePeerAvg}% peer avg
                    </Text>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trend Analysis */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">
                Trend Analysis (Last 4 Quarters)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={[
                  {
                    accessorKey: 'metric',
                    header: 'Metric',
                    cell: ({ row }) => (
                      <Text className="font-medium">
                        {row.getValue('metric')}
                      </Text>
                    ),
                  },
                  ...selected.trend.map((q, i) => ({
                    accessorKey: `quarter_${i}`,
                    header: q.quarter,
                    cell: ({ row }: { row: any }) => {
                      const metric = row.getValue('metric') as string;
                      const quarterData = selected.trend[i];
                      let value = '';
                      if (metric === 'Break Rate')
                        value = `${quarterData.breakRate}%`;
                      else if (metric === 'Dispute Rate')
                        value = `${quarterData.disputeRate}%`;
                      else if (metric === 'Time to Doc (hrs)')
                        value = `${quarterData.timeToDoc}h`;
                      else if (metric === 'Time in Dispute (days)')
                        value = `${quarterData.timeInDispute}d`;
                      else if (metric === '<24hr SLA Rate')
                        value = `${quarterData.slaRate}%`;
                      return <Text>{value}</Text>;
                    },
                  })),
                  {
                    accessorKey: 'trend',
                    header: 'Trend',
                    cell: ({ row }: { row: any }) => {
                      const metric = row.getValue('metric') as string;
                      const isImproving = [
                        'Break Rate',
                        'Dispute Rate',
                        'Time to Doc (hrs)',
                        'Time in Dispute (days)',
                      ].includes(metric);
                      const isSLA = metric === '<24hr SLA Rate';

                      if (isImproving) {
                        return (
                          <CellTrend
                            direction="down"
                            label="Better"
                            variant="success"
                          />
                        );
                      } else if (isSLA) {
                        return (
                          <CellTrend
                            direction="up"
                            label="Better"
                            variant="success"
                          />
                        );
                      } else {
                        return (
                          <CellTrend
                            direction="down"
                            label="Worse"
                            variant="error"
                          />
                        );
                      }
                    },
                  },
                ]}
                data={[
                  { metric: 'Break Rate' },
                  { metric: 'Dispute Rate' },
                  { metric: 'Time to Doc (hrs)' },
                  { metric: 'Time in Dispute (days)' },
                  { metric: '<24hr SLA Rate' },
                ]}
                searchKey="metric"
                searchPlaceholder="Search metrics..."
                showPagination={false}
                showSearch={false}
              />
            </CardContent>
          </Card>

          {/* Product Breakdown */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Product Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={[
                  {
                    accessorKey: 'name',
                    header: 'Product',
                    cell: ({ row }) => (
                      <Text className="font-medium">
                        {row.getValue('name')}
                      </Text>
                    ),
                  },
                  {
                    accessorKey: 'trades',
                    header: 'Trades',
                    cell: ({ row }) => <Text>{row.getValue('trades')}</Text>,
                  },
                  {
                    accessorKey: 'disputePct',
                    header: 'Dispute %',
                    cell: ({ row }: { row: any }) => {
                      const disputePct = row.getValue('disputePct') as number;
                      const warning = row.getValue('warning') as boolean;
                      return (
                        <Text
                          className={
                            warning ? 'text-text-error-primary font-bold' : ''
                          }
                        >
                          {disputePct}% {warning && '⚠'}
                        </Text>
                      );
                    },
                  },
                  {
                    accessorKey: 'avgTimeToConf',
                    header: 'Avg Time to Confirm',
                    cell: ({ row }: { row: any }) => {
                      const avgTimeToConf = row.getValue(
                        'avgTimeToConf'
                      ) as number;
                      const warning = row.getValue('warning') as boolean;
                      return (
                        <Text
                          className={
                            warning ? 'text-text-error-primary font-bold' : ''
                          }
                        >
                          {avgTimeToConf}h {warning && '⚠'}
                        </Text>
                      );
                    },
                  },
                  {
                    accessorKey: 'issues',
                    header: 'Key Issues',
                    cell: ({ row }) => (
                      <Text className="text-text-secondary">
                        {row.getValue('issues')}
                      </Text>
                    ),
                  },
                ]}
                data={selected.products.map(prod => ({
                  ...prod,
                  warning: prod.warning || false,
                }))}
                searchKey="name"
                searchPlaceholder="Search products..."
                showPagination={false}
                showSearch={true}
              />
            </CardContent>
          </Card>

          {/* Talking Points */}
          <Card className="bg-bg-secondary mb-6">
            <CardHeader>
              <CardTitle className="text-base">
                Key Talking Points for Quarterly Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <Text className="text-text-success-primary mb-1 font-medium">
                    ✓ POSITIVES:
                  </Text>
                  <ul className="text-text-secondary ml-2 list-inside list-disc space-y-1">
                    <li>
                      Consistent improvement across all metrics for 4 quarters
                    </li>
                    <li>
                      Time to send docs improving (5.2h vs 6.1h a year ago)
                    </li>
                    <li>CMS Options performing close to peer average</li>
                  </ul>
                </div>
                <div>
                  <Text className="text-text-error-primary mb-1 font-medium">
                    ⚠ CONCERNS:
                  </Text>
                  <ul className="text-text-secondary ml-2 list-inside list-disc space-y-1">
                    <li>Overall metrics still bottom quartile vs peers</li>
                    <li>FX Options dispute rate 2.4x peer average</li>
                    <li>
                      Dispute resolution taking 2x longer than top performers
                    </li>
                    <li>
                      Only 31% of trades meeting 24-hour SLA vs 85% peer avg
                    </li>
                  </ul>
                </div>
                <div>
                  <Text className="mb-1 font-medium text-text-brand">
                    💡 RECOMMENDATIONS:
                  </Text>
                  <ul className="text-text-secondary ml-2 list-inside list-disc space-y-1">
                    <li>Request process review for FX Options specifically</li>
                    <li>Discuss template compliance improvement plan</li>
                    <li>
                      Establish escalation path for disputes over 48 hours
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" size="sm">
              <IconDownload className="mr-2 h-4 w-4" />
              Export Full Scorecard (PDF)
            </Button>
            <Button variant="outline" size="sm">
              <IconDownload className="mr-2 h-4 w-4" />
              Export Data (CSV)
            </Button>
            <Button size="sm">
              <IconCalendar className="mr-2 h-4 w-4" />
              Schedule Review
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CounterpartyScorecard;
