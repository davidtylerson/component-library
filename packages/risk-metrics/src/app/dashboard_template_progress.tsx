'use client';

import React, { useState } from 'react';
import { Plus, TrendingUp } from 'lucide-react';

const TemplateProgressDashboard = () => {
  const [dateRange, setDateRange] = useState('6m');

  const coverageData = {
    template: {
      current: 67,
      target: 95,
      targetDate: 'Dec 2025',
      onTrack: true,
      history: [
        { month: 'Apr', value: 40 },
        { month: 'May', value: 48 },
        { month: 'Jun', value: 55 },
        { month: 'Jul', value: 60 },
        { month: 'Aug', value: 64 },
        { month: 'Sep', value: 67 },
      ],
    },
    electronic: {
      current: 23,
      target: 80,
      targetDate: 'Jun 2026',
      onTrack: false,
      status: 'behind',
      history: [
        { month: 'Apr', value: 5 },
        { month: 'May', value: 8 },
        { month: 'Jun', value: 12 },
        { month: 'Jul', value: 15 },
        { month: 'Aug', value: 19 },
        { month: 'Sep', value: 23 },
      ],
    },
  };

  const templateGaps = [
    {
      cpProduct: 'GS CMS Opt',
      trades: 37,
      volume: '$3.2B',
      status: 'No Template',
      priority: 'high',
    },
    {
      cpProduct: 'JPM FX Opt (Asia Basket)',
      trades: 24,
      volume: '$1.8B',
      status: 'No Template',
      priority: 'high',
    },
    {
      cpProduct: 'Citi IRS',
      trades: 18,
      volume: '$2.1B',
      status: 'Template Exists',
      utilization: 65,
      priority: 'medium',
    },
    {
      cpProduct: 'BAML Equity Opt (Custom)',
      trades: 15,
      volume: '$892M',
      status: 'No Template',
      priority: 'medium',
    },
  ];

  const aiAccuracy = [
    {
      product: 'CMS Options',
      accuracy: 94.2,
      trend: 2.1,
      trendDir: 'up',
      fieldsIssues: 'All fields >90%',
      status: 'good',
    },
    {
      product: 'FX Options',
      accuracy: 91.8,
      trend: 3.5,
      trendDir: 'up',
      fieldsIssues: 'Strike: 87%',
      status: 'warning',
    },
    {
      product: 'IRS',
      accuracy: 96.1,
      trend: 0.8,
      trendDir: 'up',
      fieldsIssues: 'All fields >90%',
      status: 'good',
    },
    {
      product: 'Equity Opts',
      accuracy: 88.4,
      trend: -1.2,
      trendDir: 'down',
      fieldsIssues: 'Basket terms: 82%, Strike: 85%',
      status: 'warning',
    },
    {
      product: 'Swaptions',
      accuracy: 93.7,
      trend: 1.9,
      trendDir: 'up',
      fieldsIssues: 'All fields >90%',
      status: 'good',
    },
  ];

  const impact = {
    templateCoverage: 27,
    electronicAffirmation: 18,
    avgTimeReduction: 1.3,
    highSevBreakReduction: 4.2,
    riskReduction: 2.1,
  };

  const getStatusColor = (status: string) => {
    if (status === 'good') return 'text-green-600';
    if (status === 'warning') return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPriorityBadge = (priority: string) => {
    if (priority === 'high') return 'bg-red-100 text-red-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="bg-bg-secondary min-h-screen p-6">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-text-primary text-2xl font-bold">
            Coverage & Automation Tracking
          </h1>
          <p className="text-text-secondary text-sm">
            Progress toward strategic risk reduction goals
          </p>
        </div>
        <select
          className="border-border-primary bg-bg-primary text-text-primary rounded-lg border px-3 py-2 text-sm"
          value={dateRange}
          onChange={e => setDateRange(e.target.value)}
        >
          <option value="3m">Last 3 Months</option>
          <option value="6m">Last 6 Months</option>
          <option value="12m">Last 12 Months</option>
        </select>
      </div>

      {/* Progress Charts */}
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Template Coverage */}
        <div className="bg-bg-primary rounded-lg p-6 shadow">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold">Template Coverage</h2>
              <p className="text-text-secondary text-sm">
                Target: {coverageData.template.target}% by{' '}
                {coverageData.template.targetDate}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">
                {coverageData.template.current}%
              </div>
              <div className="text-text-tertiary text-xs">Current</div>
            </div>
          </div>

          {/* Chart */}
          <div className="relative mb-4 h-48">
            <div className="absolute inset-0 flex items-end justify-between">
              {coverageData.template.history.map((point, i) => (
                <div key={i} className="flex flex-1 flex-col items-center">
                  <div className="relative w-full" style={{ height: '160px' }}>
                    <div
                      className="absolute bottom-0 w-full rounded-t bg-blue-500"
                      style={{ height: `${(point.value / 100) * 160}px` }}
                    />
                    {i === coverageData.template.history.length - 1 && (
                      <div className="absolute -right-1 top-0 h-3 w-3 rounded-full border-2 border-white bg-blue-600" />
                    )}
                  </div>
                  <div className="text-text-tertiary mt-2 text-xs">
                    {point.month}
                  </div>
                </div>
              ))}
            </div>
            {/* Target line */}
            <div
              className="absolute left-0 right-0 border-t-2 border-dashed border-green-400"
              style={{
                top: `${(1 - coverageData.template.target / 100) * 160}px`,
              }}
            >
              <span className="absolute -top-3 right-0 text-xs font-medium text-green-600">
                Target ({coverageData.template.target}%)
              </span>
            </div>
          </div>

          <div
            className={`rounded-lg py-2 text-center ${coverageData.template.onTrack ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}
          >
            <div className="font-medium">
              {coverageData.template.onTrack
                ? '✓ On Track'
                : '⚠ Slightly Behind'}
            </div>
          </div>
        </div>

        {/* Electronic Affirmation */}
        <div className="bg-bg-primary rounded-lg p-6 shadow">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold">Electronic Affirmation</h2>
              <p className="text-sm text-gray-500">
                Target: {coverageData.electronic.target}% by{' '}
                {coverageData.electronic.targetDate}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-purple-600">
                {coverageData.electronic.current}%
              </div>
              <div className="text-text-tertiary text-xs">Current</div>
            </div>
          </div>

          {/* Chart */}
          <div className="relative mb-4 h-48">
            <div className="absolute inset-0 flex items-end justify-between">
              {coverageData.electronic.history.map((point, i) => (
                <div key={i} className="flex flex-1 flex-col items-center">
                  <div className="relative w-full" style={{ height: '160px' }}>
                    <div
                      className="absolute bottom-0 w-full rounded-t bg-purple-500"
                      style={{ height: `${(point.value / 100) * 160}px` }}
                    />
                    {i === coverageData.electronic.history.length - 1 && (
                      <div className="absolute -right-1 top-0 h-3 w-3 rounded-full border-2 border-white bg-purple-600" />
                    )}
                  </div>
                  <div className="text-text-tertiary mt-2 text-xs">
                    {point.month}
                  </div>
                </div>
              ))}
            </div>
            {/* Target line */}
            <div
              className="absolute left-0 right-0 border-t-2 border-dashed border-green-400"
              style={{
                top: `${(1 - coverageData.electronic.target / 100) * 160}px`,
              }}
            >
              <span className="absolute -top-3 right-0 text-xs font-medium text-green-600">
                Target ({coverageData.electronic.target}%)
              </span>
            </div>
          </div>

          <div className="rounded-lg bg-yellow-50 py-2 text-center text-yellow-700">
            <div className="font-medium">⚠ Slightly Behind</div>
          </div>
        </div>
      </div>

      {/* Template Gap Analysis */}
      <div className="mb-6 rounded-lg bg-white shadow">
        <div className="border-b p-4">
          <h2 className="text-lg font-semibold">
            Template Gap Analysis (Opportunities)
          </h2>
          <p className="text-sm text-gray-500">
            Counterparty + Product combinations needing attention
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Counterparty + Product
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Trades (90d)
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Volume
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Template Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {templateGaps.map((gap, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium">{gap.cpProduct}</div>
                    <span
                      className={`mt-1 inline-block rounded px-2 py-0.5 text-xs font-medium ${getPriorityBadge(gap.priority)}`}
                    >
                      {gap.priority === 'high'
                        ? 'High Priority'
                        : 'Medium Priority'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold">
                    {gap.trades}
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold">
                    {gap.volume}
                  </td>
                  <td className="px-4 py-3">
                    {gap.status === 'No Template' ? (
                      <span className="inline-flex items-center rounded bg-red-100 px-2 py-1 text-sm font-medium text-red-800">
                        ⚠ No Template
                      </span>
                    ) : (
                      <div>
                        <span className="inline-flex items-center rounded bg-green-100 px-2 py-1 text-sm font-medium text-green-800">
                          ✓ Template Exists
                        </span>
                        <div className="mt-1 text-xs text-yellow-600">
                          ⚠ Only {gap.utilization}% utilization
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {gap.status === 'No Template' ? (
                      <button className="flex items-center gap-1 rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700">
                        <Plus className="h-3 w-3" />
                        Create Template
                      </button>
                    ) : (
                      <button className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">
                        Review Usage
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Extraction Accuracy */}
      <div className="mb-6 rounded-lg bg-white shadow">
        <div className="border-b p-4">
          <h2 className="text-lg font-semibold">
            AI Extraction Accuracy (By Product Type)
          </h2>
          <p className="text-sm text-gray-500">
            Field-level extraction performance
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Product
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Overall Accuracy
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Trend
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Fields Needing Work
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {aiAccuracy.map((product, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{product.product}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-lg font-bold ${getStatusColor(product.status)}`}
                      >
                        {product.accuracy}%
                      </span>
                      <div className="h-2 w-24 rounded-full bg-gray-200">
                        <div
                          className={`h-2 rounded-full ${product.status === 'good' ? 'bg-green-500' : 'bg-yellow-500'}`}
                          style={{ width: `${product.accuracy}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`flex items-center gap-1 text-sm ${product.trendDir === 'up' ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {product.trendDir === 'up' ? '↑' : '↓'}{' '}
                      {Math.abs(product.trend)}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {product.status === 'good' ? (
                      <span className="text-sm text-green-600">
                        ✓ {product.fieldsIssues}
                      </span>
                    ) : (
                      <span className="text-sm text-yellow-600">
                        ⚠ {product.fieldsIssues}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Impact Summary */}
      <div className="rounded-lg border border-green-200 bg-gradient-to-r from-green-50 to-blue-50 p-6 shadow">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-green-600" />
          <h2 className="text-lg font-semibold">Impact Summary</h2>
        </div>
        <p className="mb-4 text-sm text-gray-600">
          Since tracking began (6 months ago):
        </p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          <div className="rounded-lg bg-white p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              +{impact.templateCoverage}pp
            </div>
            <div className="mt-1 text-xs text-gray-600">Template Coverage</div>
          </div>
          <div className="rounded-lg bg-white p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              +{impact.electronicAffirmation}pp
            </div>
            <div className="mt-1 text-xs text-gray-600">
              Electronic Affirmation
            </div>
          </div>
          <div className="rounded-lg bg-white p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              -{impact.avgTimeReduction}d
            </div>
            <div className="mt-1 text-xs text-gray-600">
              Avg Time to Resolution
            </div>
          </div>
          <div className="rounded-lg bg-white p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              -{impact.highSevBreakReduction}pp
            </div>
            <div className="mt-1 text-xs text-gray-600">
              High-Severity Breaks
            </div>
          </div>
          <div className="rounded-lg bg-white p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              ${impact.riskReduction}M
            </div>
            <div className="mt-1 text-xs text-gray-600">
              Estimated Risk Reduction
            </div>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-700">
          <strong>Bottom Line:</strong> Strategic initiatives are reducing
          operational risk and improving process efficiency. Template coverage
          and electronic affirmation adoption are the primary drivers of
          improvement.
        </div>
      </div>
    </div>
  );
};

export default TemplateProgressDashboard;
