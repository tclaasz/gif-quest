import { Dispatch, SetStateAction, useCallback, useState } from "react"
import { debounce } from "../utils"

type Props = {
  setSearchQuery: Dispatch<SetStateAction<string>>
}

const Search: React.FC<Props> = ({ setSearchQuery }) => {
  const [inputValue, setInputValue] = useState("")

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearch = useCallback(
    debounce((value: string) => {
      setSearchQuery(value)
    }, 500),
    []
  )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValue(value)
    handleSearch(value)
  }

  return (
    <div className="search-container">
      <label htmlFor="search-input" className="visually-hidden search-label">
        Search
      </label>

      <input
        id="search-input"
        type="text"
        className="search-input"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search for GIFs"
      />
    </div>
  )
}

export default Search
