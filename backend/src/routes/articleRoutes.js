import { generateArticle } from "../services/aiClient.js";
import express from "express";
import {
  getAllArticles,
  getArticleById,
  createArticle,
} from "../models/articleModel.js";

const router = express.Router();

// GET /api/articles  → tüm makaleler
router.get("/", async (req, res) => {
  try {
    const articles = await getAllArticles();
    res.json(articles);
  } catch (err) {
    console.error("Error fetching articles", err);
    res.status(500).json({ message: "Failed to fetch articles" });
  }
});

// GET /api/articles/:id → tek makale
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "Invalid article id" });
    }

    const article = await getArticleById(id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json(article);
  } catch (err) {
    console.error("Error fetching article by id", err);
    res.status(500).json({ message: "Failed to fetch article" });
  }
});

// POST /api/articles → manuel yeni makale (AI'dan bağımsız)
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "title and content are required" });
    }

    const newArticle = await createArticle({ title, content });
    res.status(201).json(newArticle);
  } catch (err) {
    console.error("Error creating article", err);
    res.status(500).json({ message: "Failed to create article" });
  }
});

// POST /api/articles/generate → new article with AI
router.post("/generate", async (req, res) => {
  try {
    const { topic } = req.body;
    const aiArticle = await generateArticle(
      topic || "AI-generated blog article about modern software engineering"
    );

    const saved = await createArticle({
      title: aiArticle.title,
      content: aiArticle.content,
    });

    res.status(201).json(saved);
  } catch (err) {
    console.error("Error generating article with AI", err);
    res
      .status(500)
      .json({ message: "Failed to generate article with AI integration" });
  }
});


export default router;