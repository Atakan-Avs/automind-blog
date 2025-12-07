import { useEffect, useState } from "react";
import api from "../api/client";

interface Article {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

const ArticleListPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [latestArticle, setLatestArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.get<Article[]>("/api/articles");
        const data = res.data || [];

        if (data.length > 0) {
          // En güncelden eskiye doğru sırala
          const sorted = [...data].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() -
              new Date(a.createdAt).getTime()
          );

          setArticles(sorted);
          setSelectedArticle(sorted[0]); // en yeni makaleyi seç
          setLatestArticle(sorted[0]);   // header'da göstereceğimiz makale
        } else {
          setArticles([]);
          setSelectedArticle(null);
          setLatestArticle(null);
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

  const formatDate = (iso?: string) => {
    if (!iso) return "-";
    return new Date(iso).toLocaleString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const isLoading = loading;
  const hasError = !!error;
  const hasArticles = articles.length > 0;

  return (
    <div className="app-container">
      {/* ÜST BAŞLIK - her zaman ortada sabit */}
      <header className="app-header">
        <h1 className="app-title">AutoMind Blog</h1>
        <p className="app-subtitle">AI-powered, auto-generated articles</p>

        {/* Burada son AI makalesinin tarihini gösteriyoruz */}
        <p className="app-subtitle">
          {isLoading
            ? "Loading latest AI article..."
            : hasError
            ? ""
            : latestArticle
            ? `Last AI article: ${formatDate(latestArticle.createdAt)}`
            : "No AI articles generated yet."}
        </p>

        <div className="app-divider" />
      </header>

      {/* ALT LAYOUT: Sol liste / Sağ detay */}
      <main className="app-content">
        {/* SOL TARAF: MAKALE LİSTESİ */}
        <aside className="article-list">
          {isLoading && (
            <div className="detail-placeholder loading">
              Loading articles...
            </div>
          )}

          {hasError && !isLoading && (
            <div className="detail-placeholder" style={{ color: "#f97373" }}>
              {error}
            </div>
          )}

          {!isLoading &&
            !hasError &&
            hasArticles &&
            articles.map((article) => {
              const isActive = selectedArticle?.id === article.id;
              const snippet =
                article.content.length > 80
                  ? article.content.slice(0, 80) + "..."
                  : article.content;

              const created = formatDate(article.createdAt);

              return (
                <div
                  key={article.id}
                  className={
                    isActive
                      ? "article-card article-card--active"
                      : "article-card"
                  }
                  onClick={() => handleSelectArticle(article)}
                >
                  <h3 className="article-card-title">{article.title}</h3>

                  <p className="snippet">{snippet}</p>

                  <div className="article-card-meta">
                    <span className="article-chip">Article #{article.id}</span>
                    <span>{created}</span>
                  </div>
                </div>
              );
            })}

          {!isLoading && !hasError && !hasArticles && (
            <div className="detail-placeholder">No articles found.</div>
          )}
        </aside>

        {/* SAĞ TARAF: DETAY ALANI */}
        <section className="article-detail">
          {isLoading && (
            <div className="detail-placeholder loading">
              Loading article...
            </div>
          )}

          {hasError && !isLoading && (
            <div className="detail-placeholder" style={{ color: "#f97373" }}>
              {error}
            </div>
          )}

          {!isLoading && !hasError && !selectedArticle && (
            <div className="detail-placeholder">
              Select an article to read.
            </div>
          )}

          {!isLoading && !hasError && selectedArticle && (
            <>
              <div className="detail-header">
                <h2 className="detail-title">{selectedArticle.title}</h2>
                <span className="detail-badge">AI Article</span>
              </div>

              <div className="article-card-meta">
                <span>{formatDate(selectedArticle.createdAt)}</span>
              </div>

              <div className="detail-body">
                {selectedArticle.content.split("\n").map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default ArticleListPage;