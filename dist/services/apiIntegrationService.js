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
exports.fetchLeadDataFromLinkedIn = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("../config/logger"));
dotenv_1.default.config();
const linkedInAPIBaseURL = 'https://api.linkedin.com/v2';
const getAccessToken = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
            params: {
                grant_type: 'client_credentials',
                client_id: process.env.LINKEDIN_CLIENT_ID,
                client_secret: process.env.LINKEDIN_CLIENT_SECRET,
            },
        });
        return response.data.access_token;
    }
    catch (error) {
        if (error instanceof Error) {
            logger_1.default.error(`Error obtaining LinkedIn access token: ${error.message}`);
            throw new Error('Failed to obtain LinkedIn access token');
        }
        else {
            logger_1.default.error('An unknown error occurred while obtaining LinkedIn access token');
            throw new Error('An unknown error occurred while obtaining LinkedIn access token');
        }
    }
});
const fetchLeadDataFromLinkedIn = (leadId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = yield getAccessToken();
        const response = yield axios_1.default.get(`${linkedInAPIBaseURL}/people/(id:${leadId})`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    }
    catch (error) {
        if (error instanceof Error) {
            logger_1.default.error(`Error fetching lead data from LinkedIn: ${error.message}`);
            throw new Error('Failed to fetch lead data from LinkedIn');
        }
        else {
            logger_1.default.error('An unknown error occurred while fetching lead data from LinkedIn');
            throw new Error('An unknown error occurred while fetching lead data from LinkedIn');
        }
    }
});
exports.fetchLeadDataFromLinkedIn = fetchLeadDataFromLinkedIn;
