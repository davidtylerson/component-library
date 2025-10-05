import React, { useState } from 'react';
import { Download, Plus, TrendingUp } from 'lucide-react';

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
        { month: 'Sep', value: 67 }
      ]
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
        { month: 'Sep', value: 23 }
      ]
    }
  };

  const templateGaps = [
    { 
      cpProduct: 'GS CMS Opt', 
      trades: 37, 
      volume: '$3.2B', 
      status: 'No Template',
      priority: 'high'
    },
    { 
      cpProduct: 'JPM FX Opt (Asia Basket)', 
      trades: 24, 
      volume: '$1.8B', 
      status: 'No Template',
      priority: 'high'
    },
    { 
      cpProduct: 'Citi IRS', 
      trades: 18, 
      volume: '$2.1B', 
      status: 'Template Exists',
      utilization: 65,
      priority: 'medium'
    },
    { 
      cpProduct: 'BAML Equity Opt (Custom)', 
      trades: 15, 
      volume: '$892M', 
      status: 'No Template',
      priority: 'medium'
    }
  ];

  const aiAccuracy = [
    { 
      product: 'CMS Options', 
      accuracy: 94.2, 
      trend: 2.1, 
      trendDir: 'up',
      fieldsIssues: 'All fields >90%',
      status: 'good'
    },
    { 
      product: 'FX Options', 
      accuracy: 91.8, 
      trend: 3.5, 
      trendDir: 'up',
      fieldsIssues: 'Strike: 87%',
      status: 'warning'
    },
    { 
      product: 'IRS', 
      accuracy: 96.1, 
      trend: 0.8, 
      trendDir: 'up',
      fieldsIssues: 'All fields >90%',
      status: 'good'
    },
    { 
      product: 'Equity Opts', 
      accuracy: 88.4, 
      trend: -1.2, 
      trendDir: 'down',
      fieldsIssues: 'Basket terms: 82%, Strike: 85%',
      status: 'warning'
    },
    { 
      product: 'Swaptions', 
      accuracy: 93.7, 
      trend: 1.9, 
      trendDir: 'up',
      fieldsIssues: 'All fields >90%',
      status: 'good'
    }
  ];

  const impact = {
    templateCoverage: 27,
    electronicAffirmation: 18,
    avgTimeReduction: 1.3,
    highSevBreakReduction: 4.2,
    riskReduction: 2.1
  };

  const getStatusColor = (status) => {
    if (status === 'good') return 'text-green-600';
    if (status === 'warning') return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPriorityBadge = (priority) => {
    if (priority === 'high') return 'bg-red-100 text-red-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Coverage & Automation Tracking</h1>
          <p className="text-sm text-gray-500">Progress toward strategic risk reduction goals</p>
        </div>
        <select 
          className="px-3 py-2 border rounded-lg text-sm"
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
        >
          <option value="3m">Last 3 Months</option>
          <option value="6m">Last 6 Months</option>
          <option value="12m">Last 12 Months</option>
        </select>
      </div>

      {/* Progress Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Template Coverage */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-lg font-semibold">Template Coverage</h2>
              <p className="text-sm text-gray-500">Target: {coverageData.template.target}% by {coverageData.template.targetDate}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{coverageData.template.current}%</div>
              <div className="text-xs text-gray-500">Current</div>
            </div>
          </div>

          {/* Chart */}
          <div className="relative h-48 mb-4">
            <div className="absolute inset-0 flex items-end justify-between">
              {coverageData.template.history.map((point, i) => (
                <div key={i} className="flex flex-col items-center flex-1">
                  <div className="relative w-full" style={{ height: '160px' }}>
                    <div 
                      className="absolute bottom-0 w-full bg-blue-500 rounded-t"
                      style={{ height: `${(point.value / 100) * 160}px` }}
                    />
                    {i === coverageData.template.history.length - 1 && (
                      <div className="absolute -right-1 top-0 w-3 h-3 bg-blue-600 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-2">{point.month}</div>
                </div>
              ))}
            </div>
            {/* Target line */}
            <div 
              className="absolute left-0 right-0 border-t-2 border-dashed border-green-400"
              style={{ top: `${(1 - coverageData.template.target / 100) * 160}px` }}
            >
              <span className="absolute right-0 -top-3 text-xs text-green-600 font-medium">
                Target ({coverageData.template.target}%)
              </span>
            </div>
          </div>

          <div className={`text-center py-2 rounded-lg ${coverageData.template.onTrack ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
            <div className="font-medium">
              {coverageData.template.onTrack ? '✓ On Track' : '⚠ Slightly Behind'}
            </div>
          </div>
        </div>

        {/* Electronic Affirmation */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-lg font-semibold">Electronic Affirmation</h2>
              <p className="text-sm text-gray-500">Target: {coverageData.electronic.target}% by {coverageData.electronic.targetDate}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-purple-600">{coverageData.electronic.current}%</div>
              <div className="text-xs text-gray-500">Current</div>
            </div>
          </div>

          {/* Chart */}
          <div className="relative h-48 mb-4">
            <div className="absolute inset-0 flex items-end justify-between">
              {coverageData.electronic.history.map((point, i) => (
                <div key={i} className="flex flex-col items-center flex-1">
                  <div className="relative w-full" style={{ height: '160px' }}>
                    <div 
                      className="absolute bottom-0 w-full bg-purple-500 rounded-t"
                      style={{ height: `${(point.value / 100) * 160}px` }}
                    />
                    {i === coverageData.electronic.history.length - 1 && (
                      <div className="absolute -right-1 top-0 w-3 h-3 bg-purple-600 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-2">{point.month}</div>
                </div>
              ))}
            </div>
            {/* Target line */}
            <div 
              className="absolute left-0 right-0 border-t-2 border-dashed border-green-400"
              style={{ top: `${(1 - coverageData.electronic.target / 100) * 160}px` }}
            >
              <span className="absolute right-0 -top-3 text-xs text-green-600 font-medium">
                Target ({coverageData.electronic.target}%)
              </span>
            </div>
          </div>

          <div className="text-center py-2 rounded-lg bg-yellow-50 text-yellow-700">
            <div className="font-medium">⚠ Slightly Behind</div>
          </div>
        </div>
      </div>

      {/* Template Gap Analysis */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Template Gap Analysis (Opportunities)</h2>
          <p className="text-sm text-gray-500">Counterparty + Product combinations needing attention</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Counterparty + Product</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trades (90d)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Volume</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Template Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {templateGaps.map((gap, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium">{gap.cpProduct}</div>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium ${getPriorityBadge(gap.priority)}`}>
                      {gap.priority === 'high' ? 'High Priority' : 'Medium Priority'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold">{gap.trades}</td>
                  <td className="px-4 py-3 text-sm font-semibold">{gap.volume}</td>
                  <td className="px-4 py-3">
                    {gap.status === 'No Template' ? (
                      <span className="inline-flex items-center px-2 py-1 rounded text-sm bg-red-100 text-red-800 font-medium">
                        ⚠ No Template
                      </span>
                    ) : (
                      <div>
                        <span className="inline-flex items-center px-2 py-1 rounded text-sm bg-green-100 text-green-800 font-medium">
                          ✓ Template Exists
                        </span>
                        <div className="text-xs text-yellow-600 mt-1">
                          ⚠ Only {gap.utilization}% utilization
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {gap.status === 'No Template' ? (
                      <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 flex items-center gap-1">
                        <Plus className="w-3 h-3" />
                        Create Template
                      </button>
                    ) : (
                      <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
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
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">AI Extraction Accuracy (By Product Type)</h2>
          <p className="text-sm text-gray-500">Field-level extraction performance</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Overall Accuracy</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trend</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fields Needing Work</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {aiAccuracy.map((product, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{product.product}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-lg font-bold ${getStatusColor(product.status)}`}>
                        {product.accuracy}%
                      </span>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${product.status === 'good' ? 'bg-green-500' : 'bg-yellow-500'}`}
                          style={{ width: `${product.accuracy}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`flex items-center gap-1 text-sm ${product.trendDir === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {product.trendDir === 'up' ? '↑' : '↓'} {Math.abs(product.trend)}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {product.status === 'good' ? (
                      <span className="text-sm text-green-600">✓ {product.fieldsIssues}</span>
                    ) : (
                      <span className="text-sm text-yellow-600">⚠ {product.fieldsIssues}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Impact Summary */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg shadow p-6 border border-green-200">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-6 h-6 text-green-600" />
          <h2 className="text-lg font-semibold">Impact Summary</h2>
        </div>
        <p className="text-sm text-gray-600 mb-4">Since tracking began (6 months ago):</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">+{impact.templateCoverage}pp</div>
            <div className="text-xs text-gray-600 mt-1">Template Coverage</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">+{impact.electronicAffirmation}pp</div>
            <div className="text-xs text-gray-600 mt-1">Electronic Affirmation</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">-{impact.avgTimeReduction}d</div>
            <div className="text-xs text-gray-600 mt-1">Avg Time to Resolution</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">-{impact.highSevBreakReduction}pp</div>
            <div className="text-xs text-gray-600 mt-1">High-Severity Breaks</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">${impact.riskReduction}M</div>
            <div className="text-xs text-gray-600 mt-1">Estimated Risk Reduction</div>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-700">
          <strong>Bottom Line:</strong> Strategic initiatives are reducing operational risk and improving process efficiency. 
          Template coverage and electronic affirmation adoption are the primary drivers of improvement.
        </div>
      </div>
    </div>
  );
};

export default TemplateProgressDashboard;