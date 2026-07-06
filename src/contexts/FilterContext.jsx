import { createContext, useContext, useEffect, useState } from "react";
import { storage } from "../lib/storage";

const FilterContext = createContext();

export const useFilters = () => {
  const ctx = useContext(FilterContext);
  if (!ctx) {
    throw new Error("useFilters must be inside FilterProvider");
  }
  return ctx;
};

export default function FilterProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Store obj of filtered query and category
  useEffect(() => {
    storage.setFilters({ searchQuery, selectedCategory });
  }, [searchQuery, selectedCategory]);

  // Load saved Filter
  useEffect(() => {
    const savedFilter = storage.getFilters();
    if (savedFilter) {
      setSearchQuery(savedFilter.searchQuery || "");
      setSelectedCategory(savedFilter.selectedCategory || "All");
    }
  }, []);

  const clearFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
  };

  return (
    <FilterContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
