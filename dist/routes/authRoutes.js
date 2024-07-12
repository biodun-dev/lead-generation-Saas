"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
router.get('/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/login', session: false }), authController_1.loginSuccess);
router.get('/microsoft', passport_1.default.authenticate('microsoft', { scope: ['user.read'] }));
router.get('/microsoft/callback', passport_1.default.authenticate('microsoft', { failureRedirect: '/login', session: false }), authController_1.loginSuccess);
router.get('/failure', authController_1.loginFailure);
exports.default = router;
