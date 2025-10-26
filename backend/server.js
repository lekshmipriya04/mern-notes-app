import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import noteRoutes from "./routes/noteRoutes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/notes", noteRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




