import { useState } from 'react';
import { useStore } from '../store/useStore';
import { elements } from '../data/elements';
import ComparisonTable from '../components/ComparisonTable';
import { Search } from 'lucide-react';

const Compare = () => {
  const { toggleSelectedElement, selectedElements } = useStore();
  const [query, setQuery] = useState('');

  const filtered = elements.filter(el => 
    el.name.toLowerCase().includes(query.toLowerCase()) || 
    el.symbol.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 10);

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 uppercase tracking-widest">
            Element Comparison
        </h1>
        <p className="text-slate-500 dark:text-slate-400">Select up to 3 elements to view side-by-side data.</p>
      </div>

      <div className="glass p-6 rounded-2xl border-t-4 border-t-blue-500">
        <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
                type="text"
                placeholder="Search element to compare..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 rounded-xl border
                  bg-white dark:bg-slate-900/50
                  border-slate-300 dark:border-white/10
                  text-slate-800 dark:text-slate-200
                  placeholder-slate-400 dark:placeholder-slate-500
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
            />
        </div>

        {query && (
            <div className="flex flex-wrap gap-2 mb-6">
                {filtered.map(el => {
                    const isSelected = selectedElements.find(e => e.symbol === el.symbol);
                    return (
                        <button
                            key={el.symbol}
                            onClick={() => toggleSelectedElement(el)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${
                                isSelected 
                                ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_10px_rgba(37,99,235,0.5)]' 
                                : 'bg-slate-100 dark:bg-white/5 border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
                            }`}
                        >
                            {el.name} ({el.symbol})
                        </button>
                    )
                })}
            </div>
        )}

        <ComparisonTable />
      </div>
    </div>
  );
};

export default Compare;
