import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddRecipe from "./pages/AddRecipe";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import RecipeLibrary from "./pages/RecipeLibrary";

function App() {
  return (
    <div className="app">
      <Navbar />

      <main className="content">
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Favorites />} path="/favorites" />
          <Route element={<AddRecipe />} path="/add" />
          <Route element={<RecipeLibrary />} path="/recipes" />
          <Route element={<RecipeDetail />} path="/recipes/:id" />
        </Routes>
      </main>
    </div>
  );
}

export default App;
