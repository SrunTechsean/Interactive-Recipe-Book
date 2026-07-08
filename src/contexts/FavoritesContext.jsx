import { createContext, useContext, useEffect, useState } from "react";
import { storage } from "../lib/storage";

const FavoritesContext = createContext();

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}

export default function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Hydration
  useEffect(() => {
    setFavorites(storage.getFavorites());
  }, []);

  // Persistence
  useEffect(() => {
    storage.setFavorites(favorites);
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id],
    );
  };

  const isFavorite = (id) => favorites.includes(id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

