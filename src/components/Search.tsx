import { Dispatch, SetStateAction, useState } from "react"
import { debounce } from "../utils"

type Props = {
  setSearchQuery: Dispatch<SetStateAction<string>>
}

const Search: React.FC<Props> = ({ setSearchQuery }) => {
  const [inputValue, setInputValue] = useState("")

  const debouncedSearch = debounce((value: string) => {
    setSearchQuery(value)
  }, 500)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValue(value)

    // Debounce the search query
    debouncedSearch(value)
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
        onChange={handleSearch}
        placeholder="Search for GIFs"
      />
    </div>
  )
}

export default Search
