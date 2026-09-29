export const getPropertyRange = (elements, property) => {
  const values = elements.map(e => e[property]).filter(v => v !== null && v !== undefined);
  if (values.length === 0) return { min: 0, max: 1 };
  return { min: Math.min(...values), max: Math.max(...values) };
};

const hslToHex = (h, s, l) => {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

export const getHeatmapColor = (value, min, max, isDark = true) => {
  if (value === null || value === undefined) return isDark ? '#666666' : '#8c8c8c';
  // simple lerp from blue to red based on percentage
  const pct = (value - min) / (max - min || 1);
  // HSL from cyan/blue (200) to red (0)
  const hue = (1 - pct) * 200; 
  // Use a darker lightness in light mode so yellows and cyans are legible
  const lightness = isDark ? 60 : 40;
  return hslToHex(hue, 80, lightness);
};


export const formatNumber = (num) => {
  if (num === null || num === undefined) return 'N/A';
  return Number.isInteger(num) ? num : parseFloat(num).toFixed(2);
};
