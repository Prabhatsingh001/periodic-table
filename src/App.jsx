import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ElementDetail from './pages/ElementDetail';
import Compare from './pages/Compare';
import Learn from './pages/Learn';

function App() {
  return (
    <Router>
      <div className="min-h-screen text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
        <Navbar />
        <main className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/element/:symbol" element={<ElementDetail />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/learn" element={<Learn />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
