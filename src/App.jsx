import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ChemistryBackground from './components/ChemistryBackground';
import Home from './pages/Home';
import ElementDetail from './pages/ElementDetail';
import Compare from './pages/Compare';
import Learn from './pages/Learn';
import Timeline from './pages/Timeline';

function App() {
  return (
    <Router>
      <div className="min-h-screen transition-colors duration-300 relative overflow-hidden"
        style={{ backgroundColor: 'var(--page-bg)', color: 'var(--text-primary)' }}
      >
        <ChemistryBackground />
        
        {/* Notebook bindings and artifacts */}
        <div className="notebook-spiral hidden sm:block"></div>
        <div className="coffee-stain top-32 -right-16 opacity-30 dark:opacity-10 hidden lg:block"></div>
        <div className="coffee-stain bottom-64 -left-20 opacity-20 dark:opacity-5 rotate-45 hidden lg:block"></div>
        
        {/* Hexagon/Benzene Scribble */}
        <svg className="doodle top-24 left-16 w-16 h-16 rotate-12 hidden md:block" viewBox="0 0 100 100">
          <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" strokeDasharray="300" strokeDashoffset="0" />
          <circle cx="50" cy="50" r="25" strokeDasharray="150" />
        </svg>

        <Navbar />
        <main className="container mx-auto px-2 sm:px-4 lg:px-6 2xl:px-8 py-3 sm:py-4 lg:py-6 max-w-[1400px] 2xl:max-w-[1800px] relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/element/:symbol" element={<ElementDetail />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/timeline" element={<Timeline />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
