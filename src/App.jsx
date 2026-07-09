import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddRecipe from "./pages/AddRecipe";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import RecipeLibrary from "./pages/RecipeLibrary";
import RecipeDetail from "./pages/RecipeDetail";
import "./styles/App.css";
import { RecipeProvider } from "./contexts/RecipeContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";

function App() {
  return (
    <RecipeProvider>
      <FavoritesProvider>
        <div className="app">
          <Navbar />

          <main className="content">
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Favorites />} path="/favorites" />
            <Route element={<AddRecipe />} path="/add" />
            <Route element={<RecipeLibrary />} path="/recipes" />
            <Route path="/recipes/:id" element={<RecipeDetail />} />
          </Routes>
          </main>
      </div>
    </FavoritesProvider>
  </RecipeProvider>
  );
}

export default App;
