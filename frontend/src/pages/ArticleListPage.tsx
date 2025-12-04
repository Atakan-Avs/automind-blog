import { useEffect, useState } from "react";
import api from "../api/client.ts";

interface Article {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

const ArticleListPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const res = await api.get<Article[]>("/api/articles");
        setArticles(res.data);
        if (res.data.length > 0) {
          setSelectedArticle(res.data[0]); // ilk makaleyi default seç
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
  };

  if (loading) {
    return (
      <div className="page">
        <h1>AutoMind Blog</h1>
        <p>Loading articles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <h1>AutoMind Blog</h1>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="header">
        <h1>AutoMind Blog</h1>
        <p className="subtitle">AI-powered, auto-generated articles</p>
      </header>

      <div className="layout">
        {/* Sol taraf: liste */}
        <aside className="sidebar">
          <h2>Articles</h2>
          {articles.length === 0 && <p>No articles yet.</p>}
          <ul className="article-list">
            {articles.map((article) => (
              <li
                key={article.id}
                className={
                  selectedArticle?.id === article.id
                    ? "article-item active"
                    : "article-item"
                }
                onClick={() => handleSelectArticle(article)}
              >
                <h3>{article.title}</h3>
                <p className="snippet">
                  {article.content.slice(0, 80)}
                  {article.content.length > 80 ? "..." : ""}
                </p>
                <span className="date">
                  {new Date(article.createdAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Sağ taraf: detay */}
        <main className="content">
          {selectedArticle ? (
            <>
              <h2>{selectedArticle.title}</h2>
              <p className="date">
                {new Date(selectedArticle.createdAt).toLocaleString()}
              </p>
              <div className="article-body">{selectedArticle.content}</div>
            </>
          ) : (
            <p>Select an article to read.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default ArticleListPage;