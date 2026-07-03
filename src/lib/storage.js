const STORAGE_KEYS = {
  RECIPES: "ts_recipes",
};

export const storage = {
  getRecipe: () => {
    try {
      const raw = localStorage.getItem(`${STORAGE_KEYS.RECIPES}`);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.error("Failed to get recipes from localStorage", e);
      return null;
    }
  },
  setRecipes: (recipeEntries) => {
    localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(recipeEntries));
  },
};
