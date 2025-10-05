'use client';

import React, { useState } from 'react';
import { Download, Calendar } from 'lucide-react';

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

  const getStatusBadge = status => {
    if (status === 'top') return '✓';
    if (status === 'bottom') return '⚠';
    return '-';
  };

  const getStatusColor = status => {
    if (status === 'top') return 'text-green-600';
    if (status === 'bottom') return 'text-red-600';
    return 'text-gray-600';
  };

  const selected = cpDetail[selectedCP];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Counterparty Performance - Q3 2025
        </h1>
        <p className="text-sm text-gray-500">
          Comprehensive scorecard with peer comparison
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-3">
        <select
          className="rounded-lg border px-3 py-2 text-sm"
          value={compareGroup}
          onChange={e => setCompareGroup(e.target.value)}
        >
          <option value="all">Compare: All Counterparties</option>
          <option value="tier1">Tier 1 Banks Only</option>
          <option value="highvolume">High Volume (&gt;50 trades)</option>
        </select>
        <select className="rounded-lg border px-3 py-2 text-sm">
          <option value="all">Products: All</option>
          <option value="rates">Rates Only</option>
          <option value="fx">FX Only</option>
          <option value="equity">Equity Only</option>
        </select>
      </div>

      {/* Rankings Table */}
      <div className="mb-6 overflow-hidden rounded-lg bg-white shadow">
        <div className="border-b bg-gray-50 p-4">
          <h2 className="text-lg font-semibold">
            Overall Rankings (Volume-Weighted)
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Click any row for detailed view
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Rank
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Counterparty
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Trades (Vol)
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Confirm Dispute %
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Break Rate
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Time to Doc (hrs)
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Time to Confirm (hrs)
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Time in Dispute (days)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {rankings.map(row => (
                <tr
                  key={row.cp}
                  className={`cursor-pointer hover:bg-gray-50 ${selectedCP === row.cp ? 'bg-blue-50' : ''}`}
                  onClick={() => setSelectedCP(row.cp)}
                >
                  <td className="px-3 py-3 font-medium">{row.rank}</td>
                  <td className="px-3 py-3 font-semibold text-blue-600">
                    {row.cp}
                  </td>
                  <td className="px-3 py-3">
                    <div>{row.trades}</div>
                    <div className="text-xs text-gray-500">{row.volume}</div>
                  </td>
                  <td className="px-3 py-3">
                    <div
                      className={`font-medium ${getStatusColor(row.status)}`}
                    >
                      {row.disputePct}% {getStatusBadge(row.status)}
                    </div>
                    <div className="text-xs text-gray-500">
                      ({row.disputePercentile})
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <div
                      className={`font-medium ${getStatusColor(row.status)}`}
                    >
                      {row.breakRate}% {getStatusBadge(row.status)}
                    </div>
                    <div className="text-xs text-gray-500">
                      ({row.breakPercentile})
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <div
                      className={`font-medium ${getStatusColor(row.status)}`}
                    >
                      {row.timeToDoc}h {getStatusBadge(row.status)}
                    </div>
                    <div className="text-xs text-gray-500">
                      ({row.docPercentile})
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <div
                      className={`font-medium ${getStatusColor(row.status)}`}
                    >
                      {row.timeToConfirm}h {getStatusBadge(row.status)}
                    </div>
                    <div className="text-xs text-gray-500">
                      ({row.confirmPercentile})
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <div
                      className={`font-medium ${getStatusColor(row.status)}`}
                    >
                      {row.timeInDispute}d {getStatusBadge(row.status)}
                    </div>
                    <div className="text-xs text-gray-500">
                      ({row.disputeTimePercentile})
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t bg-gray-50 p-3 text-sm text-gray-600">
          Legend:{' '}
          <span className="font-medium text-green-600">✓ Top Quartile</span> ·
          <span className="ml-2 font-medium text-gray-600">- Middle</span> ·
          <span className="ml-2 font-medium text-red-600">
            ⚠ Bottom Quartile
          </span>
        </div>
      </div>

      {/* Detailed View */}
      <div className="rounded-lg bg-white shadow">
        <div className="border-b bg-gradient-to-r from-blue-50 to-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">
                {selectedCP} - Detailed Performance
              </h2>
              <div className="mt-2 flex gap-6 text-sm">
                <span>
                  <strong>{selected.trades}</strong> Trades
                </span>
                <span>
                  <strong>{selected.volume}</strong> Volume
                </span>
                <span>
                  <strong>{selected.breakRate}%</strong> Break Rate
                </span>
              </div>
            </div>
            <select
              className="rounded-lg border px-3 py-2 text-sm"
              value={selectedCP}
              onChange={e => setSelectedCP(e.target.value)}
            >
              {rankings.map(r => (
                <option key={r.cp} value={r.cp}>
                  {r.cp}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="p-6">
          {/* Summary Stats */}
          <div className="mb-6 grid grid-cols-3 gap-4 rounded-lg border border-red-200 bg-red-50 p-4">
            <div>
              <div className="text-sm text-gray-600">
                High-Severity Break Rate
              </div>
              <div className="text-xl font-bold text-red-600">
                {selected.highSevBreakRate}% <span className="text-sm">⚠</span>
              </div>
              <div className="text-xs text-gray-500">
                vs. {selected.peerAvg}% peer avg
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Avg Resolution Time</div>
              <div className="text-xl font-bold text-red-600">
                {selected.avgResolutionTime} days{' '}
                <span className="text-sm">⚠</span>
              </div>
              <div className="text-xs text-gray-500">
                vs. {selected.resolutionPeerAvg} day avg
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Template Compliance</div>
              <div className="text-xl font-bold text-red-600">
                {selected.templateCompliance}%{' '}
                <span className="text-sm">⚠</span>
              </div>
              <div className="text-xs text-gray-500">
                vs. {selected.compliancePeerAvg}% peer avg
              </div>
            </div>
          </div>

          {/* Timing & Quality Metrics */}
          <div className="mb-6 grid grid-cols-2 gap-6">
            {/* Timing */}
            <div>
              <h3 className="mb-3 border-b pb-2 font-semibold">
                Timing Metrics
              </h3>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="mb-1 font-medium">Time to Receive Doc</div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                    <div>
                      Avg:{' '}
                      <span className="font-semibold text-red-600">
                        {selected.timing.timeToDoc.avg}h ⚠
                      </span>
                    </div>
                    <div>Median: {selected.timing.timeToDoc.median}h</div>
                    <div>
                      Within 1hr: {selected.timing.timeToDoc.within1hr}%
                    </div>
                    <div>Peer avg: {selected.timing.timeToDoc.peerAvg}%</div>
                  </div>
                </div>
                <div>
                  <div className="mb-1 font-medium">Time to Affirm</div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                    <div>Avg: {selected.timing.timeToAffirm.avg}h</div>
                    <div>Median: {selected.timing.timeToAffirm.median}h</div>
                    <div>
                      &lt;24hr SLA:{' '}
                      <span className="font-semibold text-red-600">
                        {selected.timing.timeToAffirm.sla}% ⚠
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-1 font-medium">Time to Confirm</div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                    <div>
                      Avg:{' '}
                      <span className="font-semibold text-red-600">
                        {selected.timing.timeToConfirm.avg}h ⚠
                      </span>
                    </div>
                    <div>Median: {selected.timing.timeToConfirm.median}h</div>
                    <div>
                      &lt;24hr SLA:{' '}
                      <span className="font-semibold text-red-600">
                        {selected.timing.timeToConfirm.sla}% ⚠
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-1 font-medium">Time in Dispute</div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                    <div>
                      Avg:{' '}
                      <span className="font-semibold text-red-600">
                        {selected.timing.timeInDispute.avg}d ⚠
                      </span>
                    </div>
                    <div>Median: {selected.timing.timeInDispute.median}d</div>
                    <div>
                      &lt;48hr resolution:{' '}
                      <span className="font-semibold text-red-600">
                        {selected.timing.timeInDispute.under48hr}% ⚠
                      </span>
                    </div>
                    <div>
                      Peer avg: {selected.timing.timeInDispute.peerAvg}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality */}
            <div>
              <h3 className="mb-3 border-b pb-2 font-semibold">
                Quality Metrics
              </h3>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="mb-1 font-medium">Confirm Dispute Rate</div>
                  <div className="mb-1 text-2xl font-bold text-red-600">
                    {selected.quality.disputeRate}%{' '}
                    <span className="text-sm">⚠</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    ({selected.quality.disputeCount} of {selected.trades})
                  </div>
                </div>
                <div>
                  <div className="mb-2 font-medium">Break Rate by Severity</div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>High:</span>
                      <span className="font-semibold text-red-600">
                        {selected.quality.breakBySeverity.high}% ⚠
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Medium:</span>
                      <span className="font-semibold">
                        {selected.quality.breakBySeverity.medium}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Low:</span>
                      <span className="font-semibold">
                        {selected.quality.breakBySeverity.low}%
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-1 font-medium">Template Compliance</div>
                  <div className="mb-1 text-2xl font-bold text-red-600">
                    {selected.quality.templateCompliance}%{' '}
                    <span className="text-sm">⚠</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    vs {selected.compliancePeerAvg}% peer avg
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trend Analysis */}
          <div className="mb-6">
            <h3 className="mb-3 border-b pb-2 font-semibold">
              Trend Analysis (Last 4 Quarters)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                      Metric
                    </th>
                    {selected.trend.map((q, i) => (
                      <th
                        key={i}
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500"
                      >
                        {q.quarter}
                      </th>
                    ))}
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                      Trend
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-3 py-2 font-medium">Break Rate</td>
                    {selected.trend.map((q, i) => (
                      <td key={i} className="px-3 py-2">
                        {q.breakRate}%
                      </td>
                    ))}
                    <td className="px-3 py-2 font-medium text-green-600">
                      ↓ Better
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Dispute Rate</td>
                    {selected.trend.map((q, i) => (
                      <td key={i} className="px-3 py-2">
                        {q.disputeRate}%
                      </td>
                    ))}
                    <td className="px-3 py-2 font-medium text-green-600">
                      ↓ Better
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Time to Doc (hrs)</td>
                    {selected.trend.map((q, i) => (
                      <td key={i} className="px-3 py-2">
                        {q.timeToDoc}h
                      </td>
                    ))}
                    <td className="px-3 py-2 font-medium text-green-600">
                      ↓ Better
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">
                      Time in Dispute (days)
                    </td>
                    {selected.trend.map((q, i) => (
                      <td key={i} className="px-3 py-2">
                        {q.timeInDispute}d
                      </td>
                    ))}
                    <td className="px-3 py-2 font-medium text-green-600">
                      ↓ Better
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">&lt;24hr SLA Rate</td>
                    {selected.trend.map((q, i) => (
                      <td key={i} className="px-3 py-2">
                        {q.slaRate}%
                      </td>
                    ))}
                    <td className="px-3 py-2 font-medium text-green-600">
                      ↑ Better
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Product Breakdown */}
          <div className="mb-6">
            <h3 className="mb-3 border-b pb-2 font-semibold">
              Product Breakdown
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                      Product
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                      Trades
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                      Dispute %
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                      Avg Time to Confirm
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                      Key Issues
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {selected.products.map((prod, i) => (
                    <tr key={i} className={prod.warning ? 'bg-yellow-50' : ''}>
                      <td className="px-3 py-2 font-medium">{prod.name}</td>
                      <td className="px-3 py-2">{prod.trades}</td>
                      <td className="px-3 py-2">
                        <span
                          className={
                            prod.warning ? 'font-bold text-red-600' : ''
                          }
                        >
                          {prod.disputePct}% {prod.warning && '⚠'}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={
                            prod.warning ? 'font-bold text-red-600' : ''
                          }
                        >
                          {prod.avgTimeToConf}h {prod.warning && '⚠'}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-gray-600">{prod.issues}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Talking Points */}
          <div className="rounded-lg border bg-gray-50 p-4">
            <h3 className="mb-3 font-semibold">
              Key Talking Points for Quarterly Review
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <div className="mb-1 font-medium text-green-600">
                  ✓ POSITIVES:
                </div>
                <ul className="ml-2 list-inside list-disc space-y-1 text-gray-700">
                  <li>
                    Consistent improvement across all metrics for 4 quarters
                  </li>
                  <li>Time to send docs improving (5.2h vs 6.1h a year ago)</li>
                  <li>CMS Options performing close to peer average</li>
                </ul>
              </div>
              <div>
                <div className="mb-1 font-medium text-red-600">
                  ⚠ CONCERNS:
                </div>
                <ul className="ml-2 list-inside list-disc space-y-1 text-gray-700">
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
                <div className="mb-1 font-medium text-blue-600">
                  💡 RECOMMENDATIONS:
                </div>
                <ul className="ml-2 list-inside list-disc space-y-1 text-gray-700">
                  <li>Request process review for FX Options specifically</li>
                  <li>Discuss template compliance improvement plan</li>
                  <li>Establish escalation path for disputes over 48 hours</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <button className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-gray-50">
              <Download className="h-4 w-4" />
              Export Full Scorecard (PDF)
            </button>
            <button className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-gray-50">
              <Download className="h-4 w-4" />
              Export Data (CSV)
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
              <Calendar className="h-4 w-4" />
              Schedule Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounterpartyScorecard;
