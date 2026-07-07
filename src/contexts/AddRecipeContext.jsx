import { createContext, useContext, useState } from "react";
import { saveImage } from "../lib/imageDB";

const RecipeFormContext = createContext(null);

export function RecipeFormProvider({ children }) {
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
	const [instructions, setInstructions] = useState("");
	const [image, setImage] = useState(null);

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

	const saveRecipe = async () => {
		const id = Date.now().toString();

		if (image) {
			try {
				await saveImage(id, image);
				console.log("Image saved to IndexedDB with id:", id);
			} catch (err) {
				console.error("Failed to save image:", err);
			}
		}

		const recipe = {
			id,
			title: formData.title,
			description: formData.description,
			ingredients: ingredients
				.filter((ing) => ing.name.trim() !== "")
				.map((ing) => ({
					name: ing.name,
					quantity: ing.qty,
					unit: ing.unit,
				})),
			instructions: instructions
				.split("\n")
				.map((step) => step.trim())
				.filter((step) => step !== ""),
			prepTime: Number(formData.prepTime) || 0,
			cookTime: Number(formData.cookTime) || 0,
			servings: Number(formData.servings) || 0,
			category: formData.category,
			dietaryTags: dietaryTags.map((tag) => tag.toLowerCase()),
			imageId: image ? id : null,
			createdAt: new Date().toISOString(),
		};

		const existing = JSON.parse(localStorage.getItem("recipes") || "[]");
		localStorage.setItem("recipes", JSON.stringify([...existing, recipe]));

		return recipe;
	};

	const value = {
		formData,
		handleFieldChange,
		dietaryTags,
		toggleDietaryTag,
		ingredients,
		addIngredient,
		updateIngredient,
		removeIngredient,
		instructions,
		setInstructions,
		image,
		setImage,
		saveRecipe,
	};

	return (
		<RecipeFormContext.Provider value={value}>
			{children}
		</RecipeFormContext.Provider>
	);
}

export function useRecipeForm() {
	const context = useContext(RecipeFormContext);
	if (!context) {
		throw new Error("useRecipeForm must be used within a RecipeFormProvider");
	}
	return context;
}
