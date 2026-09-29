// Single source of truth for element category colors.
// Muted, vintage-inspired palette for the retro aesthetic.

export const categoryColorMap = {
  "alkali metal":           "#a0522d",  // sienna brown
  "alkaline earth metal":   "#b8860b",  // dark goldenrod
  "transition metal":       "#5f7d8e",  // muted steel
  "post-transition metal":  "#6b8e6b",  // sage green
  "metalloid":              "#8b7355",  // warm khaki
  "diatomic nonmetal":      "#7b6b8a",  // dusty lavender
  "polyatomic nonmetal":    "#7b6b8a",  // dusty lavender
  "noble gas":              "#8e6b8a",  // muted mauve
  "lanthanide":             "#a0736b",  // warm rose
  "actinide":               "#5b8a7a",  // muted teal
  "unknown, probably transition metal":       "#5f7d8e",
  "unknown, probably post-transition metal":  "#6b8e6b",
  "unknown, probably metalloid":              "#8b7355",
  "unknown, predicted to be noble gas":       "#8e6b8a",
  "unknown, but predicted to be an alkali metal": "#a0522d",
};

// Legend items shown in the FilterPanel
export const legendCategories = [
  { id: "alkali metal",           label: "Alkali Metal",     color: "#a0522d" },
  { id: "alkaline earth metal",   label: "Alkaline Earth",   color: "#b8860b" },
  { id: "transition metal",       label: "Transition Metal", color: "#5f7d8e" },
  { id: "post-transition metal",  label: "Post-Transition",  color: "#6b8e6b" },
  { id: "metalloid",              label: "Metalloid",        color: "#8b7355" },
  { id: "nonmetal",               label: "Nonmetal",         color: "#7b6b8a" },
  { id: "noble gas",              label: "Noble Gas",        color: "#8e6b8a" },
  { id: "lanthanide",             label: "Lanthanide",       color: "#a0736b" },
  { id: "actinide",               label: "Actinide",         color: "#5b8a7a" },
  { id: "unknown",                label: "Unknown",          color: "#7a7062" },
];

// Get the color for any element based on its category
export function getCategoryColor(category) {
  return categoryColorMap[category] || "#7a7062";
}
