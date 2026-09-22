import {NavLink} from 'react-router-dom'

const StartNavBar = () => {
  return (
    <div className='w-full bg-[#F1A030] flex flex-row justify-between items-center py-8 px-20'>
      <NavLink to="/">
      <h2 className='text-4xl font-medium text-white'>MealMatch</h2>
      </NavLink>
    </div>
  )
}

export default StartNavBar