import React, { useState } from 'react';
import { Download, TrendingUp, AlertCircle } from 'lucide-react';

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

  const getTrendIcon = dir => {
    if (dir === 'up') return <span className="text-green-600">↑</span>;
    if (dir === 'down') return <span className="text-red-600">↓</span>;
    return <span className="text-gray-600">→</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Trading Activity Analysis
          </h1>
          <p className="text-sm text-gray-500">
            Volume and activity trends across products and counterparties
          </p>
        </div>
        <div className="flex gap-2">
          <select
            className="rounded-lg border px-3 py-2 text-sm"
            value={dateRange}
            onChange={e => setDateRange(e.target.value)}
          >
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="180d">Last 180 Days</option>
            <option value="365d">Last Year</option>
          </select>
          <select
            className="rounded-lg border px-3 py-2 text-sm"
            value={groupBy}
            onChange={e => setGroupBy(e.target.value)}
          >
            <option value="day">Group By: Daily</option>
            <option value="week">Group By: Weekly</option>
            <option value="month">Group By: Monthly</option>
          </select>
          <button className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Volume Overview */}
      <div className="mb-6 rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-lg font-semibold">Volume Overview</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <div className="mb-1 text-sm text-gray-600">Total Trades</div>
            <div className="text-3xl font-bold">
              {volumeOverview.totalTrades}
            </div>
            <div className="mt-1 flex items-center gap-1 text-sm text-green-600">
              <TrendingUp className="h-4 w-4" />↑ {volumeOverview.tradesTrend}%
              vs. prior period
            </div>
          </div>
          <div>
            <div className="mb-1 text-sm text-gray-600">Total Volume</div>
            <div className="text-3xl font-bold">
              {volumeOverview.totalVolume}
            </div>
            <div className="mt-1 flex items-center gap-1 text-sm text-green-600">
              <TrendingUp className="h-4 w-4" />↑ {volumeOverview.volumeTrend}%
              vs. prior period
            </div>
          </div>
          <div>
            <div className="mb-1 text-sm text-gray-600">Avg Trade Size</div>
            <div className="text-3xl font-bold">
              {volumeOverview.avgTradeSize}
            </div>
            <div className="mt-1 text-sm text-gray-500">Per trade notional</div>
          </div>
        </div>
      </div>

      {/* Product Family Distribution */}
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">
            Trades by Product Family
          </h2>
          <div className="space-y-4">
            {productFamily.byCount.map((family, i) => (
              <div key={i}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium">{family.name}</span>
                  <span className="text-gray-600">
                    {family.count} ({family.pct}%)
                  </span>
                </div>
                <div className="h-3 w-full rounded-full bg-gray-200">
                  <div
                    className="h-3 rounded-full bg-blue-500"
                    style={{ width: `${family.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">
            Volume by Product Family
          </h2>
          <div className="space-y-4">
            {productFamily.byCount.map((family, i) => (
              <div key={i}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium">{family.name}</span>
                  <span className="text-gray-600">
                    {family.volume} ({family.volPct}%)
                  </span>
                </div>
                <div className="h-3 w-full rounded-full bg-gray-200">
                  <div
                    className="h-3 rounded-full bg-green-500"
                    style={{ width: `${family.volPct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trades by Product Type */}
      <div className="mb-6 rounded-lg bg-white shadow">
        <div className="border-b p-4">
          <h2 className="text-lg font-semibold">
            Trades by Product Type (Top 10)
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Product Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Count
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Volume
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Trend (vs prior)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {productTypes.map((product, i) => (
                <tr
                  key={i}
                  className={`hover:bg-gray-50 ${product.surge ? 'bg-yellow-50' : ''}`}
                >
                  <td className="px-4 py-3 font-medium">
                    {product.name}
                    {product.surge && (
                      <span className="ml-2 rounded bg-yellow-200 px-2 py-0.5 text-xs font-medium text-yellow-800">
                        ⚠ Surge
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-semibold">{product.count}</td>
                  <td className="px-4 py-3 font-semibold">{product.volume}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`flex items-center gap-1 ${
                        product.trendDir === 'up'
                          ? 'text-green-600'
                          : product.trendDir === 'down'
                            ? 'text-red-600'
                            : 'text-gray-600'
                      }`}
                    >
                      {getTrendIcon(product.trendDir)} {product.trend}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trades by Counterparty */}
      <div className="mb-6 rounded-lg bg-white shadow">
        <div className="border-b p-4">
          <h2 className="text-lg font-semibold">
            Trades by Counterparty (Top 10)
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Counterparty
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Count
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Volume
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  % of Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {counterparties.map((cp, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{cp.name}</td>
                  <td className="px-4 py-3 font-semibold">{cp.count}</td>
                  <td className="px-4 py-3 font-semibold">{cp.volume}</td>
                  <td className="px-4 py-3">
                    <div className="text-sm">
                      <span className="font-medium">{cp.countPct}%</span> trades
                      /<span className="ml-1 font-medium">{cp.volPct}%</span>{' '}
                      volume
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trading Activity Over Time */}
      <div className="mb-6 rounded-lg bg-white p-6 shadow">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Trading Activity Over Time</h2>
          <div className="flex gap-2 text-xs">
            <button className="rounded bg-blue-100 px-2 py-1 font-medium text-blue-700">
              All
            </button>
            <button className="rounded px-2 py-1 hover:bg-gray-100">
              Rates
            </button>
            <button className="rounded px-2 py-1 hover:bg-gray-100">FX</button>
            <button className="rounded px-2 py-1 hover:bg-gray-100">
              Equity
            </button>
            <button className="rounded px-2 py-1 hover:bg-gray-100">
              Credit
            </button>
          </div>
        </div>
        <div className="flex h-64 items-end justify-between gap-1">
          {activityOverTime.map((point, i) => (
            <div key={i} className="flex flex-1 flex-col items-center">
              <div className="relative w-full" style={{ height: '220px' }}>
                <div
                  className="absolute bottom-0 w-full cursor-pointer rounded-t bg-blue-500 transition-colors hover:bg-blue-600"
                  style={{ height: `${(point.value / 100) * 220}px` }}
                  title={`${point.label}: ${point.value} trades`}
                />
              </div>
              <div className="mt-2 origin-top-left -rotate-45 whitespace-nowrap text-xs text-gray-500">
                {point.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Insights */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
        <div className="mb-3 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold">Activity Insights</h2>
        </div>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>
            • <strong>CMS Options volume up 22%</strong> - highest growth
            product
          </li>
          <li>
            • <strong>GS concentration at 29% of volume</strong> (up from 24%
            last Q)
          </li>
          <li>
            • <strong>Rates products represent 50% of volume</strong> but only
            43% of count (larger average trade size)
          </li>
          <li>
            • <strong>Trading activity spiked week of Aug 15</strong> (+34% vs
            average)
          </li>
        </ul>
        <div className="mt-4 border-t border-blue-200 pt-4">
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
            Export Activity Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityDashboard;
