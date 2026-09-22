import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import RecipeMiniCard from "../components/RecipeMiniCard";

const FavoritesPage = () => {
  const location = useLocation();
  const cart = location.state?.cart || [];

  return (
    <div>
      <NavBar />
      <p className="text-3xl font-bold text-center mt-10">Your Favorite Recipes</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8 px-24">
        {cart.length > 0 ? (
          cart.map(({ id, missedIngredients, title, imgSrc, imgAlt }, index) => (
            <RecipeMiniCard key={index} id={id} missedIngredients={missedIngredients} title={title} imgSrc={imgSrc} imgAlt={imgAlt}/>
          ))
        ) : (
          <p className="text-center mt-4 font-bold col-span-4">No favorites yet!</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
