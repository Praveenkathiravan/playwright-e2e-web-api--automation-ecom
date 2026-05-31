import { Page } from '@playwright/test';
import { urls } from '../configuration/config';
import { logger } from '../utils/utils';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async launchsite(): Promise<void> {
    const BASE_URL = urls.basePath;
    logger.info(`Launching site: ${BASE_URL}`);

    if (!BASE_URL) {
      logger.error('Base URL is not defined');
      throw new Error('Base URL is not defined');
    }

    await this.page.goto(BASE_URL);
    logger.info(`Navigated to ${BASE_URL}`);
  }
}
