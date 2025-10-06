'use client';

import React, { useState } from 'react';
import { Download } from 'lucide-react';

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
    { owner: 'Counterparty', pct: 68, color: 'bg-red-500' },
    { owner: 'Rokos', pct: 23, color: 'bg-yellow-500' },
    { owner: 'AI', pct: 9, color: 'bg-blue-500' },
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
        <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
          🔴 5
        </span>
      );
    if (severity === 4)
      return (
        <span className="rounded bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
          🟡 4
        </span>
      );
    return (
      <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
        🟢 {severity}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Risk Analysis - Break Details
          </h1>
          <p className="text-sm text-gray-500">
            Detailed breakdown of breaks and disputes
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
            value={productFilter}
            onChange={e => setProductFilter(e.target.value)}
          >
            <option value="all">All Products</option>
            <option value="rates">Rates</option>
            <option value="fx">FX</option>
            <option value="equity">Equity</option>
            <option value="credit">Credit</option>
          </select>
          <button className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Break Severity Distribution */}
      <div className="mb-6 rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-lg font-semibold">
          Break Severity Distribution
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <div className="mb-4 flex items-baseline gap-4">
              <div>
                <div className="text-3xl font-bold">
                  {breakSummary.totalTrades}
                </div>
                <div className="text-sm text-gray-500">Total Trades</div>
              </div>
              <div className="text-2xl text-gray-400">|</div>
              <div>
                <div className="text-3xl font-bold">
                  {breakSummary.totalBreaks}
                </div>
                <div className="text-sm text-gray-500">
                  Breaks ({breakSummary.breakRate}%)
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">🔴 High Severity:</span>
                <span className="font-semibold">
                  {breakSummary.byseverity.high.count} breaks (
                  {breakSummary.byseverity.high.pct}%)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">🟡 Medium Severity:</span>
                <span className="font-semibold">
                  {breakSummary.byseverity.medium.count} breaks (
                  {breakSummary.byseverity.medium.pct}%)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">🟢 Low Severity:</span>
                <span className="font-semibold">
                  {breakSummary.byseverity.low.count} breaks (
                  {breakSummary.byseverity.low.pct}%)
                </span>
              </div>
            </div>

            <div className="mt-4 border-t pt-4">
              <div className="text-sm font-medium text-green-600">
                Break Rate Trend: ↓ {Math.abs(breakSummary.trendVsPrior)}% vs.
                prior 90 days
              </div>
            </div>
          </div>

          {/* Dispute Metrics */}
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <h3 className="mb-3 font-semibold">Dispute Metrics</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Active Disputes:</span>
                <span className="font-semibold">
                  {disputeMetrics.activeDisputes}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Time in Dispute:</span>
                <span className="font-semibold">
                  {disputeMetrics.avgTimeInDispute} days
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Longest Open:</span>
                <span className="font-semibold text-red-600">
                  {disputeMetrics.longestDispute.days}d (#
                  {disputeMetrics.longestDispute.trade},{' '}
                  {disputeMetrics.longestDispute.counterparty})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Resolved &lt;48hrs:</span>
                <span className="font-semibold text-green-600">
                  {disputeMetrics.resolvedUnder48hrs}% (↑
                  {disputeMetrics.trendVsPrior}%)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Breaks by Severity Trend */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">
            Breaks by Severity (Trend)
          </h2>
          <div className="flex h-64 items-end justify-around gap-4">
            {severityTrend.map((month, i) => (
              <div key={i} className="flex flex-1 flex-col items-center">
                <div
                  className="flex w-full flex-col items-center"
                  style={{ height: '200px' }}
                >
                  <div className="flex h-full w-full flex-col-reverse items-center justify-end gap-0.5">
                    <div
                      className="w-full rounded-t bg-red-500"
                      style={{ height: `${(month.high / 18) * 100}%` }}
                      title={`High: ${month.high}`}
                    />
                    <div
                      className="w-full bg-yellow-500"
                      style={{ height: `${(month.medium / 18) * 100}%` }}
                      title={`Medium: ${month.medium}`}
                    />
                    <div
                      className="w-full bg-green-500"
                      style={{ height: `${(month.low / 18) * 100}%` }}
                      title={`Low: ${month.low}`}
                    />
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-600">{month.month}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded bg-red-500"></div>
              <span>High</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded bg-yellow-500"></div>
              <span>Medium</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded bg-green-500"></div>
              <span>Low</span>
            </div>
          </div>
        </div>

        {/* Break Ownership */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">Who Owns the Breaks?</h2>
          <div className="space-y-6">
            {breakOwnership.map((item, i) => (
              <div key={i}>
                <div className="mb-2 flex justify-between">
                  <span className="font-medium">{item.owner}:</span>
                  <span className="font-bold">{item.pct}%</span>
                </div>
                <div className="h-8 w-full rounded-full bg-gray-200">
                  <div
                    className={`${item.color} flex h-8 items-center justify-end rounded-full pr-3 text-sm font-medium text-white`}
                    style={{ width: `${item.pct}%` }}
                  >
                    {item.pct}%
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t pt-4">
            <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
              View by Counterparty →
            </button>
          </div>
        </div>
      </div>

      {/* Field-Level Break Frequency */}
      <div className="mb-6 rounded-lg bg-white shadow">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">
            Field-Level Break Frequency (High & Medium Severity Only)
          </h2>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
            Show All Fields (23) →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Field
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Severity
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Break Rate
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Top Counterparties
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {fieldBreaks.map((field, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">
                    {field.field}
                  </td>
                  <td className="px-4 py-3">
                    {getSeverityBadge(field.severity)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">
                        {field.breakRate}%
                      </span>
                      <div className="h-2 w-24 rounded-full bg-gray-200">
                        <div
                          className={`h-2 rounded-full ${field.severity === 5 ? 'bg-red-500' : 'bg-yellow-500'}`}
                          style={{ width: `${(field.breakRate / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {field.counterparties}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Break Concentration Analysis */}
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6">
        <h2 className="mb-2 text-lg font-semibold">
          Break Concentration Analysis
        </h2>
        <div className="space-y-2 text-sm">
          <p>
            Top 3 Counterparties account for{' '}
            <span className="font-bold">62%</span> of all breaks
          </p>
          <p>
            Top 2 Product Types account for{' '}
            <span className="font-bold">71%</span> of all breaks
          </p>
        </div>
        <div className="mt-4 border-t border-yellow-300 pt-4">
          <p className="text-sm font-medium">
            ⚠️ Recommendation: Focus on GS (CMS Options) and JPM (FX)
          </p>
        </div>
      </div>
    </div>
  );
};

export default RiskDeepDiveDashboard;
