import {
  initArticleTable,
  seedInitialArticles,
} from "./models/articleModel.js";
import { startArticleJob } from "./services/articleJob.js";


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import articleRoutes from "./routes/articleRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());


// Routes
app.use("/api/articles", articleRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", app: "AutoMind Blog backend" });
});

// Root endpoint
app.get("/", (req, res) => {
  res.send("AutoMind Blog API is running 🚀");
});

async function start() {
  try {
    await initArticleTable();
    await seedInitialArticles();

    app.listen(PORT, () => {
      console.log(`✅ AutoMind Blog backend running on port ${PORT}`);
    });

    // cron job'u burada başlatıyoruz
    startArticleJob();
  } catch (err) {
    console.error("❌ Failed to start server", err);
    process.exit(1);
  }
}

start();