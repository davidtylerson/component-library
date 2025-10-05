import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

const ExecutiveDashboard = () => {
  // Sample data
  const kpis = [
    {
      label: 'Open Risk Score',
      value: '14,779',
      change: 12,
      trend: 'up',
      comparison: 'vs. last week',
      status: 'warning',
    },
    {
      label: 'Trades Outside SLA',
      value: '18 / 258',
      subValue: '7.0%',
      change: 1.2,
      trend: 'up',
      comparison: 'vs. avg',
      status: 'danger',
    },
    {
      label: 'High-Sev Open Breaks',
      value: '3',
      change: -2,
      trend: 'down',
      comparison: 'vs. last week',
      status: 'good',
    },
    {
      label: 'Template Coverage',
      value: '67%',
      change: 5,
      trend: 'up',
      comparison: 'vs. last month',
      status: 'good',
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
    { name: 'GS', score: 8900, max: 10000 },
    { name: 'JPM', score: 5200, max: 10000 },
    { name: 'Citi', score: 4100, max: 10000 },
    { name: 'BAML', score: 2800, max: 10000 },
    { name: 'MS', score: 1900, max: 10000 },
  ];

  const riskByProduct = [
    { name: 'CMS Options', score: 9400, max: 10000 },
    { name: 'FX Options', score: 5200, max: 10000 },
    { name: 'IRS', score: 3100, max: 10000 },
    { name: 'Equity Opts', score: 2800, max: 10000 },
    { name: 'Swaptions', score: 900, max: 10000 },
  ];

  const activityData = {
    totalTrades: 258,
    change: 12,
    byFamily: [
      { name: 'Rates', count: 112, pct: 43 },
      { name: 'FX', count: 68, pct: 26 },
      { name: 'Equity', count: 52, pct: 20 },
      { name: 'Credit', count: 26, pct: 11 },
    ],
    topCounterparties: [
      { name: 'GS', count: 72, pct: 28 },
      { name: 'JPM', count: 61, pct: 24 },
      { name: 'MS', count: 52, pct: 20 },
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

  const getStatusColor = status => {
    switch (status) {
      case 'good':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'danger':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRankColor = rank => {
    return rank === 'high'
      ? 'bg-red-100 text-red-800'
      : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Risk Overview</h1>
        <p className="text-sm text-gray-500">Friday, October 03, 2025</p>
      </div>

      {/* KPIs */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, i) => (
          <div
            key={i}
            className={`rounded-lg border bg-white p-4 ${getStatusColor(kpi.status)}`}
          >
            <div className="mb-2 text-sm font-medium">{kpi.label}</div>
            <div className="mb-1 text-2xl font-bold">{kpi.value}</div>
            {kpi.subValue && (
              <div className="mb-1 text-lg text-gray-600">{kpi.subValue}</div>
            )}
            <div className="flex items-center text-sm">
              {kpi.trend === 'up' ? (
                <ArrowUp className="mr-1 h-4 w-4" />
              ) : (
                <ArrowDown className="mr-1 h-4 w-4" />
              )}
              <span>
                {Math.abs(kpi.change)}% {kpi.comparison}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Priority Actions */}
      <div className="mb-6 rounded-lg bg-white shadow">
        <div className="border-b p-4">
          <h2 className="text-lg font-semibold">
            Priority Actions (Sorted by Risk Score)
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Rank
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Trade
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Counterparty
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Product
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Issue
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Age
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Score
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {priorityActions.map((action, i) => (
                <tr key={i} className="cursor-pointer hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span
                      className={`rounded px-2 py-1 text-xs font-medium ${getRankColor(action.rank)}`}
                    >
                      {action.rank === 'high' ? '🔴' : '🟡'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-blue-600">
                    {action.trade}
                  </td>
                  <td className="px-4 py-3 text-sm">{action.counterparty}</td>
                  <td className="px-4 py-3 text-sm">{action.product}</td>
                  <td className="px-4 py-3 text-sm font-medium">
                    {action.issue}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {action.age}
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold">
                    {action.score.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t p-4 text-center">
          <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
            View All 18 Items →
          </button>
        </div>
      </div>

      {/* Trading Activity Summary */}
      <div className="mb-6 rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-lg font-semibold">
          Trading Activity (Last 30 Days)
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <div className="mb-2 text-3xl font-bold">
              {activityData.totalTrades}
              <span className="ml-2 text-sm text-green-600">
                ↑ {activityData.change}%
              </span>
            </div>
            <div className="mb-4 text-sm text-gray-500">Total Trades</div>

            <div className="mb-4">
              <div className="mb-2 text-sm font-medium">By Product Family:</div>
              {activityData.byFamily.map((family, i) => (
                <div key={i} className="mb-1 flex justify-between text-sm">
                  <span>{family.name}</span>
                  <span className="text-gray-600">
                    {family.count} ({family.pct}%)
                  </span>
                </div>
              ))}
            </div>

            <div>
              <div className="mb-2 text-sm font-medium">
                Top 3 Counterparties:
              </div>
              {activityData.topCounterparties.map((cp, i) => (
                <div key={i} className="mb-1 flex justify-between text-sm">
                  <span>
                    {i + 1}. {cp.name}
                  </span>
                  <span className="text-gray-600">
                    {cp.count} trades ({cp.pct}%)
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">Volume Trend</div>
            <div className="flex h-40 items-end space-x-2">
              {[50, 65, 72, 68, 85, 92].map((height, i) => (
                <div key={i} className="flex flex-1 flex-col items-center">
                  <div
                    className="w-full rounded-t bg-blue-500"
                    style={{ height: `${height}%` }}
                  />
                  <div className="mt-1 text-xs text-gray-500">W{i + 1}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                View Activity Details →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Distribution */}
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Risk by Counterparty</h2>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
              View Details →
            </button>
          </div>
          <div className="space-y-3">
            {riskByCounterparty.map((item, i) => (
              <div key={i}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-gray-600">
                    {item.score.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-red-500"
                    style={{ width: `${(item.score / item.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Risk by Product Type</h2>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
              View Details →
            </button>
          </div>
          <div className="space-y-3">
            {riskByProduct.map((item, i) => (
              <div key={i}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-gray-600">
                    {item.score.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${(item.score / item.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SLA Performance Trend */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-lg font-semibold">
          24-Hour SLA Performance (Last 30 Days)
        </h2>
        <div className="relative h-64">
          <div className="absolute inset-0 flex items-end justify-between px-4">
            {slaData.map((point, i) => (
              <div key={i} className="flex flex-1 flex-col items-center">
                <div
                  className="relative flex w-full items-end justify-center"
                  style={{ height: '200px' }}
                >
                  <div
                    className="absolute bottom-0 w-2 rounded-t bg-blue-500"
                    style={{ height: `${(point.value / 100) * 200}px` }}
                  />
                  {i === slaData.length - 1 && (
                    <div className="absolute -right-2 top-0 h-4 w-4 rounded-full border-2 border-white bg-blue-600" />
                  )}
                </div>
                <div className="mt-2 text-xs text-gray-500">{point.label}</div>
              </div>
            ))}
          </div>
          <div
            className="absolute left-0 right-0 top-0 border-t-2 border-dashed border-green-400"
            style={{ top: '10px' }}
          >
            <span className="absolute -top-3 right-0 text-xs font-medium text-green-600">
              Target (95%)
            </span>
          </div>
        </div>
        <div className="mt-4 text-center">
          <div className="text-2xl font-bold text-gray-900">92.8%</div>
          <div className="text-sm text-gray-600">
            Current (↑ 4.2% vs. last month)
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;
