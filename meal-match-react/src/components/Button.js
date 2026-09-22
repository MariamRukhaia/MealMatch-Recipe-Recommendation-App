
const Button = ({type, children}) => {
  return (
    <button type={type} className='flex flex-row px-4 py-2 bg-[#F1A030] rounded-md'>
      <p className="font-bold text-lg">{children}</p>
    </button>
  )
}

export default Button