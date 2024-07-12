"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnv = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const requiredEnvVars = [
    'PORT',
    'MONGO_URI',
    'JWT_SECRET',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'MICROSOFT_CLIENT_ID',
    'MICROSOFT_CLIENT_SECRET'
];
const validateEnv = () => {
    requiredEnvVars.forEach((envVar) => {
        if (!process.env[envVar]) {
            console.error(`Error: Missing required environment variable ${envVar}`);
            process.exit(1);
        }
    });
    console.log('All required environment variables are set.');
};
exports.validateEnv = validateEnv;
