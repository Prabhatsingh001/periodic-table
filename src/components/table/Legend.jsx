import React from "react";
import { titleCase } from "../../utils/helpers";
import { getLegendClasses } from "../../utils/theme";
import { useTheme } from "../../contexts/ThemeContext";

export function Legend({ categories }) {
  const { isDark } = useTheme();
  return (
    <section
      className="relative z-10 mx-auto mb-8 flex max-w-5xl flex-wrap justify-center gap-2"
      aria-label="Element categories"
    >
      {categories.map((category) => {
        const markerClass = getLegendClasses(category, isDark);
        return (
          <div
            key={category}
            className={`flex items-center gap-2 rounded-md border px-3 py-1.5 text-[11px] font-medium ${
              isDark
                ? "border-slate-800 bg-slate-900 text-slate-300"
                : "border-gray-200 bg-white text-gray-700"
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-[3px] ${markerClass}`}
              aria-hidden="true"
            />
            <span>{titleCase(category)}</span>
          </div>
        );
      })}
    </section>
  );
}
