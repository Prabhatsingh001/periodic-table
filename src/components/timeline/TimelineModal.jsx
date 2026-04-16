import React from "react";
import { discoveryTimeline } from "../../data/discoveryTimeline";
import { useTheme } from "../../contexts/ThemeContext";
import { FiX } from "react-icons/fi";

export function TimelineModal({ onClose }) {
    const { isDark } = useTheme();
    return (
        <div
        className={`fixed inset-0 z-50 grid place-items-center p-4 transition-all duration-200 ${
            isDark ? "bg-slate-900/80" : "bg-white/80"
        }`}
        onClick={onClose}
        >
            <section
                className={`relative flex w-[min(96vw,780px)] max-h-[90vh] flex-col overflow-hidden rounded-xl border shadow-xl ${
                isDark
                    ? "border-slate-800 bg-slate-900 text-slate-100"
                    : "border-gray-200 bg-white text-gray-900"
                }`}
                role="dialog"
                aria-modal="true"
                aria-label="Element discovery timeline"
                onClick={(event) => event.stopPropagation()}
            >
                {/* ── Sticky Header ── */}
                <div className={`sticky top-0 z-20 flex items-center justify-between border-b px-6 py-4 ${
                isDark ? "border-slate-800 bg-slate-900" : "border-gray-200 bg-gray-200/50"
                }`}>
                    <div>
                        <p className={`m-0 text-[10px] font-bold uppercase tracking-wider ${
                        isDark ? "text-slate-500" : "text-gray-500"
                        }`}>
                            Discovery History
                        </p>
                        <h2 className="m-0 mt-1 text-xl font-bold tracking-tight">
                            Element Timeline
                        </h2>
                    </div>

                    <button
                        type="button"
                        className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
                        isDark
                            ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                            : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                        onClick={onClose}
                        aria-label="Close timeline"
                    >
                        <FiX size={20} />
                    </button>
                </div>

                <div className="relative flex-1 overflow-y-auto px-6 py-8 sm:px-12 bg-inherit">
                    <div className={`absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 ${
                        isDark
                        ? "bg-slate-800"
                        : "bg-gray-200"
                    }`} />

                    <div className="flex flex-col gap-10">
                        {discoveryTimeline.map((entry, index) => {
                        const isLeft = index % 2 === 0;
                        return (
                            <div
                            key={`${entry.year}-${entry.location}`}
                            className={`relative flex w-full ${isLeft ? "justify-end" : "justify-start"}`}
                            >
                            {/* Node */}
                            <div className="absolute left-1/2 top-5 z-10 -translate-x-1/2">
                                <div
                                className={`relative h-3 w-3 rounded-full border-2 ${
                                    isDark
                                    ? "border-slate-700 bg-slate-900"
                                    : "border-gray-300 bg-white"
                                }`}
                                />
                            </div>

                            {/* Connector line from node to card */}
                            <div
                                className={`absolute top-6.25 h-px w-[calc(5%-4px)] ${
                                isLeft
                                    ? "left-[50%] ml-2"
                                    : "right-[50%] mr-2"
                                } ${isDark ? "bg-slate-800" : "bg-gray-200"}`}
                            />

                            {/* Card */}
                            <div
                                className={`relative w-[43%] ${isLeft ? "" : ""}`}
                            >
                                <article
                                className={`group relative rounded-lg border p-4 transition-colors ${
                                    isDark
                                    ? "border-slate-800 bg-slate-900/50 hover:bg-slate-800/80"
                                    : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                                }`}
                                >
                                {/* Year badge */}
                                <span
                                    className={`inline-block font-mono tabular-nums rounded border px-2 py-0.5 text-[10px] font-bold tracking-wider ${
                                    isDark
                                        ? "border-slate-700 bg-slate-800 text-slate-300"
                                        : "border-gray-200 bg-white text-gray-600"
                                    }`}
                                >
                                    {entry.year}
                                </span>

                                <p
                                    className={`mt-2 mb-2 text-sm font-semibold ${
                                    isDark
                                        ? "text-slate-200"
                                        : "text-gray-800"
                                    }`}
                                >
                                    {entry.location}
                                </p>

                                <div className="flex flex-wrap gap-1">
                                    {entry.elements.map((el) => (
                                    <span
                                        key={el}
                                        className={`rounded px-1.5 py-0.5 text-[10px] font-medium transition-colors ${
                                        isDark
                                            ? "bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200"
                                            : "bg-white text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-900"
                                        }`}
                                    >
                                        {el}
                                    </span>
                                    ))}
                                </div>
                                </article>
                            </div>
                            </div>
                        );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}
