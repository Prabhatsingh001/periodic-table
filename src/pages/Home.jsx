import SearchBar from '../components/SearchBar';
import { FilterDropdowns, CategoryLegend } from '../components/FilterPanel';
import TrendVisualizer from '../components/TrendVisualizer';
import PeriodicTable from '../components/table/PeriodicTable';

const Home = () => {
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="flex flex-col gap-3 sm:gap-4 p-3 sm:p-6 glass rounded-xl sm:rounded-2xl">
        <h1 className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-center uppercase tracking-widest">
          Explore the Elements
        </h1>

        <div className="flex flex-col sm:flex-row items-stretch gap-2 w-full max-w-2xl 2xl:max-w-3xl mx-auto">
          <SearchBar />
          <FilterDropdowns />
        </div>

        <CategoryLegend />
      </div>

      {/* Mobile hint for horizontal scroll */}
      <div className="sm:hidden text-center text-xs text-slate-400 dark:text-slate-500 -mb-2">
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
