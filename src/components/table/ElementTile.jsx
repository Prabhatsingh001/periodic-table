import React from "react";
import { formatAtomicMass } from "../../utils/helpers";
import { getTileClasses } from "../../utils/theme";
import { useTheme } from "../../contexts/ThemeContext";

export function ElementTile({ element, onSelect, isDimmed }) {
    const { isDark } = useTheme();
    return (
        <button
            type="button"
            className={`relative flex min-h-17 cursor-pointer flex-col items-center justify-center rounded-lg border p-1 transition-all duration-300 ease-out max-[860px]:min-h-14.5 ${
            isDimmed 
            ? "opacity-15 grayscale scale-[0.97] pointer-events-none z-0" 
            : "hover:z-20 scale-100 opacity-100"
            } ${getTileClasses(element.category, isDark)}`}
            style={{
                gridColumn: element.group,
                gridRow: element.period,
            }}
            onClick={() => onSelect(element)}
            aria-label={`Open details for ${element.name}`}
        >
            <span className="font-mono tabular-nums absolute left-1.5 top-1.5 text-[9px] font-medium opacity-60">
                {element.number}
            </span>
            <span className={`text-[1.05rem] font-bold leading-none tracking-tight max-[860px]:text-sm ${isDark ? "text-slate-100" : "text-gray-900"}`}>
                {element.symbol}
            </span>
            <span className="mt-0.5 w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-[8px] opacity-75 max-[860px]:text-[7px]">
                {element.name}
            </span>
            <span className="font-mono tabular-nums mt-0.5 text-[7.5px] leading-none opacity-55 max-[860px]:text-[7px]">
                {formatAtomicMass(element.mass)}
            </span>
        </button>
    );
}
