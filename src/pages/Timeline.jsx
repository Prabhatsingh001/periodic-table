import { useState } from "react";
import { discoveryTimeline } from "../data/discoveryTimeline";
import { FlaskConical, MapPin, Atom } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

/* ── era colors for the glowing timeline nodes ── */
const getEraStyle = (year) => {
    if (year === "Ancient Era") return { accent: "#cd7f32", glow: "rgba(205,127,50,0.4)", era: "Ancient" };
    const num = parseInt(year);
    if (isNaN(num)) return { accent: "#cd7f32", glow: "rgba(205,127,50,0.4)", era: "Ancient" };
    if (num < 1800) return { accent: "#b87333", glow: "rgba(184,115,51,0.4)", era: "Age of Discovery" };
    if (num < 1870) return { accent: "#c9b037", glow: "rgba(201,176,55,0.4)", era: "Classical Era" };
    if (num < 1900) return { accent: "#50c878", glow: "rgba(80,200,120,0.4)", era: "Noble Gas Era" };
    if (num < 1950) return { accent: "#e74c3c", glow: "rgba(231,76,60,0.4)", era: "Atomic Age" };
    if (num < 2000) return { accent: "#9b59b6", glow: "rgba(155,89,182,0.4)", era: "Transuranium" };
    return { accent: "#3498db", glow: "rgba(52,152,219,0.4)", era: "Modern" };
};

const TimelineCard = ({ entry, index, isExpanded, onToggle }) => {
    const { accent, glow, era } = getEraStyle(entry.year);
    const isEven = index % 2 === 0;

    return (
        <div className={`relative flex items-start w-full group
            /* Mobile: always left */ justify-start pl-12 sm:pl-0
            /* Desktop: alternating */ ${isEven ? "sm:flex-row-reverse" : "sm:flex-row"}`}
        >
            {/* ── Timeline Node ── */}
            <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 z-20 flex flex-col items-center">
                <div
                    className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-[2.5px] transition-all duration-500 group-hover:scale-125"
                    style={{
                        borderColor: accent,
                        backgroundColor: `${accent}30`,
                        boxShadow: `0 0 12px ${glow}, 0 0 4px ${glow}`,
                    }}
                />
                {/* Tick marks — small retro dashes */}
                <div className="hidden sm:flex flex-col items-center gap-[3px] mt-1">
                    <div className="w-px h-2 rounded-full" style={{ backgroundColor: `${accent}50` }} />
                    <div className="w-px h-1 rounded-full" style={{ backgroundColor: `${accent}30` }} />
                </div>
            </div>

            {/* ── Connector arm ── */}
            <div
                className={`absolute top-[7px] sm:top-[9px] h-px hidden sm:block
                    ${isEven ? "right-1/2 mr-3" : "left-1/2 ml-3"}`}
                style={{
                    width: "calc(6% - 8px)",
                    background: `linear-gradient(${isEven ? "to left" : "to right"}, ${accent}60, transparent)`,
                }}
            />

            {/* ── Spacer for the other side (desktop) ── */}
            <div className="hidden sm:block sm:w-1/2" />

            {/* ── Card ── */}
            <div className="w-full sm:w-[46%]">
                <article
                    onClick={onToggle}
                    className="relative cursor-pointer overflow-hidden rounded-lg border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                    style={{
                        backgroundColor: 'var(--card-bg)',
                        borderColor: 'var(--card-border)',
                        color: 'var(--text-primary)'
                    }}
                >
                    {/* Aged paper texture overlay */}
                    <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M0 0h1v1H0zM10 10h1v1h-1zM20 0h1v1h-1zM30 10h1v1h-1zM0 20h1v1H0zM10 30h1v1h-1zM20 20h1v1h-1zM30 30h1v1h-1z'/%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                    />

                    {/* Top accent bar */}
                    <div
                        className="h-[2px] w-full"
                        style={{ background: `linear-gradient(to right, transparent, ${accent}, transparent)` }}
                    />

                    <div className="p-3 sm:p-4">
                        {/* Year badge + Era tag */}
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                            <span
                                className="inline-flex items-center gap-1.5 font-['JetBrains_Mono',monospace] tabular-nums 
                                    px-2 sm:px-2.5 py-0.5 sm:py-1 rounded text-[11px] sm:text-xs font-bold tracking-wider
                                    border"
                                style={{
                                    color: accent,
                                    borderColor: `${accent}40`,
                                    backgroundColor: `${accent}10`,
                                    textShadow: `0 0 8px ${glow}`,
                                }}
                            >
                                <FlaskConical size={11} className="sm:w-3 sm:h-3" />
                                {entry.year}
                            </span>
                            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-semibold opacity-60 font-['JetBrains_Mono',monospace]"
                                style={{ color: accent }}
                            >
                                {era}
                            </span>
                        </div>

                        {/* Location */}
                        <div className="flex items-start gap-1.5 mb-2 sm:mb-3">
                            <MapPin size={12} className="mt-0.5 flex-shrink-0 sm:w-3.5 sm:h-3.5" style={{ color: 'var(--text-muted)' }} />
                            <p className="text-xs sm:text-sm font-medium italic leading-snug" style={{ color: 'var(--text-secondary)' }}>
                                {entry.location}
                            </p>
                        </div>

                        {/* Elements */}
                        <div className={`flex flex-wrap gap-1 sm:gap-1.5 transition-all duration-300 ${
                            !isExpanded && entry.elements.length > 4 ? "max-h-[52px] overflow-hidden" : ""
                        }`}>
                            {entry.elements.map((el) => (
                                <span
                                    key={el}
                                    className="inline-flex items-center gap-1 rounded-sm px-1.5 sm:px-2 py-0.5 sm:py-1
                                        text-[9px] sm:text-[10px] font-['JetBrains_Mono',monospace] font-medium tracking-wide
                                        transition-all duration-200 hover:scale-105 border"
                                    style={{
                                        backgroundColor: 'var(--hover-bg)',
                                        borderColor: 'var(--divider)',
                                        color: 'var(--text-primary)'
                                    }}
                                >
                                    <Atom size={8} className="opacity-50" />
                                    {el}
                                </span>
                            ))}
                        </div>

                        {/* "Show more" hint */}
                        {!isExpanded && entry.elements.length > 4 && (
                            <p className="text-[9px] sm:text-[10px] mt-1.5 font-['JetBrains_Mono',monospace] tracking-wider uppercase opacity-60" style={{ color: 'var(--text-muted)' }}>
                                + {entry.elements.length - 3} more — tap to reveal
                            </p>
                        )}
                    </div>

                    {/* Corner ornament */}
                    <div className="absolute -bottom-3 -right-3 w-10 h-10 sm:w-12 sm:h-12 opacity-[0.04] dark:opacity-[0.03] pointer-events-none" style={{ color: 'var(--text-primary)' }}>
                        <Atom size={40} className="sm:w-12 sm:h-12" />
                    </div>
                </article>
            </div>
        </div>
    );
};

