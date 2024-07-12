import express from "express";
import {
  createLead,
  scrapeLeads,
  getLinkedInLeadData,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  scoreLead,
  sendEmailToLead,
} from "../controllers/leadController";

import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, createLead);
router.get("/", authMiddleware, getLeads);
router.get("/:id", authMiddleware, getLeadById);
router.put("/:id", authMiddleware, updateLead);
router.delete("/:id", authMiddleware, deleteLead);
router.post("/:id/score", authMiddleware, scoreLead);
router.post("/:id/email", authMiddleware, sendEmailToLead);
router.post("/scrape", authMiddleware, scrapeLeads);
router.get("/linkedin/:leadId", authMiddleware, getLinkedInLeadData);

export default router;
