import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import TroubleshootWizard from './components/Troubleshoot';
import CommandReference from './components/CommandReference';
import KnowledgeBase from './components/KnowledgeBase';
import './styles/Global.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/troubleshoot" element={<TroubleshootWizard />} />
          <Route path="/commands" element={<CommandReference />} />
          <Route path="/knowledge-base" element={<KnowledgeBase />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;