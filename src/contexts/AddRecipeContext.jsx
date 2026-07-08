import { createContext, useContext, useState } from "react";
import { saveImage } from "../lib/imageDB";
import { storage } from "../lib/storage";

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
	const [errors, setErrors] = useState({});

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

	const validate = () => {
		const newErrors = {};

		if (!formData.title.trim()) {
			newErrors.title = "Recipe title is required";
		}
		if (!formData.category) {
			newErrors.category = "Category is required";
		}
		if (!formData.servings) {
			newErrors.servings = "Servings is required";
		}
		if (!formData.prepTime) {
			newErrors.prepTime = "Prep time is required";
		}
		if (!formData.cookTime) {
			newErrors.cookTime = "Cook time is required";
		}

		const hasValidIngredient = ingredients.some(
			(ing) => ing.name.trim() && ing.qty.trim() && ing.unit.trim(),
		);
		if (!hasValidIngredient) {
			newErrors.ingredients = "At least one complete ingredient is required";
		}

		if (!instructions.trim()) {
			newErrors.instructions = "Instructions are required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const resetForm = () => {
		setFormData({
			title: "",
			description: "",
			category: "",
			servings: "",
			prepTime: "",
			cookTime: "",
		});
		setDietaryTags([]);
		setIngredients([{ qty: "", unit: "", name: "" }]);
		setInstructions("");
		setImage(null);
		setErrors({});
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

		const existing = storage.getRecipes() ?? [];
		storage.setRecipes([...existing, recipe]);
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
		errors,
		validate,
		saveRecipe,
		resetForm,
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
