import { test, expect } from '@playwright/test';

test.describe('WorkProof Negative Cases', () => {

  test('Redirects unauthenticated users from protected routes', async ({ page }) => {
    // Try to access freelancer dashboard
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/.*\/login/);

    // Try to access client dashboard
    await page.goto('/client/verification-requests');
    await expect(page).toHaveURL(/.*\/login/);

    // Try to access admin dashboard
    await page.goto('/admin');
    await expect(page).toHaveURL(/.*\/login/);
  });

  test('Public profile handles non-existent user gracefully', async ({ page }) => {
    const response = await page.goto('/this-user-does-not-exist-12345');
    // Depending on Next.js implementation, this should be a 404
    expect(response?.status()).toBe(404);
  });

});
