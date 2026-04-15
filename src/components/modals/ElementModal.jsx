import React from "react";
import { formatAtomicMass, getBlock, titleCase } from "../../utils/helpers";
import { useTheme } from "../../contexts/ThemeContext";
import { FiX } from "react-icons/fi";

function DetailField({ label, value, isDark }) {
  return (
    <div className={`rounded-lg border p-3.5 ${
      isDark
        ? "border-slate-800 bg-slate-900/50"
        : "border-gray-200 bg-gray-50"
    }`}>
      <h3
        className={`m-0 text-[9px] font-bold uppercase tracking-wider ${
          isDark ? "text-slate-400" : "text-gray-500"
        }`}
      >
        {label}
      </h3>
      <p
        className={`mt-1 text-sm font-medium ${
          isDark ? "text-slate-100" : "text-gray-900"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

export function ElementModal({ element, onClose }) {
  const { isDark } = useTheme();
  if (!element) return null;

  return (
    <div
      className={`fixed inset-0 z-50 grid place-items-center p-4 transition-all duration-200 ${
        isDark ? "bg-slate-900/80" : "bg-white/80"
      }`}
      onClick={onClose}
    >
      <section
        className={`relative w-full max-w-lg rounded-xl border p-8 shadow-xl ${
          isDark
            ? "border-slate-800 bg-slate-900 text-slate-100"
            : "border-gray-200 bg-white text-gray-900"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={`${element.name} details`}
        onClick={(event) => event.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          className={`absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
            isDark
              ? "text-slate-400 hover:bg-slate-800 hover:text-white"
              : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          }`}
          onClick={onClose}
          aria-label="Close details"
        >
          <FiX size={20} />
        </button>

        {/* Element badge */}
        <div className={`inline-flex items-center gap-2 rounded-md border px-2 py-1 text-[9px] font-bold uppercase tracking-wider ${
          isDark ? "border-slate-800 bg-slate-900 text-slate-300" : "border-gray-200 bg-gray-50 text-gray-600"
        }`}>
          <span className="font-mono tabular-nums">#{element.number}</span>
          <span className="h-1 w-1 rounded-sm bg-current opacity-40" />
          <span>{titleCase(element.category)}</span>
        </div>

        {/* Element name & symbol */}
        <h2 className="mt-4 mb-0.5 text-3xl font-bold tracking-tight leading-none">
          {element.name}
        </h2>
        <p className={`mb-6 text-base font-medium font-mono tabular-nums ${isDark ? "text-slate-400" : "text-gray-500"}`}>
          {element.symbol} · {formatAtomicMass(element.mass)} amu
        </p>

        {/* Detail grid */}
        <div className="grid grid-cols-3 gap-2.5 max-[860px]:grid-cols-2">
          <DetailField
            label="Protons"
            value={element.number}
            isDark={isDark}
          />
          <DetailField
            label="Electrons"
            value={element.number}
            isDark={isDark}
          />
          <DetailField
            label="Neutrons"
            value={Math.max(0, Math.round(Number.parseFloat(element.mass.replace(/\[|\]/g, ""))) - element.number) || "—"}
            isDark={isDark}
          />
          <DetailField label="Group" value={element.group} isDark={isDark} />
          <DetailField
            label="Period"
            value={
              element.period > 7
                ? `${element.period - 2} (detached)`
                : element.period
            }
            isDark={isDark}
          />
          <DetailField
            label="Block"
            value={`${getBlock(element)}-block`}
            isDark={isDark}
          />
          <DetailField
            label="State"
            value={titleCase(element.phase)}
            isDark={isDark}
          />
          <DetailField
            label="Atomic Mass"
            value={`${formatAtomicMass(element.mass)} amu`}
            isDark={isDark}
          />
          <DetailField
            label="Category"
            value={titleCase(element.category)}
            isDark={isDark}
          />
        </div>

        {/* Summary description */}
        <div className={`mt-5 rounded-lg border p-4 text-[13px] leading-relaxed ${
          isDark
            ? "border-slate-800 bg-slate-900/50 text-slate-300"
            : "border-gray-200 bg-gray-50 text-gray-700"
        }`}>
          <strong className={isDark ? "text-slate-100" : "text-gray-900"}>{element.name}</strong> ({element.symbol}) is a <strong className={isDark ? "text-indigo-400" : "text-indigo-600"}>{element.category}</strong> with
          atomic number {element.number}. It resides in Group {element.group}, Period {element.period > 7 ? element.period - 2 : element.period} of
          the {getBlock(element)}-block, and normally exists as a {element.phase} at standard temperature and pressure.
        </div>
      </section>
    </div>
  );
}
