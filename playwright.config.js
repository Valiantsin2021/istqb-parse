// @ts-check
import { defineConfig } from '@playwright/test'
import 'dotenv/config'
const date = new Date().getTime()
const outputDir = `./report/${date}`
const isCI = !!process.env.CI

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  timeout: 45_000,
  expect: {
    timeout: 15_000,
    toHaveScreenshot: {
      threshold: 0.25,
      maxDiffPixelRatio: 0.025,
      maxDiffPixels: 25
    },
    toMatchSnapshot: {
      threshold: 0.25,
      maxDiffPixelRatio: 0.025,
      maxDiffPixels: 25
    }
  },
  testDir: './tests',
  testMatch: ['*.spec.js'],
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reportSlowTests: null,
  ignoreSnapshots: !isCI,
  snapshotPathTemplate: '.screenshots/{projectName}/{testFilePath}/{testName}/{arg}{ext}',
  reporter: [
    ['list', { printSteps: true }],
    [
      'monocart-reporter',
      {
        name: 'My Test Report',
        outputFile: `${outputDir}/index.html`
      }
    ],
    [
      'allure-playwright',
      {
        detail: true,
        outputFolder: './report/allure-results',
        suiteTitle: true,
        environmentInfo: {
          Environment: process.env.ENV,
          User: process.env.USER,
          NodeJS_version: process.version,
          OS: process.platform
        }
      }
    ],
    ['junit', { outputFile: `./report/playwright_${new Date().getTime()}.xml` }]
  ],
  use: {
    bypassCSP: true,
    retries: 1,
    viewport: null,
    launchOptions: { args: ['--start-maximized', '--ignore-certificate-errors', '--disable-search-engine-choice-screen'] },
    // viewport: { width: 1920, height: 1080 },
    baseURL: '',
    testIdAttribute: 'data-qa',
    headless: true,
    trace: 'on-first-retry',
    video: 'on-first-retry',
    screenshot: { mode: 'only-on-failure', fullPage: true }
  },
  projects: [
    {
      name: 'UI_tests',
      testMatch: /\w+\.ui\.spec\.js/,
      use: {
        channel: 'chrome'
      }
    },
    {
      name: 'API_tests',
      testMatch: /\w+\.api\.spec\.js/,
      use: {
        channel: 'chrome'
      }
    },
    {
      name: 'Performance_tests',
      testMatch: /\w+\.performance\.spec\.js/,
      use: {
        channel: 'chrome'
      }
    },
    {
      name: 'Visual_regression_tests',
      testMatch: /\w+\.visual\.spec\.js/,
      use: {
        channel: 'chrome'
      }
    }
  ]
})
