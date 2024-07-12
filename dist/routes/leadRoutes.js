"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const leadController_1 = require("../controllers/leadController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = express_1.default.Router();
router.post('/', authMiddleware_1.default, leadController_1.createLead);
router.get('/', authMiddleware_1.default, leadController_1.getLeads);
router.get('/:id', authMiddleware_1.default, leadController_1.getLeadById);
router.put('/:id', authMiddleware_1.default, leadController_1.updateLead);
router.delete('/:id', authMiddleware_1.default, leadController_1.deleteLead);
router.post('/:id/score', authMiddleware_1.default, leadController_1.scoreLead);
router.post('/:id/email', authMiddleware_1.default, leadController_1.sendEmailToLead);
exports.default = router;
