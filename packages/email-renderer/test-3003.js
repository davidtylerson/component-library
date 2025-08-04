const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    console.log('Testing localhost:3003...');
    await page.goto('http://localhost:3003', { timeout: 10000, waitUntil: 'networkidle' });
    
    console.log('✓ Successfully connected!');
    console.log('Page title:', await page.title());
    
    // Take screenshot
    await page.screenshot({ path: 'email-renderer-final.png', fullPage: true });
    console.log('✓ Screenshot saved as email-renderer-final.png');
    
    // Get visible text
    const visibleText = await page.evaluate(() => {
      const texts = [];
      document.querySelectorAll('*').forEach(el => {
        if (el.textContent && el.children.length === 0) {
          const text = el.textContent.trim();
          if (text && text.length < 50) {
            texts.push(text);
          }
        }
      });
      return texts.slice(0, 15);
    });
    
    console.log('\n=== VISIBLE CONTENT ===');
    visibleText.forEach((text, i) => {
      console.log(`${i + 1}. "${text}"`);
    });
    
  } catch (error) {
    console.log('✗ Error:', error.message);
  } finally {
    await browser.close();
  }
})();