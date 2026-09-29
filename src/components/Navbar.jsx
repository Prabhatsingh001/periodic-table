import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Atom, LayoutGrid, Scale, Sparkles, Moon, Sun, History, Menu, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLink = ({ to, icon, label, onClick }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        onClick={onClick}
        className={`relative flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg transition-all duration-300 text-sm lg:text-base group ${
          isActive ? '' : 'hover:opacity-80'
        }`}
        style={isActive ? {
          color: 'var(--accent)',
        } : {
          color: 'var(--text-secondary)',
        }}
      >
        {isActive && (
          <svg className="absolute -bottom-1 left-1 w-[calc(100%-8px)] h-2 pointer-events-none opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
            <path d="M 2,5 Q 50,8 98,4 T 5,9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
        {icon}
        <span className="font-medium">{label}</span>
      </Link>
    );
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 glass border-b shadow-sm" style={{ borderColor: 'var(--divider)' }}>
      <div className="container mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 blur-md opacity-30 group-hover:opacity-60 transition-opacity"
              style={{ backgroundColor: 'var(--accent)' }}
            />
            <Atom className="w-7 h-7 sm:w-8 sm:h-8 relative z-10" style={{ color: 'var(--accent)' }} />
          </div>
          <span className="text-lg sm:text-xl font-bold tracking-wider font-['Playfair_Display',serif]"
            style={{ color: 'var(--accent)' }}
          >
            NEO<span className="font-light" style={{ color: 'var(--text-primary)' }}>TABLE</span>
          </span>
          <span className="hidden sm:inline-block ml-1 text-[10px] tracking-widest px-2 py-0.5 rounded-full border font-['JetBrains_Mono',monospace]"
            style={{ borderColor: 'var(--divider)', color: 'var(--text-muted)', backgroundColor: 'var(--hover-bg)' }}
          >
            Z: 1–118
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          <NavLink to="/" icon={<LayoutGrid size={18} />} label="Table" />
          <NavLink to="/compare" icon={<Scale size={18} />} label="Compare" />
          <NavLink to="/learn" icon={<Sparkles size={18} />} label="Learn API" />
          <NavLink to="/timeline" icon={<History size={18} />} label="Timeline" />

          <div className="w-px h-6 mx-1 lg:mx-2" style={{ backgroundColor: 'var(--divider)' }} />
          <button 
             onClick={toggleTheme}
             className="p-2 rounded-lg hover:opacity-80 transition-all"
             style={{ color: 'var(--text-secondary)' }}
             aria-label="Toggle Theme"
          >
             {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-1">
          <button 
             onClick={toggleTheme}
             className="p-2 rounded-lg hover:opacity-80 transition-all"
             style={{ color: 'var(--text-secondary)' }}
             aria-label="Toggle Theme"
          >
             {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:opacity-80 transition-all"
            style={{ color: 'var(--text-secondary)' }}
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
          <NavLink to="/timeline" icon={<History size={18} />} label="Timeline" onClick={closeMobileMenu} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
