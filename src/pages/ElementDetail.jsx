
import { useParams, Link } from 'react-router-dom';
import { elements } from '../data/elements';
import { getCategoryColor } from '../data/categoryColors';
import Atom3D from '../components/Atom3D';
import { ArrowLeft, Beaker, Fingerprint, Activity, Weight, Zap } from 'lucide-react';
import { formatNumber } from '../utils/helpers';

const StatCard = ({ icon: Icon, label, value, unit = "" }) => (
  <div className="glass p-3 sm:p-4 rounded-xl flex items-center gap-3 sm:gap-4">
    <div className="p-2 sm:p-3 rounded-lg border"
      style={{ backgroundColor: 'var(--hover-bg)', borderColor: 'var(--divider)', color: 'var(--accent)' }}
    >
      <Icon size={20} className="sm:w-6 sm:h-6" />
    </div>
    <div className="min-w-0">
      <p className="text-[10px] sm:text-xs uppercase tracking-wider font-['JetBrains_Mono',monospace]"
        style={{ color: 'var(--text-muted)' }}
      >{label}</p>
      <p className="text-base sm:text-lg font-bold truncate" style={{ color: 'var(--text-primary)' }}>
        {value !== null ? `${formatNumber(value)} ${unit}` : 'N/A'}
      </p>
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
        <h2 className="text-2xl font-bold" style={{ color: '#a0522d' }}>Element Not Found</h2>
        <Link to="/" className="hover:underline mt-4 inline-block" style={{ color: 'var(--accent)' }}>Return Home</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-6 max-w-6xl 2xl:max-w-7xl mx-auto" style={{ '--c': catColor, '--c-soft': `${catColor}40`, '--c-glow': `${catColor}60` }}>
      <Link to="/" className="inline-flex items-center gap-2 hover:opacity-70 transition-opacity w-fit font-medium text-sm sm:text-base"
        style={{ color: 'var(--text-muted)' }}
      >
        <ArrowLeft size={18} />
        Back to Table
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="glass p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 right-0 p-4 sm:p-8 opacity-[0.06] blur-xl" style={{ color: catColor }}>
            <span className="text-[6rem] sm:text-[8rem] lg:text-[12rem] font-black">{element.symbol}</span>
          </div>
          
          <div className="relative z-10">
            <div className="text-[10px] uppercase font-['JetBrains_Mono',monospace] tracking-widest opacity-60 mb-2 flex items-center gap-2"
              style={{ color: 'var(--text-muted)' }}
            >
              <span>SPECIMEN № {element.atomicNumber.toString().padStart(3, '0')}</span>
              <span>•</span>
              <span>PERIOD {element.period}</span>
              <span>•</span>
              <span>GROUP {element.group}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-2">
              <span className="px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold border"
                style={{ color: catColor, backgroundColor: `${catColor}15`, borderColor: `${catColor}30` }}
              >
                {element.category}
              </span>
              <span className="text-xs sm:text-sm font-['JetBrains_Mono',monospace]" style={{ color: 'var(--text-muted)' }}>
                Phase: <span className="capitalize font-semibold" style={{ color: 'var(--text-secondary)' }}>{element.phase}</span>
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-2 tracking-tight font-['Playfair_Display',serif]"
              style={{ color: 'var(--text-primary)' }}
            >
              {element.name}
            </h1>
            
            <div className="flex items-end gap-2 mb-4 sm:mb-6">
              <span className="text-xl sm:text-2xl lg:text-3xl font-light" style={{ color: 'var(--text-muted)' }}>Atomic No.</span>
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['JetBrains_Mono',monospace]" style={{ color: 'var(--text-secondary)' }}>{element.atomicNumber}</span>
            </div>

            <p className="text-sm sm:text-base lg:text-lg leading-relaxed border-l-4 pl-3 sm:pl-4"
              style={{ color: 'var(--text-secondary)', borderColor: catColor }}
            >
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
        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2 font-['Playfair_Display',serif]"
          style={{ color: 'var(--text-primary)' }}
        >
          <Beaker size={20} style={{ color: 'var(--accent)' }} />
          Properties &amp; Discovery
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-0 text-sm relative">
          {[
            { label: 'Electron Config', value: element.electronConfiguration, mono: true },
            { label: 'Group / Period', value: `${element.group} / ${element.period}` },
            { label: 'Discovered By', value: element.discoveredBy },
            { label: 'Year Discovered', value: element.yearDiscovered },
          ].map(({ label, value, mono }) => (
            <div key={label} className="flex justify-between py-2 border-b" style={{ borderColor: 'var(--divider)' }}>
              <span className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>{label}</span>
              <span className={`text-xs sm:text-sm text-right ml-2 font-semibold ${mono ? "font-['JetBrains_Mono',monospace]" : ""}`}
                style={{ color: mono ? 'var(--accent)' : 'var(--text-secondary)' }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ElementDetail;
