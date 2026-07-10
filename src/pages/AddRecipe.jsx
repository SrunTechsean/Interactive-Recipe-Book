import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SaveConfirmModal from "../components/addRecipe-comp/confirmModal";
import RecipeDes from "../components/addRecipe-comp/recipeDes";
import RecipeTable from "../components/addRecipe-comp/recipeTable";
import RecipeUpload from "../components/addRecipe-comp/recipeUpload";
import {
  RecipeFormProvider,
  useRecipeForm,
} from "../contexts/AddRecipeContext";
import { storage } from "../lib/storage";
import "./AddRecipe.css";

function AddRecipeForm({ editId, existingRecipe }) {
  const { saveRecipe, updateRecipe, loadRecipe, validate, resetForm } =
    useRecipeForm();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const isEditing = Boolean(editId);

  useEffect(() => {
    if (isEditing && existingRecipe) {
      loadRecipe(existingRecipe);
    }
  }, [isEditing, existingRecipe]);

  const handleSave = async () => {
    const isValid = validate();
    if (!isValid) return;

    try {
      if (isEditing) {
        await updateRecipe(editId);
        navigate(`/recipes/${editId}`);
      } else {
        const recipe = await saveRecipe();
        console.log("Saved recipe:", recipe);
        setShowModal(true);
      }
    } catch (err) {
      console.error("Failed to save recipe:", err);
    }
  };

  const handleAddAnother = () => {
    resetForm();
    setShowModal(false);
  };

  const handleGoToRecipes = () => {
    setShowModal(false);
    navigate("/recipes");
  };

  const handleCancel = () => {
    if (isEditing) {
      navigate(`/recipes/${editId}`);
    } else {
      navigate(-1);
    }
  };

  return (
    <section className="w-full space-y-6 py-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-3xl my-0 font-bold tracking-tight">
          {isEditing ? "Edit Recipe" : "Add New Recipe"}
        </h1>
        <p className="text-brand-text-muted mb-2">
          {isEditing
            ? "Update your recipe details"
            : "Share your delicious recipe with the world"}
        </p>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <RecipeDes />
          <RecipeTable />
          <RecipeUpload onCancel={handleCancel} onSave={handleSave} />
        </form>
        {showModal && !isEditing && (
          <SaveConfirmModal
            onAddAnother={handleAddAnother}
            onGoToRecipes={handleGoToRecipes}
          />
        )}
      </div>
    </section>
  );
}

export default function AddRecipe() {
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("editId");
  const navigate = useNavigate();

  const existingRecipe = editId
    ? (storage.getRecipes() ?? []).find((r) => r.id === editId)
    : null;

  useEffect(() => {
    if (editId && !existingRecipe) {
      navigate("/recipes");
    }
  }, [editId, existingRecipe, navigate]);

  return (
    <RecipeFormProvider>
      <AddRecipeForm editId={editId} existingRecipe={existingRecipe} />
    </RecipeFormProvider>
  );
}
