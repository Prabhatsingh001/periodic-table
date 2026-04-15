export function getBlock(element) {
  if (element.category === "lanthanide" || element.category === "actinide")
    return "f";
  if (element.group <= 2) return "s";
  if (element.group >= 13) return "p";
  return "d";
}

export function titleCase(value) {
  return value
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatAtomicMass(mass) {
  if (typeof mass !== "string") return mass;
  if (mass.startsWith("[") && mass.endsWith("]")) return mass;

  const numericMass = Number.parseFloat(mass);
  if (Number.isNaN(numericMass)) return mass;

  return numericMass.toFixed(3);
}
