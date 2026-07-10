import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Button } from "../components/ui/button";
import CarouselCard from "./CarouselCard";
import RecipeImage from "./RecipeImage";

const FALLBACK_BG = "/carousel-background.jpg";

export default function RecipeCarousel({ recipes = [] }) {
  const [index, setIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const trackRef = useRef(null);
  const isJumping = useRef(false);

  // Jump to the middle clone once recipes are known
  useEffect(() => {
    if (recipes.length > 0) {
      setIndex(recipes.length);
    }
  }, [recipes.length]);

  const visibleCount = 3;
  const half = Math.floor(visibleCount / 2);
  const centerIndex = index; // middle visible slide

  // Jump to the middle clone once recipes are known
  useEffect(() => {
    if (recipes.length > 0) {
      setIndex(recipes.length);
    }
  }, [recipes.length]);

  const slides = useMemo(() => {
    if (!recipes.length) return [];
    return [...recipes, ...recipes, ...recipes];
  }, [recipes]);

  const actualIndex = useMemo(() => {
    if (!recipes.length) return 0;
    return ((index % recipes.length) + recipes.length) % recipes.length;
  }, [index, recipes.length]);

  const centerRecipe = useMemo(() => {
    return slides[centerIndex] ?? null;
  }, [slides, centerIndex]);

  const translatePercent = (index - half) * (100 / visibleCount);

  // Navigation
  const next = useCallback(() => {
    if (isJumping.current || !recipes.length) return;
    setIndex((prev) => prev + 1);
  }, [recipes.length]);

  const prev = useCallback(() => {
    if (isJumping.current || !recipes.length) return;
    setIndex((prev) => prev - 1);
  }, [recipes.length]);

  const goTo = useCallback(
    (i) => {
      if (isJumping.current || !recipes.length) return;
      setIndex(recipes.length + i);
    },
    [recipes.length],
  );

  // Seemless infinite loop
  const handleTransitionEnd = useCallback(
    (e) => {
      if (e.target !== trackRef.current || !recipes.length) return;

      const needsForwardTeleport = index >= recipes.length * 2;
      const needsBackwardTeleport = index < recipes.length;
      if (!needsForwardTeleport && !needsBackwardTeleport) return;

      // Turn off the track transition so the repositioning is instant
      const track = trackRef.current;
      track.style.transition = "none";

      // Calculate the new index that lies inside the middle copy
      const newIndex = needsForwardTeleport
        ? index - recipes.length
        : index + recipes.length;

      // Update the index synchronously (forces an immediate commit)
      flushSync(() => {
        setIndex(newIndex);
      });

      // At this point React has already committed the DOM update.
      // Force a reflow so the browser records the new transform.
      track.offsetHeight; // reflow

      // Re‑enable the track transition for future smooth moves.
      track.style.transition = "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";

      // Allow new user input again.
      isJumping.current = false;
    },
    [index, recipes.length],
  );

  // Touch swipe
  const onTouchStart = useCallback((e) => {
    setTouchStartX(e.touches[0].clientX);
  }, []);

  const onTouchEnd = useCallback(
    (e) => {
      if (touchStartX === null) return;
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
      setTouchStartX(null);
    },
    [touchStartX, next, prev],
  );

  if (!recipes.length) return null;

  return (
    <section className="relative w-full overflow-hidden select-none">
      {/* Dynamic background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <RecipeImage
          alt="background"
          className="h-full w-full object-cover scale-125 blur-lg brightness-[0.3]"
          fallbackSrc={FALLBACK_BG}
          imageId={centerRecipe?.imageId}
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 py-3 sm:py-4.5 md:py-6">
        <div
          className="relative md:px-12"
          onTouchEnd={onTouchEnd}
          onTouchStart={onTouchStart}
        >
          <div className="overflow-hidden">
            <div
              className="flex will-change-transform"
              onTransitionEnd={handleTransitionEnd}
              ref={trackRef}
              style={{
                transform: `translateX(-${translatePercent}%)`,
                transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {slides.map((recipe, i) => {
                const distance = Math.min(
                  Math.abs(i - centerIndex),
                  Math.abs(i - centerIndex - recipes.length),
                  Math.abs(i - centerIndex + recipes.length),
                );

                let state = "far";
                if (distance === 0) {
                  state = "center";
                } else if (distance === 1) {
                  state = "adjacent";
                }

                return (
                  <div
                    className="px-2 md:px-3"
                    key={`${recipe.id}-${i}`}
                    style={{ flex: `0 0 ${100 / visibleCount}%` }}
                  >
                    <CarouselCard recipe={recipe} state={state} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Arrows */}
          <Button
            className="hidden md:flex absolute left-1 md:left-4 top-1/2 z-20 h-10 w-10 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
            onClick={prev}
            size="icon"
            variant="ghost"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            className="hidden md:flex absolute right-1 md:right-4 top-1/2 z-20 h-10 w-10 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
            onClick={next}
            size="icon"
            variant="ghost"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Dots */}
        <div className="mt-3 md:mt-6 flex justify-center gap-2">
          {recipes.map((recipe, i) => (
            <button
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1 sm:h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                i === actualIndex
                  ? "w-3 sm:w-4.5 md:w-6 bg-white"
                  : "w-1 sm:w-1.5 md:w-2 bg-white/40 hover:bg-white/60"
              }`}
              key={`${recipe.id}-dot-${i}`}
              onClick={() => goTo(i)}
              type="button"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
