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
} from '@float-vibe-foundry/design-system';
import {
  IconDownload,
  IconTrendingUp,
  IconAlertCircle,
} from '@tabler/icons-react';

const ActivityDashboard = () => {
  const [dateRange, setDateRange] = useState('90d');
  const [groupBy, setGroupBy] = useState('month');

  const volumeOverview = {
    totalTrades: 758,
    tradesTrend: 12.3,
    totalVolume: '$76.2B',
    volumeTrend: 8.7,
    avgTradeSize: '$100.5M',
  };

  const productFamily = {
    byCount: [
      { name: 'Rates', count: 328, pct: 43, volume: '$38.1B', volPct: 50 },
      { name: 'FX', count: 197, pct: 26, volume: '$18.3B', volPct: 24 },
      { name: 'Equity', count: 151, pct: 20, volume: '$12.4B', volPct: 16 },
      { name: 'Credit', count: 82, pct: 11, volume: '$7.4B', volPct: 10 },
    ],
  };

  const productTypes = [
    { name: 'IRS', count: 145, volume: '$18.2B', trend: 15, trendDir: 'up' },
    {
      name: 'FX Option',
      count: 112,
      volume: '$12.1B',
      trend: 8,
      trendDir: 'up',
    },
    {
      name: 'CMS Option',
      count: 98,
      volume: '$14.8B',
      trend: 22,
      trendDir: 'up',
      surge: true,
    },
    {
      name: 'Equity Option',
      count: 87,
      volume: '$8.9B',
      trend: -3,
      trendDir: 'down',
    },
    { name: 'Swaption', count: 76, volume: '$9.2B', trend: 5, trendDir: 'up' },
    {
      name: 'Credit Default Swap',
      count: 54,
      volume: '$5.1B',
      trend: -8,
      trendDir: 'down',
    },
    {
      name: 'FX Forward',
      count: 48,
      volume: '$4.3B',
      trend: 12,
      trendDir: 'up',
    },
    {
      name: 'Equity Swap',
      count: 42,
      volume: '$2.8B',
      trend: 0,
      trendDir: 'flat',
    },
    {
      name: 'Cross-Ccy Swap',
      count: 38,
      volume: '$3.9B',
      trend: 18,
      trendDir: 'up',
    },
    {
      name: 'Variance Swap',
      count: 22,
      volume: '$1.2B',
      trend: -5,
      trendDir: 'down',
    },
  ];

  const counterparties = [
    {
      name: 'Goldman Sachs',
      count: 184,
      volume: '$22.1B',
      countPct: 24.3,
      volPct: 29.0,
    },
    {
      name: 'JP Morgan',
      count: 156,
      volume: '$18.7B',
      countPct: 20.6,
      volPct: 24.5,
    },
    {
      name: 'Morgan Stanley',
      count: 132,
      volume: '$14.2B',
      countPct: 17.4,
      volPct: 18.6,
    },
    {
      name: 'Bank of America',
      count: 108,
      volume: '$10.8B',
      countPct: 14.2,
      volPct: 14.2,
    },
    {
      name: 'Citigroup',
      count: 89,
      volume: '$7.1B',
      countPct: 11.7,
      volPct: 9.3,
    },
    {
      name: 'Deutsche Bank',
      count: 42,
      volume: '$1.8B',
      countPct: 5.5,
      volPct: 2.4,
    },
    {
      name: 'Barclays',
      count: 28,
      volume: '$1.1B',
      countPct: 3.7,
      volPct: 1.4,
    },
    {
      name: 'Credit Suisse',
      count: 12,
      volume: '$0.3B',
      countPct: 1.6,
      volPct: 0.4,
    },
    { name: 'UBS', count: 5, volume: '$0.1B', countPct: 0.7, volPct: 0.1 },
    {
      name: 'BNP Paribas',
      count: 2,
      volume: '$0.1B',
      countPct: 0.3,
      volPct: 0.1,
    },
  ];

  const activityOverTime = [
    { label: 'Jul 1', value: 52 },
    { label: 'Jul 8', value: 58 },
    { label: 'Jul 15', value: 62 },
    { label: 'Jul 22', value: 65 },
    { label: 'Jul 29', value: 68 },
    { label: 'Aug 5', value: 72 },
    { label: 'Aug 12', value: 78 },
    { label: 'Aug 19', value: 91 },
    { label: 'Aug 26', value: 85 },
    { label: 'Sep 2', value: 88 },
    { label: 'Sep 9', value: 92 },
    { label: 'Sep 16', value: 95 },
    { label: 'Sep 23', value: 93 },
  ];

  const getTrendIcon = (dir: string) => {
    if (dir === 'up')
      return <span className="text-text-success-primary">↑</span>;
    if (dir === 'down') return <span className="text-text-error-primary">↓</span>;
    return <span className="text-text-secondary">→</span>;
  };

  return (
    <div className="bg-bg-primary min-h-screen p-6 text-text-primary">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <Heading level={1} className="text-text-primary">
            Trading Activity Analysis
          </Heading>
          <Text className="text-text-secondary">
            Volume and activity trends across products and counterparties
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
          <Select value={groupBy} onValueChange={setGroupBy}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Group By: Daily</SelectItem>
              <SelectItem value="week">Group By: Weekly</SelectItem>
              <SelectItem value="month">Group By: Monthly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <IconDownload className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Volume Overview */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Volume Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <Text className="text-text-secondary mb-1 text-sm">
                Total Trades
              </Text>
              <div className="text-text-primary text-3xl font-bold">
                {volumeOverview.totalTrades}
              </div>
              <div className="text-text-success-primary mt-1 flex items-center gap-1 text-sm">
                <IconTrendingUp className="h-4 w-4" />↑{' '}
                {volumeOverview.tradesTrend}% vs. prior period
              </div>
            </div>
            <div>
              <Text className="text-text-secondary mb-1 text-sm">
                Total Volume
              </Text>
              <div className="text-text-primary text-3xl font-bold">
                {volumeOverview.totalVolume}
              </div>
              <div className="text-text-success-primary mt-1 flex items-center gap-1 text-sm">
                <IconTrendingUp className="h-4 w-4" />↑{' '}
                {volumeOverview.volumeTrend}% vs. prior period
              </div>
            </div>
            <div>
              <Text className="text-text-secondary mb-1 text-sm">
                Avg Trade Size
              </Text>
              <div className="text-text-primary text-3xl font-bold">
                {volumeOverview.avgTradeSize}
              </div>
              <div className="text-text-secondary mt-1 text-sm">
                Per trade notional
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Family Distribution */}
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Trades by Product Family</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {productFamily.byCount.map((family, i) => (
                <div key={i}>
                  <div className="mb-1 flex justify-between text-sm">
                    <Text className="font-medium">{family.name}</Text>
                    <Text className="text-text-secondary">
                      {family.count} ({family.pct}%)
                    </Text>
                  </div>
                  <div className="bg-bg-secondary h-3 w-full rounded-full">
                    <div
                      className="bg-brand-500 h-3 rounded-full"
                      style={{ width: `${family.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Volume by Product Family</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {productFamily.byCount.map((family, i) => (
                <div key={i}>
                  <div className="mb-1 flex justify-between text-sm">
                    <Text className="font-medium">{family.name}</Text>
                    <Text className="text-text-secondary">
                      {family.volume} ({family.volPct}%)
                    </Text>
                  </div>
                  <div className="bg-bg-secondary h-3 w-full rounded-full">
                    <div
                      className="bg-text-success-primary h-3 rounded-full"
                      style={{ width: `${family.volPct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trades by Product Type */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Trades by Product Type (Top 10)</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              {
                accessorKey: 'name',
                header: 'Product Type',
                cell: ({ row }) => {
                  const name = row.getValue('name') as string;
                  const surge = row.getValue('surge') as boolean;
                  return (
                    <div>
                      <Text className="font-medium">{name}</Text>
                      {surge && (
                        <Badge
                          variant="outline"
                          className="ml-2 bg-bg-warning-subtle text-text-warning-primary"
                        >
                          ⚠ Surge
                        </Badge>
                      )}
                    </div>
                  );
                },
              },
              {
                accessorKey: 'count',
                header: 'Count',
                cell: ({ row }) => (
                  <Text className="font-semibold">{row.getValue('count')}</Text>
                ),
              },
              {
                accessorKey: 'volume',
                header: 'Volume',
                cell: ({ row }) => (
                  <Text className="font-semibold">
                    {row.getValue('volume')}
                  </Text>
                ),
              },
              {
                accessorKey: 'trend',
                header: 'Trend (vs prior)',
                cell: ({ row }) => {
                  const trend = row.getValue('trend') as number;
                  const trendDir = row.getValue('trendDir') as string;
                  return (
                    <span
                      className={`flex items-center gap-1 ${
                        trendDir === 'up'
                          ? 'text-text-success-primary'
                          : trendDir === 'down'
                            ? 'text-text-error-primary'
                            : 'text-text-secondary'
                      }`}
                    >
                      {getTrendIcon(trendDir)} {trend}%
                    </span>
                  );
                },
              },
            ]}
            data={productTypes.map(product => ({
              ...product,
              surge: product.surge || false,
            }))}
            searchKey="name"
            searchPlaceholder="Search products..."
            showPagination={false}
            showSearch={true}
            className=""
          />
        </CardContent>
      </Card>

      {/* Trades by Counterparty */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Trades by Counterparty (Top 10)</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              {
                accessorKey: 'name',
                header: 'Counterparty',
                cell: ({ row }) => (
                  <Text className="font-medium">{row.getValue('name')}</Text>
                ),
              },
              {
                accessorKey: 'count',
                header: 'Count',
                cell: ({ row }) => (
                  <Text className="font-semibold">{row.getValue('count')}</Text>
                ),
              },
              {
                accessorKey: 'volume',
                header: 'Volume',
                cell: ({ row }) => (
                  <Text className="font-semibold">
                    {row.getValue('volume')}
                  </Text>
                ),
              },
              {
                accessorKey: 'percentage',
                header: '% of Total',
                cell: ({ row }) => {
                  const countPct = row.getValue('countPct') as number;
                  const volPct = row.getValue('volPct') as number;
                  return (
                    <div className="text-sm">
                      <Text className="font-medium">{countPct}%</Text> trades /
                      <Text className="ml-1 font-medium">{volPct}%</Text> volume
                    </div>
                  );
                },
              },
            ]}
            data={counterparties}
            searchKey="name"
            searchPlaceholder="Search counterparties..."
            showPagination={false}
            showSearch={true}
          />
        </CardContent>
      </Card>

      {/* Trading Activity Over Time */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Trading Activity Over Time</CardTitle>
            <div className="flex gap-2 text-xs">
              <Button
                variant="outline"
                size="sm"
                className="bg-bg-brand-subtle text-text-brand"
              >
                All
              </Button>
              <Button variant="ghost" size="sm">
                Rates
              </Button>
              <Button variant="ghost" size="sm">
                FX
              </Button>
              <Button variant="ghost" size="sm">
                Equity
              </Button>
              <Button variant="ghost" size="sm">
                Credit
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <LineChart
              data={activityOverTime}
              dataKeys={[
                {
                  key: 'value',
                  label: 'Trades',
                  color: 'var(--color-brand-600)',
                },
              ]}
              xAxisKey="label"
              height={220}
              showGrid={true}
              showDots={true}
              strokeWidth={3}
              interactive={true}
            />
          </div>
        </CardContent>
      </Card>

      {/* Activity Insights */}
      <Card className="border-border-warning bg-bg-warning-subtle">
        <CardHeader>
          <div className="flex items-center gap-2">
            <IconAlertCircle className="h-5 w-5 text-text-warning-primary" />
            <CardTitle>Activity Insights</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="text-text-secondary space-y-2 text-sm">
            <li>
              • <Text className="font-bold">CMS Options volume up 22%</Text> -
              highest growth product
            </li>
            <li>
              •{' '}
              <Text className="font-bold">
                GS concentration at 29% of volume
              </Text>{' '}
              (up from 24% last Q)
            </li>
            <li>
              •{' '}
              <Text className="font-bold">
                Rates products represent 50% of volume
              </Text>{' '}
              but only 43% of count (larger average trade size)
            </li>
            <li>
              •{' '}
              <Text className="font-bold">
                Trading activity spiked week of Aug 15
              </Text>{' '}
              (+34% vs average)
            </li>
          </ul>
          <div className="mt-4 border-t border-border-warning pt-4">
            <Button size="sm">Export Activity Report</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityDashboard;
