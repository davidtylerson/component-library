'use client';

import * as React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { IconUser, IconSettings, IconAlertCircle } from '@tabler/icons-react';

import { DataTable, SortableColumnHeader } from '@/components/ui/data-table';
import { StatusCell, DocumentReviewState, AgedState } from '@/components/ui/status-cell';
import { TradeTypeCell, IconLeadingCell } from '@/components/ui/icon-leading-cell';

// Sample data for the template gap table
interface TemplateGap {
  id: string;
  templateName: string;
  counterparty: string;
  tradeType: 'full-term' | 'partial-term' | 'novation' | 'execution';
  priority: 'high' | 'medium' | 'low';
  templateStatus: 'pending' | 'in-progress' | 'completed' | 'cancelled' | 'in-dispute' | 'matched' | 'unmatched' | 'pending-return';
  documentState: 'in-dispute' | 'in-review' | 'not-matched' | 'return';
  agedDays: number;
  lastUpdated: string;
}

const templateGapData: TemplateGap[] = [
  {
    id: '1',
    templateName: 'ISDA Master Agreement',
    counterparty: 'Goldman Sachs',
    tradeType: 'full-term',
    priority: 'high',
    templateStatus: 'in-progress',
    documentState: 'in-review',
    agedDays: 15,
    lastUpdated: '2024-01-15',
  },
  {
    id: '2',
    templateName: 'Credit Support Annex',
    counterparty: 'JPMorgan Chase',
    tradeType: 'partial-term',
    priority: 'medium',
    templateStatus: 'pending',
    documentState: 'not-matched',
    agedDays: 8,
    lastUpdated: '2024-01-12',
  },
  {
    id: '3',
    templateName: 'Confirmation Template',
    counterparty: 'Morgan Stanley',
    tradeType: 'novation',
    priority: 'low',
    templateStatus: 'completed',
    documentState: 'in-review',
    agedDays: 3,
    lastUpdated: '2024-01-10',
  },
  {
    id: '4',
    templateName: 'Netting Agreement',
    counterparty: 'Bank of America',
    tradeType: 'execution',
    priority: 'high',
    templateStatus: 'in-dispute',
    documentState: 'in-dispute',
    agedDays: 22,
    lastUpdated: '2024-01-08',
  },
];

const templateGapColumns: ColumnDef<TemplateGap>[] = [
  {
    accessorKey: 'templateName',
    header: ({ column }) => (
      <SortableColumnHeader column={column} title="Template Name" />
    ),
    cell: ({ row }) => (
      <div className="font-medium text-[var(--text-primary)]">
        {row.getValue('templateName')}
      </div>
    ),
  },
  {
    accessorKey: 'counterparty',
    header: ({ column }) => (
      <SortableColumnHeader column={column} title="Counterparty" />
    ),
    cell: ({ row }) => (
      <IconLeadingCell
        icon={IconUser}
        text={row.getValue('counterparty')}
      />
    ),
  },
  {
    accessorKey: 'tradeType',
    header: 'Trade Type',
    cell: ({ row }) => (
      <TradeTypeCell type={row.getValue('tradeType')} />
    ),
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => (
      <AgedState level={row.getValue('priority')} />
    ),
  },
  {
    accessorKey: 'templateStatus',
    header: 'Template Status',
    cell: ({ row }) => (
      <StatusCell status={row.getValue('templateStatus')} />
    ),
  },
  {
    accessorKey: 'documentState',
    header: 'Document State',
    cell: ({ row }) => (
      <DocumentReviewState state={row.getValue('documentState')} />
    ),
  },
  {
    accessorKey: 'agedDays',
    header: ({ column }) => (
      <SortableColumnHeader column={column} title="Aged Days" />
    ),
    cell: ({ row }) => (
      <div className="text-[var(--text-primary)]">
        {row.getValue('agedDays')} days
      </div>
    ),
  },
  {
    accessorKey: 'lastUpdated',
    header: ({ column }) => (
      <SortableColumnHeader column={column} title="Last Updated" />
    ),
    cell: ({ row }) => (
      <div className="text-[var(--text-secondary)]">
        {row.getValue('lastUpdated')}
      </div>
    ),
  },
];

