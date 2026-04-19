
import { useStore } from '../store/useStore';
import { legendCategories } from '../data/categoryColors';
import { useTheme } from '../contexts/ThemeContext';

export const FilterDropdowns = () => {
  const { filters, setFilters } = useStore();

  const handleGroupChange = (e) => {
    const val = e.target.value;
    setFilters({ group: val === "all" ? [] : [Number(val)] });
  };

  const handlePeriodChange = (e) => {
    const val = e.target.value;
    setFilters({ period: val === "all" ? [] : [Number(val)] });
  };

  return (
    <div className="flex items-center gap-2">
      <select 
        value={filters.group.length > 0 ? filters.group[0] : "all"}
        onChange={handleGroupChange}
        className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/20 text-slate-800 dark:text-slate-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 outline-none font-medium shadow-sm"
      >
        <option value="all">All Groups</option>
        {Array.from({length: 18}, (_, i) => i + 1).map(g => (
          <option key={g} value={g}>Group {g}</option>
        ))}
      </select>

      <select 
        value={filters.period.length > 0 ? filters.period[0] : "all"}
        onChange={handlePeriodChange}
        className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/20 text-slate-800 dark:text-slate-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 outline-none font-medium shadow-sm"
      >
        <option value="all">All Periods</option>
        {Array.from({length: 7}, (_, i) => i + 1).map(p => (
          <option key={p} value={p}>Period {p}</option>
        ))}
      </select>
    </div>
  );
};

export const CategoryLegend = () => {
  const { filters, setFilters } = useStore();
  const { isDark } = useTheme();

  const toggleCategory = (catId) => {
    const isSelected = filters.category.includes(catId);
    const newCategory = isSelected
      ? filters.category.filter(c => c !== catId)
      : [...filters.category, catId];
    setFilters({ category: newCategory });
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {legendCategories.map(cat => {
        const isSelected = filters.category.includes(cat.id);

        let bgColor, borderColor, textColor;

        if (isDark) {
          bgColor      = isSelected ? `${cat.color}33` : `${cat.color}12`;
          borderColor  = isSelected ? `${cat.color}90` : `${cat.color}40`;
          textColor    = isSelected ? '#ffffff' : '#94a3b8';
        } else {
          // Light mode: white card with colored accent when unselected; solid color when selected
          bgColor      = isSelected ? cat.color : '#ffffff';
          borderColor  = cat.color;
          textColor    = isSelected ? '#ffffff' : cat.color;
        }

        return (
          <button
            key={cat.id}
            onClick={() => toggleCategory(cat.id)}
            style={{ backgroundColor: bgColor, borderColor, color: textColor }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold capitalize transition-all duration-200 border shadow-sm hover:scale-105 active:scale-95"
          >
            <span 
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: isSelected && !isDark ? '#ffffff99' : cat.color }}
            />
            {cat.label}
          </button>
        );
      })}
    </div>
  );
};
