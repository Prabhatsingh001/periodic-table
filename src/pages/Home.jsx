import SearchBar from '../components/SearchBar';
import { FilterDropdowns, CategoryLegend } from '../components/FilterPanel';
import TrendVisualizer from '../components/TrendVisualizer';
import PeriodicTable from '../components/table/PeriodicTable';

const Home = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 p-6 glass rounded-2xl">
        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-center uppercase tracking-widest">
          Explore the Elements
        </h1>

        <div className="flex flex-col sm:flex-row items-stretch gap-2 w-full max-w-2xl mx-auto">
          <SearchBar />
          <FilterDropdowns />
        </div>

        <CategoryLegend />
      </div>

      <PeriodicTable />

      <div className="glass p-6 rounded-2xl">
        <TrendVisualizer />
      </div>
    </div>
  );
};

export default Home;
