import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { FiMoon, FiSun, FiClock } from "react-icons/fi";

function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
        isDark
          ? "border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"
          : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900"
      }`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? <FiMoon className="text-base" /> : <FiSun className="text-base" />}
      <span>{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}

function TimelineToggle({ isDark, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
        isDark
          ? "border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"
          : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900"
      }`}
      aria-label="Open discovery timeline"
    >
      <FiClock className="text-base" />
      <span>Timeline</span>
    </button>
  );
}

export function Header({ onOpenTimeline }) {
  const { isDark, toggleTheme } = useTheme();
  return (
    <header
      className={`relative z-10 mx-auto mb-8 flex w-full max-w-[1320px] items-center justify-between rounded-xl border px-6 py-4 sm:px-8 max-[600px]:flex-col max-[600px]:gap-4 ${
        isDark
          ? "border-slate-800 bg-slate-900"
          : "border-gray-200 bg-white"
      }`}
    >
      <div className="flex flex-col items-start max-[600px]:items-center">
        <h1
          className={`m-0 text-xl sm:text-2xl font-bold tracking-tight leading-none ${
            isDark ? "text-slate-100" : "text-gray-900"
          }`}
        >
          Periodic Table
        </h1>
        <p
          className={`mt-1 text-[10px] font-medium uppercase tracking-wider ${
            isDark ? "text-slate-500" : "text-gray-500"
          }`}
        >
          Interactive Chemistry Atlas
        </p>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
        <TimelineToggle isDark={isDark} onOpen={onOpenTimeline} />
      </div>
    </header>
  );
}
