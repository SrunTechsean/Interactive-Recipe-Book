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
	const [dietaryTags, setDietaryTags] = useState([]);
	const [ingredients, setIngredients] = useState([
		{ qty: "", unit: "", name: "" },
	]);

	const handleFieldChange = (field, value) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const toggleDietaryTag = (tag) => {
		setDietaryTags((prev) =>
			prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
		);
	};

	const addIngredient = () => {
		setIngredients((prev) => [...prev, { qty: "", unit: "", name: "" }]);
	};

	const updateIngredient = (index, field, value) => {
		setIngredients((prev) =>
			prev.map((ing, i) => (i === index ? { ...ing, [field]: value } : ing)),
		);
	};

	const removeIngredient = (index) => {
		setIngredients((prev) => prev.filter((_, i) => i !== index));
	};

	return (
		<section className="mx-auto space-y-6">
			<h1 className="text-3x1 my-0 font-bold tracking-tight">Add New Recipe</h1>
			<p className="muted-foreground my-b-2">
				Share your delicious recipe with the world
			</p>
			<form>
				<RecipeDes formData={formData} onFieldChange={handleFieldChange} />
				<RecipeTable
					dietaryTags={dietaryTags}
					onToggleTag={toggleDietaryTag}
					ingredients={ingredients}
					onAddIngredient={addIngredient}
					onUpdateIngredient={updateIngredient}
					onRemoveIngredient={removeIngredient}
				/>
				<RecipeUpload></RecipeUpload>
			</form>
		</section>
	);
}
