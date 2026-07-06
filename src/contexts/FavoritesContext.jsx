import{createContext, useContext, useState, useEffect} from "react";
import storage from "../lib/storage";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(storage.getFavorites());
  }, []);

};