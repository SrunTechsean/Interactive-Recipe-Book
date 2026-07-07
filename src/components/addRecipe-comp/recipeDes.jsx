import { useRecipeForm } from "../../contexts/AddRecipeContext";

export default function RecipeDes() {
	const { formData, handleFieldChange, errors } = useRecipeForm();

	return (
		<div className="mb-3">
			<div className="space-y-2">
				<label htmlFor="recipeTitle" className="text-sm font-semibold">
					Recipe Title *
				</label>
				<input
					id="recipeTitle"
					type="text"
					value={formData.title}
					onChange={(e) => handleFieldChange("title", e.target.value)}
					placeholder="e.g. Creamy Tomato Pasta"
					className="w-full rounded border input p-2"
				/>
				{errors.title && (
					<p className="text-red-500 text-xs mt-1">{errors.title}</p>
				)}
			</div>
			<div>
				<label htmlFor="description" className="text-sm font-semibold">
					Description
				</label>
				<textarea
					id="description"
					rows="3"
					value={formData.description}
					onChange={(e) => handleFieldChange("description", e.target.value)}
					placeholder="Briefly describe your recipe..."
					className="w-full rounded-lg border input resize-none p-2"
				/>
				{errors.description && (
					<p className="text-red-500 text-xs mt-1">{errors.description}</p>
				)}
			</div>
			<div className="grid grid-cols-2 -4">
				<div className="grid space-y-2">
					<label htmlFor="category" className="text-sm m-0 font-semibold">
						Category *
					</label>
					<select
						id="category"
						name="category"
						className="w-full rounded border p-2"
						value={formData.category}
						onChange={(e) => handleFieldChange("category", e.target.value)}
					>
						<option value="breakfast">Breakfast</option>
						<option value="lunch">Lunch</option>
						<option value="dinner">Dinner</option>
						<option value="dessert">Dessert</option>
					</select>
					{errors.category && (
						<p className="text-red-500 text-xs mt-1">{errors.category}</p>
					)}
				</div>
				<div>
					<label htmlFor="servings" className="grid text-sm font-semibold">
						Servings *
					</label>
					<input
						id="servings"
						type="number"
						value={formData.servings}
						placeholder="e.g. 4 or 5"
						className="w-full rounded border p-2"
						onChange={(e) => handleFieldChange("servings", e.target.value)}
					/>
					{errors.servings && (
						<p className="text-red-500 text-xs mt-1">{errors.servings}</p>
					)}
				</div>
				<div>
					<label htmlFor="prepTime" className="grid text-sm font-semibold">
						Prep Time (min) *
					</label>
					<input
						id="prepTime"
						type="text"
						value={formData.prepTime}
						placeholder="e.g. 15"
						className="w-full rounded border p-2"
						onChange={(e) => handleFieldChange("prepTime", e.target.value)}
					/>
					{errors.prepTime && (
						<p className="text-red-500 text-xs mt-1">{errors.prepTime}</p>
					)}
				</div>
				<div>
					<label htmlFor="cookTime" className="grid text-sm font-semibold">
						Cook Time (min) *
					</label>
					<input
						id="cookTime"
						type="text"
						value={formData.cookTime}
						placeholder="e.g. 60"
						className="w-full rounded border p-2"
						onChange={(e) => handleFieldChange("cookTime", e.target.value)}
					/>
					{errors.cookTime && (
						<p className="text-red-500 text-xs mt-1">{errors.cookTime}</p>
					)}
				</div>
			</div>
		</div>
	);
}
