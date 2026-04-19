export const getPropertyRange = (elements, property) => {
  const values = elements.map(e => e[property]).filter(v => v !== null && v !== undefined);
  if (values.length === 0) return { min: 0, max: 1 };
  return { min: Math.min(...values), max: Math.max(...values) };
};

export const getHeatmapColor = (value, min, max) => {
  if (value === null || value === undefined) return 'rgba(255, 255, 255, 0.1)';
  // simple lerp from blue to red based on percentage
  const pct = (value - min) / (max - min || 1);
  // HSL from cyan/blue (200) to red (0)
  const hue = (1 - pct) * 200; 
  return `hsl(${hue}, 80%, 60%)`;
};


export const formatNumber = (num) => {
  if (num === null || num === undefined) return 'N/A';
  return Number.isInteger(num) ? num : parseFloat(num).toFixed(2);
};
