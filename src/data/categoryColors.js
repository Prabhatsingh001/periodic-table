// Single source of truth for element category colors.
// Colors matched to the reference periodic table image.

export const categoryColorMap = {
  "alkali metal":           "#C0392B",  // deep red
  "alkaline earth metal":   "#D4730F",  // warm orange
  "transition metal":       "#2E86C1",  // steel blue
  "post-transition metal":  "#1ABC9C",  // teal green
  "metalloid":              "#B7950B",  // golden amber
  "diatomic nonmetal":      "#6C3483",  // deep purple
  "polyatomic nonmetal":    "#6C3483",  // deep purple
  "noble gas":              "#8E44AD",  // violet
  "lanthanide":             "#C2185B",  // hot pink
  "actinide":               "#00838F",  // ocean teal
  "unknown, probably transition metal":       "#2E86C1",
  "unknown, probably post-transition metal":  "#1ABC9C",
  "unknown, probably metalloid":              "#B7950B",
  "unknown, predicted to be noble gas":       "#8E44AD",
  "unknown, but predicted to be an alkali metal": "#C0392B",
};

// Legend items shown in the FilterPanel
export const legendCategories = [
  { id: "alkali metal",           label: "Alkali Metal",     color: "#C0392B" },
  { id: "alkaline earth metal",   label: "Alkaline Earth",   color: "#D4730F" },
  { id: "transition metal",       label: "Transition Metal", color: "#2E86C1" },
  { id: "post-transition metal",  label: "Post-Transition",  color: "#1ABC9C" },
  { id: "metalloid",              label: "Metalloid",        color: "#B7950B" },
  { id: "nonmetal",               label: "Nonmetal",         color: "#6C3483" },
  { id: "noble gas",              label: "Noble Gas",        color: "#8E44AD" },
  { id: "lanthanide",             label: "Lanthanide",       color: "#C2185B" },
  { id: "actinide",               label: "Actinide",         color: "#00838F" },
  { id: "unknown",                label: "Unknown",          color: "#546E7A" },
];

// Get the color for any element based on its category
export function getCategoryColor(category) {
  return categoryColorMap[category] || "#546E7A";
}
