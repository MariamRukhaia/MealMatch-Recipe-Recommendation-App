import { useNavigate } from "react-router-dom";

const RecipeMiniCard = ({ id, missedIngredients, title, imgSrc, imgAlt }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/missing-ingredients", {
      state: { missedIngredients },
    });
  };

  return (
    <div
      className="border p-4 rounded-lg shadow-md bg-white cursor-pointer hover:shadow-lg transition"
      onClick={handleClick}
    >
      {imgSrc && (
        <img
          src={imgSrc}
          alt={imgAlt || `Image of ${title}`}
          className="w-full h-40 object-cover rounded-md mb-2"
        />
      )}
      <p className="text-lg font-bold text-[#F1A030]">{title}</p>
      <p className="text-sm font-semibold mt-2">Missed Ingredients:</p>
      <ul className="list-disc ml-4 text-sm">
        {missedIngredients.length > 0 ? (
          missedIngredients.map((ingredient, index) => (
            <li key={index}>{ingredient.name}</li>
          ))
        ) : (
          <li>No missing ingredients!</li>
        )}
      </ul>
    </div>
  );
};

export default RecipeMiniCard;
