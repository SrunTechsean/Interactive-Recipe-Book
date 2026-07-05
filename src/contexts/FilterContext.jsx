import { createContext, useEffect, useState } from "react";
import { storage } from "../lib/storage";

export const FilterContext = createContext();

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
    setSearchQuery();
  };

  return (
    <FilterContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
