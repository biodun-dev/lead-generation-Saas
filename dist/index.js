"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const validateEnv_1 = require("./utils/validateEnv"); // Use named import
const app_1 = __importDefault(require("./app")); // Import the Express app
// Validate environment variables
(0, validateEnv_1.validateEnv)();
// Start the server
const port = process.env.PORT || 5000;
app_1.default.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
