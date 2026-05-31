import { test } from '@playwright/test';

/**
 * Custom Logger utility for clean, readable console outputs during test execution.
 */
export const logger = {
  info: (message: string) => {
    const timestamp = new Date().toISOString();
    console.log(`\x1b[34m[INFO] [${timestamp}]\x1b[0m ${message}`);
  },
  
  error: (message: string, error?: any) => {
    const timestamp = new Date().toISOString();
    console.error(`\x1b[31m[ERROR] [${timestamp}]\x1b[0m ${message}`);
    if (error) console.error(error);
  },

  warn: (message: string) => {
    const timestamp = new Date().toISOString();
    console.warn(`\x1b[33m[WARN] [${timestamp}]\x1b[0m ${message}`);
  },

  /**
   * Integrates logging directly into the Playwright HTML report steps.
   */
  step: async (name: string, box: () => Promise<void>) => {
    await test.step(name, box);
  }
};

/**
 * Utility class for common helper functions used across tests.
 */
export class Utils {
  
  /**
   * Generates a random string of a specified length. 
   * Perfect for generating unique usernames, titles, or form inputs.
   */
  static generateRandomString(length: number = 8): string {
    const hexChars = '0123456789abcdef';
    let result = '';

    for (let i = 0; i < length; i += 1) {
      result += hexChars[Math.floor(Math.random() * hexChars.length)];
    }

    return result;
  }

  /**
   * Generates a random email address.
   */
  static generateRandomEmail(domain: string = 'qa.com'): string {
    return `testuser_${this.generateRandomString(5)}@${domain}`;
  }

  /**
   * Pauses execution for a specified number of milliseconds.
   * Use sparingly! (Prefer Playwright's built-in auto-waiting over hard sleeps).
   */
  static async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Formats a Date object into a readable string (YYYY-MM-DD).
   */
  static formatDate(date: Date = new Date()): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Retries an async function a specific number of times before failing.
   * Useful for handling flaky third-party APIs or database connections.
   */
  static async retry<T>(
    fn: () => Promise<T>, 
    retries: number = 3, 
    delayMs: number = 1000
  ): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      if (retries <= 1) {
        throw error;
      }
      logger.warn(`Operation failed. Retrying in ${delayMs}ms... (${retries - 1} retries left)`);
      await this.delay(delayMs);
      return this.retry(fn, retries - 1, delayMs);
    }
  }
}