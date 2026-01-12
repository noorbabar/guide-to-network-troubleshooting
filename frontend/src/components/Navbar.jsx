import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-logo">
          <h2>Network Guide</h2>
        </Link>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/troubleshoot">Troubleshoot</Link></li>
          <li><Link to="/commands">Commands</Link></li>
          <li><Link to="/knowledge-base">Knowledge base</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;