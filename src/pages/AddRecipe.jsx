import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SaveConfirmModal from "../components/addRecipe-comp/confirmModal";
import RecipeDes from "../components/addRecipe-comp/recipeDes";
import RecipeTable from "../components/addRecipe-comp/recipeTable";
import RecipeUpload from "../components/addRecipe-comp/recipeUpload";
import {
	RecipeFormProvider,
	useRecipeForm,
} from "../contexts/AddRecipeContext";
import "./AddRecipe.css";

function AddRecipeForm() {
	const { saveRecipe, validate, resetForm } = useRecipeForm();
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();

	const handleSave = async () => {
		const isValid = validate();
		if (!isValid) return;

		try {
			const recipe = await saveRecipe();
			console.log("Saved recipe:", recipe);
			setShowModal(true);
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

	return (
		<section className="w-full max-w-5xl mx-auto space-y-6">
			<div>
				<h1 className="text-3xl my-0 font-bold tracking-tight">
					Add New Recipe
				</h1>
				<p className="text-brand-text-muted mb-2">
					Share your delicious recipe with the world
				</p>
				<form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
					<RecipeDes />
					<RecipeTable />
					<RecipeUpload onSave={handleSave} />
				</form>
				{showModal && (
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
	return (
		<RecipeFormProvider>
			<AddRecipeForm />
		</RecipeFormProvider>
	);
}
