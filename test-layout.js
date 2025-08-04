const { chromium } = require('playwright');

async function testLayout() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Test different viewport sizes
  const viewports = [
    { width: 1920, height: 1080, name: 'Full HD' },
    { width: 1440, height: 900, name: 'HD+' },
    { width: 1366, height: 768, name: 'HD' },
    { width: 1024, height: 768, name: 'Tablet' },
    { width: 800, height: 600, name: 'Small' }
  ];

  for (const viewport of viewports) {
    console.log(`\n🧪 Testing ${viewport.name} (${viewport.width}x${viewport.height})`);
    
    await page.setViewportSize(viewport);
    await page.goto('http://localhost:3004');
    await page.waitForLoadState('networkidle');
    
    // Check if central section is flexing properly
    const centralSection = await page.locator('.flex-1.flex.flex-col.min-w-0');
    const centralSectionBox = await centralSection.boundingBox();
    
    // Check if data sidebar is fixed width
    const dataSidebar = await page.locator('.w-[400px].flex-shrink-0');
    const dataSidebarBox = await dataSidebar.boundingBox();
    
    // Check if headers are at same level
    const centralHeader = await page.locator('.flex-1.flex.flex-col.min-w-0 .h-16.flex.items-center.border-b');
    const dataHeader = await page.locator('.w-[400px].flex-shrink-0 .h-16.flex.items-center.border-b');
    
    const centralHeaderBox = await centralHeader.boundingBox();
    const dataHeaderBox = await dataHeader.boundingBox();
    
    console.log(`  📏 Central section width: ${centralSectionBox?.width?.toFixed(0)}px`);
    console.log(`  📏 Data sidebar width: ${dataSidebarBox?.width?.toFixed(0)}px`);
    console.log(`  📏 Central header Y: ${centralHeaderBox?.y?.toFixed(0)}px`);
    console.log(`  📏 Data header Y: ${dataHeaderBox?.y?.toFixed(0)}px`);
    
    // Check if headers are at same level (within 5px tolerance)
    const headerYDiff = Math.abs((centralHeaderBox?.y || 0) - (dataHeaderBox?.y || 0));
    if (headerYDiff > 5) {
      console.log(`  ❌ Headers are NOT at same level! Difference: ${headerYDiff.toFixed(1)}px`);
    } else {
      console.log(`  ✅ Headers are at same level`);
    }
    
    // Check if central section is flexing (should be > 400px in most cases)
    if (viewport.width > 1000 && (centralSectionBox?.width || 0) < 400) {
      console.log(`  ❌ Central section is NOT flexing properly!`);
    } else {
      console.log(`  ✅ Central section is flexing properly`);
    }
    
    // Wait a moment to see the layout
    await page.waitForTimeout(2000);
  }
  
  await browser.close();
}

testLayout().catch(console.error); 