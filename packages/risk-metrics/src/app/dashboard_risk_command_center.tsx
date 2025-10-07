'use client';

import React, { useState } from 'react';
import {
  IconPlus,
} from '@tabler/icons-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  MetricCard,
  Button,
  Heading,
  DataTable,
  SortableColumnHeader,
  StackedBarChart,
  CellText,
  Badge,
  WorkflowStatusCell,
  WorkflowAgedState,
  CellPerformance,
} from '@float-vibe-foundry/design-system';
import { ColumnDef } from '@tanstack/react-table';

const RiskCommandCenterDashboard = () => {
  const [showAllBreaks, setShowAllBreaks] = useState(false);
  const [showAllAwaiting, setShowAllAwaiting] = useState(false);

  // Sample data for Risk Command Center - EXACTLY matching the spec
  const kpis = [
    {
      label: 'Trades at Risk',
      value: '23',
      subValue: '8 High • 12 Medium • 3 Low',
      change: -2,
      trend: 'down' as const,
      comparison: 'vs. yesterday',
      status: 'warning' as const,
    },
    {
      label: 'Outside 24hr SLA',
      value: '18 / 258',
      subValue: '7.0%',
      change: 1.2,
      trend: 'up' as const,
      comparison: 'vs. avg',
      status: 'danger' as const,
    },
    {
      label: 'High-Sev Breaks',
      value: '3',
      change: -2,
      trend: 'down' as const,
      comparison: 'from last week',
      status: 'good' as const,
    },
  ];

  // Trades with Active Breaks - EXACTLY matching the spec
  const tradesWithBreaks = [
    {
      rank: 'high',
      trade: '10234',
      counterparty: 'GS',
      product: 'CMS Opt',
      notional: '189.01',
      currency: 'NZD',
      breaks: 4,
      ageDays: 3,
      ageLevel: 'over_sla' as const,
      affirmationStatus: 'in_review' as const,
      confirmationStatus: 'in_dispute' as const,
    },
    {
      rank: 'high',
      trade: '10189',
      counterparty: 'JPM',
      product: 'FX Opt',
      notional: '178.90',
      currency: 'USD',
      breaks: 1,
      ageDays: 2,
      ageLevel: 'approaching_sla' as const,
      affirmationStatus: 'in_review' as const,
      confirmationStatus: 'in_dispute' as const,
    },
    {
      rank: 'medium',
      trade: '10156',
      counterparty: 'Citi',
      product: 'IRS',
      notional: '234.57',
      currency: 'USD',
      breaks: 3,
      ageDays: 4,
      ageLevel: 'over_sla' as const,
      affirmationStatus: 'in_review' as const,
      confirmationStatus: 'pending_document' as const,
    },
    {
      rank: 'medium',
      trade: '10298',
      counterparty: 'BAML',
      product: 'Equity',
      notional: '67.89',
      currency: 'NOK',
      breaks: 2,
      ageDays: 1,
      ageLevel: 'within_sla' as const,
      affirmationStatus: 'in_review' as const,
      confirmationStatus: 'in_dispute' as const,
    },
    {
      rank: 'medium',
      trade: '10245',
      counterparty: 'MS',
      product: 'CMS Opt',
      notional: '123.46',
      currency: 'SEK',
      breaks: 1,
      ageDays: 2,
      ageLevel: 'approaching_sla' as const,
      affirmationStatus: 'in_review' as const,
      confirmationStatus: 'in_review' as const,
    },
  ];

  // Pending Affirmation - EXACTLY matching the spec
  const pendingAffirmation = [
    {
      trade: '10298',
      counterparty: 'BAML',
      product: 'Equity',
      notional: '67.89',
      currency: 'NOK',
      ageDays: 2,
      ageLevel: 'approaching_sla' as const,
      status: 'pending_affirmation' as const,
      action: 'Escalate',
    },
    {
      trade: '10245',
      counterparty: 'MS',
      product: 'CMS Opt',
      notional: '123.46',
      currency: 'SEK',
      ageDays: 1,
      ageLevel: 'within_sla' as const,
      status: 'pending_affirmation' as const,
      action: 'Monitor',
    },
    {
      trade: '10312',
      counterparty: 'Citi',
      product: 'IRS',
      notional: '234.57',
      currency: 'CHF',
      ageDays: 1,
      ageLevel: 'within_sla' as const,
      status: 'pending_affirmation' as const,
      action: 'Monitor',
    },
    {
      trade: '10298',
      counterparty: 'GS',
      product: 'FX Opt',
      notional: '156.79',
      currency: 'SEK',
      ageDays: 0,
      ageLevel: 'within_sla' as const,
      status: 'pending_affirmation' as const,
      action: 'Monitor',
    },
    {
      trade: '10301',
      counterparty: 'JPM',
      product: 'Swaption',
      notional: '145.68',
      currency: 'EUR',
      ageDays: 2,
      ageLevel: 'approaching_sla' as const,
      status: 'pending_affirmation' as const,
      action: 'Follow Up',
    },
  ];

  // Pending Confirmation Document - EXACTLY matching the spec
  const pendingConfirmation = [
    {
      trade: '10321',
      counterparty: 'JPM',
      product: 'FX Opt',
      notional: '178.90',
      currency: 'USD',
      ageDays: 3,
      ageLevel: 'over_sla' as const,
      status: 'pending_document' as const,
      action: 'Escalate',
    },
    {
      trade: '10278',
      counterparty: 'Citi',
      product: 'IRS',
      notional: '234.57',
      currency: 'USD',
      ageDays: 2,
      ageLevel: 'approaching_sla' as const,
      status: 'pending_document' as const,
      action: 'Follow Up',
    },
    {
      trade: '10289',
      counterparty: 'GS',
      product: 'CMS Opt',
      notional: '189.01',
      currency: 'NZD',
      ageDays: 3,
      ageLevel: 'over_sla' as const,
      status: 'pending_document' as const,
      action: 'Escalate',
    },
    {
      trade: '10256',
      counterparty: 'BAML',
      product: 'Equity',
      notional: '67.89',
      currency: 'NOK',
      ageDays: 1,
      ageLevel: 'within_sla' as const,
      status: 'pending_document' as const,
      action: 'Monitor',
    },
    {
      trade: '10267',
      counterparty: 'MS',
      product: 'Swaption',
      notional: '123.46',
      currency: 'SEK',
      ageDays: 1,
      ageLevel: 'within_sla' as const,
      status: 'pending_document' as const,
      action: 'Monitor',
    },
  ];

  // Risk Distribution - EXACTLY matching the spec
  const riskByCounterparty = [
    { name: 'GS', high: 8, medium: 12, low: 5 },
    { name: 'JPM', high: 3, medium: 8, low: 4 },
    { name: 'Citi', high: 2, medium: 5, low: 3 },
    { name: 'BAML', high: 1, medium: 6, low: 2 },
    { name: 'MS', high: 0, medium: 4, low: 1 },
  ];

  const riskByProduct = [
    { name: 'CMS Opt', high: 9, medium: 14, low: 6 },
    { name: 'FX Opt', high: 5, medium: 10, low: 8 },
    { name: 'IRS', high: 3, medium: 8, low: 4 },
    { name: 'Equity', high: 2, medium: 4, low: 3 },
    { name: 'Swaption', high: 1, medium: 2, low: 2 },
  ];

  // Define columns for Trades with Active Breaks - EXACTLY matching the spec
  const tradesWithBreaksColumns: ColumnDef<(typeof tradesWithBreaks)[0]>[] = [
    {
      accessorKey: 'rank',
      header: 'Pri',
      cell: ({ row }) => {
        const rank = row.getValue('rank') as string;
        return (
          <Badge variant={rank === 'high' ? 'error' : 'warning'}>
            {rank === 'high' ? 'High' : 'Medium'}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'trade',
      header: ({ column }) => (
        <SortableColumnHeader column={column} title="Trade" />
      ),
      cell: ({ row }) => {
        const trade = row.getValue('trade') as string;
        return <div className="text-sm font-medium text-text-brand">{trade}</div>;
      },
    },
    {
      accessorKey: 'counterparty',
      header: 'CP',
      cell: ({ row }) => {
        const counterparty = row.getValue('counterparty') as string;
        return <CellText>{counterparty}</CellText>;
      },
    },
    {
      accessorKey: 'product',
      header: 'Product',
      cell: ({ row }) => {
        const product = row.getValue('product') as string;
        return <CellText>{product}</CellText>;
      },
    },
    {
      accessorKey: 'notional',
      header: 'Notional',
      cell: ({ row }) => {
        const notional = row.getValue('notional') as string;
        const currency = row.original.currency;
        return (
          <div className="text-sm">
            <div className="font-medium">{notional}</div>
            <div className="text-xs text-text-tertiary">{currency}</div>
          </div>
        );
      },
    },
    {
      accessorKey: 'breaks',
      header: 'Breaks',
      cell: ({ row }) => {
        const breaks = row.getValue('breaks') as number;
        return (
          <div className="text-sm font-medium">
            {breaks} ⓘ
          </div>
        );
      },
    },
    {
      accessorKey: 'ageDays',
      header: 'Age',
      cell: ({ row }) => {
        const ageDays = row.getValue('ageDays') as number;
        const ageLevel = row.original.ageLevel;
        return <WorkflowAgedState level={ageLevel} days={ageDays} />;
      },
    },
    {
      accessorKey: 'affirmationStatus',
      header: 'Affirm Status',
      cell: ({ row }) => {
        const status = row.getValue('affirmationStatus') as string;
        return <WorkflowStatusCell type="affirmation" status={status as any} />;
      },
    },
    {
      accessorKey: 'confirmationStatus',
      header: 'Conf Status',
      cell: ({ row }) => {
        const status = row.getValue('confirmationStatus') as string;
        return <WorkflowStatusCell type="confirmation" status={status as any} />;
      },
    },
  ];

  // Define columns for Pending Affirmation
  const pendingAffirmationColumns: ColumnDef<(typeof pendingAffirmation)[0]>[] = [
    {
      accessorKey: 'trade',
      header: ({ column }) => (
        <SortableColumnHeader column={column} title="Trade" />
      ),
      cell: ({ row }) => {
        const trade = row.getValue('trade') as string;
        return <div className="text-sm font-medium text-text-brand">{trade}</div>;
      },
    },
    {
      accessorKey: 'counterparty',
      header: 'CP',
      cell: ({ row }) => {
        const counterparty = row.getValue('counterparty') as string;
        return <CellText>{counterparty}</CellText>;
      },
    },
    {
      accessorKey: 'product',
      header: 'Product',
      cell: ({ row }) => {
        const product = row.getValue('product') as string;
        return <CellText>{product}</CellText>;
      },
    },
    {
      accessorKey: 'notional',
      header: 'Notional',
      cell: ({ row }) => {
        const notional = row.getValue('notional') as string;
        const currency = row.original.currency;
        return (
          <div className="text-sm">
            <div className="font-medium">{notional}</div>
            <div className="text-xs text-text-tertiary">{currency}</div>
          </div>
        );
      },
    },
    {
      accessorKey: 'ageDays',
      header: 'Age',
      cell: ({ row }) => {
        const ageDays = row.getValue('ageDays') as number;
        const ageLevel = row.original.ageLevel;
        return <WorkflowAgedState level={ageLevel} days={ageDays} />;
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return <WorkflowStatusCell type="affirmation" status={status as any} />;
      },
    },
    {
      accessorKey: 'action',
      header: 'Action',
      cell: ({ row }) => {
        const action = row.getValue('action') as string;
        return <CellText>{action}</CellText>;
      },
    },
  ];

  // Define columns for Pending Confirmation Document
  const pendingConfirmationColumns: ColumnDef<(typeof pendingConfirmation)[0]>[] = [
    {
      accessorKey: 'trade',
      header: ({ column }) => (
        <SortableColumnHeader column={column} title="Trade" />
      ),
      cell: ({ row }) => {
        const trade = row.getValue('trade') as string;
        return <div className="text-sm font-medium text-text-brand">{trade}</div>;
      },
    },
    {
      accessorKey: 'counterparty',
      header: 'CP',
      cell: ({ row }) => {
        const counterparty = row.getValue('counterparty') as string;
        return <CellText>{counterparty}</CellText>;
      },
    },
    {
      accessorKey: 'product',
      header: 'Product',
      cell: ({ row }) => {
        const product = row.getValue('product') as string;
        return <CellText>{product}</CellText>;
      },
    },
    {
      accessorKey: 'notional',
      header: 'Notional',
      cell: ({ row }) => {
        const notional = row.getValue('notional') as string;
        const currency = row.original.currency;
        return (
          <div className="text-sm">
            <div className="font-medium">{notional}</div>
            <div className="text-xs text-text-tertiary">{currency}</div>
          </div>
        );
      },
    },
    {
      accessorKey: 'ageDays',
      header: 'Age',
      cell: ({ row }) => {
        const ageDays = row.getValue('ageDays') as number;
        const ageLevel = row.original.ageLevel;
        return <WorkflowAgedState level={ageLevel} days={ageDays} />;
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return <WorkflowStatusCell type="confirmation" status={status as any} />;
      },
    },
    {
      accessorKey: 'action',
      header: 'Action',
      cell: ({ row }) => {
        const action = row.getValue('action') as string;
        return <CellText>{action}</CellText>;
      },
    },
  ];

  return (
    <div className="bg-bg-primary min-h-screen p-6 text-text-primary">
      {/* Header */}
      <div className="mb-6">
        <Heading level={1} className="text-text-primary">
          Risk Command Center
        </Heading>
        <p className="text-text-secondary text-sm">Friday, October 06, 2025</p>
      </div>

      {/* KPIs - EXACTLY 3 cards as per spec */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {kpis.map((kpi, i) => (
          <MetricCard
            key={i}
            title={kpi.label}
            value={kpi.value}
            subValue={kpi.subValue}
            change={kpi.change}
            trend={kpi.trend}
            comparison={kpi.comparison}
            status={kpi.status}
          />
        ))}
      </div>

      {/* Priority Actions: Trades with Active Breaks */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CellPerformance level="bottom" />
            Priority Actions: Trades with Active Breaks
          </CardTitle>
          <p className="text-sm text-text-secondary">8 trades need attention</p>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={tradesWithBreaksColumns}
            data={showAllBreaks ? tradesWithBreaks : tradesWithBreaks.slice(0, 5)}
            searchKey="trade"
            searchPlaceholder="Search trades..."
            showSearch={true}
            className="mb-4"
          />
          <div className="text-center">
            <Button
              variant="ghost"
              onClick={() => setShowAllBreaks(!showAllBreaks)}
              className="text-sm font-medium text-text-brand hover:text-text-brand-hover"
            >
              <IconPlus className="h-4 w-4 mr-1" />
              {showAllBreaks ? 'Show Less' : 'View All 8 Items'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Priority Actions: Trades Awaiting Counterparty */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ⚠️ Priority Actions: Trades Awaiting Counterparty
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Pending Affirmation */}
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-3">
              Pending Affirmation (5 trades)
            </h4>
            <DataTable
              columns={pendingAffirmationColumns}
              data={showAllAwaiting ? pendingAffirmation : pendingAffirmation.slice(0, 3)}
              searchKey="trade"
              searchPlaceholder="Search trades..."
              showSearch={false}
              className="mb-4"
            />
          </div>

          {/* Pending Confirmation Document */}
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-3">
              Pending Confirmation Document (5 trades)
            </h4>
            <DataTable
              columns={pendingConfirmationColumns}
              data={showAllAwaiting ? pendingConfirmation : pendingConfirmation.slice(0, 3)}
              searchKey="trade"
              searchPlaceholder="Search trades..."
              showSearch={false}
              className="mb-4"
            />
          </div>

          <div className="text-center">
            <Button
              variant="ghost"
              onClick={() => setShowAllAwaiting(!showAllAwaiting)}
              className="text-sm font-medium text-text-brand hover:text-text-brand-hover"
            >
              <IconPlus className="h-4 w-4 mr-1" />
              {showAllAwaiting ? 'Show Less' : 'View All Awaiting Items'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Risk Distribution - EXACTLY matching the spec */}
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Risk by Counterparty</CardTitle>
          </CardHeader>
          <CardContent>
            <StackedBarChart
              data={riskByCounterparty}
              dataKeys={[
                { key: 'high', label: 'High', color: 'var(--fg-primary)' },
                { key: 'medium', label: 'Medium', color: 'var(--fg-primary)' },
                { key: 'low', label: 'Low', color: 'var(--fg-primary)' },
              ]}
              xAxisKey="name"
              height={200}
              showLegend={true}
              showGrid={true}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Risk by Product Type</CardTitle>
          </CardHeader>
          <CardContent>
            <StackedBarChart
              data={riskByProduct}
              dataKeys={[
                { key: 'high', label: 'High', color: 'var(--fg-primary)' },
                { key: 'medium', label: 'Medium', color: 'var(--fg-primary)' },
                { key: 'low', label: 'Low', color: 'var(--fg-primary)' },
              ]}
              xAxisKey="name"
              height={200}
              showLegend={true}
              showGrid={true}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RiskCommandCenterDashboard;
