import { useStore } from '../store/useStore';
import { formatNumber } from '../utils/helpers';
import { getCategoryColor } from '../data/categoryColors';
import { Scale, X } from 'lucide-react';

const ComparisonTable = () => {
  const { selectedElements, toggleSelectedElement } = useStore();

  if (selectedElements.length === 0) {
    return (
        <div className="text-center py-8 sm:py-12 glass rounded-xl sm:rounded-2xl flex flex-col items-center justify-center">
            <Scale size={36} className="sm:w-12 sm:h-12 mb-3 sm:mb-4" style={{ color: 'var(--text-muted)' }} />
            <h3 className="text-lg sm:text-xl font-bold font-['Playfair_Display',serif]" style={{ color: 'var(--text-muted)' }}>No Elements Selected</h3>
            <p className="text-sm sm:text-base" style={{ color: 'var(--text-muted)', opacity: 0.7 }}>Select up to 3 elements to compare their properties.</p>
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
      <table className="w-full text-left text-xs sm:text-sm">
        <thead>
          <tr style={{ backgroundColor: 'var(--hover-bg)' }}>
            <th className="px-3 sm:px-6 py-3 sm:py-4 rounded-tl-xl border-b text-[10px] sm:text-xs uppercase tracking-wider font-['JetBrains_Mono',monospace] w-1/4 min-w-[120px]"
              style={{ borderColor: 'var(--divider)', color: 'var(--text-muted)' }}
            >Property</th>
            {selectedElements.map((el) => (
              <th key={el.symbol} className="px-3 sm:px-6 py-3 sm:py-4 border-b relative min-w-[120px]"
                style={{ borderColor: 'var(--divider)' }}
              >
                <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border flex-shrink-0"
                          style={{ backgroundColor: getCategoryColor(el.category), borderColor: 'var(--divider)' }}
                        />
                        <span className="font-bold text-xs sm:text-base" style={{ color: 'var(--text-primary)' }}>
                          <span className="hidden sm:inline">{el.name} </span>({el.symbol})
                        </span>
                    </div>
                    <button 
                        onClick={() => toggleSelectedElement(el)}
                        className="p-0.5 sm:p-1 transition-opacity hover:opacity-60"
                        style={{ color: 'var(--text-muted)' }}
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
            <tr key={prop.key} style={idx % 2 === 0 ? { backgroundColor: 'var(--hover-bg)' } : {}}>
              <td className="px-3 sm:px-6 py-2.5 sm:py-4 font-medium text-[10px] sm:text-sm border-b font-['JetBrains_Mono',monospace]"
                style={{ color: 'var(--text-muted)', borderColor: 'var(--divider)' }}
              >{prop.label}</td>
              {selectedElements.map(el => {
                let value = el[prop.key];
                if (typeof value === 'number') value = formatNumber(value);
                if (value === null || value === undefined) value = 'N/A';
                
                return (
                    <td key={`${prop.key}-${el.symbol}`} className="px-3 sm:px-6 py-2.5 sm:py-4 capitalize font-semibold text-xs sm:text-sm border-b"
                      style={{ color: 'var(--text-secondary)', borderColor: 'var(--divider)' }}
                    >
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
