'use client';

import * as React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { IconUser, IconSettings, IconAlertCircle } from '@tabler/icons-react';

import { DataTable, SortableColumnHeader } from '@/components/ui/data-table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  StatusCell,
  DocumentReviewState,
  AgedState,
} from '@/components/ui/status-cell';
import {
  TradeTypeCell,
  IconLeadingCell,
} from '@/components/ui/icon-leading-cell';

// Sample data for the template gap table
interface TemplateGap {
  id: string;
  templateName: string;
  counterparty: string;
  tradeType: 'full-term' | 'partial-term' | 'novation' | 'execution';
  priority: 'high' | 'medium' | 'low';
  templateStatus:
    | 'pending'
    | 'in-progress'
    | 'completed'
    | 'cancelled'
    | 'in-dispute'
    | 'matched'
    | 'unmatched'
    | 'pending-return';
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
      <div className="whitespace-nowrap font-medium text-[var(--text-primary)]">
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
      <div className="whitespace-nowrap">
        <IconLeadingCell icon={IconUser} text={row.getValue('counterparty')} />
      </div>
    ),
  },
  {
    accessorKey: 'tradeType',
    header: 'Trade Type',
    cell: ({ row }) => (
      <div className="whitespace-nowrap">
        <TradeTypeCell type={row.getValue('tradeType')} />
      </div>
    ),
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => (
      <div className="whitespace-nowrap">
        <AgedState level={row.getValue('priority')} />
      </div>
    ),
  },
  {
    accessorKey: 'templateStatus',
    header: 'Template Status',
    cell: ({ row }) => (
      <div className="whitespace-nowrap">
        <StatusCell status={row.getValue('templateStatus')} />
      </div>
    ),
  },
  {
    accessorKey: 'documentState',
    header: 'Document State',
    cell: ({ row }) => (
      <div className="whitespace-nowrap">
        <DocumentReviewState state={row.getValue('documentState')} />
      </div>
    ),
  },
  {
    accessorKey: 'agedDays',
    header: ({ column }) => (
      <SortableColumnHeader column={column} title="Aged Days" />
    ),
    cell: ({ row }) => (
      <div className="whitespace-nowrap text-[var(--text-primary)]">
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
      <div className="whitespace-nowrap text-[var(--text-secondary)]">
        {row.getValue('lastUpdated')}
      </div>
    ),
  },
];

export default function DataTablePage() {
  const [density, setDensity] = React.useState<'compact' | 'comfortable'>(
    'compact'
  );

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-[var(--text-primary)]">
          DataTable Component
        </h1>
        <p className="text-[var(--text-secondary)]">
          A powerful data table component built with TanStack Table and styled
          with the Float Design System.
        </p>
      </div>

      {/* Main DataTable Example with Density Toggle */}
      <div className="mb-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
            Template Gap Analysis Table
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[var(--text-secondary)]">
              Density:
            </span>
            <Select
              value={density}
              onValueChange={(value: 'compact' | 'comfortable') =>
                setDensity(value)
              }
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="compact">Compact (13px)</SelectItem>
                <SelectItem value="comfortable">Comfortable (13px)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DataTable
          columns={templateGapColumns}
          data={templateGapData}
          searchKey="templateName"
          searchPlaceholder="Search templates..."
          showPagination={true}
          showSearch={true}
          density={density}
          className="min-w-[1100px]"
        />
      </div>

      {/* Table Cell Components Showcase */}
      <div className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-[var(--text-primary)]">
          Table Cell Components Showcase
        </h2>

        <div className="space-y-6">
          {/* StatusCell Examples */}
          <div>
            <h3 className="mb-3 text-lg font-medium text-[var(--text-primary)]">
              StatusCell Component
            </h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
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
            <h3 className="mb-3 text-lg font-medium text-[var(--text-primary)]">
              DocumentReviewState Component
            </h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <DocumentReviewState state="in-dispute" />
              <DocumentReviewState state="in-review" />
              <DocumentReviewState state="not-matched" />
              <DocumentReviewState state="return" />
            </div>
          </div>

          {/* AgedState Examples */}
          <div>
            <h3 className="mb-3 text-lg font-medium text-[var(--text-primary)]">
              AgedState Component (Priority Levels)
            </h3>
            <div className="flex gap-4">
              <AgedState level="high" />
              <AgedState level="medium" />
              <AgedState level="low" />
            </div>
          </div>

          {/* TradeTypeCell Examples */}
          <div>
            <h3 className="mb-3 text-lg font-medium text-[var(--text-primary)]">
              TradeTypeCell Component
            </h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <TradeTypeCell type="full-term" />
              <TradeTypeCell type="partial-term" />
              <TradeTypeCell type="novation" />
              <TradeTypeCell type="execution" />
            </div>
          </div>

          {/* IconLeadingCell Examples */}
          <div>
            <h3 className="mb-3 text-lg font-medium text-[var(--text-primary)]">
              IconLeadingCell Component
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <IconLeadingCell icon={IconUser} text="John Doe" />
              <IconLeadingCell icon={IconSettings} text="Configuration" />
              <IconLeadingCell icon={IconAlertCircle} text="Alert Message" />
            </div>
          </div>
        </div>
      </div>

      {/* Usage Example */}
      <div className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-[var(--text-primary)]">
          Usage Example
        </h2>
        <div className="rounded-lg bg-[var(--bg-secondary)] p-6">
          <pre className="overflow-x-auto text-sm text-[var(--text-primary)]">
            <code>{`import { DataTable, SortableColumnHeader } from '@/components/ui/data-table';
import { CellTrend } from '@/components/ui/table-cells';
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
  density="compact"
/>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
