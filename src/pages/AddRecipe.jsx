import RecipeDes from "../components/addRecipe-comp/recipeDes";
import RecipeTable from "../components/addRecipe-comp/recipeTable";
import RecipeUpload from "../components/addRecipe-comp/recipeUpload";
import {
	RecipeFormProvider,
	useRecipeForm,
} from "../contexts/AddRecipeContext";
import "./AddRecipe.css";

function AddRecipeForm() {
	const { saveRecipe } = useRecipeForm();

	const handleSave = async () => {
		const recipe = await saveRecipe();
		console.log("Saved recipe:", recipe);
	};

	return (
		<section className="w-full max-w-3xl mx-auto px-4 space-y-6">
			<h1 className="text-3xl my-0 font-bold tracking-tight">Add New Recipe</h1>
			<p className="text-brand-text-muted mb-2">
				Share your delicious recipe with the world
			</p>
			<form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
				<RecipeDes />
				<RecipeTable />
				<RecipeUpload onSave={handleSave} />
			</form>
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
