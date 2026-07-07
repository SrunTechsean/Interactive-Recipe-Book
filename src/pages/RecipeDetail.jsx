import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { seedRecipes } from "@/data/seedRecipes";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Button } from "@/components/ui/button";
import { Heart, ChefHat } from "lucide-react";
import CookingMode from "@/components/CookingMode";

export default function RecipeDetail() {
  const { id } = useParams();
  const { toggleFavorite, isFavorite } = useFavorites();

  const [isCooking, setIsCooking] = useState(false);

  const recipe = seedRecipes.find((r) => r.id === id);

  if (!recipe) {
    return (
      <section className="p-8 text-center">
        <h1 className="text-2xl mb-4">Recipe not found</h1>
        <Button asChild>
          <Link to="/recipes">Back to Recipes</Link>
        </Button>
      </section>
    );
  }

  return (
    <section className="max-w-3xl mx-auto p-6">
      <div className="flex items-start justify-between gap-4 mb-2">
        <h1 className="text-3xl font-bold">{recipe.title}</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => toggleFavorite(recipe.id)}
        >
          <Heart
            className={
              isFavorite(recipe.id)
                ? "fill-destructive text-destructive"
                : "text-muted-foreground"
            }
          />
        </Button>
      </div>

      <p className="text-muted-foreground mb-6">{recipe.description}</p>

      <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
      <ul className="list-disc list-inside space-y-1 mb-6">
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>
            {ing.quantity} {ing.unit} {ing.name}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mb-2">Instructions</h2>
      <ol className="list-decimal list-inside space-y-2 mb-6">
        {recipe.instructions.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>

      <Button onClick={() => setIsCooking(true)}>
        <ChefHat className="mr-2 h-4 w-4" />
        Start Cooking
      </Button>

      {isCooking && (
        <CookingMode
          instructions={recipe.instructions}
          onClose={() => setIsCooking(false)}
        />
      )}
    </section>
  );
}