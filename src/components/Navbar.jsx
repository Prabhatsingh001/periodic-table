import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Atom, LayoutGrid, Scale, Sparkles, Moon, Sun, History, Menu, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { TimelineModal } from './timeline/TimelineModal';

const Navbar = () => {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLink = ({ to, icon, label, onClick }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        onClick={onClick}
        className={`flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg transition-all duration-300 text-sm lg:text-base ${
          isActive 
            ? 'bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(37,99,235,0.2)]' 
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
        }`}
      >
        {icon}
        <span className="font-medium">{label}</span>
      </Link>
    );
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 glass border-b border-black/5 dark:border-white/5 shadow-lg">
      <div className="container mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 blur-md opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <Atom className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400 relative z-10" />
          </div>
          <span className="text-lg sm:text-xl font-bold tracking-wider bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            NEO<span className="font-light text-slate-700 dark:text-slate-100">TABLE</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          <NavLink to="/" icon={<LayoutGrid size={18} />} label="Table" />
          <NavLink to="/compare" icon={<Scale size={18} />} label="Compare" />
          <NavLink to="/learn" icon={<Sparkles size={18} />} label="Learn API" />
          
          <button 
             onClick={() => setIsTimelineOpen(true)}
             className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-all font-medium text-sm lg:text-base"
             aria-label="View Timeline"
          >
             <History size={18} />
             <span className="hidden lg:inline">Timeline</span>
          </button>

          <div className="w-px h-6 bg-black/10 dark:bg-white/10 mx-1 lg:mx-2"></div>
          <button 
             onClick={toggleTheme}
             className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-all"
             aria-label="Toggle Theme"
          >
             {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-1">
          <button 
             onClick={toggleTheme}
             className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-all"
             aria-label="Toggle Theme"
          >
             {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-all"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto px-3 pb-4 flex flex-col gap-1">
          <NavLink to="/" icon={<LayoutGrid size={18} />} label="Table" onClick={closeMobileMenu} />
          <NavLink to="/compare" icon={<Scale size={18} />} label="Compare" onClick={closeMobileMenu} />
          <NavLink to="/learn" icon={<Sparkles size={18} />} label="Learn API" onClick={closeMobileMenu} />
          <button 
            onClick={() => { setIsTimelineOpen(true); closeMobileMenu(); }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-all font-medium text-sm"
            aria-label="View Timeline"
          >
            <History size={18} />
            <span>Timeline</span>
          </button>
        </div>
      </div>

      {isTimelineOpen && <TimelineModal onClose={() => setIsTimelineOpen(false)} />}
    </nav>
  );
};

export default Navbar;
