const { chromium } = require('playwright');

async function inspectPage() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('🌐 Navigating to test page...');
    await page.goto('http://localhost:3003/test-simple');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    console.log('📸 Taking screenshot...');
    await page.screenshot({ path: 'test-page-screenshot.png', fullPage: true });
    
    console.log('🔍 Inspecting button styles...');
    const button = await page.locator('button:has-text("Click Me")');
    const buttonStyles = await button.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        backgroundColor: computed.backgroundColor,
        color: computed.color,
        borderColor: computed.borderColor,
        classes: el.className
      };
    });
    
    console.log('🔍 Inspecting input styles...');
    const input = await page.locator('input[placeholder="Enter some text..."]');
    const inputStyles = await input.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        backgroundColor: computed.backgroundColor,
        color: computed.color,
        borderColor: computed.borderColor,
        classes: el.className
      };
    });
    
    console.log('🔍 Inspecting dropdown styles...');
    const dropdown = await page.locator('button[role="combobox"]');
    const dropdownStyles = await dropdown.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        backgroundColor: computed.backgroundColor,
        color: computed.color,
        borderColor: computed.borderColor,
        classes: el.className
      };
    });
    
    console.log('\n📊 COMPUTED STYLES REPORT:');
    console.log('=' * 50);
    
    console.log('\n🔘 BUTTON:');
    console.log(`   Background: ${buttonStyles.backgroundColor}`);
    console.log(`   Text Color: ${buttonStyles.color}`);
    console.log(`   Border Color: ${buttonStyles.borderColor}`);
    console.log(`   Classes: ${buttonStyles.classes}`);
    
    console.log('\n📝 INPUT:');
    console.log(`   Background: ${inputStyles.backgroundColor}`);
    console.log(`   Text Color: ${inputStyles.color}`);
    console.log(`   Border Color: ${inputStyles.borderColor}`);
    console.log(`   Classes: ${inputStyles.classes}`);
    
    console.log('\n🔽 DROPDOWN:');
    console.log(`   Background: ${dropdownStyles.backgroundColor}`);
    console.log(`   Text Color: ${dropdownStyles.color}`);
    console.log(`   Border Color: ${dropdownStyles.borderColor}`);
    console.log(`   Classes: ${dropdownStyles.classes}`);
    
    // Check CSS variables
    console.log('\n🎨 CSS VARIABLES:');
    const cssVars = await page.evaluate(() => {
      const root = document.documentElement;
      const computed = getComputedStyle(root);
      return {
        '--button-bg-primary': computed.getPropertyValue('--button-bg-primary'),
        '--button-text-primary': computed.getPropertyValue('--button-text-primary'),
        '--input-bg': computed.getPropertyValue('--input-bg'),
        '--input-text': computed.getPropertyValue('--input-text'),
        '--bg-secondary': computed.getPropertyValue('--bg-secondary'),
        '--text-primary': computed.getPropertyValue('--text-primary')
      };
    });
    
    Object.entries(cssVars).forEach(([varName, value]) => {
      console.log(`   ${varName}: ${value}`);
    });
    
    console.log('\n📸 Screenshot saved as: test-page-screenshot.png');
    console.log('\nPress any key to close the browser...');
    
    // Keep browser open for manual inspection
    await new Promise(resolve => {
      process.stdin.once('data', resolve);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
}

inspectPage(); 