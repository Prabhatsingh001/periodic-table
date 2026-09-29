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
    <div className="max-w-6xl 2xl:max-w-7xl mx-auto flex flex-col gap-4 sm:gap-6 lg:gap-8">
      <div>
        <div className="flex items-center gap-2 mb-1 sm:mb-2">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-[0.15em] font-['Playfair_Display',serif]"
            style={{ color: 'var(--accent)' }}
          >
            Element Comparison
          </h1>
          <span className="text-[10px] font-['JetBrains_Mono',monospace] tracking-widest px-2 py-0.5 rounded border hidden sm:inline-block"
            style={{ borderColor: 'var(--divider)', color: 'var(--text-muted)', backgroundColor: 'var(--hover-bg)' }}
          >
            Δ ANALYSIS
          </span>
        </div>
        <p className="text-sm sm:text-base" style={{ color: 'var(--text-muted)' }}>Select up to 3 elements to view side-by-side comparative data.</p>
      </div>

      <div className="glass p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl border-t-2" style={{ borderTopColor: 'var(--accent)' }}>
        <div className="relative mb-4 sm:mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5" style={{ color: 'var(--text-muted)' }} />
            </div>
            <input
                type="text"
                placeholder="Search element to compare..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 sm:py-3 rounded-lg border
                  focus:outline-none focus:ring-2 transition-all font-medium text-sm sm:text-base"
                style={{
                  backgroundColor: 'var(--input-bg)',
                  borderColor: 'var(--input-border)',
                  color: 'var(--text-primary)',
                  '--tw-ring-color': 'var(--accent-glow)',
                }}
            />
        </div>

        {query && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                {filtered.map(el => {
                    const isSelected = selectedElements.find(e => e.symbol === el.symbol);
                    return (
                        <button
                            key={el.symbol}
                            onClick={() => toggleSelectedElement(el)}
                            className="px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold border transition-all"
                            style={isSelected ? {
                              backgroundColor: 'var(--accent)',
                              borderColor: 'var(--accent)',
                              color: '#fff',
                              boxShadow: '0 0 10px var(--accent-glow)',
                            } : {
                              backgroundColor: 'var(--hover-bg)',
                              borderColor: 'var(--divider)',
                              color: 'var(--text-secondary)',
                            }}
                        >
                            <span className="hidden sm:inline">{el.name} ({el.symbol})</span>
                            <span className="sm:hidden">{el.symbol}</span>
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
