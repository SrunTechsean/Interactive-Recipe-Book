import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import "./styles/index.css";
import "./styles/tokens.css";

import FavoritesProvider from "./contexts/FavoritesContext";
import FilterProvider from "./contexts/FilterContext";

import { seedRecipes } from "./data/seedData";
import { storage } from "./lib/storage";

// Store seedRecipes once into localStorage
if (!storage.getRecipes()) {
  storage.setRecipes(seedRecipes);
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <FilterProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </FilterProvider>
    </BrowserRouter>
  </StrictMode>,
);
