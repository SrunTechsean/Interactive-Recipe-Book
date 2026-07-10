import { Check, Copy, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export default function ShareModal({ url, isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Share Recipe</h3>
          <button
            aria-label="Close share modal"
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={onClose}
            type="button"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-3">
          Anyone with this link can view this recipe.
        </p>

        <div className="flex items-center gap-2 rounded-xl bg-gray-50 border border-gray-200 p-3">
          <input
            className="flex-1 bg-transparent text-sm text-gray-700 outline-none"
            readOnly
            type="text"
            value={url}
          />
          <Button
            className={`gap-2 shrink-0 transition-all ${
              copied
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-primary-500 hover:bg-primary-600 text-white"
            }`}
            onClick={handleCopy}
            size="sm"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
