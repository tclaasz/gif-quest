import { Dispatch, SetStateAction } from "react"
import { View } from "../App"

type Props = {
  options: Readonly<View[]>
  view: View
  setView: Dispatch<SetStateAction<View>>
}

const ViewOptions: React.FC<Props> = ({ options, view, setView }) => {
  return (
    <div className="view-options">
      {options.map((option, index) => {
        const isActive = view === option
        const label = option.charAt(0).toUpperCase() + option.slice(1)
        return (
          <button
            key={`${option}-${index}`}
            className={`view-option${isActive ? " is-active" : ""}`}
            onClick={() => setView(option)}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

export default ViewOptions
