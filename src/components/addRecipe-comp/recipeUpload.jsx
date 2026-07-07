import { Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRecipeForm } from "../../contexts/AddRecipeContext";
import { Button } from "../ui/button";

export default function RecipeUpload({ onSave }) {
	const { instructions, setInstructions, image, setImage, errors } =
		useRecipeForm();
	const [previewUrl, setPreviewUrl] = useState(null);
	const [isDragging, setIsDragging] = useState(false);

	useEffect(() => {
		if (!image) {
			setPreviewUrl(null);
			return;
		}
		const url = URL.createObjectURL(image);
		setPreviewUrl(url);

		return () => URL.revokeObjectURL(url);
	}, [image]);

	const handleFileChange = (e) => {
		const file = e.target.files?.[0];
		if (file) setImage(file);
	};

	const handleDrop = (e) => {
		e.preventDefault();
		setIsDragging(false);
		const file = e.dataTransfer.files?.[0];
		if (file && file.type.startsWith("image/")) {
			setImage(file);
		}
	};

	const handleDragOver = (e) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = () => {
		setIsDragging(false);
	};

	const handleRemoveImage = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setImage(null);
	};

	return (
		<div>
			<div className="mx-auto p-0 space-y-6 text-sm">
				<div>
					<label htmlFor="instructions" className="text-sm font-semibold">
						Instructions
					</label>
					<textarea
						id="instructions"
						rows={3}
						placeholder="Enter each step on a new line"
						className="w-full rounded-md border border-gray-200 px-4 py-3 resize-none"
						value={instructions}
						onChange={(e) => setInstructions(e.target.value)}
					></textarea>
					{errors.instructions && (
						<p className="text-red-500 text-xs mt-1">{errors.instructions}</p>
					)}
				</div>
				<div>
					<label htmlFor="upload" className="text-sm font-semibold">
						Photo
					</label>

					{previewUrl ? (
						<div className="relative border border-gray-300 rounded-lg overflow-hidden">
							<img
								src={previewUrl}
								alt="Recipe preview"
								className="w-full h-auto max-h-96 object-contain"
							/>
							<button
								type="button"
								onClick={handleRemoveImage}
								className="absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full p-1.5 shadow-sm"
							>
								<X className="h-4 w-4 text-gray-700" />
							</button>
						</div>
					) : (
						<label
							htmlFor="upload"
							onDrop={handleDrop}
							onDragOver={handleDragOver}
							onDragLeave={handleDragLeave}
							className={`flex flex-col items-center justify-center border border-dashed rounded-lg bg-white p-8 text-center cursor-pointer transition-colors ${
								isDragging
									? "border-blue-400 bg-blue-50/50"
									: "border-gray-300 hover:border-gray-400"
							}`}
						>
							<Upload className="text-gray-500" />
							<p className="text-gray-500 font-medium">
								Drag photo here or click to upload
							</p>
							<p className="text-xs text-gray-400 mt-1">Max 2MB</p>
							<input
								id="upload"
								type="file"
								accept="image/*"
								onChange={handleFileChange}
								className="hidden"
							/>
						</label>
					)}
				</div>
			</div>
			<div className="flex justify-between items-center pt-4">
				<Button type="button" variant="outline" className="category__chip">
					Cancel
				</Button>
				<Button
					type="button"
					variant="outline"
					onClick={onSave}
					className="category__chip text-white bg-primary-100"
				>
					Save Recipe
				</Button>
			</div>
		</div>
	);
}
