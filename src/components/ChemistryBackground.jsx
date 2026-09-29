import { useMemo } from 'react';
import { useTheme } from '../contexts/ThemeContext';

/* ── Floating chemical formulas that drift across the background ── */
const FORMULAS = [
  'H₂O', 'CO₂', 'NaCl', 'C₆H₁₂O₆', 'H₂SO₄', 'NH₃', 'CH₄', 'O₂',
  'Fe₂O₃', 'CaCO₃', 'KMnO₄', 'HCl', 'NaOH', 'C₂H₅OH', 'NO₂',
  'SiO₂', 'Al₂O₃', 'ZnSO₄', 'CuSO₄', 'AgNO₃',
];

/* ── SVG hexagon (benzene-ring inspired) ── */
const Hexagon = ({ x, y, size, opacity, delay, duration }) => (
  <div
    className="absolute pointer-events-none"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: size,
      height: size,
      opacity,
      animation: `chem-float ${duration}s ease-in-out ${delay}s infinite alternate`,
    }}
  >
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <polygon
        points="50,2 93,27 93,73 50,98 7,73 7,27"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
      {/* Inner circle like a benzene ring */}
      <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
    </svg>
  </div>
);

/* ── Small atom with orbiting electron ── */
const MiniAtom = ({ x, y, size, delay, duration }) => (
  <div
    className="absolute pointer-events-none"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      animation: `chem-float ${duration}s ease-in-out ${delay}s infinite alternate`,
    }}
  >
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Nucleus */}
      <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.15" />
      {/* Orbits */}
      <ellipse cx="20" cy="20" rx="14" ry="6" stroke="currentColor" strokeWidth="0.5" opacity="0.12" transform="rotate(0 20 20)" />
      <ellipse cx="20" cy="20" rx="14" ry="6" stroke="currentColor" strokeWidth="0.5" opacity="0.12" transform="rotate(60 20 20)" />
      <ellipse cx="20" cy="20" rx="14" ry="6" stroke="currentColor" strokeWidth="0.5" opacity="0.12" transform="rotate(120 20 20)" />
      {/* Electron */}
      <circle cx="34" cy="20" r="1.5" fill="currentColor" opacity="0.2">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 20 20"
          to="360 20 20"
          dur={`${3 + delay}s`}
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  </div>
);

/* ── Molecular bond decoration (two dots connected) ── */
const MolecularBond = ({ x, y, angle, length, delay }) => (
  <div
    className="absolute pointer-events-none"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      transform: `rotate(${angle}deg)`,
      animation: `chem-fade ${8 + delay}s ease-in-out ${delay}s infinite alternate`,
    }}
  >
    <svg width={length} height="12" viewBox={`0 0 ${length} 12`} fill="none">
      <circle cx="4" cy="6" r="3" fill="currentColor" opacity="0.1" />
      <line x1="7" y1="6" x2={length - 7} y2="6" stroke="currentColor" strokeWidth="1" opacity="0.08" strokeDasharray="3 2" />
      <circle cx={length - 4} cy="6" r="3" fill="currentColor" opacity="0.1" />
    </svg>
  </div>
);

const ChemistryBackground = () => {
  const { isDark } = useTheme();
  const color = isDark ? 'var(--accent)' : 'var(--text-muted)';

  const items = useMemo(() => {
    const formulas = [];
    const hexagons = [];
    const atoms = [];
    const bonds = [];

    // Scatter chemical formulas
    for (let i = 0; i < 12; i++) {
      formulas.push({
        text: FORMULAS[i % FORMULAS.length],
        x: 5 + (i * 37 + i * i * 7) % 85,
        y: 3 + (i * 53 + i * i * 11) % 90,
        size: 10 + (i % 3) * 2,
        delay: i * 1.7,
        duration: 15 + (i % 5) * 4,
        opacity: 0.04 + (i % 3) * 0.015,
      });
    }

    // Scatter hexagons (benzene rings)
    for (let i = 0; i < 6; i++) {
      hexagons.push({
        x: 8 + (i * 43 + i * 17) % 80,
        y: 5 + (i * 61 + i * 23) % 85,
        size: 30 + (i % 3) * 20,
        delay: i * 2.3,
        duration: 20 + (i % 4) * 5,
        opacity: 0.03 + (i % 2) * 0.02,
      });
    }

    // Scatter mini atoms
    for (let i = 0; i < 5; i++) {
      atoms.push({
        x: 10 + (i * 51 + i * 31) % 78,
        y: 8 + (i * 47 + i * 19) % 82,
        size: 36 + (i % 3) * 12,
        delay: i * 1.1,
        duration: 18 + (i % 3) * 6,
      });
    }

    // Scatter molecular bonds
    for (let i = 0; i < 8; i++) {
      bonds.push({
        x: 5 + (i * 41 + i * 13) % 85,
        y: 10 + (i * 59 + i * 29) % 80,
        angle: (i * 45) % 180,
        length: 40 + (i % 3) * 20,
        delay: i * 0.9,
      });
    }

    return { formulas, hexagons, atoms, bonds };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ color }}>
      {/* Floating chemical formulas */}
      {items.formulas.map((f, i) => (
        <div
          key={`f-${i}`}
          className="absolute pointer-events-none font-['JetBrains_Mono',monospace] select-none"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            fontSize: `${f.size}px`,
            opacity: f.opacity,
            animation: `chem-float ${f.duration}s ease-in-out ${f.delay}s infinite alternate`,
            color: 'currentColor',
          }}
        >
          {f.text}
        </div>
      ))}

      {/* Benzene-ring hexagons */}
      {items.hexagons.map((h, i) => (
        <Hexagon key={`h-${i}`} {...h} />
      ))}

      {/* Mini orbiting atoms */}
      {items.atoms.map((a, i) => (
        <MiniAtom key={`a-${i}`} {...a} />
      ))}

      {/* Molecular bonds */}
      {items.bonds.map((b, i) => (
        <MolecularBond key={`b-${i}`} {...b} />
      ))}
    </div>
  );
};

export default ChemistryBackground;
