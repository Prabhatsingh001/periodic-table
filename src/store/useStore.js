import { create } from 'zustand';

export const useStore = create((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  filters: {
    category: [],
    phase: [],
    group: [],
    period: []
  },
  setFilters: (newFilters) => set((state) => ({ 
    filters: { ...state.filters, ...newFilters } 
  })),
  clearFilters: () => set({ 
    filters: { category: [], phase: [], group: [], period: [] } 
  }),

  selectedElements: [],
  toggleSelectedElement: (element) => set((state) => {
    const isSelected = state.selectedElements.find(e => e.symbol === element.symbol);
    if (isSelected) {
      return { selectedElements: state.selectedElements.filter(e => e.symbol !== element.symbol) };
    }
    if (state.selectedElements.length < 3) {
      return { selectedElements: [...state.selectedElements, element] };
    }
    return state;
  }),
  clearSelectedElements: () => set({ selectedElements: [] }),

  selectedTrend: "atomicRadius",
  setSelectedTrend: (trend) => set({ selectedTrend: trend })
}));
