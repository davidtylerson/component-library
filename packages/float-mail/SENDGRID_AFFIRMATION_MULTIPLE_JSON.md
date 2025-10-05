# SendGrid JSON for AffirmationMultiple Template

## Correct JSON Structure

When using the AffirmationMultiple template in SendGrid, use this JSON structure:

```json
{
  "organization_name": "Acme Corp",
  "action": "Trade Affirmation",
  "trade_date": "2024-01-15",
  "trades": [
    {
      "tradeId": "32c7d92",
      "productType": "Dual Binary Option",
      "groups": [
        {
          "groupName": "Trade Terms",
          "rows": [
            { "field": "Direction", "value": "Buy" },
            { "field": "Trade Date", "value": "19-Nov-24" }
          ]
        },
        {
          "groupName": "Product Terms",
          "rows": [
            { "field": "Notional Amount", "value": "5,000,000" },
            { "field": "Notional Currency", "value": "USD" },
            { "field": "Expiration Date", "value": "20-Dec-24" },
            { "field": "Expiration Cut", "value": "New York 10:00" },
            { "field": "Expiration Time", "value": "10:00:00" },
            { "field": "Expiration Location", "value": "New York" }
          ]
        },
        {
          "groupName": "Barrier 1",
          "rows": [
            { "field": "Asset", "value": "EURUSD" },
            { "field": "Level", "value": "1.04" },
            { "field": "Event Type", "value": "Knock In" },
            { "field": "Trigger Type", "value": "Less or Equal" }
          ]
        },
        {
          "groupName": "Barrier 2",
          "rows": [
            { "field": "Asset", "value": "USDJPY" },
            { "field": "Level", "value": "150" },
            { "field": "Event Type", "value": "Knock In" },
            { "field": "Trigger Type", "value": "Less or Equal" }
          ]
        },
        {
          "groupName": "Premium Terms",
          "rows": [
            { "field": "Premium Currency", "value": "USD" },
            { "field": "Price", "value": "2.83%" },
            { "field": "Premium", "value": "141,600" },
            { "field": "Premium Payment Date", "value": "21-Nov-24" },
            { "field": "Premium Payer", "value": "Alta Capital" }
          ]
        }
      ]
    },
    {
      "tradeId": "45d8e73",
      "productType": "FX Forward",
      "groups": [
        {
          "groupName": "Trade Terms",
          "rows": [
            { "field": "Direction", "value": "Sell" },
            { "field": "Trade Date", "value": "19-Nov-24" }
          ]
        },
        {
          "groupName": "Product Terms",
          "rows": [
            { "field": "Notional Amount", "value": "10,000,000" },
            { "field": "Notional Currency", "value": "EUR" },
            { "field": "Settlement Date", "value": "22-Dec-24" },
            { "field": "Exchange Rate", "value": "1.0850" },
            { "field": "Counter Currency", "value": "USD" }
          ]
        },
        {
          "groupName": "Premium Terms",
          "rows": [
            { "field": "Premium Currency", "value": "EUR" },
            { "field": "Price", "value": "1.25%" },
            { "field": "Premium", "value": "125,000" },
            { "field": "Premium Payment Date", "value": "22-Nov-24" },
            { "field": "Premium Payer", "value": "Acme Corp" }
          ]
        }
      ]
    }
  ]
}
```

## Key Points for SendGrid

1. **Required Fields**: `organization_name`, `action`, `trade_date`, `trades`
2. **Trades Array**: Each trade must have `tradeId`, `productType`, and `groups`
3. **Groups Array**: Each group must have `groupName` and `rows`
4. **Rows Array**: Each row must have `field` and `value` (optional `counterparty`)

## SendGrid Variable Mapping

In SendGrid, map these variables:

- `organization_name` → `{{organization_name}}`
- `action` → `{{action}}`
- `trade_date` → `{{trade_date}}`
- `trades` → `{{trades}}`

## Testing

1. Copy the HTML from the HTML tab in Float Mail (clean fragment without DOCTYPE)
2. Paste it into SendGrid's HTML editor
3. Use the JSON structure above for your dynamic data
4. Test with a sample email to verify table rendering

## HTML Structure

The HTML output is now a clean fragment that includes:

- **No DOCTYPE** - SendGrid handles this automatically
- **No html/body tags** - SendGrid wraps the content
- **Clean template content** with `{{variables}}` preserved
- **Properly formatted HTML** for email clients

This ensures SendGrid can properly parse and render the template without conflicts.
