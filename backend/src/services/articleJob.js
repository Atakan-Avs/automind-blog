// backend/src/services/articleJob.js
import cron from "node-cron";
import { generateArticle } from "./aiClient.js";
import { createArticle } from "../models/articleModel.js";

// 1) Tek seferlik job (manuel veya cron içinden kullanılacak)
export async function runDailyArticleJobOnce() {
  console.log("📝 [JOB] Generating daily article (manual/cron)...");

  const topic = "Modern web development and DevOps best practices";

  let articleData;

  try {
    // Önce gerçek AI çağrısını dene
    const aiArticle = await generateArticle(topic);

    articleData = {
      title: aiArticle?.title || "AI-generated article",
      content:
        aiArticle?.content ||
        "This is an AI-generated article about modern web development and DevOps.",
    };
  } catch (error) {
    // Eğer AI tarafı patlarsa, fallback makale oluştur
    console.error("❌ [JOB] AI generation failed, using fallback article:", error);

    const now = new Date().toLocaleString("tr-TR", {
      timeZone: "Europe/Istanbul",
      });

    articleData = {
      title: "Fallback daily article",
      content: `AI request failed, so this is a fallback article created at ${now} (Turkey time).
      
Even if the AI provider is unavailable, the system continues to create a daily entry so the frontend and cron flow can be verified.`,
    };
  }

  // DB'ye kaydet
  const saved = await createArticle({
    title: articleData.title,
    content: articleData.content,
  });

  console.log(
    `✅ [JOB] Daily article created with id=${saved.id} title="${saved.title}"`
  );

  return saved;
}

// 2) Cron'u başlatan fonksiyon
export function startArticleJob() {
  // TEST MODU: her 1 dakikada bir
  const schedule = process.env.ARTICLE_CRON_SCHEDULE || "0 8 * * *"; // her gün 08:00




  console.log(`🕒 Article cron job scheduled with: "${schedule}"`);
  console.log("🔄 Cron job initialized and waiting for schedule...");

  cron.schedule(
    schedule,
    async () => {
      try {
        console.log("📝 [CRON] Running scheduled daily article job...");
        await runDailyArticleJobOnce();
      } catch (err) {
        console.error("❌ [CRON] Failed to generate daily article:", err);
      }
    },
    {
      timezone: "Europe/Istanbul", 
    }
  );
}