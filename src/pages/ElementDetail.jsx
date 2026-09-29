
import { useParams, Link } from 'react-router-dom';
import { elements } from '../data/elements';
import { getCategoryColor } from '../data/categoryColors';
import Atom3D from '../components/Atom3D';
import { ArrowLeft, Beaker, Fingerprint, Activity, Weight, Zap } from 'lucide-react';
import { formatNumber } from '../utils/helpers';

const StatCard = ({ icon: Icon, label, value, unit = "" }) => (
  <div className="glass p-3 sm:p-4 rounded-xl flex items-center gap-3 sm:gap-4">
    <div className="p-2 sm:p-3 bg-slate-100 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/10 text-blue-500 dark:text-blue-400">
      <Icon size={20} className="sm:w-6 sm:h-6" />
    </div>
    <div className="min-w-0">
      <p className="text-slate-500 dark:text-slate-400 text-[10px] sm:text-xs uppercase tracking-wider">{label}</p>
      <p className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 truncate">{value !== null ? `${formatNumber(value)} ${unit}` : 'N/A'}</p>
    </div>
  </div>
);

const ElementDetail = () => {
  const { symbol } = useParams();
  const element = elements.find(e => e.symbol === symbol);
  const catColor = element ? getCategoryColor(element.category) : null;

  if (!element) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-400">Element Not Found</h2>
        <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-6 max-w-6xl 2xl:max-w-7xl mx-auto" style={{ '--c': catColor, '--c-soft': `${catColor}40`, '--c-glow': `${catColor}80` }}>
      <Link to="/" className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors w-fit font-medium text-sm sm:text-base">
        <ArrowLeft size={18} />
        Back to Table
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="glass p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl relative overflow-hidden flex flex-col justify-center bg-slate-50/80 dark:bg-slate-900/50">
          <div className="absolute top-0 right-0 p-4 sm:p-8 opacity-10 blur-xl text-[var(--c)]">
            <span className="text-[6rem] sm:text-[8rem] lg:text-[12rem] font-black">{element.symbol}</span>
          </div>
          
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-2">
              <span className="px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold text-white bg-[var(--c-soft)] border border-[var(--c)] shadow-sm">
                {element.category}
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-medium">Phase: <span className="text-slate-700 dark:text-slate-200 capitalize">{element.phase}</span></span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-2 tracking-tight text-slate-900 dark:text-white drop-shadow-lg dark:[text-shadow:0_0_20px_var(--c-glow)]">
              {element.name}
            </h1>
            
            <div className="flex items-end gap-2 mb-4 sm:mb-6">
              <span className="text-xl sm:text-2xl lg:text-3xl font-light text-slate-500 dark:text-slate-400">Atomic No.</span>
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-700 dark:text-slate-200">{element.atomicNumber}</span>
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed border-l-4 border-[var(--c)] pl-3 sm:pl-4">
              {element.summary}
            </p>
          </div>
        </div>

        <Atom3D atomicNumber={element.atomicNumber} color={catColor} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard icon={Weight} label="Atomic Mass" value={element.atomicMass} unit="u" />
        <StatCard icon={Activity} label="Electronegativity" value={element.electronegativity} />
        <StatCard icon={Fingerprint} label="Atomic Radius" value={element.atomicRadius} unit="pm" />
        <StatCard icon={Zap} label="Ionization Energy" value={element.ionizationEnergy} unit="eV" />
      </div>

      <div className="glass p-4 sm:p-6 rounded-xl sm:rounded-2xl mt-2 sm:mt-4">
        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2 text-slate-800 dark:text-slate-100">
          <Beaker className="text-blue-500 dark:text-blue-400" size={20} />
          Properties &amp; Discovery
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-0 text-sm text-slate-600 dark:text-slate-300 relative">
          <div className="flex justify-between border-b border-slate-200 dark:border-white/5 py-2">
            <span className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">Electron Config</span>
            <span className="font-mono text-blue-600 dark:text-blue-300 text-xs sm:text-sm text-right ml-2">{element.electronConfiguration}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 dark:border-white/5 py-2">
            <span className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">Group / Period</span>
            <span className="font-semibold text-xs sm:text-sm">{element.group} / {element.period}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 dark:border-white/5 py-2">
            <span className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">Discovered By</span>
            <span className="font-semibold text-xs sm:text-sm text-right ml-2">{element.discoveredBy}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 dark:border-white/5 py-2">
            <span className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">Year Discovered</span>
            <span className="font-semibold text-xs sm:text-sm">{element.yearDiscovered}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementDetail;
