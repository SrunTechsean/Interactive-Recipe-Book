import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import "./styles/index.css";
import "./styles/tokens.css";

import FavoritesProvider from "./contexts/FavoritesContext";
import FilterProvider from "./contexts/FilterContext";

import { seedDatabase } from "./lib/seedDB.js";

// Store seedRecipes and images once into localStorage & indexedDB
await seedDatabase();

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
