import {
  initArticleTable,
  seedInitialArticles,
} from "./models/articleModel.js";
import {
  startArticleJob,
  runDailyArticleJobOnce, // ⬅️ test endpoint için eklendi
} from "./services/articleJob.js";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import articleRoutes from "./routes/articleRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Ana article route'ları
// Örnek: GET /api/articles  → liste
//        GET /api/articles/:id → detay
//        POST /api/articles    → manuel ekleme vs.
app.use("/api/articles", articleRoutes);

// 🔹 TEST ENDPOINT: Cron job'u manuel tetiklemek için
// Postman: POST http://localhost:4000/api/articles/run-daily-test
app.post("/api/articles/run-daily-test", async (req, res) => {
  try {
    const saved = await runDailyArticleJobOnce();
    return res.status(201).json({
      message: "Test daily article created",
      article: saved,
    });
  } catch (error) {
    console.error("Error running daily job test:", error);
    return res.status(500).json({ error: "Failed to run daily job test" });
  }
});

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