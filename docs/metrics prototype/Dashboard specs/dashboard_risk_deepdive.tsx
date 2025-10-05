import React, { useState } from 'react';
import { Filter, Download } from 'lucide-react';

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
      low: { count: 15, pct: 33.3 }
    },
    trendVsPrior: -3.2
  };

  const disputeMetrics = {
    activeDisputes: 8,
    avgTimeInDispute: 2.3,
    longestDispute: { trade: '10234', counterparty: 'GS', days: 6.2 },
    resolvedUnder48hrs: 73,
    trendVsPrior: 8
  };

  const severityTrend = [
    { month: 'Jul', high: 8, medium: 12, low: 10 },
    { month: 'Aug', high: 10, medium: 15, low: 12 },
    { month: 'Sep', high: 12, medium: 18, low: 15 }
  ];

  const breakOwnership = [
    { owner: 'Counterparty', pct: 68, color: 'bg-red-500' },
    { owner: 'Rokos', pct: 23, color: 'bg-yellow-500' },
    { owner: 'AI', pct: 9, color: 'bg-blue-500' }
  ];

  const fieldBreaks = [
    { field: 'Strike', severity: 5, breakRate: 8.2, counterparties: 'GS (4), JPM (3), Citi (2)' },
    { field: 'Notional', severity: 5, breakRate: 4.1, counterparties: 'BAML (3), MS (2)' },
    { field: 'Spread', severity: 5, breakRate: 3.5, counterparties: 'GS (2), DB (2)' },
    { field: 'Effective Date', severity: 5, breakRate: 2.9, counterparties: 'JPM (2), Citi (1)' },
    { field: 'Term Amount', severity: 4, breakRate: 6.8, counterparties: 'GS (5), BAML (3)' },
    { field: 'Payment Freq', severity: 3, breakRate: 4.2, counterparties: 'MS (3), Citi (2)' }
  ];

  const getSeverityBadge = (severity) => {
    if (severity === 5) return <span className="px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">🔴 5</span>;
    if (severity === 4) return <span className="px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">🟡 4</span>;
    return <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">🟢 {severity}</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Risk Analysis - Break Details</h1>
          <p className="text-sm text-gray-500">Detailed breakdown of breaks and disputes</p>
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
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value)}
          >
            <option value="all">All Products</option>
            <option value="rates">Rates</option>
            <option value="fx">FX</option>
            <option value="equity">Equity</option>
            <option value="credit">Credit</option>
          </select>
          <button className="px-3 py-2 border rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Break Severity Distribution */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Break Severity Distribution</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-baseline gap-4 mb-4">
              <div>
                <div className="text-3xl font-bold">{breakSummary.totalTrades}</div>
                <div className="text-sm text-gray-500">Total Trades</div>
              </div>
              <div className="text-2xl text-gray-400">|</div>
              <div>
                <div className="text-3xl font-bold">{breakSummary.totalBreaks}</div>
                <div className="text-sm text-gray-500">Breaks ({breakSummary.breakRate}%)</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">🔴 High Severity:</span>
                <span className="font-semibold">{breakSummary.byseverity.high.count} breaks ({breakSummary.byseverity.high.pct}%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">🟡 Medium Severity:</span>
                <span className="font-semibold">{breakSummary.byseverity.medium.count} breaks ({breakSummary.byseverity.medium.pct}%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">🟢 Low Severity:</span>
                <span className="font-semibold">{breakSummary.byseverity.low.count} breaks ({breakSummary.byseverity.low.pct}%)</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="text-sm text-green-600 font-medium">
                Break Rate Trend: ↓ {Math.abs(breakSummary.trendVsPrior)}% vs. prior 90 days
              </div>
            </div>
          </div>

          {/* Dispute Metrics */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-semibold mb-3">Dispute Metrics</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Active Disputes:</span>
                <span className="font-semibold">{disputeMetrics.activeDisputes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Time in Dispute:</span>
                <span className="font-semibold">{disputeMetrics.avgTimeInDispute} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Longest Open:</span>
                <span className="font-semibold text-red-600">
                  {disputeMetrics.longestDispute.days}d (#{disputeMetrics.longestDispute.trade}, {disputeMetrics.longestDispute.counterparty})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Resolved &lt;48hrs:</span>
                <span className="font-semibold text-green-600">
                  {disputeMetrics.resolvedUnder48hrs}% (↑{disputeMetrics.trendVsPrior}%)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Breaks by Severity Trend */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Breaks by Severity (Trend)</h2>
          <div className="h-64 flex items-end justify-around gap-4">
            {severityTrend.map((month, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col items-center" style={{ height: '200px' }}>
                  <div className="w-full flex flex-col-reverse items-center justify-end h-full gap-0.5">
                    <div 
                      className="w-full bg-red-500 rounded-t"
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
                <div className="text-sm text-gray-600 mt-2">{month.month}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>High</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span>Medium</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Low</span>
            </div>
          </div>
        </div>

        {/* Break Ownership */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Who Owns the Breaks?</h2>
          <div className="space-y-6">
            {breakOwnership.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{item.owner}:</span>
                  <span className="font-bold">{item.pct}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-8">
                  <div 
                    className={`${item.color} h-8 rounded-full flex items-center justify-end pr-3 text-white text-sm font-medium`}
                    style={{ width: `${item.pct}%` }}
                  >
                    {item.pct}%
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t">
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View by Counterparty →
            </button>
          </div>
        </div>
      </div>

      {/* Field-Level Break Frequency */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Field-Level Break Frequency (High & Medium Severity Only)</h2>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Show All Fields (23) →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Field</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Break Rate</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Top Counterparties</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {fieldBreaks.map((field, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">{field.field}</td>
                  <td className="px-4 py-3">{getSeverityBadge(field.severity)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{field.breakRate}%</span>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${field.severity === 5 ? 'bg-red-500' : 'bg-yellow-500'}`}
                          style={{ width: `${(field.breakRate / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{field.counterparties}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Break Concentration Analysis */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-2">Break Concentration Analysis</h2>
        <div className="space-y-2 text-sm">
          <p>Top 3 Counterparties account for <span className="font-bold">62%</span> of all breaks</p>
          <p>Top 2 Product Types account for <span className="font-bold">71%</span> of all breaks</p>
        </div>
        <div className="mt-4 pt-4 border-t border-yellow-300">
          <p className="text-sm font-medium">⚠️ Recommendation: Focus on GS (CMS Options) and JPM (FX)</p>
        </div>
      </div>
    </div>
  );
};

export default RiskDeepDiveDashboard;