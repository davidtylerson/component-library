import { test, expect } from '@playwright/test';

test.describe('Risk Metrics Dashboard', () => {
  test('should load home page with navigation', async ({ page }) => {
    await page.goto('/');

    // Check that the main title is visible
    await expect(page.getByText('Risk Metrics Dashboard')).toBeVisible();

    // Check that sidebar navigation is present
    await expect(page.getByText('Risk Overview')).toBeVisible();
    await expect(page.getByText('Risk Deep Dive')).toBeVisible();
    await expect(page.getByText('Counterparty Scorecard')).toBeVisible();
    await expect(page.getByText('Template Progress')).toBeVisible();
    await expect(page.getByText('Trading Activity')).toBeVisible();
  });

  test('should navigate to executive dashboard', async ({ page }) => {
    await page.goto('/');

    // Click on Risk Overview in the sidebar navigation
    await page.getByRole('link', { name: 'Risk Overview' }).first().click();

    // Should navigate to executive dashboard
    await expect(page).toHaveURL('/dashboard_executive');
    await expect(page.getByText('Priority Actions')).toBeVisible();
  });

  test('should navigate to template progress dashboard', async ({ page }) => {
    await page.goto('/');

    // Click on Template Progress in the sidebar navigation
    await page.getByRole('link', { name: 'Template Progress' }).first().click();

    // Should navigate to template progress dashboard
    await expect(page).toHaveURL('/dashboard_template_progress');
    await expect(
      page.getByText('Coverage & Automation Tracking')
    ).toBeVisible();
  });

  test('should have theme switcher', async ({ page }) => {
    await page.goto('/');

    // Check that theme switcher is present in sidebar footer
    await expect(page.getByText('Theme')).toBeVisible();
  });
});
