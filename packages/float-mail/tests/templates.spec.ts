import { test, expect } from '@playwright/test';

// Test data for each template
const testData = {
  'Welcome': {
    "sender_name": "John Smith",
    "organization_name": "Acme Corp", 
    "url": "https://float.tech/accept-invitation?token=abc123"
  },
  'PasswordReset': {
    "user_name": "Jane Doe",
    "reset_url": "https://float.tech/reset-password?token=xyz789",
    "expiry_hours": 24
  },
  'DisputeConfirm': {
    "organization_name": "Acme Corp",
    "message": "The trade details provided do not match our records. Please review and confirm the transaction details.",
    "product_type": "FX Forward",
    "trade_id": "TXN-12345",
    "counterparty_ref": "REF-2024-001",
    "trade_date": "2024-01-15",
    "confirmation_date": "2024-01-16"
  },
  'DisputeMultiple': {
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
  },
  'ReturnConfirmSimple': {
    "organization_name": "Acme Corp",
    "trade_id": "TXN-12345",
    "counterparty_ref": "REF-2024-001",
    "trade_date": "2024-01-15",
    "amount": "$10,000.00",
    "currency": "USD"
  },
  'ReturnConfirmTable': {
    "organization_name": "Acme Corp",
    "table_fields": [
      { "label": "Trade ID", "value": "TXN-12345" },
      { "label": "Counterparty", "value": "Acme Corp" },
      { "label": "Trade Date", "value": "2024-01-15" },
      { "label": "Amount", "value": "$10,000.00" },
      { "label": "Currency", "value": "USD" },
      { "label": "Settlement Date", "value": "2024-01-17" }
    ]
  },
  'Affirmation': {
    "organization_name": "Acme Corp",
    "action": "Trade Confirmation",
    "trade_id": "TXN-12345",
    "counterparty_ref": "REF-2024-001",
    "trade_date": "2024-01-15",
    "amount": "$10,000.00",
    "currency": "USD"
  },
  'EmailComponents': {
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
};

test.describe('Float Mail Templates', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3004');
    // Wait for the page to load
    await page.waitForSelector('[data-testid="template-sidebar"]', { timeout: 10000 });
  });

  Object.entries(testData).forEach(([templateName, data]) => {
    test(`${templateName} template should render with data`, async ({ page }) => {
      console.log(`Testing template: ${templateName}`);
      
      // Click on the template in sidebar
      await page.click(`text="${templateName}"`);
      
      // Wait for template to load
      await page.waitForTimeout(1000);
      
      // Clear the JSON editor and input test data
      const jsonEditor = page.locator('.monaco-editor textarea').first();
      await jsonEditor.fill(JSON.stringify(data, null, 2));
      
      // Wait for preview to update
      await page.waitForTimeout(2000);
      
      // Check if preview iframe has content
      const iframe = page.frameLocator('iframe[title="Email Preview"]');
      
      // Verify template-specific content is rendered
      switch (templateName) {
        case 'Welcome':
          await expect(iframe.locator('text=John Smith')).toBeVisible();
          await expect(iframe.locator('text=Acme Corp')).toBeVisible();
          break;
          
        case 'PasswordReset':
          await expect(iframe.locator('text=Jane Doe')).toBeVisible();
          await expect(iframe.locator('text=24 hours')).toBeVisible();
          break;
          
        case 'DisputeConfirm':
          await expect(iframe.locator('text=FX Forward')).toBeVisible();
          await expect(iframe.locator('text=TXN-12345')).toBeVisible();
          await expect(iframe.locator('text=REF-2024-001')).toBeVisible();
          break;
          
        case 'DisputeMultiple':
          await expect(iframe.locator('text=TXN-12345')).toBeVisible();
          await expect(iframe.locator('text=TXN-12346')).toBeVisible();
          await expect(iframe.locator('text=Trade amount mismatch')).toBeVisible();
          break;
          
        case 'ReturnConfirmTable':
          await expect(iframe.locator('text=Trade ID')).toBeVisible();
          await expect(iframe.locator('text=TXN-12345')).toBeVisible();
          await expect(iframe.locator('text=$10,000.00')).toBeVisible();
          break;
          
        case 'Affirmation':
          await expect(iframe.locator('text=Trade Confirmation')).toBeVisible();
          await expect(iframe.locator('text=TXN-12345')).toBeVisible();
          break;
          
        case 'EmailComponents':
          await expect(iframe.locator('text=Typography')).toBeVisible();
          await expect(iframe.locator('text=Layout Components')).toBeVisible();
          break;
      }
      
      console.log(`✅ ${templateName} template test passed`);
    });
  });

  test('JSON editor should show validation errors', async ({ page }) => {
    // Click on any template
    await page.click('text="Welcome"');
    await page.waitForTimeout(1000);
    
    // Input invalid JSON
    const jsonEditor = page.locator('.monaco-editor textarea').first();
    await jsonEditor.fill('{ invalid json }');
    
    // Wait for error to appear
    await page.waitForTimeout(1000);
    
    // Check for JSON error display
    await expect(page.locator('text=JSON Error')).toBeVisible();
  });
});