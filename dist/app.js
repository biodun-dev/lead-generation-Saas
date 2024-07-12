"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const leadRoutes_1 = __importDefault(require("./routes/leadRoutes"));
require("./config/passportConfig");
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler")); // Import error handling middleware
const logger_1 = __importDefault(require("./config/logger"));
const swagger_1 = __importDefault(require("./config/swagger")); // Import the Swagger setup
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
app.use("/api/auth", authRoutes_1.default);
app.use("/api/leads", leadRoutes_1.default);
// Integrate Swagger
(0, swagger_1.default)(app);
mongoose_1.default
    .connect(process.env.MONGO_URI || "")
    .then(() => logger_1.default.info("MongoDB connected"))
    .catch((err) => logger_1.default.error(`MongoDB connection error: ${err.message}`));
app.use(errorHandler_1.default); // Use error handling middleware
exports.default = app;
