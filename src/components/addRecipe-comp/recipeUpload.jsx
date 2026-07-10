import { Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRecipeForm } from "../../contexts/AddRecipeContext";
import { Button } from "../ui/button";

export default function RecipeUpload({ onSave, onCancel }) {
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
    if (file?.type.startsWith("image/")) {
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
          <label className="text-sm font-semibold" htmlFor="instructions">
            Instructions <span className="text-red-500">*</span>
          </label>
          <textarea
            className="w-full rounded-md border border-gray-200 px-4 py-3 resize-none mt-3 mb-2"
            id="instructions"
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Enter each step on a new line"
            rows={3}
            value={instructions}
          ></textarea>
          {errors.instructions && (
            <p className="text-red-500 text-xs mt-1">{errors.instructions}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-semibold" htmlFor="upload">
            Photo
          </label>

          <div
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {previewUrl ? (
              <div
                className={`relative border rounded-lg overflow-hidden transition-colors ${
                  isDragging ? "border-blue-400" : "border-gray-300"
                }`}
              >
                <img
                  alt="Recipe preview"
                  className="w-full h-auto max-h-96 object-contain"
                  src={previewUrl}
                />
                <button
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full p-1.5 shadow-sm"
                  onClick={handleRemoveImage}
                  type="button"
                >
                  <X className="h-4 w-4 text-gray-700" />
                </button>
              </div>
            ) : (
              <label
                className={`flex flex-col items-center justify-center border border-dashed rounded-lg bg-white p-8 mt-3 mb-2 text-center cursor-pointer transition-colors ${
                  isDragging
                    ? "border-blue-400 bg-blue-50/50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                htmlFor="upload"
              >
                <Upload className="text-gray-500" />
                <p className="text-gray-500 font-medium">
                  Drag photo here or click to upload
                </p>
                <p className="text-xs text-gray-400 mt-1">Max 2MB</p>
                <input
                  accept="image/*"
                  className="hidden"
                  id="upload"
                  onChange={handleFileChange}
                  type="file"
                />
              </label>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center pt-4 gap-4">
        <Button
          className="category__chip flex-1"
          onClick={onCancel}
          type="button"
          variant="outline"
        >
          Cancel
        </Button>
        <Button
          className="category__chip text-white bg-primary-500 flex-1"
          onClick={onSave}
          type="button"
          variant="outline"
        >
          Save Recipe
        </Button>
      </div>
    </div>
  );
}
