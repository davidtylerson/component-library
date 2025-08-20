import { DisputeMultipleProps } from '../types/dispute-multiple';

export const disputeConfirmSampleData = {
  organization_name: 'Alta Capital',
  message: 'hello this is a message',
  table_fields: [
    { label: 'Product Type', value: 'FX Forward' },
    { label: 'Trade ID', value: '5678ABC' },
    { label: 'Counterparty Ref', value: '5678ABC' },
    { label: 'Trade Date', value: '15 SEP 2024' },
    { label: 'Confirmation Date', value: '21 SEP 2024' },
    { label: 'Settlement Date', value: '22 SEP 2024' },
    { label: 'Currency', value: 'USD' },
    { label: 'Amount', value: '$1,000,000' },
  ],
};

export const disputeMultipleSampleData: DisputeMultipleProps = {
  organization_name: 'Alta Capital',
  disputedDocuments: [
    {
      trade_id: '846815471',
      counterparty_ref: 'BFEY7R81234NGKFTND.0.1.0.1-0',
      comment: 'Your dispute comment here...',
    },
    {
      trade_id: '846815472',
      counterparty_ref: 'BFEY7R81234NGKFTND.0.1.0.1-1',
      comment: 'Another dispute comment here...',
    },
  ],
};
