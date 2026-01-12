import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <h1>Network Troubleshooting Guide</h1>
            <p className="subtitle">
            Diagnose and fix common network issues
            </p>
            <p style={{ fontSize: '14px', color: '#999', marginBottom: '20px' }}>
            TCP/IP • DNS • Connectivity • Performance
            </p>
          <div className="hero-buttons">
            <Link to="/troubleshoot" className="btn btn-primary">
              Start troubleshooting
            </Link>
            <Link to="/commands" className="btn">
              Commands
            </Link>
            <Link to="/knowledge-base" className="btn">
              Knowledge base
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;