const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    console.log('Viewing design system components at localhost:3000/components...');
    await page.goto('http://localhost:3000/components', { timeout: 10000, waitUntil: 'networkidle' });
    
    console.log('✓ Design system components page loaded');
    console.log('Page title:', await page.title());
    
    // Take screenshot of your design system
    await page.screenshot({ path: 'design-system-components.png', fullPage: true });
    console.log('✓ Screenshot saved as design-system-components.png');
    
    // Get all the component examples and their styling
    const componentInfo = await page.evaluate(() => {
      const components = [];
      
      // Find all buttons and their variants
      document.querySelectorAll('button').forEach((btn, i) => {
        if (i < 10) { // First 10 buttons
          const computed = window.getComputedStyle(btn);
          components.push({
            type: 'Button',
            text: btn.textContent?.trim(),
            classes: btn.className,
            styles: {
              backgroundColor: computed.backgroundColor,
              color: computed.color,
              border: computed.border,
              borderRadius: computed.borderRadius,
              padding: computed.padding
            }
          });
        }
      });
      
      // Find all cards
      document.querySelectorAll('[class*="card"]').forEach((card, i) => {
        if (i < 5) { // First 5 cards
          const computed = window.getComputedStyle(card);
          components.push({
            type: 'Card',
            classes: card.className,
            styles: {
              backgroundColor: computed.backgroundColor,
              border: computed.border,
              borderRadius: computed.borderRadius,
              padding: computed.padding,
              boxShadow: computed.boxShadow
            }
          });
        }
      });
      
      // Get all visible text content to understand the structure
      const allText = Array.from(document.querySelectorAll('*')).map(el => {
        if (el.children.length === 0 && el.textContent?.trim()) {
          return el.textContent.trim();
        }
      }).filter(Boolean).slice(0, 20);
      
      return { components, allText };
    });
    
    console.log('\n=== YOUR DESIGN SYSTEM COMPONENTS ===');
    componentInfo.components.forEach((comp, i) => {
      console.log(`${i + 1}. ${comp.type}: "${comp.text || 'N/A'}"`);
      console.log(`   Classes: ${comp.classes}`);
      console.log(`   Styles:`, comp.styles);
      console.log('');
    });
    
    console.log('\n=== PAGE CONTENT ===');
    componentInfo.allText.forEach((text, i) => {
      console.log(`${i + 1}. "${text}"`);
    });
    
  } catch (error) {
    console.log('✗ Error viewing design system:', error.message);
  } finally {
    await browser.close();
  }
})();