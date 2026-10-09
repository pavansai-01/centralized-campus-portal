import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import profileRoutes from "./routes/profileRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/profile", profileRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("Pavan Sai's Portfolio API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});