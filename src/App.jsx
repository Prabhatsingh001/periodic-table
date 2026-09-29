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
        <main className="container mx-auto px-2 sm:px-4 lg:px-6 2xl:px-8 py-3 sm:py-4 lg:py-6 max-w-[1400px] 2xl:max-w-[1800px]">
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
