"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeWebsiteForLeads = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const cheerio_1 = __importDefault(require("cheerio"));
const logger_1 = __importDefault(require("../config/logger"));
const scrapeWebsiteForLeads = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const browser = yield puppeteer_1.default.launch();
        const page = yield browser.newPage();
        yield page.goto(url);
        const content = yield page.content();
        const $ = cheerio_1.default.load(content);
        const leads = [];
        $('.lead-item').each((_index, element) => {
            const name = $(element).find('.lead-name').text();
            const email = $(element).find('.lead-email').text();
            leads.push({ name, email });
        });
        yield browser.close();
        return leads;
    }
    catch (error) {
        if (error instanceof Error) {
            logger_1.default.error(`Error scraping website: ${error.message}`);
            throw new Error('Failed to scrape website');
        }
        else {
            logger_1.default.error('An unknown error occurred during web scraping');
            throw new Error('An unknown error occurred during web scraping');
        }
    }
});
exports.scrapeWebsiteForLeads = scrapeWebsiteForLeads;
