import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import RecipeLibrary from "./pages/RecipeLibrary";

function App() {
  return (
    <div className="app">
      <Navbar />

      <main className="content">
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Favorites />} path="/favorites" />
          <Route element={<RecipeLibrary />} path="/recipes" />
        </Routes>
      </main>
    </div>
  );
}

export default App;
