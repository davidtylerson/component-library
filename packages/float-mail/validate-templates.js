// Simple validation script to test template data binding
const testData = {
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
};

console.log('DisputeMultiple Test Data:');
console.log(JSON.stringify(testData, null, 2));
console.log('\n✅ Test data is valid JSON');
console.log('📋 Copy this into the JSON editor for DisputeMultiple template');
console.log('🔍 Verify that:');
console.log('  - Organization name "Acme Corp" appears in the email');
console.log('  - Table shows both TXN-12345 and TXN-12346 trade IDs');
console.log('  - Both counterparty references appear in the table');
console.log('  - Both comments appear in the table');
console.log('  - Table is properly formatted with headers');

// Test other critical templates
const otherTemplates = {
  DisputeConfirm: {
    organization_name: 'Acme Corp',
    message: 'The trade details provided do not match our records.',
    product_type: 'FX Forward',
    trade_id: 'TXN-12345',
    counterparty_ref: 'REF-2024-001',
    trade_date: '2024-01-15',
    confirmation_date: '2024-01-16',
  },
  ReturnConfirmTable: {
    organization_name: 'Acme Corp',
    table_fields: [
      { label: 'Trade ID', value: 'TXN-12345' },
      { label: 'Amount', value: '$10,000.00' },
    ],
  },
};

console.log('\n🧪 Additional Test Cases:');
Object.entries(otherTemplates).forEach(([name, data]) => {
  console.log(`\n${name}:`);
  console.log(JSON.stringify(data, null, 2));
});

console.log('\n🚀 Manual Testing Steps:');
console.log('1. Open http://localhost:3004 in browser');
console.log('2. Select "DisputeMultiple" from left sidebar');
console.log('3. Paste the test data above into JSON editor');
console.log('4. Verify email preview shows actual data, not {{placeholders}}');
console.log('5. Repeat for other templates');
