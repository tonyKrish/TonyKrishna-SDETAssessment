import { test, expect } from '@playwright/test';

test('sample test', async ({ page }) => {
  await page.goto('/');
  expect(await page.title()).toBe('Basic_Test_Serve_Log_In');
});
