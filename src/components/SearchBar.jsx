import { useStore } from '../store/useStore';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useStore();

  return (
    <div className="relative flex-1 min-w-0">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-slate-400" />
      </div>
      <input
        type="text"
        placeholder="Search by name, symbol or number..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="block w-full pl-10 pr-3 py-2.5 rounded-xl border
          bg-white dark:bg-slate-800
          border-slate-300 dark:border-white/10
          text-slate-800 dark:text-slate-200
          placeholder-slate-400 dark:placeholder-slate-500
          focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400
          transition-all shadow-sm font-medium"
      />
    </div>
  );
};

export default SearchBar;
