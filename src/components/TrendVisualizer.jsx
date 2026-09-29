import { useStore } from '../store/useStore';
import { elements } from '../data/elements';
import { useTheme } from '../contexts/ThemeContext';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const TREND_OPTIONS = [
  { value: 'atomicRadius', label: 'Atomic Radius' },
  { value: 'electronegativity', label: 'Electronegativity' },
  { value: 'ionizationEnergy', label: 'Ionization Energy' },
  { value: 'atomicMass', label: 'Atomic Mass' }
];

const CustomTooltip = ({ active, payload, label, trend }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 shadow-lg rounded-lg p-2 sm:p-3 text-xs sm:text-sm min-w-28 sm:min-w-32">
        <p className="text-slate-500 dark:text-slate-400 font-bold mb-1">{`${payload[0].payload.name}`}</p>
        <p className="text-blue-600 dark:text-blue-400 font-semibold capitalize">
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

  const axisColor = isDark ? '#64748b' : '#94a3b8';

  const data = elements
    .filter(e => e[selectedTrend] !== null && e[selectedTrend] !== undefined)
    .sort((a, b) => a.atomicNumber - b.atomicNumber)
    .map(e => ({
      name: e.symbol,
      atomicNumber: e.atomicNumber,
      [selectedTrend]: e[selectedTrend]
    }));

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 border-b border-slate-200 dark:border-white/10 pb-3 sm:pb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-white">
            <span className="bg-blue-500 w-1.5 sm:w-2 h-5 sm:h-6 rounded-full inline-block"></span>
            Periodic Trends
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">Visualize properties across atomic numbers.</p>
        </div>
        
        <select 
          value={selectedTrend}
          onChange={(e) => setSelectedTrend(e.target.value)}
          className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/20 text-slate-700 dark:text-slate-200 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 sm:p-2.5 outline-none font-medium w-full sm:w-auto"
        >
          {TREND_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="h-[200px] sm:h-[250px] md:h-[300px] 2xl:h-[400px] w-full mt-2 sm:mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="atomicNumber" stroke={axisColor} tick={{fill: axisColor, fontSize: 10}} />
            <YAxis stroke={axisColor} tick={{fill: axisColor, fontSize: 10}} width={45} />
            <Tooltip content={<CustomTooltip trend={selectedTrend} />} />
            <Line 
              type="monotone" 
              dataKey={selectedTrend} 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ stroke: '#60a5fa', strokeWidth: 1, r: 1.5, fill: 'currentColor' }}
              activeDot={{ r: 5, stroke: '#93c5fd', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendVisualizer;
