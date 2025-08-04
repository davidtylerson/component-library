const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    console.log('Testing connection to localhost:3002...');
    await page.goto('http://localhost:3002', { timeout: 10000 });
    
    const title = await page.title();
    console.log('✓ Successfully connected!');
    console.log('Page title:', title);
    
    const content = await page.textContent('body');
    console.log('Page content preview:', content.substring(0, 200) + '...');
    
  } catch (error) {
    console.log('✗ Failed to connect:', error.message);
  } finally {
    await browser.close();
  }
})();