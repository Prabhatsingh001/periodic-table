import SearchBar from '../components/SearchBar';
import { FilterDropdowns, CategoryLegend } from '../components/FilterPanel';
import TrendVisualizer from '../components/TrendVisualizer';
import PeriodicTable from '../components/table/PeriodicTable';

const Home = () => {
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="flex flex-col gap-3 sm:gap-4 p-3 sm:p-6 glass rounded-xl sm:rounded-2xl">
        <h1 className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-bold text-center uppercase tracking-[0.2em] font-['Playfair_Display',serif] relative inline-block mx-auto"
          style={{ color: 'var(--accent)' }}
        >
          Explore the Elements
          {/* Pencil underline scribble */}
          <svg className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4 opacity-40 dark:opacity-30 pointer-events-none" viewBox="0 0 200 20" preserveAspectRatio="none">
            <path d="M 5,10 Q 50,5 100,12 T 195,8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="300" strokeDashoffset="0" />
            <path d="M 10,14 Q 70,18 130,12 T 185,15" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
          <span className="absolute -top-3 sm:-top-4 -right-12 sm:-right-16 text-[9px] sm:text-[11px] font-['Playfair_Display',serif] italic opacity-50 rotate-[6deg] lowercase">
            *midterm prep!
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-center -mt-2 font-['JetBrains_Mono',monospace] tracking-widest uppercase"
          style={{ color: 'var(--text-muted)' }}
        >
          An Interactive Chemistry Atlas
        </p>

        {/* Subtle chemistry ornament divider */}
        <div className="chem-divider max-w-xs mx-auto my-0.5">
          <span className="text-[10px] font-['JetBrains_Mono',monospace] tracking-widest opacity-60">⬡ · ⚛ · ⬡</span>
        </div>

        {/* Laboratory metadata strip */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs font-['JetBrains_Mono',monospace] flex-wrap"
          style={{ color: 'var(--text-muted)' }}
        >
          <span className="px-2 py-0.5 rounded border" style={{ borderColor: 'var(--divider)', backgroundColor: 'var(--hover-bg)' }}>118 ELEMENTS</span>
          <span className="px-2 py-0.5 rounded border" style={{ borderColor: 'var(--divider)', backgroundColor: 'var(--hover-bg)' }}>7 PERIODS</span>
          <span className="px-2 py-0.5 rounded border" style={{ borderColor: 'var(--divider)', backgroundColor: 'var(--hover-bg)' }}>18 GROUPS</span>
          <span className="px-2 py-0.5 rounded border hidden sm:inline-block" style={{ borderColor: 'var(--divider)', backgroundColor: 'var(--hover-bg)' }}>BLOCKS: s, p, d, f</span>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch gap-2 w-full max-w-2xl 2xl:max-w-3xl mx-auto mt-1">
          <SearchBar />
          <FilterDropdowns />
        </div>

        <CategoryLegend />
      </div>

      {/* Mobile hint for horizontal scroll */}
      <div className="sm:hidden text-center text-xs -mb-2"
        style={{ color: 'var(--text-muted)' }}
      >
        ← Scroll horizontally to explore the table →
      </div>

      <PeriodicTable />

      <div className="glass p-3 sm:p-6 rounded-xl sm:rounded-2xl">
        <TrendVisualizer />
      </div>
    </div>
  );
};

export default Home;
