import { useState, useEffect } from 'react';
import { fetchKBArticles, fetchKBArticle, fetchKBCategories } from '../utils/api';
import '../styles/KnowledgeBase.css';

function KnowledgeBase() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    loadArticles();
  }, [searchTerm, selectedCategory, selectedDifficulty]);

  const loadInitialData = async () => {
    try {
      const [articlesRes, categoriesRes] = await Promise.all([
        fetchKBArticles(),
        fetchKBCategories()
      ]);
      
      if (articlesRes.status === 'success') {
        setArticles(articlesRes.data);
      }
      if (categoriesRes.status === 'success') {
        setCategories(categoriesRes.data);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadArticles = async () => {
    try {
      const filters = {};
      if (searchTerm) filters.search = searchTerm;
      if (selectedCategory !== 'all') filters.category = selectedCategory;
      if (selectedDifficulty !== 'all') filters.difficulty = selectedDifficulty;

      const response = await fetchKBArticles(filters);
      if (response.status === 'success') {
        setArticles(response.data);
      }
    } catch (error) {
      console.error('Failed to load articles:', error);
    }
  };

  const openArticle = async (articleId) => {
    try {
      const response = await fetchKBArticle(articleId);
      if (response.status === 'success') {
        setSelectedArticle(response.data);
      }
    } catch (error) {
      console.error('Failed to load article:', error);
    }
  };

  const closeArticle = () => {
    setSelectedArticle(null);
  };

  const getDifficultyBadge = (difficulty) => {
    const colors = {
      beginner: '#10b981',
      intermediate: '#f59e0b',
      advanced: '#ef4444'
    };
    return <span className="difficulty-badge" style={{ background: colors[difficulty] }}>{difficulty}</span>;
  };

  if (loading) {
    return (
      <div className="page">
        <div className="container">
          <p style={{ textAlign: 'center', padding: '60px 0' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (selectedArticle) {
    return (
      <div className="page">
        <div className="container">
          <button onClick={closeArticle} className="back-btn-kb">← Back to articles</button>
          
          <div className="article-detail">
            <div className="article-header">
              <h1>{selectedArticle.title}</h1>
              <div className="article-meta">
                {getDifficultyBadge(selectedArticle.difficulty)}
                <span className="category-label">{selectedArticle.category}</span>
              </div>
            </div>

            <p className="article-description">{selectedArticle.description}</p>

            <div className="article-content">
              {selectedArticle.content.overview && (
                <div className="content-section">
                  <h3>Overview</h3>
                  <p>{selectedArticle.content.overview}</p>
                </div>
              )}

              {selectedArticle.content.symptoms && selectedArticle.content.symptoms.length > 0 && (
                <div className="content-section">
                  <h3>Symptoms</h3>
                  <ul>
                    {selectedArticle.content.symptoms.map((symptom, index) => (
                      <li key={index}>{symptom}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedArticle.content.causes && selectedArticle.content.causes.length > 0 && (
                <div className="content-section">
                  <h3>Common Causes</h3>
                  <ul>
                    {selectedArticle.content.causes.map((cause, index) => (
                      <li key={index}>{cause}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedArticle.content.solutions && selectedArticle.content.solutions.length > 0 && (
                <div className="content-section">
                  <h3>Solutions</h3>
                  <ol>
                    {selectedArticle.content.solutions.map((solution, index) => (
                      <li key={index}>{solution}</li>
                    ))}
                  </ol>
                </div>
              )}

              {selectedArticle.content.prevention && selectedArticle.content.prevention.length > 0 && (
                <div className="content-section">
                  <h3>Prevention</h3>
                  <ul>
                    {selectedArticle.content.prevention.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedArticle.content.relatedCommands && selectedArticle.content.relatedCommands.length > 0 && (
                <div className="content-section">
                  <h3>Related Commands</h3>
                  <div className="related-commands">
                    {selectedArticle.content.relatedCommands.map((cmd, index) => (
                      <code key={index} className="command-tag">{cmd}</code>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {selectedArticle.tags && selectedArticle.tags.length > 0 && (
              <div className="article-tags">
                <strong>Tags:</strong>
                {selectedArticle.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <h1>Knowledge Base</h1>
        <p className="page-subtitle">Common issues and solutions</p>

        <div className="kb-filters">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div className="articles-grid">
          {articles.map(article => (
            <div
              key={article.id}
              className="article-card"
              onClick={() => openArticle(article.id)}
            >
              <div className="article-card-header">
                <h3>{article.title}</h3>
                {getDifficultyBadge(article.difficulty)}
              </div>
              <p className="article-card-description">{article.description}</p>
              <div className="article-card-footer">
                <span className="category-badge">{article.category}</span>
                <span className="read-more">Read more →</span>
              </div>
            </div>
          ))}
        </div>

        {articles.length === 0 && (
          <p style={{ textAlign: 'center', color: '#666', padding: '40px 0' }}>
            No articles found
          </p>
        )}
      </div>
    </div>
  );
}

export default KnowledgeBase;