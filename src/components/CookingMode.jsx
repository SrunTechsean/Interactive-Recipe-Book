import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function CookingMode({ instructions, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);

  // Prevent background scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "ArrowRight" || e.key === " ") {
        setCurrentStep((prev) => Math.min(prev + 1, instructions.length - 1));
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [instructions.length, onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center p-8">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
      </Button>

      <p className="text-muted-foreground mb-4">
        Step {currentStep + 1} of {instructions.length}
      </p>
      <p className="text-3xl text-center max-w-2xl">
        {instructions[currentStep]}
      </p>

      <div className="flex gap-4 mt-8">
        <Button
          variant="outline"
          disabled={currentStep === 0}
          onClick={() => setCurrentStep((prev) => prev - 1)}
        >
          Previous
        </Button>
        <Button
          disabled={currentStep === instructions.length - 1}
          onClick={() => setCurrentStep((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}