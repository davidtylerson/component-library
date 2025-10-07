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
  Heading,
  Text,
  LineChart,
} from '@float-vibe-foundry/design-system';
import { IconPlus, IconTrendingUp } from '@tabler/icons-react';

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
    if (status === 'good') return 'text-text-success-primary';
    if (status === 'warning') return 'text-text-warning-primary';
    return 'text-text-error-primary';
  };

  const getPriorityBadge = (priority: string) => {
    if (priority === 'high')
      return <Badge variant="destructive">High Priority</Badge>;
    return (
      <Badge variant="outline" className="text-text-warning-primary">
        Medium Priority
      </Badge>
    );
  };

  return (
    <div className="bg-bg-primary min-h-screen p-6 text-text-primary">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <Heading level={1} className="text-text-secondary">
            Coverage & Automation Tracking
          </Heading>
          <Text className="text-text-secondary">
            Progress toward strategic risk reduction goals
          </Text>
        </div>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3m">Last 3 Months</SelectItem>
            <SelectItem value="6m">Last 6 Months</SelectItem>
            <SelectItem value="12m">Last 12 Months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Progress Charts */}
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Template Coverage */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Template Coverage</CardTitle>
                <CardDescription>
                  Target: {coverageData.template.target}% by{' '}
                  {coverageData.template.targetDate}
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-brand-600 text-3xl font-bold">
                  {coverageData.template.current}%
                </div>
                <div className="text-text-secondary text-xs">Current</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Chart */}
            <div className="mb-4 h-48">
              <LineChart
                data={coverageData.template.history}
                dataKeys={[
                  {
                    key: 'value',
                    label: 'Coverage',
                    color: 'var(--color-brand-600)',
                  },
                ]}
                xAxisKey="month"
                height={160}
              />
            </div>

            <div
              className={`rounded-lg py-2 text-center ${coverageData.template.onTrack ? 'text-text-success-primary' : 'text-text-warning-primary'}`}
            >
              <div className="font-medium">
                {coverageData.template.onTrack
                  ? '✓ On Track'
                  : '⚠ Slightly Behind'}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Electronic Affirmation */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Electronic Affirmation</CardTitle>
                <CardDescription>
                  Target: {coverageData.electronic.target}% by{' '}
                  {coverageData.electronic.targetDate}
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-purple-600">
                  {coverageData.electronic.current}%
                </div>
                <div className="text-text-secondary text-xs">Current</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Chart */}
            <div className="mb-4 h-48">
              <LineChart
                data={coverageData.electronic.history}
                dataKeys={[
                  {
                    key: 'value',
                    label: 'Coverage',
                    color: 'var(--color-purple-600)',
                  },
                ]}
                xAxisKey="month"
                height={160}
              />
            </div>

            <div className="rounded-lg bg-bg-warning-subtle py-2 text-center text-text-warning-primary">
              <div className="font-medium">⚠ Slightly Behind</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Template Gap Analysis */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Template Gap Analysis (Opportunities)</CardTitle>
          <CardDescription>
            Counterparty + Product combinations needing attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              {
                accessorKey: 'cpProduct',
                header: 'Counterparty + Product',
                cell: ({ row }) => {
                  const cpProduct = row.getValue('cpProduct') as string;
                  const priority = row.getValue('priority') as string;
                  return (
                    <div>
                      <Text className="font-medium">{cpProduct}</Text>
                      <div className="mt-1">{getPriorityBadge(priority)}</div>
                    </div>
                  );
                },
              },
              {
                accessorKey: 'trades',
                header: 'Trades (90d)',
                cell: ({ row }) => (
                  <Text className="font-semibold">
                    {row.getValue('trades')}
                  </Text>
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
                accessorKey: 'status',
                header: 'Template Status',
                cell: ({ row }) => {
                  const status = row.getValue('status') as string;
                  const utilization = row.getValue('utilization') as number;
                  if (status === 'No Template') {
                    return (
                      <Badge variant="destructive" className="gap-1">
                        ⚠ No Template
                      </Badge>
                    );
                  }
                  return (
                    <div>
                      <Badge variant="outline" className="gap-1">
                        ✓ Template Exists
                      </Badge>
                      <div className="text-text-warning-primary mt-1 text-xs">
                        ⚠ Only {utilization}% utilization
                      </div>
                    </div>
                  );
                },
              },
              {
                accessorKey: 'action',
                header: 'Action',
                cell: ({ row }) => {
                  const status = row.getValue('status') as string;
                  if (status === 'No Template') {
                    return (
                      <Button size="sm">
                        <IconPlus className="mr-1 h-3 w-3" />
                        Create Template
                      </Button>
                    );
                  }
                  return (
                    <Button variant="outline" size="sm">
                      Review Usage
                    </Button>
                  );
                },
              },
            ]}
            data={templateGaps.map(gap => ({
              ...gap,
              utilization: gap.utilization || 0,
            }))}
            searchKey="cpProduct"
            searchPlaceholder="Search counterparties..."
            showPagination={false}
            showSearch={true}
          />
        </CardContent>
      </Card>

      {/* AI Extraction Accuracy */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>AI Extraction Accuracy (By Product Type)</CardTitle>
          <CardDescription>Field-level extraction performance</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              {
                accessorKey: 'product',
                header: 'Product',
                cell: ({ row }) => (
                  <Text className="font-medium">{row.getValue('product')}</Text>
                ),
              },
              {
                accessorKey: 'accuracy',
                header: 'Overall Accuracy',
                cell: ({ row }) => {
                  const accuracy = row.getValue('accuracy') as number;
                  const status = row.getValue('status') as string;
                  return (
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-lg font-bold ${getStatusColor(status)}`}
                      >
                        {accuracy}%
                      </span>
                      <div className="bg-background-secondary h-2 w-24 rounded-full">
                        <div
                          className={`h-2 rounded-full ${status === 'good' ? 'bg-text-success-primary' : 'bg-bg-warning-solid'}`}
                          style={{ width: `${accuracy}%` }}
                        />
                      </div>
                    </div>
                  );
                },
              },
              {
                accessorKey: 'trend',
                header: 'Trend',
                cell: ({ row }) => {
                  const trend = row.getValue('trend') as number;
                  const trendDir = row.getValue('trendDir') as string;
                  return (
                    <span
                      className={`flex items-center gap-1 text-sm ${trendDir === 'up' ? 'text-text-success-primary' : 'text-text-error-primary'}`}
                    >
                      {trendDir === 'up' ? '↑' : '↓'} {Math.abs(trend)}%
                    </span>
                  );
                },
              },
              {
                accessorKey: 'fieldsIssues',
                header: 'Fields Needing Work',
                cell: ({ row }) => {
                  const fieldsIssues = row.getValue('fieldsIssues') as string;
                  const status = row.getValue('status') as string;
                  return status === 'good' ? (
                    <Text className="text-text-success-primary text-sm">
                      ✓ {fieldsIssues}
                    </Text>
                  ) : (
                    <Text className="text-text-warning-primary text-sm">
                      ⚠ {fieldsIssues}
                    </Text>
                  );
                },
              },
            ]}
            data={aiAccuracy}
            searchKey="product"
            searchPlaceholder="Search products..."
            showPagination={false}
            showSearch={true}
          />
        </CardContent>
      </Card>

      {/* Impact Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <IconTrendingUp className="text-text-success-primary h-6 w-6" />
            <CardTitle>Impact Summary</CardTitle>
          </div>
          <CardDescription>
            Since tracking began (6 months ago):
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-text-success-primary text-2xl font-bold">
                  +{impact.templateCoverage}pp
                </div>
                <div className="text-text-secondary mt-1 text-xs">
                  Template Coverage
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-text-success-primary text-2xl font-bold">
                  +{impact.electronicAffirmation}pp
                </div>
                <div className="text-text-secondary mt-1 text-xs">
                  Electronic Affirmation
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-text-success-primary text-2xl font-bold">
                  -{impact.avgTimeReduction}d
                </div>
                <div className="text-text-secondary mt-1 text-xs">
                  Avg Time to Resolution
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-text-success-primary text-2xl font-bold">
                  -{impact.highSevBreakReduction}pp
                </div>
                <div className="text-text-secondary mt-1 text-xs">
                  High-Severity Breaks
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-text-success-primary text-2xl font-bold">
                  ${impact.riskReduction}M
                </div>
                <div className="text-text-secondary mt-1 text-xs">
                  Estimated Risk Reduction
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="text-text-secondary mt-4 text-sm">
            <Text className="font-bold">Bottom Line:</Text> Strategic
            initiatives are reducing operational risk and improving process
            efficiency. Template coverage and electronic affirmation adoption
            are the primary drivers of improvement.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TemplateProgressDashboard;
