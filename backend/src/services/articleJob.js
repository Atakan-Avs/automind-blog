import cron from "node-cron";
import { generateArticle } from "./aiClient.js";
import { createArticle } from "../models/articleModel.js";

export function startArticleJob() {
  const schedule = process.env.ARTICLE_CRON_SCHEDULE || "0 8 * * *"; // her gün 08:00

  console.log(`🕒 Article cron job scheduled with: "${schedule}"`);

  cron.schedule(schedule, async () => {
    try {
      console.log("📝 [CRON] Generating daily article...");
      const topic = "Modern web development and DevOps best practices";
      const aiArticle = await generateArticle(topic);

      const saved = await createArticle({
        title: aiArticle.title,
        content: aiArticle.content,
      });

      console.log(
        `✅ [CRON] Daily article created with id=${saved.id} title="${saved.title}"`
      );
    } catch (err) {
      console.error("❌ [CRON] Failed to generate daily article:", err);
    }
  });
}