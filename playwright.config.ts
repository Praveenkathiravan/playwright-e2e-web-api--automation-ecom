import { defineConfig, devices } from '@playwright/test';
import * as fs from 'fs';
import { urls } from './configuration/config';

// Load dotenv if available; allow running without the package installed.
let dotenv: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  dotenv = require('dotenv');
} catch (e) {
  // dotenv not installed — continue without loading .env files
  dotenv = null;
}



const Environment = process.env.ENVIRONMENT ||"QA";
const REGION = process.env.REGION ||"IN";
const envFile=`./environment/${Environment}/.env.${REGION}`;


if (fs.existsSync(envFile) && dotenv) {
  dotenv.config({ path: envFile });
} else if (dotenv) {
  dotenv.config();
}
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    ['allure-playwright', { detail: true, outputFolder: 'allure-results', suiteTitle: true }],
    ['junit', { outputFile: 'test-results/results.xml' }],
    ['html', { open: 'never' }],
  ],
  
  use: {
    // Highly recommended for Allure: automatically capture traces and screenshots on failure
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    baseURL: urls.basePath,
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
