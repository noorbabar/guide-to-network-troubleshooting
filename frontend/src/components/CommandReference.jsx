import { useState, useEffect } from 'react';
import { fetchCommands } from '../utils/api';
import '../styles/CommandReference.css';

function CommandReference() {
  const [commands, setCommands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOS, setSelectedOS] = useState('mac');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadCommands();
  }, []);

  const loadCommands = async () => {
    try {
      const response = await fetchCommands();
      if (response.status === 'success') {
        setCommands(response.data);
      }
    } catch (err) {
      setError('Failed to load commands');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const filteredCommands = commands.filter(cmd => {
    const matchesSearch = cmd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cmd.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || cmd.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(commands.map(cmd => cmd.category))];

  if (loading) {
    return (
      <div className="page">
        <div className="container">
          <p style={{ textAlign: 'center', padding: '60px 0' }}>Loading commands...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <div className="container">
          <p style={{ textAlign: 'center', padding: '60px 0', color: '#dc2626' }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <h1>Command Reference</h1>
        <p className="page-subtitle">Essential networking commands</p>

        <div className="filters">
          <input
            type="text"
            placeholder="Search commands..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <div className="filter-group">
            <label>OS:</label>
            <select value={selectedOS} onChange={(e) => setSelectedOS(e.target.value)} className="filter-select">
              <option value="windows">Windows</option>
              <option value="mac">Mac</option>
              <option value="linux">Linux</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Category:</label>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="filter-select">
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="commands-list">
          {filteredCommands.map(cmd => (
            <div key={cmd.id} className="command-card">
              <div className="command-header">
                <h3>{cmd.name}</h3>
                <span className="category-badge">{cmd.category}</span>
              </div>
              
              <p className="command-description">{cmd.description}</p>
              
              <div className="command-box">
                <code>{cmd[selectedOS]}</code>
                <button 
                  onClick={() => copyToClipboard(cmd[selectedOS])}
                  className="copy-btn"
                  title="Copy to clipboard"
                >
                  Copy
                </button>
              </div>

              <div className="command-details">
                <p><strong>Use case:</strong> {cmd.useCase}</p>
                <p><strong>How it works:</strong> {cmd.explanation}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredCommands.length === 0 && (
          <p style={{ textAlign: 'center', color: '#666', padding: '40px 0' }}>
            No commands found
          </p>
        )}
      </div>
    </div>
  );
}

export default CommandReference;