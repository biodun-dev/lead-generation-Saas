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
exports.getLinkedInLeadData = exports.scrapeLeads = exports.sendEmailToLead = exports.scoreLead = exports.deleteLead = exports.updateLead = exports.getLeadById = exports.getLeads = exports.createLead = void 0;
const leadService_1 = __importDefault(require("../services/leadService"));
const emailService_1 = __importDefault(require("../services/emailService"));
const mlService_1 = __importDefault(require("../services/mlService"));
const scrapingService_1 = require("../services/scrapingService");
const apiIntegrationService_1 = require("../services/apiIntegrationService");
const logger_1 = __importDefault(require("../config/logger")); // Import the logger
const handleError = (error, res) => {
    if (error instanceof Error) {
        logger_1.default.error(error.message); // Log the error message
        res.status(500).json({ error: error.message });
    }
    else {
        logger_1.default.error('An unknown error occurred'); // Log a generic error message
        res.status(500).json({ error: 'An unknown error occurred' });
    }
};
// Create a new lead
const createLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lead = yield leadService_1.default.createLead(req.body);
        logger_1.default.info(`Lead created: ${lead._id}`); // Log lead creation
        res.status(201).json(lead);
    }
    catch (error) {
        handleError(error, res);
    }
});
exports.createLead = createLead;
// Get all leads
const getLeads = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const leads = yield leadService_1.default.getAllLeads();
        logger_1.default.info('Fetched all leads'); // Log fetching leads
        res.status(200).json(leads);
    }
    catch (error) {
        handleError(error, res);
    }
});
exports.getLeads = getLeads;
// Get a single lead by ID
const getLeadById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lead = yield leadService_1.default.getLeadById(req.params.id);
        if (!lead) {
            logger_1.default.warn(`Lead not found: ${req.params.id}`); // Log lead not found
            return res.status(404).json({ message: 'Lead not found' });
        }
        logger_1.default.info(`Fetched lead: ${req.params.id}`); // Log fetching a lead
        res.status(200).json(lead);
    }
    catch (error) {
        handleError(error, res);
    }
});
exports.getLeadById = getLeadById;
// Update a lead by ID
const updateLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lead = yield leadService_1.default.updateLead(req.params.id, req.body);
        if (!lead) {
            logger_1.default.warn(`Lead not found for update: ${req.params.id}`); // Log lead not found for update
            return res.status(404).json({ message: 'Lead not found' });
        }
        logger_1.default.info(`Updated lead: ${req.params.id}`); // Log lead update
        res.status(200).json(lead);
    }
    catch (error) {
        handleError(error, res);
    }
});
exports.updateLead = updateLead;
// Delete a lead by ID
const deleteLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lead = yield leadService_1.default.deleteLead(req.params.id);
        if (!lead) {
            logger_1.default.warn(`Lead not found for deletion: ${req.params.id}`); // Log lead not found for deletion
            return res.status(404).json({ message: 'Lead not found' });
        }
        logger_1.default.info(`Deleted lead: ${req.params.id}`); // Log lead deletion
        res.status(200).json({ message: 'Lead deleted successfully' });
    }
    catch (error) {
        handleError(error, res);
    }
});
exports.deleteLead = deleteLead;
// Score a lead
const scoreLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lead = yield leadService_1.default.getLeadById(req.params.id);
        if (!lead) {
            logger_1.default.warn(`Lead not found for scoring: ${req.params.id}`); // Log lead not found for scoring
            return res.status(404).json({ message: 'Lead not found' });
        }
        const score = yield mlService_1.default.scoreLead(lead);
        logger_1.default.info(`Scored lead: ${req.params.id} with score ${score}`); // Log lead scoring
        res.status(200).json({ score });
    }
    catch (error) {
        handleError(error, res);
    }
});
exports.scoreLead = scoreLead;
// Send a personalized email to a lead
const sendEmailToLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lead = yield leadService_1.default.getLeadById(req.params.id);
        if (!lead) {
            logger_1.default.warn(`Lead not found for sending email: ${req.params.id}`); // Log lead not found for sending email
            return res.status(404).json({ message: 'Lead not found' });
        }
        yield emailService_1.default.sendPersonalizedEmail(lead, req.body.subject, req.body.content);
        logger_1.default.info(`Email sent to lead: ${req.params.id}`); // Log email sent
        res.status(200).json({ message: 'Email sent successfully' });
    }
    catch (error) {
        handleError(error, res);
    }
});
exports.sendEmailToLead = sendEmailToLead;
// Scrape leads from a website
const scrapeLeads = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const leads = yield (0, scrapingService_1.scrapeWebsiteForLeads)(req.body.url);
        logger_1.default.info('Leads scraped from website');
        res.status(200).json(leads);
    }
    catch (error) {
        handleError(error, res);
    }
});
exports.scrapeLeads = scrapeLeads;
// Get lead data from LinkedIn
const getLinkedInLeadData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const leadData = yield (0, apiIntegrationService_1.fetchLeadDataFromLinkedIn)(req.params.leadId);
        logger_1.default.info(`Fetched LinkedIn lead data for ID: ${req.params.leadId}`);
        res.status(200).json(leadData);
    }
    catch (error) {
        handleError(error, res);
    }
});
exports.getLinkedInLeadData = getLinkedInLeadData;
