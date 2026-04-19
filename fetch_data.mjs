import fs from 'fs';
import pt from 'periodic-table';

async function generate() {
  try {
    const res = await fetch("https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json");
    const data = await res.json();
    const elements = data.elements.map(e => {
      // atomic_radius from JSON is sometimes missing; fall back to periodic-table npm package
      let atomicRadius = e.atomic_radius || null;
      if (!atomicRadius && ptElement && ptElement.atomicRadius !== 'Unknown' && ptElement.atomicRadius !== '') {
        const parsed = parseInt(ptElement.atomicRadius, 10);
        if (!isNaN(parsed)) {
            atomicRadius = parsed;
        }
      }

      return {
          atomicNumber: e.number,
          symbol: e.symbol,
          name: e.name,
          atomicMass: e.atomic_mass,
          category: e.category,
          group: e.group || e.xpos,
          period: e.period || e.ypos,
          xpos: e.xpos,
          ypos: e.ypos,
          phase: (e.phase || "solid").toLowerCase(),
          electronConfiguration: e.electron_configuration,
          electronegativity: e.electronegativity_pauling || null,
          atomicRadius: atomicRadius,
          ionizationEnergy: e.ionization_energies?.[0] || null,
          discoveredBy: e.discovered_by || "Unknown",
          yearDiscovered: e.discovery_year || "Unknown",
          summary: e.summary,
      };
    });
    
    const content = `export const elements = ${JSON.stringify(elements, null, 2)};\n`;
    fs.writeFileSync("src/data/elements.js", content);
    console.log("Successfully generated src/data/elements.js with merged atomic radii");
  } catch(e) {
    console.error(e);
  }
}
generate();
