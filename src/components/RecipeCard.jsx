import { Clock, Flame, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";

export default function RecipeCard({ recipe }) {
  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <Link className="block group" to={`/recipes/${recipe.id}`}>
      <Card className="ring-0 pt-0 overflow-hidden border border-brand-border bg-white transition-shadow hover:shadow-lg">
        {/* Image of the food */}
        <div className="relative aspect-[4/2] bg-brand-bg">
          {recipe.imageId ? (
            <img
              alt={recipe.title}
              className="h-full w-full object-cover"
              src={recipe.imageId}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-brand-text-muted">
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
            <div className="flex items-center gap-1.5">
              <Heart size={16} />
              <span>0</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
