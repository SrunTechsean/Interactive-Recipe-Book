import { createContext, useContext, useState, useEffect } from "react";
import { storage } from "../lib/storage";
import { seedRecipes } from "../data/seedData";

const RecipeContext = createContext();

export function RecipeProvider({ children }) {
    const [recipes, setRecipes] = useState([]);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        const stored = storage.getRecipes();
        setRecipes(stored ?? seedRecipes);
        setHydrated(true);
    }, []);

    useEffect(() => {
        if (hydrated) storage.setRecipes(recipes);
        }, [recipes, hydrated]);
  
    const getRecipeById = (id) => recipes.find((r) => String(r.id) === String(id));

  return (
    <RecipeContext.Provider
      value={{ recipes, getRecipeById }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipes() {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipes must be used within a RecipeProvider");
  }
  return context;
}