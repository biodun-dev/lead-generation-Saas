require("dotenv").config();
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import passport from "passport";
import authRoutes from "./routes/authRoutes";
import leadRoutes from "./routes/leadRoutes";
import "./config/passportConfig";
import errorHandler from "./middleware/errorHandler"; // Import error handling middleware
import logger from "./config/logger";
import swaggerSetup from "./config/swagger"; // Import the Swagger setup

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

// Integrate Swagger
swaggerSetup(app);

mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => logger.info("MongoDB connected"))
  .catch((err) => logger.error(`MongoDB connection error: ${err.message}`));

app.use(errorHandler); // Use error handling middleware

export default app;
