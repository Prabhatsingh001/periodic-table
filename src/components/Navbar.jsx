import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Atom, LayoutGrid, Scale, Sparkles, Moon, Sun, History } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { TimelineModal } from './timeline/TimelineModal';

const Navbar = () => {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);

  const NavLink = ({ to, icon, label }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
          isActive 
            ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(37,99,235,0.2)]' 
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
        }`}
      >
        {icon}
        <span className="font-medium">{label}</span>
      </Link>
    );
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/5 shadow-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 blur-md opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <Atom className="w-8 h-8 text-blue-400 relative z-10" />
          </div>
          <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            NEO<span className="font-light text-slate-100">TABLE</span>
          </span>
        </Link>

        <div className="flex items-center gap-1 md:gap-2">
          <NavLink to="/" icon={<LayoutGrid size={18} />} label="Table" />
          <NavLink to="/compare" icon={<Scale size={18} />} label="Compare" />
          <NavLink to="/learn" icon={<Sparkles size={18} />} label="Learn API" />
          
          <button 
             onClick={() => setIsTimelineOpen(true)}
             className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-all font-medium"
             aria-label="View Timeline"
          >
             <History size={18} />
             <span className="hidden md:inline">Timeline</span>
          </button>

          <div className="w-px h-6 bg-white/10 mx-1 md:mx-2"></div>
          <button 
             onClick={toggleTheme}
             className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-all"
             aria-label="Toggle Theme"
          >
             {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
      {isTimelineOpen && <TimelineModal onClose={() => setIsTimelineOpen(false)} />}
    </nav>
  );
};

export default Navbar;
