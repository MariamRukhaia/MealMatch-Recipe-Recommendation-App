import {NavLink} from 'react-router-dom'
import { IoPersonCircle } from "react-icons/io5";
import MealMatchGif from "../assets/MealMatch.gif"

const NavBar = ({cart}) => {
  return (
    <div className='w-full bg-white flex flex-row justify-center items-end pt-8 pb-4 px-20 drop-shadow'>
      <NavLink to="/cuisine">
        <div className='flex flex-row gap-x-3 items-center'>
          <img src={MealMatchGif} alt="Meal Match Logo" className='w-12'/>
          <h2 className='text-4xl font-normal text-[#F1A030]'>MealMatch</h2>
        </div>
      </NavLink>

      <div className='flex flex-row justify-between items-end ml-32 w-full'>
        <div className='flex flex-row justify-center items-end gap-x-10'>
          <NavLink to="/discover">
            <p className='text-xl font-light'>Discover</p>
          </NavLink>
          <NavLink to="/favorites" state={{ cart }}>
            <p className='text-xl font-light'>Favorites</p>
          </NavLink>
        </div>

        <NavLink to="/profile">
          <IoPersonCircle style={{ fontSize: '50px' }}/>
        </NavLink>
      </div>
    </div>
  )
}

export default NavBar