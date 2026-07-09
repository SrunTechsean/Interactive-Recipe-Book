import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import GridForCard from "../components/GridForCard";
import { Button } from "../components/ui/button";
import { useFavorites } from "../contexts/FavoritesContext";
import { storage } from "../lib/storage";

export default function Favorites() {
  const { favorites } = useFavorites();

  const favoriteRecipes = storage
    .getRecipes()
    .filter((recipe) => favorites.includes(recipe.id));

  if (favoriteRecipes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <Heart className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
        <p className="text-muted-foreground mb-6">
          Start exploring recipes and tap the heart to save your favorites.
        </p>
        <Button asChild>
          <Link to="/recipes">Browse Recipes</Link>
        </Button>
      </div>
    );
  }

  return (
    <section className="grid gap-3 px-8 py-4">
      <div className="flex items-center gap-3">
        {/* <Heart className="h-6 w-6 fill-destructive text-destructive" /> */}
        <h2 className="text-xl font-bold">Your Favorites</h2>
      </div>

      <GridForCard data={favoriteRecipes} />
    </section>
  );
}
