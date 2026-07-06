import "./Carousel.css";
import { useRef } from "react";
import Card from "./Card";

export default function Carousel({ recipes }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    scrollRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="carousel">
      <button className="carousel-btn left" onClick={() => scroll("left")}>‹</button>

      <div className="carousel-track" ref={scrollRef}>
        {recipes.map((recipe) => (
          <Card key={recipe.id} recipe={recipe} />
        ))}
      </div>

      <button className="carousel-btn right" onClick={() => scroll("right")}>›</button>
    </div>
  );
}