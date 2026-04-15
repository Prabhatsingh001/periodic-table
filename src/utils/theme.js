// Modern, distinct color mappings using Tailwind palette semantics

const categoryColors = {
  "alkali metal": {
    light: "bg-orange-50 border-orange-400 text-orange-900 hover:bg-orange-100 hover:border-orange-500",
    dark: "bg-orange-950/40 border-orange-600/70 text-orange-200 hover:bg-orange-900/60 hover:border-orange-500",
    legendLight: "bg-orange-100 border-orange-400",
    legendDark: "bg-orange-900 border-orange-600",
  },
  "alkaline earth metal": {
    light: "bg-rose-50 border-rose-400 text-rose-900 hover:bg-rose-100 hover:border-rose-500",
    dark: "bg-rose-950/40 border-rose-600/70 text-rose-200 hover:bg-rose-900/60 hover:border-rose-500",
    legendLight: "bg-rose-100 border-rose-400",
    legendDark: "bg-rose-900 border-rose-600",
  },
  "transition metal": {
    light: "bg-amber-50 border-amber-400 text-amber-900 hover:bg-amber-100 hover:border-amber-500",
    dark: "bg-amber-950/40 border-amber-600/70 text-amber-200 hover:bg-amber-900/60 hover:border-amber-500",
    legendLight: "bg-amber-100 border-amber-400",
    legendDark: "bg-amber-900 border-amber-600",
  },
  "post-transition metal": {
    light: "bg-cyan-50 border-cyan-400 text-cyan-900 hover:bg-cyan-100 hover:border-cyan-500",
    dark: "bg-cyan-950/40 border-cyan-600/70 text-cyan-200 hover:bg-cyan-900/60 hover:border-cyan-500",
    legendLight: "bg-cyan-100 border-cyan-400",
    legendDark: "bg-cyan-900 border-cyan-600",
  },
  metalloid: {
    light: "bg-emerald-50 border-emerald-400 text-emerald-900 hover:bg-emerald-100 hover:border-emerald-500",
    dark: "bg-emerald-950/40 border-emerald-600/70 text-emerald-200 hover:bg-emerald-900/60 hover:border-emerald-500",
    legendLight: "bg-emerald-100 border-emerald-400",
    legendDark: "bg-emerald-900 border-emerald-600",
  },
  nonmetal: {
    light: "bg-indigo-50 border-indigo-400 text-indigo-900 hover:bg-indigo-100 hover:border-indigo-500",
    dark: "bg-indigo-950/40 border-indigo-600/70 text-indigo-200 hover:bg-indigo-900/60 hover:border-indigo-500",
    legendLight: "bg-indigo-100 border-indigo-400",
    legendDark: "bg-indigo-900 border-indigo-600",
  },
  halogen: {
    light: "bg-fuchsia-50 border-fuchsia-400 text-fuchsia-900 hover:bg-fuchsia-100 hover:border-fuchsia-500",
    dark: "bg-fuchsia-950/40 border-fuchsia-600/70 text-fuchsia-200 hover:bg-fuchsia-900/60 hover:border-fuchsia-500",
    legendLight: "bg-fuchsia-100 border-fuchsia-400",
    legendDark: "bg-fuchsia-900 border-fuchsia-600",
  },
  "noble gas": {
    light: "bg-sky-50 border-sky-400 text-sky-900 hover:bg-sky-100 hover:border-sky-500",
    dark: "bg-sky-950/40 border-sky-600/70 text-sky-200 hover:bg-sky-900/60 hover:border-sky-500",
    legendLight: "bg-sky-100 border-sky-400",
    legendDark: "bg-sky-900 border-sky-600",
  },
  lanthanide: {
    light: "bg-yellow-50 border-yellow-400 text-yellow-900 hover:bg-yellow-100 hover:border-yellow-500",
    dark: "bg-yellow-950/40 border-yellow-600/70 text-yellow-200 hover:bg-yellow-900/60 hover:border-yellow-500",
    legendLight: "bg-yellow-100 border-yellow-400",
    legendDark: "bg-yellow-900 border-yellow-600",
  },
  actinide: {
    light: "bg-pink-50 border-pink-400 text-pink-900 hover:bg-pink-100 hover:border-pink-500",
    dark: "bg-pink-950/40 border-pink-600/70 text-pink-200 hover:bg-pink-900/60 hover:border-pink-500",
    legendLight: "bg-pink-100 border-pink-400",
    legendDark: "bg-pink-900 border-pink-600",
  },
  unknown: {
    light: "bg-slate-50 border-slate-400 text-slate-900 hover:bg-slate-100 hover:border-slate-500",
    dark: "bg-slate-900/40 border-slate-600/70 text-slate-300 hover:bg-slate-800/60 hover:border-slate-500",
    legendLight: "bg-slate-200 border-slate-400",
    legendDark: "bg-slate-700 border-slate-600",
  },
};

const defaultTileLight = "bg-slate-50 border-slate-400 text-slate-900 hover:bg-slate-100 hover:border-slate-500";
const defaultTileDark = "bg-slate-900/40 border-slate-600/70 text-slate-300 hover:bg-slate-800/60 hover:border-slate-500";
const defaultLegendLight = "bg-slate-200 border-slate-400";
const defaultLegendDark = "bg-slate-700 border-slate-600";

export function getTileClasses(category, isDark) {
  const map = categoryColors[category];
  if (!map) return isDark ? defaultTileDark : defaultTileLight;
  return isDark ? map.dark : map.light;
}

export function getLegendClasses(category, isDark) {
  const map = categoryColors[category];
  if (!map) return isDark ? defaultLegendDark : defaultLegendLight;
  return isDark ? map.legendDark : map.legendLight;
}
