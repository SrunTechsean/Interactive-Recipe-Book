import { createContext, useState } from "react";

export const FilterContext = createContext();

export default function FilterProvider({ children }) {
  const [query, setQuery] = useState("");

  return (
    <FilterContext.Provider value={{ query, setQuery }}>
      {children}
    </FilterContext.Provider>
  );
}
