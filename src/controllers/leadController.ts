import { Request, Response } from 'express';
import leadService from '../services/leadService';
import emailService from '../services/emailService';
import mlService from '../services/mlService';
import logger from '../config/logger';  // Import the logger

const handleError = (error: unknown, res: Response) => {
  if (error instanceof Error) {
    logger.error(error.message);  // Log the error message
    res.status(500).json({ error: error.message });
  } else {
    logger.error('An unknown error occurred');  // Log a generic error message
    res.status(500).json({ error: 'An unknown error occurred' });
  }
};

// Create a new lead
export const createLead = async (req: Request, res: Response) => {
  try {
    const lead = await leadService.createLead(req.body);
    logger.info(`Lead created: ${lead._id}`);  // Log lead creation
    res.status(201).json(lead);
  } catch (error) {
    handleError(error, res);
  }
};

// Get all leads
export const getLeads = async (req: Request, res: Response) => {
  try {
    const leads = await leadService.getAllLeads();
    logger.info('Fetched all leads');  // Log fetching leads
    res.status(200).json(leads);
  } catch (error) {
    handleError(error, res);
  }
};

// Get a single lead by ID
export const getLeadById = async (req: Request, res: Response) => {
  try {
    const lead = await leadService.getLeadById(req.params.id);
    if (!lead) {
      logger.warn(`Lead not found: ${req.params.id}`);  // Log lead not found
      return res.status(404).json({ message: 'Lead not found' });
    }
    logger.info(`Fetched lead: ${req.params.id}`);  // Log fetching a lead
    res.status(200).json(lead);
  } catch (error) {
    handleError(error, res);
  }
};

// Update a lead by ID
export const updateLead = async (req: Request, res: Response) => {
  try {
    const lead = await leadService.updateLead(req.params.id, req.body);
    if (!lead) {
      logger.warn(`Lead not found for update: ${req.params.id}`);  // Log lead not found for update
      return res.status(404).json({ message: 'Lead not found' });
    }
    logger.info(`Updated lead: ${req.params.id}`);  // Log lead update
    res.status(200).json(lead);
  } catch (error) {
    handleError(error, res);
  }
};

// Delete a lead by ID
export const deleteLead = async (req: Request, res: Response) => {
  try {
    const lead = await leadService.deleteLead(req.params.id);
    if (!lead) {
      logger.warn(`Lead not found for deletion: ${req.params.id}`);  // Log lead not found for deletion
      return res.status(404).json({ message: 'Lead not found' });
    }
    logger.info(`Deleted lead: ${req.params.id}`);  // Log lead deletion
    res.status(200).json({ message: 'Lead deleted successfully' });
  } catch (error) {
    handleError(error, res);
  }
};

// Score a lead
export const scoreLead = async (req: Request, res: Response) => {
  try {
    const lead = await leadService.getLeadById(req.params.id);
    if (!lead) {
      logger.warn(`Lead not found for scoring: ${req.params.id}`);  // Log lead not found for scoring
      return res.status(404).json({ message: 'Lead not found' });
    }
    const score = await mlService.scoreLead(lead);
    logger.info(`Scored lead: ${req.params.id} with score ${score}`);  // Log lead scoring
    res.status(200).json({ score });
  } catch (error) {
    handleError(error, res);
  }
};

// Send a personalized email to a lead
export const sendEmailToLead = async (req: Request, res: Response) => {
  try {
    const lead = await leadService.getLeadById(req.params.id);
    if (!lead) {
      logger.warn(`Lead not found for sending email: ${req.params.id}`);  // Log lead not found for sending email
      return res.status(404).json({ message: 'Lead not found' });
    }
    await emailService.sendPersonalizedEmail(
      lead,
      req.body.subject,
      req.body.content
    );
    logger.info(`Email sent to lead: ${req.params.id}`);  // Log email sent
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    handleError(error, res);
  }
};
