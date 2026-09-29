import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategoryColor } from '../../data/categoryColors';
import { useTheme } from '../../contexts/ThemeContext';

const ElementTile = ({ element, isFaded, heatColor }) => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const categoryColor = getCategoryColor(element.category);
  const tileColor = heatColor || categoryColor;

  // Subtle, warm backgrounds
  const bg = isDark
    ? `${tileColor}18`
    : `${tileColor}0E`;

  const border = isDark
    ? `${tileColor}45`
    : `${tileColor}30`;

  const hoverBg = isDark
    ? `${tileColor}30`
    : `${tileColor}1C`;

  return (
    <div
      style={{
        gridColumnStart: element.xpos,
        gridRowStart: element.ypos,
        borderColor: border,
        backgroundColor: bg,
        '--tile-hover-bg': hoverBg,
      }}
      onClick={() => navigate(`/element/${element.symbol}`)}
      className={`element-tile relative cursor-pointer select-none overflow-hidden flex flex-col items-center p-0.5 sm:p-0.5 md:p-1 lg:p-1.5
        border border-solid rounded-sm transition-all duration-150
        hover:[background-color:var(--tile-hover-bg)] hover:brightness-95 dark:hover:brightness-110
        ${isFaded ? 'opacity-20 grayscale' : 'opacity-100'}`}
    >
      {/* Atomic number */}
      <span className="absolute top-0 left-0.5 sm:top-0.5 sm:left-1 text-[5px] sm:text-[6px] md:text-[7px] lg:text-[8px] 2xl:text-[9px] font-medium z-10 leading-none font-['JetBrains_Mono',monospace]"
        style={{ color: 'var(--text-muted)' }}
      >
        {element.atomicNumber}
      </span>

      {/* Content */}
      <div className="flex flex-col items-center justify-center flex-grow w-full mt-1.5 sm:mt-2 md:mt-2.5 lg:mt-3">
        <h2
          className="text-[8px] sm:text-[10px] md:text-sm lg:text-lg 2xl:text-xl font-bold z-10 leading-none tracking-wide"
          style={{ color: tileColor }}
        >
          {element.symbol}
        </h2>
        <span className="text-[4px] sm:text-[5px] md:text-[6px] lg:text-[7px] 2xl:text-[8px] tracking-tight truncate w-full text-center z-10 font-normal mt-0.5 capitalize leading-none"
          style={{ color: 'var(--text-secondary)' }}
        >
          {element.name}
        </span>
        <span className="text-[3.5px] sm:text-[4.5px] md:text-[5.5px] lg:text-[6.5px] 2xl:text-[7.5px] font-['JetBrains_Mono',monospace] truncate w-full text-center z-10 leading-none mt-0.5 mb-0.5"
          style={{ color: 'var(--text-muted)' }}
        >
          {typeof element.atomicMass === 'number' ? element.atomicMass.toFixed(3) : element.atomicMass}
        </span>
      </div>
    </div>
  );
};

export default memo(ElementTile);
