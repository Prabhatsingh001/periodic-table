import { useStore } from '../store/useStore';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useStore();

  return (
    <div className="relative flex-1 min-w-0">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: 'var(--text-muted)' }} />
      </div>
      <input
        type="text"
        placeholder="Search by name, symbol or number..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="block w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 rounded-lg border
          focus:outline-none focus:ring-2 transition-all shadow-sm font-medium text-sm sm:text-base"
        style={{
          backgroundColor: 'var(--input-bg)',
          borderColor: 'var(--input-border)',
          color: 'var(--text-primary)',
          '--tw-ring-color': 'var(--accent-glow)',
        }}
      />
    </div>
  );
};

export default SearchBar;
