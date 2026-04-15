import React, { useMemo, useState } from "react";
import { elements } from "./data/elements";
import { useTheme } from "./contexts/ThemeContext";
import { Header } from "./components/layout/Header";
import { Toolbar } from "./components/layout/Toolbar";
import { PeriodicTable } from "./components/table/PeriodicTable";
import { Legend } from "./components/table/Legend";
import { ElementModal } from "./components/modals/ElementModal";
import { TimelineModal } from "./components/timeline/TimelineModal";

function App() {
    const { isDark } = useTheme();
    const [isTimelineOpen, setIsTimelineOpen] = useState(false);
    const [selectedElement, setSelectedElement] = useState(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [filterGroup, setFilterGroup] = useState("all");
    const [filterPeriod, setFilterPeriod] = useState("all");

    const categories = useMemo(() => {
        return Array.from(new Set(elements.map((item) => item.category)));
    }, []);

    return (
        <div
        className={`relative min-h-screen overflow-x-hidden ${
            isDark
            ? "bg-[#060918] text-slate-100"
            : "bg-gray-100 text-slate-900"
        }`}
        >

        <div className="relative z-10 px-4 py-8 sm:px-8 sm:py-12">
            <Header onOpenTimeline={() => setIsTimelineOpen(true)} />

            <Toolbar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filterGroup={filterGroup}
              onFilterGroupChange={setFilterGroup}
              filterPeriod={filterPeriod}
              onFilterPeriodChange={setFilterPeriod}
            />

            <Legend categories={categories} />

            <PeriodicTable 
              onElementSelect={setSelectedElement}
              searchQuery={searchQuery}
              filterGroup={filterGroup}
              filterPeriod={filterPeriod}
            />
        </div>

        {selectedElement && (
            <ElementModal
            element={selectedElement}
            onClose={() => setSelectedElement(null)}
            />
        )}

        {isTimelineOpen && (
            <TimelineModal onClose={() => setIsTimelineOpen(false)} />
        )}
        </div>
    );
}

export default App;
