import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <h1>Network Support Guide</h1>
            <p className="subtitle">
            steps to help common Microsoft and network issues
            </p>
            <p style={{ fontSize: '14px', color: '#999', marginBottom: '20px' }}>
            Microsoft 365 • Windows • OneDrive • Network & Connectivity
            </p>
          <div className="hero-buttons">
            <Link to="/troubleshoot" className="btn btn-primary">
              Start troubleshooting
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;