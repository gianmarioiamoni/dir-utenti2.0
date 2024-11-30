import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";

import { setupSwagger } from "./config/swagger";

import dotenv from "dotenv";
dotenv.config();

import userRoutes from "./routes/userRoutes";
import errorHandler from "./middlewares/errorHandler";

import uploadRoute from "./routes/uploadRoutes";

const app: Express = express();

// Cors: allow localhost:3000 
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));

// Middleware for JSON parsing
app.use(express.json());

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/dir-utenti";

// Routes
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoute);

// Swagger
setupSwagger(app);

// Middleware for errors handling
app.use(errorHandler); 


// Connessione al database MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      MONGODB_URI,
    );
    console.log("MONGODB_URI", MONGODB_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

export { app, connectDB };
