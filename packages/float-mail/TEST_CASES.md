# Float Mail Template Test Cases

Test all templates with their respective JSON data formats to ensure proper rendering.

## Test Case 1: Welcome Template
```json
{
  "sender_name": "John Smith",
  "organization_name": "Acme Corp",
  "url": "https://float.tech/accept-invitation?token=abc123"
}
```

## Test Case 2: PasswordReset Template
```json
{
  "user_name": "Jane Doe",
  "reset_url": "https://float.tech/reset-password?token=xyz789",
  "expiry_hours": 24
}
```

## Test Case 3: DisputeConfirm Template
```json
{
  "organization_name": "Acme Corp",
  "message": "The trade details provided do not match our records. Please review and confirm the transaction details.",
  "product_type": "FX Forward",
  "trade_id": "TXN-12345",
  "counterparty_ref": "REF-2024-001",
  "trade_date": "2024-01-15",
  "confirmation_date": "2024-01-16"
}
```

## Test Case 4: DisputeMultiple Template (Array handling)
```json
{
  "organization_name": "Acme Corp",
  "disputedDocuments": [
    {
      "trade_id": "TXN-12345",
      "counterparty_ref": "REF-2024-001",
      "comment": "Trade amount mismatch - expected $10,000, received $9,500"
    },
    {
      "trade_id": "TXN-12346",
      "counterparty_ref": "REF-2024-002",
      "comment": "Incorrect trade date - should be 2024-01-15, not 2024-01-16"
    }
  ]
}
```

## Test Case 5: ReturnConfirmSimple Template
```json
{
  "organization_name": "Acme Corp",
  "trade_id": "TXN-12345",
  "counterparty_ref": "REF-2024-001",
  "trade_date": "2024-01-15",
  "amount": "$10,000.00",
  "currency": "USD"
}
```

## Test Case 6: ReturnConfirmTable Template (Simple Table)
```json
{
  "organization_name": "Acme Corp",
  "table_fields": [
    { "label": "Trade ID", "value": "TXN-12345" },
    { "label": "Counterparty", "value": "Acme Corp" },
    { "label": "Trade Date", "value": "2024-01-15" },
    { "label": "Amount", "value": "$10,000.00" },
    { "label": "Currency", "value": "USD" },
    { "label": "Settlement Date", "value": "2024-01-17" }
  ]
}
```

## Test Case 7: Affirmation Template
```json
{
  "organization_name": "Acme Corp",
  "action": "Trade Confirmation",
  "trade_id": "TXN-12345",
  "counterparty_ref": "REF-2024-001",
  "trade_date": "2024-01-15",
  "amount": "$10,000.00",
  "currency": "USD"
}
```

## Test Case 8: EmailComponents Template (Complex Tables)
```json
{
  "table_fields": [
    { "label": "Component", "value": "Status" },
    { "label": "Typography", "value": "✅ Complete" },
    { "label": "Spacing", "value": "✅ Complete" },
    { "label": "Layout", "value": "✅ Complete" },
    { "label": "Interactive", "value": "✅ Complete" }
  ],
  "grouped_data": [
    {
      "groupName": "Layout Components",
      "rows": [
        { "field": "EmailLayout", "value": "Main wrapper", "counterparty": "Available" },
        { "field": "Header", "value": "Float branding", "counterparty": "Available" },
        { "field": "Footer", "value": "Company info", "counterparty": "Available" }
      ]
    },
    {
      "groupName": "Typography Components",
      "rows": [
        { "field": "PageTitle", "value": "Large headings", "counterparty": "Available" },
        { "field": "BodyText", "value": "Standard text", "counterparty": "Available" },
        { "field": "CaptionText", "value": "Small text", "counterparty": "Available" }
      ]
    }
  ]
}
```

## Testing Instructions

1. Open the Float Mail application at `http://localhost:3004`
2. For each template, select it from the left sidebar
3. Copy the corresponding JSON test case above
4. Paste it into the JSON editor in the right panel
5. Verify that:
   - The JSON is valid (no red error box)
   - The email preview updates immediately
   - All data fields are populated correctly
   - Tables render properly with correct formatting
   - Arrays are handled correctly (DisputeMultiple, tables)
   - No console errors appear

## Expected Results

- All templates should render correctly with their respective data
- Tables should display with proper borders, spacing, and typography
- Complex data structures (arrays, nested objects) should be handled correctly
- Template variables should be replaced with actual data values
- Email preview should update in real-time as JSON is modified