import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";

dotenv.config(); //loads variables from .env

const app = express();

app.use(cors({
  origin: "http://localhost:3000", // your Vite frontend
  credentials: true,
}));
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use("/api/auth", authRoutes);

// health check
app.get("/", (req, res) => {
  res.send("EduQuest backend is running");
});

// error handling middleware (optional but good practice)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});