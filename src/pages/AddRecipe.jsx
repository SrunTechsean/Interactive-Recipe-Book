import { useNavigate } from "react-router-dom";
import RecipeDes from "../components/addRecipe-comp/recipeDes";
import RecipeTable from "../components/addRecipe-comp/recipeTable";
import RecipeUpload from "../components/addRecipe-comp/recipeUpload";
import {
	RecipeFormProvider,
	useRecipeForm,
} from "../contexts/AddRecipeContext";
import "./AddRecipe.css";

function AddRecipeForm() {
	const { saveRecipe, validate } = useRecipeForm();
	const navigate = useNavigate();

	const handleSave = async () => {
		const isValid = validate();
		if (!isValid) return;

		try {
			const recipe = await saveRecipe();
			console.log("Saved recipe:", recipe);
			navigate("/recipes");
		} catch (err) {
			console.error("Failed to save recipe:", err);
		}
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