const Timeline = () => {
    const { isDark } = useTheme();
    const [expandedCards, setExpandedCards] = useState(new Set());

    const toggleCard = (index) => {
        setExpandedCards(prev => {
            const next = new Set(prev);
            if (next.has(index)) next.delete(index);
            else next.add(index);
            return next;
        });
    };

    return (
        <div className="max-w-6xl 2xl:max-w-7xl mx-auto flex flex-col gap-4 sm:gap-6 lg:gap-8">
            <div>
                <div className="flex items-center gap-2 mb-1 sm:mb-2">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-[0.15em] font-['Playfair_Display',serif]"
                        style={{ color: 'var(--accent)' }}
                    >
                        Discovery Timeline
                    </h1>
                    <span className="text-[10px] font-['JetBrains_Mono',monospace] tracking-widest px-2 py-0.5 rounded border hidden sm:inline-block"
                        style={{ borderColor: 'var(--divider)', color: 'var(--text-muted)', backgroundColor: 'var(--hover-bg)' }}
                    >
                        LABORATORY ARCHIVES
                    </span>
                </div>
                <p className="text-sm sm:text-base" style={{ color: 'var(--text-muted)' }}>The chronological history of element discoveries.</p>
            </div>

            <div className="glass rounded-xl sm:rounded-2xl border-t-2" style={{ borderTopColor: 'var(--accent)' }}>
                {/* ── Body ── */}
                <div className="relative px-3 py-6 sm:px-6 sm:py-8 md:px-10 rounded-b-xl sm:rounded-b-2xl">
                    {/* Central timeline spine */}
                    <div
                        className="absolute left-[20px] sm:left-1/2 top-0 bottom-0 w-px sm:-translate-x-1/2"
                        style={{
                            background: "linear-gradient(to bottom, transparent, var(--divider) 5%, var(--divider) 95%, transparent)",
                        }}
                    />

                    {/* Dashed overlay on spine */}
                    <div
                        className="absolute left-[20px] sm:left-1/2 top-0 bottom-0 w-px sm:-translate-x-1/2 opacity-50"
                        style={{
                            backgroundImage: "repeating-linear-gradient(to bottom, var(--divider) 0px, var(--divider) 4px, transparent 4px, transparent 12px)",
                        }}
                    />

                    <div className="flex flex-col gap-6 sm:gap-8 relative">
                        {discoveryTimeline.map((entry, index) => (
                            <TimelineCard
                                key={`${entry.year}-${entry.location}`}
                                entry={entry}
                                index={index}
                                isExpanded={expandedCards.has(index)}
                                onToggle={() => toggleCard(index)}
                            />
                        ))}

                        {/* End marker */}
                        <div className="flex justify-center sm:justify-center relative">
                            <div className="absolute left-[17px] sm:left-1/2 sm:-translate-x-1/2 top-0">
                                <div className="w-2.5 h-2.5 rounded-full border"
                                    style={{ backgroundColor: "var(--accent-soft)", borderColor: "var(--accent-glow)", boxShadow: "0 0 8px var(--accent-glow)" }}
                                />
                            </div>
                            <p className="ml-12 sm:ml-0 text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-[0.3em] mt-6 opacity-60"
                                style={{ color: "var(--text-muted)" }}
                            >
                                — End of Known Record —
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom ornamental bar */}
                <div className="h-8 sm:h-10 flex items-center justify-center border-t border-b-0 rounded-b-xl sm:rounded-b-2xl"
                    style={{ borderColor: "var(--divider)", backgroundColor: 'var(--card-bg)' }}
                >
                    <div className="chem-divider w-full max-w-[80%] mx-auto">
                        <p className="text-[8px] sm:text-[9px] font-['JetBrains_Mono',monospace] uppercase tracking-[0.3em] opacity-80"
                            style={{ color: "var(--text-muted)" }}
                        >
                            118 Elements • {discoveryTimeline.length} Eras Catalogued
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Timeline;
