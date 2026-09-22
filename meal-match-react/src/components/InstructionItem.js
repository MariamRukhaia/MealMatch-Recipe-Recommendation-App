
const InstructionItem = ({number, step}) => {
  return (
    <div className="flex flex-row gap-x-2">
        <p>{number}.</p>
        <p>{step}</p>
    </div>
  )
}

export default InstructionItem