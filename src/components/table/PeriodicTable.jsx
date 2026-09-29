import { useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { elements } from '../../data/elements';
import ElementTile from './ElementTile';
import { getHeatmapColor, getPropertyRange } from '../../utils/helpers';


export default function PeriodicTable() {
  const { searchQuery, filters, selectedTrend } = useStore();


  const filteredElementsSet = useMemo(() => {
    return new Set(elements.filter(el => {
      const matchSearch = el.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          el.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          el.atomicNumber.toString() === searchQuery;
                          
      const matchCategory = filters.category.length === 0 || 
                            filters.category.some(c => el.category.toLowerCase().includes(c));                            
      
      const matchPhase = filters.phase.length === 0 || 
                         filters.phase.some(p => el.phase === p);
                         
      const matchGroup = filters.group.length === 0 ||
                         filters.group.includes(Number(el.group));
                         
      const matchPeriod = filters.period.length === 0 ||
                          filters.period.includes(Number(el.period));
      
      return matchSearch && matchCategory && matchPhase && matchGroup && matchPeriod;
    }).map(e => e.symbol));
  }, [searchQuery, filters]);

  const trendRange = useMemo(() => {
    if (!selectedTrend) return null;
    return getPropertyRange(elements, selectedTrend);
  }, [selectedTrend]);

  return (
    <div
      className="p-2 sm:p-3 md:p-4 lg:p-6 rounded-xl sm:rounded-2xl overflow-x-auto border border-slate-200 dark:border-white/5 bg-white dark:bg-[#0c1222] transition-colors duration-300"
    >
      <div 
        className="grid gap-[2px] sm:gap-[3px] md:gap-1 lg:gap-1.5 min-w-[680px] sm:min-w-[800px] md:min-w-[900px] lg:min-w-[1000px] 2xl:min-w-[1200px] grid-cols-[repeat(18,minmax(0,1fr))] grid-rows-[repeat(10,minmax(0,1fr))]"
      >
        {elements.map((el) => {
          const isFaded = !filteredElementsSet.has(el.symbol);
          let heatColor = null;
          if (selectedTrend && trendRange) {
            const val = el[selectedTrend];
            heatColor = getHeatmapColor(val, trendRange.min, trendRange.max);
          }
          
          return (
            <ElementTile 
              key={el.symbol} 
              element={el} 
              isFaded={isFaded}
              heatColor={heatColor}
            />
          );
        })}
      </div>
    </div>
  );
}
