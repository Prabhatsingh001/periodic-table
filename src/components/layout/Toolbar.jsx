import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { FiSearch, FiLayers, FiGrid, FiList } from "react-icons/fi";

export function Toolbar({
  searchQuery,
  onSearchChange,
  filterGroup,
  onFilterGroupChange,
  filterPeriod,
  onFilterPeriodChange,
}) {
  const { isDark } = useTheme();

  return (
    <div
      className={`relative z-10 mx-auto mb-8 flex w-full max-w-5xl flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between ${
        isDark ? "border-slate-800 bg-slate-900" : "border-gray-200 bg-white"
      }`}
    >
      {/* Search Input */}
      <div className="relative flex-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <FiSearch className={isDark ? "text-slate-500" : "text-gray-400"} />
        </div>
        <input
          type="text"
          placeholder="Search by name, symbol, or number..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className={`block w-full rounded-md border py-2 pl-10 pr-3 text-sm focus:outline-none focus:ring-1 transition-colors ${
            isDark
              ? "border-slate-700 bg-slate-800 text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:ring-indigo-500"
              : "border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
          }`}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Group Filter */}
        <div className="flex items-center gap-2">
          <FiGrid className={isDark ? "text-slate-500" : "text-gray-400"} />
          <select
            value={filterGroup}
            onChange={(e) => onFilterGroupChange(e.target.value)}
            className={`block min-w-[120px] rounded-md border py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-1 transition-colors ${
              isDark
                ? "border-slate-700 bg-slate-800 text-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                : "border-gray-300 bg-gray-50 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500"
            }`}
          >
            <option value="all">All Groups</option>
            {Array.from({ length: 18 }, (_, i) => i + 1).map((group) => (
              <option key={`group-${group}`} value={group.toString()}>
                Group {group}
              </option>
            ))}
          </select>
        </div>

        {/* Period Filter */}
        <div className="flex items-center gap-2">
          <FiLayers className={isDark ? "text-slate-500" : "text-gray-400"} />
          <select
            value={filterPeriod}
            onChange={(e) => onFilterPeriodChange(e.target.value)}
            className={`block min-w-[120px] rounded-md border py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-1 transition-colors ${
              isDark
                ? "border-slate-700 bg-slate-800 text-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                : "border-gray-300 bg-gray-50 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500"
            }`}
          >
            <option value="all">All Periods</option>
            {Array.from({ length: 7 }, (_, i) => i + 1).map((period) => (
              <option key={`period-${period}`} value={period.toString()}>
                Period {period}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
