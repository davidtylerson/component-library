const { chromium } = require('playwright');

async function testCurrent() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Listen for console messages
  page.on('console', msg => {
    console.log('Browser console:', msg.text());
  });

  // Listen for errors
  page.on('pageerror', error => {
    console.log('Page error:', error.message);
  });

  try {
    console.log('Navigating to http://localhost:3004...');
    await page.goto('http://localhost:3004');

    console.log('Waiting for page to load...');
    await page.waitForLoadState('networkidle');

    // Wait for any console messages
    await page.waitForTimeout(3000);

    console.log('Checking current state...');

    // Take a screenshot
    await page.screenshot({ path: 'current-state-test.png' });
    console.log('Screenshot saved as current-state-test.png');

    console.log('Test completed successfully!');
  } catch (error) {
    console.error('Test error:', error);
  } finally {
    await browser.close();
  }
}

testCurrent();
