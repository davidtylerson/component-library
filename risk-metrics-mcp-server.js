#!/usr/bin/env node

const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');

class RiskMetricsMCPServer {
  constructor() {
    this.browser = null;
    this.page = null;
    this.devServer = null;
  }

  async start() {
    console.log('🚀 Starting Playwright MCP Server for Risk Metrics...');

    // Start the development server
    await this.startDevServer();

    // Wait a moment for the server to start
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Launch browser
    await this.launchBrowser();

    // Navigate to the application
    await this.navigateToApp();

    console.log('✅ Playwright MCP Server ready!');
    console.log(
      '📱 Browser window should be open showing Risk Metrics Dashboard'
    );
    console.log('🔄 The page will automatically refresh as you make changes');
  }

  async startDevServer() {
    return new Promise((resolve, reject) => {
      console.log('🔧 Starting Risk Metrics dev server on port 3001...');

      this.devServer = spawn('pnpm', ['dev', '--port', '3001'], {
        cwd: path.join(__dirname, 'packages/risk-metrics'),
        stdio: 'pipe',
        shell: true,
      });

      this.devServer.stdout.on('data', data => {
        const output = data.toString();
        console.log(`[DEV] ${output.trim()}`);

        if (output.includes('Ready') || output.includes('started server')) {
          console.log('✅ Dev server is ready!');
          resolve();
        }
      });

      this.devServer.stderr.on('data', data => {
        console.error(`[DEV ERROR] ${data.toString()}`);
      });

      this.devServer.on('error', error => {
        console.error('Failed to start dev server:', error);
        reject(error);
      });

      // Timeout after 30 seconds
      setTimeout(() => {
        if (!this.devServer.killed) {
          console.log(
            '⏰ Dev server timeout, assuming it started successfully'
          );
          resolve();
        }
      }, 30000);
    });
  }

  async launchBrowser() {
    console.log('🌐 Launching browser...');

    this.browser = await chromium.launch({
      headless: false,
      args: ['--start-maximized'],
    });

    this.page = await this.browser.newPage();

    // Set viewport to a good size for development
    await this.page.setViewportSize({ width: 1440, height: 900 });
  }

  async navigateToApp() {
    console.log('🧭 Navigating to Risk Metrics application...');

    try {
      await this.page.goto('http://localhost:3001', {
        waitUntil: 'networkidle',
      });

      console.log('✅ Successfully loaded Risk Metrics application');

      // Set up auto-refresh on file changes
      this.setupAutoRefresh();
    } catch (error) {
      console.error('❌ Failed to navigate to application:', error);
      throw error;
    }
  }

  setupAutoRefresh() {
    // Inject a script to auto-refresh when the page changes
    this.page.evaluate(() => {
      // Simple auto-refresh every 5 seconds during development
      setInterval(() => {
        window.location.reload();
      }, 5000);
    });
  }

  async stop() {
    console.log('🛑 Stopping Playwright MCP Server...');

    if (this.browser) {
      await this.browser.close();
    }

    if (this.devServer) {
      this.devServer.kill('SIGTERM');
    }

    console.log('✅ Playwright MCP Server stopped');
  }

  async takeScreenshot(filename = 'risk-metrics-screenshot.png') {
    if (this.page) {
      await this.page.screenshot({
        path: filename,
        fullPage: true,
      });
      console.log(`📸 Screenshot saved as ${filename}`);
    }
  }

  async getPageContent() {
    if (this.page) {
      return await this.page.content();
    }
    return null;
  }

  async navigateToPage(path) {
    if (this.page) {
      await this.page.goto(`http://localhost:3001${path}`, {
        waitUntil: 'networkidle',
      });
      console.log(`🧭 Navigated to ${path}`);
    }
  }

  async clickElement(selector) {
    if (this.page) {
      await this.page.click(selector);
      console.log(`🖱️ Clicked element: ${selector}`);
    }
  }

  async getElementText(selector) {
    if (this.page) {
      const text = await this.page.textContent(selector);
      console.log(`📝 Element text: ${text}`);
      return text;
    }
    return null;
  }
}

// Handle process termination
process.on('SIGINT', async () => {
  console.log('\n🛑 Received SIGINT, shutting down...');
  if (global.riskMetricsMCPServer) {
    await global.riskMetricsMCPServer.stop();
  }
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Received SIGTERM, shutting down...');
  if (global.riskMetricsMCPServer) {
    await global.riskMetricsMCPServer.stop();
  }
  process.exit(0);
});

// Start the server if this file is run directly
if (require.main === module) {
  const server = new RiskMetricsMCPServer();
  global.riskMetricsMCPServer = server;

  server.start().catch(error => {
    console.error('❌ Failed to start Playwright MCP Server:', error);
    process.exit(1);
  });
}

module.exports = RiskMetricsMCPServer;
