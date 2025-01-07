import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {

  testDir: './tests',

  timeout: 30000,

  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3000/', 
    headless: false, 
    screenshot: 'only-on-failure', 
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],

};

export default config;
