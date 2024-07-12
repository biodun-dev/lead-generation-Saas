"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../config/logger")); // Import the logger
const errorHandler = (err, req, res, next) => {
    if (err instanceof Error) {
        logger_1.default.error(`Error: ${err.message}`); // Log the error message
        res.status(500).json({ error: err.message });
    }
    else {
        logger_1.default.error('An unknown error occurred'); // Log a generic error message
        res.status(500).json({ error: 'An unknown error occurred' });
    }
};
exports.default = errorHandler;
