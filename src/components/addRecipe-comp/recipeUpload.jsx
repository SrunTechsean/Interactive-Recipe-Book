import { Upload } from "lucide-react";
import { Button } from "../ui/button";

export default function RecipeUpload() {
	return (
		<div>
			<div className="mx-auto p-0 space-y-6 text-sm">
				<div>
					<label for="instructions" className="text-sm font-semibold">
						Instructions
					</label>
					<textarea
						id="instructions"
						rows={3}
						placeholder="Enter each step on a new line"
						className="w-full rounded-md border border-gray-200 px-4 py-3 resize-none"
					></textarea>
				</div>
				<div>
					<label for="upload" className="text-sm font-semibold">
						Photo
					</label>
					<div
						id="upload"
						className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-lg bg-white p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
					>
						<Upload className="text-gray-500"></Upload>
						<p className="text-gray-500 font-medium">
							Drag photo here or click to upload
						</p>
						<p className="text-xs text-gray-400 mt-1">Max 2MB</p>
					</div>
				</div>
			</div>
			<div className="flex justify-between items-center pt-4">
				<Button type="button" variant="outline" className="category__chip">
					Cancel
				</Button>
				<Button type="button" variant="outline">
					Save Recipe
				</Button>
			</div>
		</div>
	);
}
