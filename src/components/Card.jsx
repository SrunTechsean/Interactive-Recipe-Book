import "./Card.css";
export default function Card({ recipe }) {
  return (
    <div className="recipe-card">
      <div className="recipe-card-image">
        {recipe.imageId ? (
          <img src={recipe.imageId} alt={recipe.title} />
        ) : (
          <div className="recipe-card-placeholder" />
        )}
        
        <h3 className="recipe-card-title">{recipe.title}</h3>
      </div>
    </div>
  );
}