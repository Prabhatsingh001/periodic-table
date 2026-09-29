import { createPortal } from "react-dom";
import { discoveryTimeline } from "../../data/discoveryTimeline";
import { X } from "lucide-react";

export function TimelineModal({ onClose }) {
    return createPortal(
        <div
            className="fixed inset-0 z-[40] grid place-items-center p-2 sm:p-4 pt-16 sm:pt-20 transition-all duration-200 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <section
                className="relative flex w-[min(98vw,780px)] max-h-[90vh] sm:max-h-[85vh] flex-col overflow-hidden rounded-xl border shadow-2xl border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100"
                role="dialog"
                aria-modal="true"
                aria-label="Element discovery timeline"
                onClick={(event) => event.stopPropagation()}
            >
                {/* ── Sticky Header ── */}
                <div className="sticky top-0 z-20 flex items-center justify-between border-b px-4 sm:px-6 py-3 sm:py-4 border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900">
                    <div>
                        <p className="m-0 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                            Discovery History
                        </p>
                        <h2 className="m-0 mt-1 text-lg sm:text-xl font-bold tracking-tight text-slate-800 dark:text-white">
                            Element Timeline
                        </h2>
                    </div>

                    <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-md transition-colors text-gray-500 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white"
                        onClick={onClose}
                        aria-label="Close timeline"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="relative flex-1 overflow-y-auto px-3 py-6 sm:px-6 sm:py-8 md:px-12 bg-white dark:bg-slate-900">
                    {/* Center line - hidden on very small screens */}
                    <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px sm:-translate-x-1/2 bg-gray-200 dark:bg-slate-800" />

                    <div className="flex flex-col gap-6 sm:gap-10">
                        {discoveryTimeline.map((entry, index) => {
                        const isRightSide = index % 2 === 0;
                        return (
                            <div
                                key={`${entry.year}-${entry.location}`}
                                className={`relative flex w-full 
                                    /* Mobile: always left-aligned; Desktop: alternating */
                                    justify-start sm:${isRightSide ? "justify-end" : "justify-start"}`}
                            >
                                {/* Node - left on mobile, center on sm+ */}
                                <div className="absolute left-6 sm:left-1/2 top-[20px] sm:top-[24px] z-10 -translate-x-1/2">
                                    <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full border-2 border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
                                </div>

                                {/* Connector line - from left node to card on mobile, center on sm+ */}
                                <div
                                    className={`absolute top-[24px] sm:top-[29px] h-px bg-gray-200 dark:bg-slate-800
                                        /* Mobile: always right of left-line */
                                        left-[28px] w-3 
                                        /* sm+: original positioning */
                                        sm:left-auto sm:w-[calc(5%-4px)] ${
                                        isRightSide ? "sm:left-[50%] sm:ml-2" : "sm:right-[50%] sm:mr-2"
                                    }`}
                                />

                                {/* Card */}
                                <div className="relative w-[calc(100%-48px)] ml-auto sm:ml-0 sm:w-[43%]">
                                    <article className="group relative rounded-lg border p-3 sm:p-4 transition-colors border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900/50 hover:bg-gray-100 dark:hover:bg-slate-800/80">
                                        <span className="inline-block font-mono tabular-nums rounded border px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-bold tracking-wider border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-300">
                                            {entry.year}
                                        </span>

                                        <p className="mt-1.5 sm:mt-2 mb-1.5 sm:mb-2 text-xs sm:text-sm font-semibold text-gray-800 dark:text-slate-200">
                                            {entry.location}
                                        </p>

                                        <div className="flex flex-wrap gap-1">
                                            {entry.elements.map((el) => (
                                                <span
                                                    key={el}
                                                    className="rounded px-1 sm:px-1.5 py-0.5 text-[9px] sm:text-[10px] font-medium transition-colors bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-400 border border-gray-200 dark:border-slate-700 group-hover:border-gray-300 dark:group-hover:border-slate-600 group-hover:bg-gray-100 dark:group-hover:bg-slate-700 group-hover:text-gray-900 dark:group-hover:text-slate-200"
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
        </div>,
        document.body
    );
}
