import { useStore } from '../store/useStore';
import { elements } from '../data/elements';
import { useTheme } from '../contexts/ThemeContext';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

const TREND_OPTIONS = [
  { value: 'atomicRadius', label: 'Atomic Radius' },
  { value: 'electronegativity', label: 'Electronegativity' },
  { value: 'ionizationEnergy', label: 'Ionization Energy' },
  { value: 'atomicMass', label: 'Atomic Mass' }
];

const CustomTooltip = ({ active, payload, label, trend }) => {
  if (active && payload && payload.length) {
    return (
      <div className="shadow-lg rounded-lg p-2 sm:p-3 text-xs sm:text-sm min-w-28 sm:min-w-32 border"
        style={{
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--divider)',
        }}
      >
        <p className="font-bold mb-1 font-['JetBrains_Mono',monospace]" style={{ color: 'var(--text-muted)' }}>
          {`${payload[0].payload.name}`}
        </p>
        <p className="font-semibold capitalize" style={{ color: 'var(--accent)' }}>
          {trend}: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const TrendVisualizer = () => {
  const { selectedTrend, setSelectedTrend } = useStore();
  const { isDark } = useTheme();

  const axisColor = isDark ? '#7a6b58' : '#9a8873';
  const lineColor = isDark ? '#cd7f32' : '#b87333';

  const data = elements
    .filter(e => e[selectedTrend] !== null && e[selectedTrend] !== undefined)
    .sort((a, b) => a.atomicNumber - b.atomicNumber)
    .map(e => ({
      name: e.symbol,
      atomicNumber: e.atomicNumber,
      [selectedTrend]: e[selectedTrend]
    }));

  return (
    <div className="flex flex-col gap-3 sm:gap-4 relative overflow-hidden h-full pt-1 sm:pt-2">
      {/* Graph paper pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(var(--text-primary) 1px, transparent 1px),
            linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Student notebook masking tape */}
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-5 sm:h-6 rotate-[-2deg] z-20 pointer-events-none"
        style={{ 
            backgroundColor: isDark ? 'rgba(255, 245, 220, 0.08)' : 'rgba(230, 220, 190, 0.3)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            clipPath: 'polygon(2% 0, 98% 3%, 100% 96%, 3% 100%)',
        }}
      />

      {/* Decorative Chemistry Watermark removed for subtlety */}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 border-b pb-3 sm:pb-4 relative z-10"
        style={{ borderColor: 'var(--divider)' }}
      >
        <div>
          <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2 font-['Playfair_Display',serif]"
            style={{ color: 'var(--text-primary)' }}
          >
            <span className="w-1.5 sm:w-2 h-5 sm:h-6 rounded-full inline-block" style={{ backgroundColor: 'var(--accent)' }} />
            Periodic Trends
            <span className="text-[10px] font-['JetBrains_Mono',monospace] font-normal tracking-widest px-2 py-0.5 rounded border hidden sm:inline-block opacity-70"
              style={{ borderColor: 'var(--divider)', color: 'var(--text-muted)' }}
            >
              f(Z)
            </span>
          </h2>
          <p className="text-xs sm:text-sm flex items-center gap-2 mt-1" style={{ color: 'var(--text-muted)' }}>
            <span className="font-['JetBrains_Mono',monospace] text-[9px] uppercase tracking-widest opacity-60 border-r pr-2" style={{ borderColor: 'var(--divider)' }}>
              EXP. 04
            </span>
            <span>Visualize properties across atomic numbers.</span>
          </p>
        </div>
        
        <div className="relative w-full sm:w-auto">
          <select 
            value={selectedTrend}
            onChange={(e) => setSelectedTrend(e.target.value)}
            className="border text-xs sm:text-sm rounded-lg block p-2 sm:p-2.5 outline-none font-medium w-full shadow-sm"
            style={{
              backgroundColor: 'var(--input-bg)',
              borderColor: 'var(--input-border)',
              color: 'var(--text-primary)',
            }}
          >
            {TREND_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {/* Subtle hand-drawn arrow/note indicator */}
          <span className="absolute -bottom-5 right-2 text-[10px] sm:text-xs font-['Playfair_Display',serif] italic opacity-50 rotate-[-4deg] pointer-events-none whitespace-nowrap hidden sm:block" 
            style={{ color: 'var(--accent)' }}
          >
            * select metric
          </span>
        </div>
      </div>

      <div className="h-[200px] sm:h-[250px] md:h-[300px] 2xl:h-[400px] w-full mt-4 sm:mt-6 min-w-0 relative z-10">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200}>
          <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <XAxis dataKey="atomicNumber" stroke={axisColor} tick={{fill: axisColor, fontSize: 10}} tickLine={false} axisLine={{ strokeOpacity: 0.3 }} />
            <YAxis stroke={axisColor} tick={{fill: axisColor, fontSize: 10}} width={45} tickLine={false} axisLine={{ strokeOpacity: 0.3 }} />
            <Tooltip content={<CustomTooltip trend={selectedTrend} />} cursor={{ stroke: 'var(--accent)', strokeWidth: 1, strokeDasharray: '4 4', opacity: 0.5 }} />
            <Line 
              type="monotone" 
              dataKey={selectedTrend} 
              stroke={lineColor} 
              strokeWidth={2}
              dot={{ stroke: lineColor, strokeWidth: 1.5, r: 2, fill: 'var(--card-bg)' }}
              activeDot={{ r: 5, stroke: lineColor, strokeWidth: 2, fill: lineColor }}
            />
          </LineChart>
        </ResponsiveContainer>
        
        {/* Lab note scribble at bottom */}
        <div className="absolute bottom-2 sm:bottom-4 right-12 sm:right-16 text-[10px] sm:text-xs font-['Playfair_Display',serif] italic opacity-40 rotate-[-1deg] pointer-events-none" 
          style={{ color: 'var(--text-primary)' }}
        >
          Fig 1. Periodicity observed.
        </div>
      </div>
    </div>
  );
};

export default TrendVisualizer;
