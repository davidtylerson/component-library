export interface DisputedDocument {
  trade_id: string;
  counterparty_ref: string;
  comment: string;
}

export interface DisputeMultipleProps {
  organization_name: string;
  disputedDocuments: DisputedDocument[];
} 