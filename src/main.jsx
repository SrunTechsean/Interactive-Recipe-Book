import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/tokens.css";
import FilterProvider from "./contexts/FilterContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";

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
