import { TemplateData } from '@/types/template-types';

export const SAMPLE_DATA: Record<string, TemplateData> = {
  Welcome: {
    sender_name: 'John Smith',
    organization_name: 'Acme Corp',
    url: 'https://float.tech/accept-invitation?token=abc123',
  },
  PasswordReset: {
    user_name: 'Jane Doe',
    reset_url: 'https://float.tech/reset-password?token=xyz789',
    expiry_hours: 24,
  },
  DisputeConfirm: {
    organization_name: 'Acme Corp',
    message:
      'The trade details provided do not match our records. Please review and confirm the transaction details.',
    product_type: 'FX Forward',
    trade_id: 'TXN-12345',
    counterparty_ref: 'REF-2024-001',
    trade_date: '2024-01-15',
    confirmation_date: '2024-01-16',
  },
  DisputeMultiple: {
    organization_name: 'Acme Corp',
    disputedDocuments: [
      {
        trade_id: 'TXN-12345',
        counterparty_ref: 'REF-2024-001',
        comment: 'Trade amount mismatch - expected $10,000, received $9,500',
      },
      {
        trade_id: 'TXN-12346',
        counterparty_ref: 'REF-2024-002',
        comment: 'Incorrect trade date - should be 2024-01-15, not 2024-01-16',
      },
    ],
  },
  ReturnConfirmSimple: {
    organization_name: 'Acme Corp',
    trade_id: 'TXN-12345',
    counterparty_ref: 'REF-2024-001',
    trade_date: '2024-01-15',
    amount: '$10,000.00',
    currency: 'USD',
  },
  ReturnConfirmTable: {
    organization_name: 'Acme Corp',
    table_fields: [
      { label: 'Trade ID', value: 'TXN-12345' },
      { label: 'Counterparty', value: 'Acme Corp' },
      { label: 'Trade Date', value: '2024-01-15' },
      { label: 'Amount', value: '$10,000.00' },
      { label: 'Currency', value: 'USD' },
      { label: 'Settlement Date', value: '2024-01-17' },
    ],
  },
  Affirmation: {
    organization_name: 'Acme Corp',
    action: 'Trade Affirmation',
    trade_date: '2024-01-15',
    groups: [
      {
        groupName: 'Trade Terms',
        rows: [
          { field: 'Direction', value: 'Buy' },
          { field: 'Trade Date', value: '19-Nov-24' },
        ],
      },
      {
        groupName: 'Product Terms',
        rows: [
          { field: 'Notional Amount', value: '5,000,000' },
          { field: 'Notional Currency', value: 'USD' },
          { field: 'Expiration Date', value: '20-Dec-24' },
          { field: 'Expiration Cut', value: 'New York 10:00' },
          { field: 'Expiration Time', value: '10:00:00' },
          { field: 'Expiration Location', value: 'New York' },
        ],
      },
      {
        groupName: 'Barrier 1',
        rows: [
          { field: 'Asset', value: 'EURUSD' },
          { field: 'Level', value: '1.04' },
          { field: 'Event Type', value: 'Knock In' },
          { field: 'Trigger Type', value: 'Less or Equal' },
        ],
      },
      {
        groupName: 'Barrier 2',
        rows: [
          { field: 'Asset', value: 'USDJPY' },
          { field: 'Level', value: '150' },
          { field: 'Event Type', value: 'Knock In' },
          { field: 'Trigger Type', value: 'Less or Equal' },
        ],
      },
      {
        groupName: 'Premium Terms',
        rows: [
          { field: 'Premium Currency', value: 'USD' },
          { field: 'Price', value: '2.83%' },
          { field: 'Premium', value: '141,600' },
          { field: 'Premium Payment Date', value: '21-Nov-24' },
          { field: 'Premium Payer', value: 'Alta Capital' },
        ],
      },
    ],
  },
  AffirmationMultiple: {
    organization_name: 'Acme Corp',
    action: 'Trade Affirmation',
    trade_date: '2024-01-15',
    trades: [
      {
        tradeId: '32c7d92',
        productType: 'Dual Binary Option',
        groups: [
          {
            groupName: 'Trade Terms',
            rows: [
              { field: 'Direction', value: 'Buy' },
              { field: 'Trade Date', value: '19-Nov-24' },
            ],
          },
          {
            groupName: 'Product Terms',
            rows: [
              { field: 'Notional Amount', value: '5,000,000' },
              { field: 'Notional Currency', value: 'USD' },
              { field: 'Expiration Date', value: '20-Dec-24' },
              { field: 'Expiration Cut', value: 'New York 10:00' },
              { field: 'Expiration Time', value: '10:00:00' },
              { field: 'Expiration Location', value: 'New York' },
            ],
          },
          {
            groupName: 'Barrier 1',
            rows: [
              { field: 'Asset', value: 'EURUSD' },
              { field: 'Level', value: '1.04' },
              { field: 'Event Type', value: 'Knock In' },
              { field: 'Trigger Type', value: 'Less or Equal' },
            ],
          },
          {
            groupName: 'Barrier 2',
            rows: [
              { field: 'Asset', value: 'USDJPY' },
              { field: 'Level', value: '150' },
              { field: 'Event Type', value: 'Knock In' },
              { field: 'Trigger Type', value: 'Less or Equal' },
            ],
          },
          {
            groupName: 'Premium Terms',
            rows: [
              { field: 'Premium Currency', value: 'USD' },
              { field: 'Price', value: '2.83%' },
              { field: 'Premium', value: '141,600' },
              { field: 'Premium Payment Date', value: '21-Nov-24' },
              { field: 'Premium Payer', value: 'Alta Capital' },
            ],
          },
        ],
      },
      {
        tradeId: '45d8e73',
        productType: 'FX Forward',
        groups: [
          {
            groupName: 'Trade Terms',
            rows: [
              { field: 'Direction', value: 'Sell' },
              { field: 'Trade Date', value: '19-Nov-24' },
            ],
          },
          {
            groupName: 'Product Terms',
            rows: [
              { field: 'Notional Amount', value: '10,000,000' },
              { field: 'Notional Currency', value: 'EUR' },
              { field: 'Settlement Date', value: '22-Dec-24' },
              { field: 'Exchange Rate', value: '1.0850' },
              { field: 'Counter Currency', value: 'USD' },
            ],
          },
          {
            groupName: 'Premium Terms',
            rows: [
              { field: 'Premium Currency', value: 'EUR' },
              { field: 'Price', value: '1.25%' },
              { field: 'Premium', value: '125,000' },
              { field: 'Premium Payment Date', value: '22-Nov-24' },
              { field: 'Premium Payer', value: 'Acme Corp' },
            ],
          },
        ],
      },
    ],
  },
  EmailComponents: {
    table_fields: [
      { label: 'Component', value: 'Status' },
      { label: 'Typography', value: '✅ Complete' },
      { label: 'Spacing', value: '✅ Complete' },
      { label: 'Layout', value: '✅ Complete' },
      { label: 'Interactive', value: '✅ Complete' },
    ],
    grouped_data: [
      {
        groupName: 'Layout Components',
        rows: [
          {
            field: 'EmailLayout',
            value: 'Main wrapper',
            counterparty: 'Available',
          },
          {
            field: 'Header',
            value: 'Float branding',
            counterparty: 'Available',
          },
          { field: 'Footer', value: 'Company info', counterparty: 'Available' },
        ],
      },
      {
        groupName: 'Typography Components',
        rows: [
          {
            field: 'PageTitle',
            value: 'Large headings',
            counterparty: 'Available',
          },
          {
            field: 'BodyText',
            value: 'Standard text',
            counterparty: 'Available',
          },
          {
            field: 'CaptionText',
            value: 'Small text',
            counterparty: 'Available',
          },
        ],
      },
    ],
  },
  TradeFileError: {
    errorMessage:
      'Fatal Error - Trade 180137495 on row 35 failed due to No notional amount defined for live trade\nFatal Error - Trade 128378 is a novation without the original record',
    status: 'Success',
    rowsProcessed: 34,
    totalRows: 101,
    tradeStatuses: [
      { tradeIdentifier: '172376273', success: true },
      {
        tradeIdentifier: '172376274',
        success: false,
        reason: 'Novated trade',
      },
    ],
    file: 'trade_file_20241223.csv',
    date: '23 Dec 2024',
    url: 'https://app.float.tech/documents/docid',
  },
};

