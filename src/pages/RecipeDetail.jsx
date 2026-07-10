import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Clock, Heart, Share2, Users, ArrowLeft, Check, X, Copy, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import RecipeImage from "../components/RecipeImage";
import { useFavorites } from "../contexts/FavoritesContext";
import { useRecipes } from "../contexts/RecipeContext";
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
  const { getRecipeById, deleteRecipe} = useRecipes();
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  

  const recipe = getRecipeById(id);
  
  const handleCopyLink = async () => {
    await navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const confirmDelete = () => {
  deleteRecipe(recipe.id);
  navigate("/recipes");
  };
  

  if (!recipe) {
    return (
      <div className="recipe-notfound">
        <p>Recipe not found.</p>
        <Button onClick={() => navigate("/recipes")}>Back to Recipes</Button>
      </div>
    );
  }

  return (
    <div className="recipe-detail">
      <button className = "recipe-back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={16}/>
        Back
      </button>
      <h1 className = "recipe-page-tittle"><b>Recipe Detail</b></h1>
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
              <Heart className={`icon-sm ${isFavorite(recipe.id) ? "icon-favorited" : ""}`} />
              Favorite
            </Button>

            <div className = "share-popover-wrapper">
              <Button onClick={() => setShowShare((prev) => !prev)} variant="outline">
                <Share2 className="icon-sm" />
                Share
              </Button>

            </div>
          </div>
        </div>

        <div>
          <h1 className="recipe-title">{recipe.title}</h1>

          <div className="recipe-meta">
            <span><Clock className="icon-meta" /> Prep: {recipe.prepTime} min</span>
            <span><Clock className="icon-meta" /> Cook: {recipe.cookTime} min</span>
            <span><Users className="icon-meta" /> Servings: {recipe.servings}</span>
          </div>

          <div className="recipe-tags">
            {recipe.dietaryTags.map((tag) => (
              <span className={`badge-tag ${TAG_CLASSES[tag] ?? "tag-default"}`} key={tag}>
                {tag}
              </span>
            ))}
          </div>

          <hr className="recipe-divider" />

          <h2 className="recipe-section-title">Ingredients</h2>
          <ul className="recipe-ingredients">
            {recipe.ingredients.map((ing, i) => (
              <li className="recipe-ingredient-item" key={i}>
                <input type="checkbox" />
                {ing.quantity} {ing.unit} {ing.name}
              </li>
            ))}
          </ul>

          <hr className="recipe-divider" />

          <h2 className="recipe-section-title-lg">Instructions</h2>
          <ol className="recipe-instructions">
            {recipe.instructions.map((text, i) => (
              <li className="recipe-instruction-item" key={i}>
                <span className="recipe-step-number">{i + 1}</span>
                <span className="recipe-step-text">{text}</span>
              </li>
            ))}
          </ol>
            {/* Delete button */}
            <button className="delete-btn" onClick={() => setShowDeleteConfirm(true)}>
              <Trash2 size={16} />
            </button>
        </div>
      </div>
      {showShare && (
        <div className="share-overlay" onClick={() => setShowShare(false)}>
          <div className="share-popover" onClick={(e) => e.stopPropagation()}>
            <div className="share-popover-header">
              <p className="share-popover-title">Share this recipe</p>
              <button className="share-popover-close" onClick={() => setShowShare(false)}>
                <X size={16} />
              </button>
            </div>

            <div className="share-popover-row">
              <input
                className="share-popover-input"
                readOnly
                value={window.location.href}
                onClick={(e) => e.target.select()}
              />
              <button
                className={`share-copy-btn ${copied ? "copied" : ""}`}
                onClick={handleCopyLink}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeleteConfirm && (
        <div className="confirm-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <p className="confirm-modal-text">
              Are you sure you want to delete this recipe?
            </p>
            <div className="confirm-modal-actions">
              <button className="confirm-btn-no" onClick={() => setShowDeleteConfirm(false)}>
                  No
              </button>
              <button className="confirm-btn-yes" onClick={confirmDelete}>
                  Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}