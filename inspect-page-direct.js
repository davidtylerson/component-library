const { chromium } = require('playwright');

async function inspectPage() {
  console.log('🔍 Starting Playwright browser...');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    console.log('🌐 Navigating to test page...');
    await page.goto('http://localhost:3003/test-simple', { waitUntil: 'networkidle' });
    
    console.log('📸 Taking screenshot...');
    await page.screenshot({ 
      path: 'test-page-screenshot.png', 
      fullPage: true 
    });
    
    console.log('🔍 Inspecting all button styles...');
    const buttons = await page.locator('button').all();
    
    console.log(`Found ${buttons.length} buttons`);
    
    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];
      const buttonText = await button.textContent();
      const buttonStyles = await button.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          backgroundColor: computed.backgroundColor,
          color: computed.color,
          borderColor: computed.borderColor,
          classes: el.className
        };
      });
      
      console.log(`\n🔘 BUTTON ${i + 1} (${buttonText?.trim()}):`);
      console.log(`  Background: ${buttonStyles.backgroundColor}`);
      console.log(`  Text Color: ${buttonStyles.color}`);
      console.log(`  Border Color: ${buttonStyles.borderColor}`);
      console.log(`  Classes: ${buttonStyles.classes}`);
    }
    
    console.log('\n🔍 Inspecting input styles...');
    const input = await page.locator('input').first();
    const inputStyles = await input.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        backgroundColor: computed.backgroundColor,
        color: computed.color,
        borderColor: computed.borderColor,
        classes: el.className
      };
    });
    
    console.log('\n📝 INPUT:');
    console.log(`  Background: ${inputStyles.backgroundColor}`);
    console.log(`  Text Color: ${inputStyles.color}`);
    console.log(`  Border Color: ${inputStyles.borderColor}`);
    console.log(`  Classes: ${inputStyles.classes}`);
    
    console.log('\n📸 Screenshot saved as: test-page-screenshot.png');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
}

inspectPage(); 