import pool from "./db.js";

function mapArticle(row) {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    // created_at kolonunu frontend'e createdAt olarak gönderiyoruz
    createdAt:
      row.created_at instanceof Date
        ? row.created_at.toISOString()
        : row.created_at,
  };
}

export async function initArticleTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS articles (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
  console.log("✅ articles table is ready");
}

export async function seedInitialArticles() {
  const { rows } = await pool.query(
    `SELECT COUNT(*)::int AS count FROM articles;`
  );
  const count = rows[0]?.count || 0;

  if (count > 0) {
    console.log(`ℹ️ articles table already has ${count} rows, skipping seed.`);
    return;
  }

  const seedData = [
    {
      title: "Welcome to AutoMind Blog",
      content: "This is the first demo article of AutoMind Blog.",
    },
    {
      title: "AI-powered content generation",
      content: "AutoMind Blog uses AI to generate articles automatically.",
    },
    {
      title: "Daily auto-generated articles",
      content: "Every day a new article is created via a scheduled job.",
    },
  ];

  for (const article of seedData) {
    await pool.query(
      `INSERT INTO articles (title, content) VALUES ($1, $2);`,
      [article.title, article.content]
    );
  }

  console.log("🌱 Seeded initial articles (3 rows).");
}

export async function getAllArticles() {
  const { rows } = await pool.query(
    `SELECT id, title, content, created_at FROM articles ORDER BY created_at DESC;`
  );
  return rows.map(mapArticle);
}

export async function getArticleById(id) {
  const { rows } = await pool.query(
    `SELECT id, title, content, created_at FROM articles WHERE id = $1;`,
    [id]
  );
  if (!rows[0]) return null;
  return mapArticle(rows[0]);
}

export async function createArticle({ title, content }) {
  const { rows } = await pool.query(
    `INSERT INTO articles (title, content) VALUES ($1, $2)
     RETURNING id, title, content, created_at;`,
    [title, content]
  );
  return mapArticle(rows[0]);
}