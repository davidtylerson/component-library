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
    avgTradeSize: '$100.5M'
  };

  const productFamily = {
    byCount: [
      { name: 'Rates', count: 328, pct: 43, volume: '$38.1B', volPct: 50 },
      { name: 'FX', count: 197, pct: 26, volume: '$18.3B', volPct: 24 },
      { name: 'Equity', count: 151, pct: 20, volume: '$12.4B', volPct: 16 },
      { name: 'Credit', count: 82, pct: 11, volume: '$7.4B', volPct: 10 }
    ]
  };

  const productTypes = [
    { name: 'IRS', count: 145, volume: '$18.2B', trend: 15, trendDir: 'up' },
    { name: 'FX Option', count: 112, volume: '$12.1B', trend: 8, trendDir: 'up' },
    { name: 'CMS Option', count: 98, volume: '$14.8B', trend: 22, trendDir: 'up', surge: true },
    { name: 'Equity Option', count: 87, volume: '$8.9B', trend: -3, trendDir: 'down' },
    { name: 'Swaption', count: 76, volume: '$9.2B', trend: 5, trendDir: 'up' },
    { name: 'Credit Default Swap', count: 54, volume: '$5.1B', trend: -8, trendDir: 'down' },
    { name: 'FX Forward', count: 48, volume: '$4.3B', trend: 12, trendDir: 'up' },
    { name: 'Equity Swap', count: 42, volume: '$2.8B', trend: 0, trendDir: 'flat' },
    { name: 'Cross-Ccy Swap', count: 38, volume: '$3.9B', trend: 18, trendDir: 'up' },
    { name: 'Variance Swap', count: 22, volume: '$1.2B', trend: -5, trendDir: 'down' }
  ];

  const counterparties = [
    { name: 'Goldman Sachs', count: 184, volume: '$22.1B', countPct: 24.3, volPct: 29.0 },
    { name: 'JP Morgan', count: 156, volume: '$18.7B', countPct: 20.6, volPct: 24.5 },
    { name: 'Morgan Stanley', count: 132, volume: '$14.2B', countPct: 17.4, volPct: 18.6 },
    { name: 'Bank of America', count: 108, volume: '$10.8B', countPct: 14.2, volPct: 14.2 },
    { name: 'Citigroup', count: 89, volume: '$7.1B', countPct: 11.7, volPct: 9.3 },
    { name: 'Deutsche Bank', count: 42, volume: '$1.8B', countPct: 5.5, volPct: 2.4 },
    { name: 'Barclays', count: 28, volume: '$1.1B', countPct: 3.7, volPct: 1.4 },
    { name: 'Credit Suisse', count: 12, volume: '$0.3B', countPct: 1.6, volPct: 0.4 },
    { name: 'UBS', count: 5, volume: '$0.1B', countPct: 0.7, volPct: 0.1 },
    { name: 'BNP Paribas', count: 2, volume: '$0.1B', countPct: 0.3, volPct: 0.1 }
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
    { label: 'Sep 23', value: 93 }
  ];

  const getTrendIcon = (dir) => {
    if (dir === 'up') return <span className="text-green-600">↑</span>;
    if (dir === 'down') return <span className="text-red-600">↓</span>;
    return <span className="text-gray-600">→</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Trading Activity Analysis</h1>
          <p className="text-sm text-gray-500">Volume and activity trends across products and counterparties</p>
        </div>
        <div className="flex gap-2">
          <select 
            className="px-3 py-2 border rounded-lg text-sm"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="180d">Last 180 Days</option>
            <option value="365d">Last Year</option>
          </select>
          <select 
            className="px-3 py-2 border rounded-lg text-sm"
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value)}
          >
            <option value="day">Group By: Daily</option>
            <option value="week">Group By: Weekly</option>
            <option value="month">Group By: Monthly</option>
          </select>
          <button className="px-3 py-2 border rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Volume Overview */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Volume Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-sm text-gray-600 mb-1">Total Trades</div>
            <div className="text-3xl font-bold">{volumeOverview.totalTrades}</div>
            <div className="text-sm text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="w-4 h-4" />
              ↑ {volumeOverview.tradesTrend}% vs. prior period
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Total Volume</div>
            <div className="text-3xl font-bold">{volumeOverview.totalVolume}</div>
            <div className="text-sm text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="w-4 h-4" />
              ↑ {volumeOverview.volumeTrend}% vs. prior period
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Avg Trade Size</div>
            <div className="text-3xl font-bold">{volumeOverview.avgTradeSize}</div>
            <div className="text-sm text-gray-500 mt-1">Per trade notional</div>
          </div>
        </div>
      </div>

      {/* Product Family Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Trades by Product Family</h2>
          <div className="space-y-4">
            {productFamily.byCount.map((family, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{family.name}</span>
                  <span className="text-gray-600">{family.count} ({family.pct}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-500 h-3 rounded-full"
                    style={{ width: `${family.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Volume by Product Family</h2>
          <div className="space-y-4">
            {productFamily.byCount.map((family, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{family.name}</span>
                  <span className="text-gray-600">{family.volume} ({family.volPct}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-green-500 h-3 rounded-full"
                    style={{ width: `${family.volPct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trades by Product Type */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Trades by Product Type (Top 10)</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Count</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Volume</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trend (vs prior)</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {productTypes.map((product, i) => (
                <tr key={i} className={`hover:bg-gray-50 ${product.surge ? 'bg-yellow-50' : ''}`}>
                  <td className="px-4 py-3 font-medium">
                    {product.name}
                    {product.surge && (
                      <span className="ml-2 px-2 py-0.5 rounded text-xs font-medium bg-yellow-200 text-yellow-800">
                        ⚠ Surge
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-semibold">{product.count}</td>
                  <td className="px-4 py-3 font-semibold">{product.volume}</td>
                  <td className="px-4 py-3">
                    <span className={`flex items-center gap-1 ${
                      product.trendDir === 'up' ? 'text-green-600' : 
                      product.trendDir === 'down' ? 'text-red-600' : 
                      'text-gray-600'
                    }`}>
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
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Trades by Counterparty (Top 10)</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Counterparty</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Count</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Volume</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">% of Total</th>
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
                      <span className="font-medium">{cp.countPct}%</span> trades / 
                      <span className="font-medium ml-1">{cp.volPct}%</span> volume
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trading Activity Over Time */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Trading Activity Over Time</h2>
          <div className="flex gap-2 text-xs">
            <button className="px-2 py-1 rounded bg-blue-100 text-blue-700 font-medium">All</button>
            <button className="px-2 py-1 rounded hover:bg-gray-100">Rates</button>
            <button className="px-2 py-1 rounded hover:bg-gray-100">FX</button>
            <button className="px-2 py-1 rounded hover:bg-gray-100">Equity</button>
            <button className="px-2 py-1 rounded hover:bg-gray-100">Credit</button>
          </div>
        </div>
        <div className="h-64 flex items-end justify-between gap-1">
          {activityOverTime.map((point, i) => (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div className="relative w-full" style={{ height: '220px' }}>
                <div 
                  className="absolute bottom-0 w-full bg-blue-500 rounded-t hover:bg-blue-600 cursor-pointer transition-colors"
                  style={{ height: `${(point.value / 100) * 220}px` }}
                  title={`${point.label}: ${point.value} trades`}
                />
              </div>
              <div className="text-xs text-gray-500 mt-2 -rotate-45 origin-top-left whitespace-nowrap">
                {point.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Insights */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold">Activity Insights</h2>
        </div>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• <strong>CMS Options volume up 22%</strong> - highest growth product</li>
          <li>• <strong>GS concentration at 29% of volume</strong> (up from 24% last Q)</li>
          <li>• <strong>Rates products represent 50% of volume</strong> but only 43% of count (larger average trade size)</li>
          <li>• <strong>Trading activity spiked week of Aug 15</strong> (+34% vs average)</li>
        </ul>
        <div className="mt-4 pt-4 border-t border-blue-200">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
            Export Activity Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityDashboard;