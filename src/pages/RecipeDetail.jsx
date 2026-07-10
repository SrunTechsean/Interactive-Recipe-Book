import {
  ArrowLeft,
  Clock,
  Heart,
  Pencil,
  Share2,
  Trash2,
  Users,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RecipeImage from "../components/RecipeImage";
import { Button } from "../components/ui/button";
import { useFavorites } from "../contexts/FavoritesContext";
import { seedRecipes } from "../data/seedData";
import { deleteImage } from "../lib/imageDB";
import { storage } from "../lib/storage";
import "./RecipeDetail.css";

const TAG_CLASSES = {
  vegetarian: "tag-vegetarian",
  "high-protein": "tag-high-protein",
  "gluten-free": "tag-gluten-free",
  keto: "tag-keto",
};

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();

  const recipe = (storage.getRecipes() ?? seedRecipes).find((r) => r.id === id);

  if (!recipe) {
    return (
      <div className="recipe-notfound">
        <p>Recipe not found.</p>
        <Button onClick={() => navigate("/recipes")}>Back to Recipes</Button>
      </div>
    );
  }

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${recipe.title}"? This cannot be undone.`,
    );
    if (!confirmed) return;

    const recipes = storage.getRecipes() ?? seedRecipes;
    const updatedRecipes = recipes.filter((r) => r.id !== id);
    storage.setRecipes(updatedRecipes);

    if (recipe.imageId) {
      try {
        await deleteImage(recipe.imageId);
      } catch (err) {
        console.error("Failed to delete image from IndexedDB:", err);
      }
    }

    const favorites = storage.getFavorites();
    const updatedFavorites = favorites.filter((fid) => fid !== id);
    storage.setFavorites(updatedFavorites);

    navigate("/recipes", { replace: true });
  };

  return (
    <div className="recipe-detail py-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <button
        className="recipe-back-btn"
        onClick={() => navigate(-1)}
        type="button"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <h1 className="recipe-page-tittle">
        <b>Recipe Detail</b>
      </h1>

      <div className="recipe-breadcrumb">
        <Link to="/recipes">Library</Link>
        <span>›</span>
        <Link to={`/recipes?category=${encodeURIComponent(recipe.category)}`}>
          {recipe.category}
        </Link>
        <span>›</span>
        <span className="recipe-breadcrumb-current">{recipe.title}</span>
      </div>

      <div className="recipe-grid">
        {/* Left Column */}
        <div>
          <div className="recipe-image-wrapper">
            {recipe.imageId ? (
              <RecipeImage alt={recipe.title} imageId={recipe.imageId} />
            ) : (
              <div className="recipe-no-image">No image</div>
            )}
          </div>

          <div className="recipe-actions">
            <Button onClick={() => toggleFavorite(recipe.id)} variant="outline">
              <Heart
                className={`icon-sm ${isFavorite(recipe.id) ? "icon-favorited" : ""}`}
              />
              Favorite
            </Button>

            <Button
              onClick={() =>
                navigator.clipboard?.writeText(window.location.href)
              }
              variant="outline"
            >
              <Share2 className="icon-sm" />
              Share
            </Button>
          </div>
        </div>

        {/* Right Column */}
        <div>
          <h1 className="recipe-title">{recipe.title}</h1>

          <div className="recipe-meta">
            <span>
              <Clock className="icon-meta" /> Prep: {recipe.prepTime} min
            </span>
            <span>
              <Clock className="icon-meta" /> Cook: {recipe.cookTime} min
            </span>
            <span>
              <Users className="icon-meta" /> Servings: {recipe.servings}
            </span>
          </div>

          <div className="recipe-tags">
            {recipe.dietaryTags.map((tag) => (
              <span
                className={`badge-tag ${TAG_CLASSES[tag] ?? "tag-default"}`}
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>

          <hr className="recipe-divider" />

          <h2 className="recipe-section-title">Ingredients</h2>
          <ul className="recipe-ingredients">
            {recipe.ingredients.map(({ quantity, unit, name }, index) => (
              <li
                className="recipe-ingredient-item"
                key={`${recipe.id}-ing-${index}`}
              >
                <input type="checkbox" />
                {quantity} {unit} {name}
              </li>
            ))}
          </ul>

          <hr className="recipe-divider" />

          <h2 className="recipe-section-title-lg">Instructions</h2>
          <ol className="recipe-instructions">
            {recipe.instructions.map((text, index) => (
              <li
                className="recipe-instruction-item"
                key={`${recipe.id}-step-${index}`}
              >
                <span className="recipe-step-number">{index + 1}</span>
                <span className="recipe-step-text">{text}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* EDIT & DELETE BUTTONS */}
      <div className="recipe-bottom-actions">
        <Button
          asChild
          className="recipe-edit-btn bg-primary-500 text-brand-surface hover:bg-brand-surface hover:text-primary-500 hover:border-primary-500 border-2 transition-colors duration-300 ease-in-out"
        >
          <Link to={`/add?editId=${id}`}>
            <Pencil className="icon-sm" />
            Edit
          </Link>
        </Button>

        <Button
          className="recipe-delete-btn bg-destructive text-brand-surface hover:bg-brand-surface hover:text-destructive hover:border-destructive border-2 transition-colors duration-300 ease-in-out"
          onClick={handleDelete}
        >
          <Trash2 className="icon-sm" />
          Delete
        </Button>
      </div>
    </div>
  );
}
