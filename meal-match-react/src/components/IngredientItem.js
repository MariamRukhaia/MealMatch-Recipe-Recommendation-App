import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

const IngredientItem = ({item, key, missed}) => {
  return (
    <div className="flex flex-row gap-x-2 items-center">
        {missed ? <RxCross2 style={{ color: '#E70D0D'}} /> : <FaCheck style={{ color: '#7ACB1D'}}/> }
        <p>{item}</p>
    </div>
  )
}

export default IngredientItem