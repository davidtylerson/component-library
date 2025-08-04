export interface TableRow {
  field: string;
  value: string;
  counterparty: string;
}

export interface TableGroup {
  groupName?: string;
  rows: TableRow[];
}

export interface AffirmationProps {
  counterparty_name: string;
  organization_name: string;
  trade_date: string;
  tableGroups: TableGroup[];
} 