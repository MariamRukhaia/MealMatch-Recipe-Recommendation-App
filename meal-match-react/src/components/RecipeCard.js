import IngredientItem from '../components/IngredientItem';
import InstructionItem from '../components/InstructionItem';
import { BiHeartCircle } from "react-icons/bi";
import { FaRegCircleXmark } from "react-icons/fa6";

const RecipeCard = (props) => {
    const {
        id, imgSrc, imgAlt, title, summary, calories, caloriesUnit, protein, proteinUnit, sugar, sugarUnit, fats, fatsUnit, vitC, vitCUnit, usedIngredients, missedIngredients, steps, saveToCart, nextRecipe
    } = props;

    const handleHeartClick = () => {
        saveToCart(id, missedIngredients, title, imgSrc, imgAlt); // ✅ Save to cart & move to next recipe
    };

    const handleXmarkClick = () => {
        nextRecipe(); // ✅ Just move to next recipe
    };

    return (
        <div className="flex flex-col px-8 py-10 mx-8 my-4 border-zinc-100 border rounded-2xl drop-shadow">
            <div className="flex flex-row w-full gap-x-10 items-center">
                <div className="w-[300px] h-[300px] flex-shrink-0">
                    <img className="w-full h-full object-cover rounded-xl" src={imgSrc} alt={imgAlt} />
                </div>

                <div className="flex flex-col gap-y-4">
                    <div className='flex flex-row justify-between items-center'>
                        <h2 className="text-2xl">{title}</h2>
                        <div className='flex flex-row justify-end items-center gap-x-2'>
                            <FaRegCircleXmark 
                                size={50} 
                                color="black" 
                                onClick={handleXmarkClick} 
                                style={{ cursor: "pointer" }} 
                            />
                            <BiHeartCircle
                                size={60} 
                                color="red"
                                onClick={handleHeartClick} 
                                style={{ cursor: "pointer" }} 
                            />
                        </div>
                    </div>
                    <p>Calories: {calories}{caloriesUnit} | Protein: {protein}{proteinUnit} | Sugar: {sugar}{sugarUnit} | Fats: {fats}{fatsUnit} | Vitamin C: {vitC}{vitCUnit}</p>
                    <p>{summary.replace(/<\/?[^>]+(>|$)/g, "")}</p>
                </div>
            </div>
            <div className="flex flex-row w-full mt-10">
                <div className="flex flex-col w-fit">
                    <p className="text-xl font-bold pb-2">Ingredients You Have</p>
                    <div className="flex flex-col gap-y-1 pb-4">
                        {usedIngredients.map((item, index) => (
                            <IngredientItem key={index} item={item.name} missed={false} />
                        ))}
                    </div>
                    <p className="text-xl font-bold pb-2">Ingredients You Don't Have</p>
                    <div className="flex flex-col gap-y-1">
                        {missedIngredients.map((item, index) => (
                            <IngredientItem key={index} item={item.name} missed={true} />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-y-4 pl-16">
                    <p className="text-xl font-bold">Recipe</p>
                    <div className="flex flex-col gap-y-1">
                        {steps.map((step, index) => (
                            <InstructionItem key={index} number={step.number} step={step.step} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
