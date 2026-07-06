const STORAGE_KEYS = {
  RECIPES: "ts_recipes",
  FAVORITES: "ts_favorites",
  FILTERS: "ts_filters",
};

const getItem = (key, fallback = null) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.error(`Failed to get ${key} from localStorage`, e);
    return fallback;
  }
};

const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const storage = {
  getRecipes: () => getItem(STORAGE_KEYS.RECIPES, null),
  setRecipes: (recipes) => setItem(STORAGE_KEYS.RECIPES, recipes),

  getFavorites: () => getItem(STORAGE_KEYS.FAVORITES, []),
  setFavorites: (favorites) => setItem(STORAGE_KEYS.FAVORITES, favorites),

  getFilters: () => getItem(STORAGE_KEYS.FILTERS, null),
  setFilters: (filters) => setItem(STORAGE_KEYS.FILTERS, filters),
};
