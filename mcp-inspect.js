const { spawn } = require('child_process');

async function inspectPage() {
  console.log('🔍 Connecting to MCP Playwright server...');
  
  // Connect to the MCP server and navigate to the test page
  const mcpProcess = spawn('npx', ['@playwright/mcp', '--port', '3004'], {
    stdio: ['pipe', 'pipe', 'pipe']
  });

  // Send commands to navigate and take a screenshot
  const commands = [
    { method: 'browser_navigate', params: { url: 'http://localhost:3003/test-simple' } },
    { method: 'browser_wait_for', params: { time: 2 } },
    { method: 'browser_take_screenshot', params: { filename: 'test-page-screenshot.png', fullPage: true } },
    { method: 'browser_snapshot', params: {} }
  ];

  for (const command of commands) {
    const message = JSON.stringify({
      jsonrpc: '2.0',
      id: Date.now(),
      method: command.method,
      params: command.params
    });

    mcpProcess.stdin.write(message + '\n');
    
    // Wait for response
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  mcpProcess.stdin.end();
  
  console.log('📸 Screenshot taken and saved as test-page-screenshot.png');
  console.log('🔍 Page snapshot captured for analysis');
}

inspectPage().catch(console.error); 