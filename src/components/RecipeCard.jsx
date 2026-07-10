import { Clock, Flame, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import RecipeImage from "../components/RecipeImage";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { useFavorites } from "../contexts/FavoritesContext";

export default function RecipeCard({ recipe }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(recipe.id);
  };

  if (!recipe) return null;
  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <Link className="block group" to={`/recipes/${recipe.id}`}>
      <Card className="ring-0 pt-0 overflow-hidden border border-brand-border bg-white transition-shadow hover:shadow-lg">
        {/* Image of the food */}
        <div className="relative aspect-[4/2] bg-brand-bg overflow-hidden">
          {recipe.imageId ? (
            <RecipeImage
              alt={recipe.title}
              className="absolute inset-0 h-full w-full object-cover"
              imageId={recipe.imageId}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-brand-text-muted">
              <span className="text-sm">No image</span>
            </div>
          )}
          {/* Category badge — top right */}
          <Badge className="absolute right-3 top-3 bg-primary-100 text-white hover:bg-primary-500">
            {recipe.category}
          </Badge>
        </div>

        {/* Content */}
        <CardContent>
          <h3 className="text-[clamp(1rem,1.4cqw,1.3rem)] mb-3 font-semibold text-brand-text">
            {recipe.title}
          </h3>

          {/* Meta row */}
          <div className="flex items-center gap-4 text-sm text-brand-text-muted">
            <div className="flex items-center gap-1.5">
              <Clock size={16} />
              <span>{totalTime} min</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Flame size={16} />
              <span>Easy</span>
            </div>
            <button
              className="flex items-center gap-1.5 hover:text-destructive cursor-pointer"
              onClick={handleFavoriteClick}
              type="button"
            >
              <Heart
                className={
                  isFavorite(recipe.id)
                    ? "fill-destructive text-destructive"
                    : ""
                }
                size={16}
              />
              <span>{isFavorite(recipe.id) ? 1 : 0}</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
