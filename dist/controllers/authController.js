"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginFailure = exports.loginSuccess = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = __importDefault(require("../config/logger")); // Import the logger
const loginSuccess = (req, res) => {
    if (!req.user) {
        logger_1.default.warn('Login success attempted without user in request.');
        return res.status(401).send('Unauthorized');
    }
    try {
        const token = jsonwebtoken_1.default.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        logger_1.default.info(`User ${req.user._id} logged in successfully.`);
        res.redirect(`/?token=${token}`);
    }
    catch (error) {
        if (error instanceof Error) {
            logger_1.default.error(`Error generating JWT for user ${req.user._id}: ${error.message}`);
            res.status(500).send('Internal Server Error');
        }
        else {
            logger_1.default.error('An unknown error occurred during login success handling');
            res.status(500).send('Internal Server Error');
        }
    }
};
exports.loginSuccess = loginSuccess;
const loginFailure = (req, res) => {
    logger_1.default.warn('Login failed');
    res.status(401).send('Login failed');
};
exports.loginFailure = loginFailure;
