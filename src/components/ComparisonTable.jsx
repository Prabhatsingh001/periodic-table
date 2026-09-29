import { useStore } from '../store/useStore';
import { formatNumber } from '../utils/helpers';
import { getCategoryColor } from '../data/categoryColors';
import { Scale, X } from 'lucide-react';

const ComparisonTable = () => {
  const { selectedElements, toggleSelectedElement } = useStore();

  if (selectedElements.length === 0) {
    return (
        <div className="text-center py-8 sm:py-12 glass rounded-xl sm:rounded-2xl flex flex-col items-center justify-center">
            <Scale size={36} className="sm:w-12 sm:h-12 text-slate-400 mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-bold text-slate-500 dark:text-slate-400">No Elements Selected</h3>
            <p className="text-sm sm:text-base text-slate-400 dark:text-slate-500">Select up to 3 elements to compare their properties.</p>
        </div>
    );
  }

  const properties = [
    { key: 'atomicNumber', label: 'Atomic Number' },
    { key: 'atomicMass', label: 'Atomic Mass (u)' },
    { key: 'category', label: 'Category' },
    { key: 'phase', label: 'Phase' },
    { key: 'group', label: 'Group' },
    { key: 'period', label: 'Period' },
    { key: 'electronegativity', label: 'Electronegativity' },
    { key: 'atomicRadius', label: 'Atomic Radius (pm)' },
    { key: 'ionizationEnergy', label: 'Ionization Energy (eV)' },
  ];

  return (
    <div className="glass rounded-xl sm:rounded-2xl overflow-x-auto relative">
      <table className="w-full text-left text-xs sm:text-sm text-slate-700 dark:text-slate-300">
        <thead className="text-[10px] sm:text-xs uppercase bg-slate-100/80 dark:bg-white/5 text-slate-500 dark:text-slate-400">
          <tr>
            <th className="px-3 sm:px-6 py-3 sm:py-4 rounded-tl-xl border-b border-slate-200 dark:border-white/10 w-1/4 min-w-[120px]">Property</th>
            {selectedElements.map((el) => (
              <th key={el.symbol} className="px-3 sm:px-6 py-3 sm:py-4 border-b border-slate-200 dark:border-white/10 relative min-w-[120px]">
                <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1.5 sm:gap-2" style={{ '--cc': getCategoryColor(el.category) }}>
                        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[var(--cc)] border border-slate-200 dark:border-white/10 flex-shrink-0"></div>
                        <span className="font-bold text-slate-800 dark:text-white text-xs sm:text-base">
                          <span className="hidden sm:inline">{el.name} </span>({el.symbol})
                        </span>
                    </div>
                    <button 
                        onClick={() => toggleSelectedElement(el)}
                        className="text-slate-400 hover:text-red-400 transition-colors p-0.5 sm:p-1"
                    >
                        <X size={14} className="sm:w-4 sm:h-4" />
                    </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {properties.map((prop, idx) => (
            <tr key={prop.key} className={`border-b border-slate-100 dark:border-white/5 ${idx % 2 === 0 ? 'bg-slate-50/50 dark:bg-white/[0.02]' : ''}`}>
              <td className="px-3 sm:px-6 py-2.5 sm:py-4 font-medium text-slate-500 dark:text-slate-400 text-[10px] sm:text-sm">{prop.label}</td>
              {selectedElements.map(el => {
                let value = el[prop.key];
                if (typeof value === 'number') value = formatNumber(value);
                if (value === null || value === undefined) value = 'N/A';
                
                return (
                    <td key={`${prop.key}-${el.symbol}`} className="px-3 sm:px-6 py-2.5 sm:py-4 capitalize font-semibold text-slate-700 dark:text-slate-200 text-xs sm:text-sm">
                        {value}
                    </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
