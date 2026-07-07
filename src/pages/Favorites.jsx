import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useFavorites } from "../contexts/FavoritesContext";
import { seedRecipes } from "../data/seedData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import GridForCard from "../components/GridForCard";

export default function Favorites() {
  const { favorites } = useFavorites();
 
  const favoriteRecipes = seedRecipes.filter((recipe) =>
    favorites.includes(recipe.id)
  );
 
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
    <section className="grid gap-3">
      <div className="flex items-center gap-3">
        <Heart className="h-6 w-6 fill-destructive text-destructive" />
        <h1 className="text-2xl font-bold">Your Favorites</h1>
        <Badge variant="secondary">{favoriteRecipes.length}</Badge>
      </div>
 
      <GridForCard data={favoriteRecipes} />
    </section>
  );
}
