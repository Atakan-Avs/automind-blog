import fetch from "node-fetch";

const HF_API_TOKEN = process.env.HF_API_TOKEN;
const HF_MODEL_ID =
  process.env.HF_MODEL_ID || "mistralai/Mistral-7B-Instruct-v0.2";

if (!HF_API_TOKEN) {
  console.warn(
    "⚠️ HF_API_TOKEN is not set. AI article generation will fail until you configure it."
  );
}

function buildPrompt(topic) {
  return `
You are an expert technical blog writer.

Write a high-quality blog article in English about: "${topic}".

FORMAT:
- First line: only the article title (no prefix like "Title:")
- Then one blank line
- Then 3 to 6 short paragraphs as the article body.

Do NOT add anything else before or after the article.
`.trim();
}

function parseArticleText(rawText) {
  const text = rawText.trim();
  const lines = text.split("\n");

  const firstLine = lines[0] || "Untitled Article";
  const title = firstLine.replace(/^["'#*\s]+/, "").trim();

  const body = lines.slice(2).join("\n").trim() || text;

  return { title, content: body };
}

export async function generateArticle(topic = "Modern web development") {
  if (!HF_API_TOKEN) {
    throw new Error("HF_API_TOKEN is not configured");
  }

  const prompt = buildPrompt(topic);

  // NEW router endpoint
  const url = `https://router.huggingface.co/models/${HF_MODEL_ID}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: {
        max_new_tokens: 600,
        temperature: 0.7,
      },
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("❌ HuggingFace API error:", res.status, errorText);
    throw new Error(`HuggingFace API error: ${res.status}`);
  }

  const data = await res.json();

  let generatedText = "";

  if (Array.isArray(data) && data[0]?.generated_text) {
    generatedText = data[0].generated_text;
  } else if (data.generated_text) {
    generatedText = data.generated_text;
  } else {
    console.warn("⚠️ Unexpected HF response format:", data);
    generatedText = String(data);
  }

  const article = parseArticleText(generatedText);

  return {
    title: article.title,
    content: article.content,
  };
}