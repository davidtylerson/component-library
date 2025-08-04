const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    console.log('Navigating to localhost:3002...');
    await page.goto('http://localhost:3002', { timeout: 10000, waitUntil: 'networkidle' });
    
    console.log('✓ Page loaded successfully');
    console.log('Page title:', await page.title());
    
    // Take a screenshot
    await page.screenshot({ path: 'email-renderer-screenshot.png', fullPage: true });
    console.log('✓ Screenshot saved as email-renderer-screenshot.png');
    
    // Get page structure
    const structure = await page.evaluate(() => {
      const getElementInfo = (element) => {
        const rect = element.getBoundingClientRect();
        return {
          tag: element.tagName.toLowerCase(),
          text: element.textContent?.substring(0, 100) || '',
          classes: element.className || '',
          visible: rect.width > 0 && rect.height > 0,
          position: { x: Math.round(rect.x), y: Math.round(rect.y), width: Math.round(rect.width), height: Math.round(rect.height) }
        };
      };
      
      return {
        header: Array.from(document.querySelectorAll('header')).map(getElementInfo),
        sidebar: Array.from(document.querySelectorAll('aside')).map(getElementInfo),
        main: Array.from(document.querySelectorAll('main')).map(getElementInfo),
        buttons: Array.from(document.querySelectorAll('button')).map(getElementInfo),
        cards: Array.from(document.querySelectorAll('[class*="card"]')).map(getElementInfo),
      };
    });
    
    console.log('\n=== PAGE STRUCTURE ===');
    console.log('Headers:', structure.header.length);
    console.log('Sidebars:', structure.sidebar.length);
    console.log('Main content:', structure.main.length);
    console.log('Buttons:', structure.buttons.length);
    console.log('Cards:', structure.cards.length);
    
    // Get visible text content
    const visibleText = await page.evaluate(() => {
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );
      
      const textNodes = [];
      let node;
      while (node = walker.nextNode()) {
        if (node.textContent.trim()) {
          textNodes.push(node.textContent.trim());
        }
      }
      return textNodes.slice(0, 20); // First 20 text elements
    });
    
    console.log('\n=== VISIBLE TEXT CONTENT ===');
    visibleText.forEach((text, i) => {
      console.log(`${i + 1}. "${text}"`);
    });
    
  } catch (error) {
    console.log('✗ Error:', error.message);
  } finally {
    await browser.close();
  }
})();