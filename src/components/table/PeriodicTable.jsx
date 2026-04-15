import React from "react";
import { elements } from "../../data/elements";
import { ElementTile } from "./ElementTile";
import { useTheme } from "../../contexts/ThemeContext";

export function PeriodicTable({ onElementSelect, searchQuery, filterGroup, filterPeriod }) {
  const { isDark } = useTheme();
  return (
    <main className="mx-auto max-w-[1320px] overflow-x-auto pb-10">
      <div
        className={`relative grid min-w-[1020px] grid-cols-[repeat(18,minmax(52px,1fr))] grid-rows-[repeat(9,minmax(62px,auto))] gap-1.5 rounded-xl border p-6 max-[860px]:min-w-[820px] max-[860px]:grid-cols-[repeat(18,minmax(44px,1fr))] max-[860px]:grid-rows-[repeat(9,minmax(52px,auto))] max-[860px]:gap-1 max-[860px]:p-4 ${
          isDark
            ? "border-slate-800 bg-slate-900/50"
            : "border-gray-200 bg-white"
        }`}
        role="grid"
        aria-label="Periodic table of elements"
      >
        {elements.map((element) => {
          const query = searchQuery.toLowerCase();
          const searchMatch = !query || 
            element.name.toLowerCase().includes(query) || 
            element.symbol.toLowerCase().includes(query) || 
            element.number.toString().includes(query);
          
          const groupMatch = filterGroup === "all" || element.group.toString() === filterGroup;
          const periodMatch = filterPeriod === "all" || element.period.toString() === filterPeriod;
          
          const isMatch = searchMatch && groupMatch && periodMatch;

          return (
            <ElementTile
              key={element.number}
              element={element}
              onSelect={onElementSelect}
              isDimmed={!isMatch}
            />
          );
        })}
      </div>
    </main>
  );
}