export default function DataTablePage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
          DataTable Component
        </h1>
        <p className="text-[var(--text-secondary)]">
          A powerful data table component built with TanStack Table and styled with the Float Design System.
        </p>
      </div>

      {/* Main DataTable Example */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">
          Template Gap Analysis Table
        </h2>
        <DataTable
          columns={templateGapColumns}
          data={templateGapData}
          searchKey="templateName"
          searchPlaceholder="Search templates..."
          showPagination={true}
          showSearch={true}
        />
      </div>

      {/* Table Cell Components Showcase */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">
          Table Cell Components Showcase
        </h2>
        
        <div className="space-y-6">
          {/* StatusCell Examples */}
          <div>
            <h3 className="text-lg font-medium text-[var(--text-primary)] mb-3">StatusCell Component</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatusCell status="pending" />
              <StatusCell status="in-progress" />
              <StatusCell status="completed" />
              <StatusCell status="cancelled" />
              <StatusCell status="in-dispute" />
              <StatusCell status="matched" />
              <StatusCell status="unmatched" />
              <StatusCell status="pending-return" />
            </div>
          </div>

          {/* DocumentReviewState Examples */}
          <div>
            <h3 className="text-lg font-medium text-[var(--text-primary)] mb-3">DocumentReviewState Component</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <DocumentReviewState state="in-dispute" />
              <DocumentReviewState state="in-review" />
              <DocumentReviewState state="not-matched" />
              <DocumentReviewState state="return" />
            </div>
          </div>

          {/* AgedState Examples */}
          <div>
            <h3 className="text-lg font-medium text-[var(--text-primary)] mb-3">AgedState Component (Priority Levels)</h3>
            <div className="flex gap-4">
              <AgedState level="high" />
              <AgedState level="medium" />
              <AgedState level="low" />
            </div>
          </div>

          {/* TradeTypeCell Examples */}
          <div>
            <h3 className="text-lg font-medium text-[var(--text-primary)] mb-3">TradeTypeCell Component</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <TradeTypeCell type="full-term" />
              <TradeTypeCell type="partial-term" />
              <TradeTypeCell type="novation" />
              <TradeTypeCell type="execution" />
            </div>
          </div>

          {/* IconLeadingCell Examples */}
          <div>
            <h3 className="text-lg font-medium text-[var(--text-primary)] mb-3">IconLeadingCell Component</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <IconLeadingCell icon={IconUser} text="John Doe" />
              <IconLeadingCell icon={IconSettings} text="Configuration" />
              <IconLeadingCell icon={IconAlertCircle} text="Alert Message" />
            </div>
          </div>
        </div>
      </div>

      {/* Usage Example */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">
          Usage Example
        </h2>
        <div className="bg-[var(--bg-secondary)] p-6 rounded-lg">
          <pre className="text-sm text-[var(--text-primary)] overflow-x-auto">
            <code>{`import { DataTable, SortableColumnHeader } from '@/components/ui/data-table';
import { StatusCell, DocumentReviewState, AgedState } from '@/components/ui/status-cell';
import { TradeTypeCell, IconLeadingCell } from '@/components/ui/icon-leading-cell';

const columns: ColumnDef<Data>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <SortableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <IconLeadingCell icon={IconUser} text={row.getValue('name')} />
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <StatusCell status={row.getValue('status')} />
    ),
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => (
      <AgedState level={row.getValue('priority')} />
    ),
  },
];

<DataTable
  columns={columns}
  data={data}
  searchKey="name"
  searchPlaceholder="Search..."
  showPagination={true}
  showSearch={true}
/>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}