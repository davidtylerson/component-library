const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    console.log('Viewing design system at localhost:3001...');
    await page.goto('http://localhost:3001', { timeout: 10000, waitUntil: 'networkidle' });
    
    console.log('✓ Design system loaded');
    console.log('Page title:', await page.title());
    
    // Take screenshot of design system
    await page.screenshot({ path: 'design-system-screenshot.png', fullPage: true });
    console.log('✓ Design system screenshot saved');
    
    // Get the actual styling and structure
    const designSystemInfo = await page.evaluate(() => {
      const getStyles = (element) => {
        const computed = window.getComputedStyle(element);
        return {
          backgroundColor: computed.backgroundColor,
          color: computed.color,
          borderRadius: computed.borderRadius,
          padding: computed.padding,
          margin: computed.margin,
          fontSize: computed.fontSize,
          fontFamily: computed.fontFamily,
          boxShadow: computed.boxShadow
        };
      };
      
      return {
        body: getStyles(document.body),
        buttons: Array.from(document.querySelectorAll('button')).slice(0, 5).map(btn => ({
          text: btn.textContent?.trim(),
          classes: btn.className,
          styles: getStyles(btn)
        })),
        cards: Array.from(document.querySelectorAll('[class*="card"]')).slice(0, 3).map(card => ({
          classes: card.className,
          styles: getStyles(card)
        })),
        pageContent: document.body.textContent.substring(0, 500)
      };
    });
    
    console.log('\n=== DESIGN SYSTEM ANALYSIS ===');
    console.log('Body styles:', designSystemInfo.body);
    console.log('\nButton examples:');
    designSystemInfo.buttons.forEach((btn, i) => {
      console.log(`${i + 1}. "${btn.text}" - Classes: ${btn.classes}`);
      console.log(`   Styles:`, btn.styles);
    });
    
    console.log('\nPage content preview:');
    console.log(designSystemInfo.pageContent);
    
  } catch (error) {
    console.log('✗ Error viewing design system:', error.message);
  } finally {
    await browser.close();
  }
})();