import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import logger from '../config/logger';

export const scrapeWebsiteForLeads = async (url: string) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const content = await page.content();
    const $ = cheerio.load(content);

    const leads: { name: string; email: string }[] = [];

    $('.lead-item').each((_index, element) => {
      const name = $(element).find('.lead-name').text();
      const email = $(element).find('.lead-email').text();
      leads.push({ name, email });
    });

    await browser.close();
    return leads;
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error scraping website: ${error.message}`);
      throw new Error('Failed to scrape website');
    } else {
      logger.error('An unknown error occurred during web scraping');
      throw new Error('An unknown error occurred during web scraping');
    }
  }
};