export const TEMPLATE_INFO: Record<string, Record<string, unknown>> = {
  Welcome: {
    displayName: 'Welcome Email',
    description: 'Welcome new users to the platform',
    variables: [
      {
        name: 'sender_name',
        type: 'string',
        required: true,
        description: 'Name of the person sending the invitation',
      },
      {
        name: 'organization_name',
        type: 'string',
        required: true,
        description: 'Name of the organization',
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: 'Invitation acceptance URL',
      },
    ],
  },
  PasswordReset: {
    displayName: 'Password Reset',
    description: 'Password reset confirmation email',
    variables: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: 'Password reset URL',
      },
    ],
  },
  DisputeConfirm: {
    displayName: 'Dispute Confirmation',
    description: 'Dispute confirmation notification',
    variables: [
      {
        name: 'organization_name',
        type: 'string',
        required: true,
        description: 'Organization name',
      },
      {
        name: 'message',
        type: 'string',
        required: true,
        description: 'Dispute message',
      },
      {
        name: 'product_type',
        type: 'string',
        required: true,
        description: 'Product type',
      },
      {
        name: 'trade_id',
        type: 'string',
        required: true,
        description: 'Trade identifier',
      },
      {
        name: 'counterparty_ref',
        type: 'string',
        required: true,
        description: 'Counterparty reference',
      },
      {
        name: 'trade_date',
        type: 'string',
        required: true,
        description: 'Trade date',
      },
      {
        name: 'confirmation_date',
        type: 'string',
        required: true,
        description: 'Confirmation date',
      },
    ],
  },
  DisputeMultiple: {
    displayName: 'Multiple Disputes',
    description: 'Multiple dispute confirmation email',
    variables: [
      {
        name: 'organization_name',
        type: 'string',
        required: true,
        description: 'Organization name',
      },
      {
        name: 'disputedDocuments',
        type: 'array',
        required: true,
        description: 'Array of disputed documents',
      },
    ],
  },
  ReturnConfirmSimple: {
    displayName: 'Return Confirmation (Simple)',
    description: 'Simple return confirmation email',
    variables: [
      {
        name: 'return_id',
        type: 'string',
        required: true,
        description: 'Return identifier',
      },
      {
        name: 'amount',
        type: 'string',
        required: true,
        description: 'Return amount',
      },
      {
        name: 'currency',
        type: 'string',
        required: true,
        description: 'Currency code',
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: 'Return details URL',
      },
    ],
  },
  ReturnConfirmTable: {
    displayName: 'Return Confirmation (Table)',
    description: 'Return confirmation with detailed table',
    variables: [
      {
        name: 'organization_name',
        type: 'string',
        required: true,
        description: 'Organization name',
      },
      {
        name: 'table_fields',
        type: 'array',
        required: true,
        description: 'Array of table field objects',
      },
    ],
  },
  Affirmation: {
    displayName: 'Affirmation',
    description: 'Trade affirmation email with flexible grouped data structure',
    variables: [
      {
        name: 'organization_name',
        type: 'string',
        required: true,
        description: 'Organization name',
      },
      {
        name: 'action',
        type: 'string',
        required: true,
        description: 'Action type (e.g., Trade Affirmation)',
      },
      {
        name: 'trade_date',
        type: 'string',
        required: true,
        description: 'Trade execution date',
      },
      {
        name: 'groups',
        type: 'array',
        required: false,
        description: 'Array of trade data groups with fields',
      },
    ],
  },
  AffirmationMultiple: {
    displayName: 'Affirmation Multiple',
    description:
      'Multiple trade affirmations email with separate tables for each trade',
    variables: [
      {
        name: 'organization_name',
        type: 'string',
        required: true,
        description: 'Organization name',
      },
      {
        name: 'action',
        type: 'string',
        required: true,
        description: 'Action type (e.g., Trade Affirmation)',
      },
      {
        name: 'trade_date',
        type: 'string',
        required: true,
        description: 'Trade execution date',
      },
      {
        name: 'trades',
        type: 'array',
        required: true,
        description:
          'Array of trade objects with tradeId, productType, and groups',
      },
    ],
  },
  EmailComponents: {
    displayName: 'Email Components Showcase',
    description: 'Showcase of all available email components',
    variables: [
      {
        name: 'table_fields',
        type: 'array',
        required: false,
        description: 'Array of simple table field objects',
      },
      {
        name: 'grouped_data',
        type: 'array',
        required: false,
        description: 'Array of grouped table data objects',
      },
    ],
  },
  TradeFileError: {
    displayName: 'Trade File Error',
    description: 'Notification email for trade file processing errors',
    variables: [
      {
        name: 'file',
        type: 'string',
        required: true,
        description: 'Name of the trade file that encountered errors',
      },
      {
        name: 'status',
        type: 'string',
        required: true,
        description:
          'Processing status (e.g., "Success", "Partially Processed")',
      },
      {
        name: 'rowsProcessed',
        type: 'number',
        required: true,
        description: 'Number of rows successfully processed',
      },
      {
        name: 'totalRows',
        type: 'number',
        required: true,
        description: 'Total number of rows in the file',
      },
      {
        name: 'date',
        type: 'string',
        required: true,
        description: 'Date of the file processing',
      },
      {
        name: 'tradeStatuses',
        type: 'array',
        required: false,
        description:
          'Array of trade status objects with tradeIdentifier, success, and optional reason',
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: 'URL to view the error details in Float',
      },
      {
        name: 'errorMessage',
        type: 'string',
        required: false,
        description: 'Optional error message to display in a callout box',
      },
    ],
  },
};
