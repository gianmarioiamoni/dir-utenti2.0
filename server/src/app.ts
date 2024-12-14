import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";

// import { setupSwagger } from "./config/swagger";
import { swaggerDocs, swaggerUi } from "./config/swaggerConfig";

import dotenv from "dotenv";
dotenv.config();

import userRoutes from "./routes/userRoutes";
import errorHandler from "./middlewares/errorHandler";

import uploadRoute from "./routes/uploadRoutes";

const app: Express = express();

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

// Cors: allow localhost:3000 
app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-client-id"],
  })
);

// Middleware for JSON parsing
app.use(express.json());

// Mount routes
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoute);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/dir-utenti";

app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerDocs);
});

// Middleware for errors handling
app.use(errorHandler); 



// Connessione al database MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      MONGODB_URI
    );
    console.log("MONGODB_URI", MONGODB_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

export { app, connectDB };
