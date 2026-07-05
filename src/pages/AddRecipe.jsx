import { useState } from "react";
import RecipeDes from "../components/addRecipe-comp/recipeDes";
import RecipeTable from "../components/addRecipe-comp/recipeTable";
import RecipeUpload from "../components/addRecipe-comp/recipeUpload";
import "./AddRecipe.css";

export default function AddRecipe() {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		category: "",
		servings: "",
		prepTime: "",
		cookTime: "",
	});
	const handleFieldChange = (field, value) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<section className="min-w-3x1 mx-auto space-y-6">
			<h1 className="text-3x1 my-0 font-bold tracking-tight">Add New Recipe</h1>
			<p className="muted-foreground my-b-2">
				Share your delicious recipe with the world
			</p>
			<form>
				<RecipeDes
					formData={formData}
					onFieldChange={handleFieldChange}
				></RecipeDes>
				<RecipeTable></RecipeTable>
				<RecipeUpload></RecipeUpload>
			</form>
		</section>
	);
}
