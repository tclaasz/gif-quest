import { Dispatch, SetStateAction, useCallback, useEffect } from "react"
import { GifObject, GiphyResponse } from "../types/Giphy"
import GifItem from "./GifItem"
import config from "../config"

type Props = {
  items: GifObject[]
  setItems: Dispatch<SetStateAction<GifObject[]>>
  favouriteIds: string[]
  setfavouriteIds: Dispatch<SetStateAction<string[]>>
  setError: Dispatch<SetStateAction<string | null>>
}

const FavouritesGrid: React.FC<Props> = ({
  items,
  setItems,
  favouriteIds,
  setfavouriteIds,
  setError
}) => {

  // Fetch items that are in the ids array, but are not in the items array
  const fetchFavourites = useCallback(async () => {
    const idsToFetch = favouriteIds.filter(id => !items.some(item => item.id === id))
    if (!idsToFetch.length) {
      // Are there items in the items array that are not in the ids array?
      const itemsToRemove = items.filter(item => !favouriteIds.includes(item.id))
      if (itemsToRemove.length) {
        setItems(items.filter(item => !itemsToRemove.includes(item)))
      }
      return
    }

    const { bundle } = config.query
    const apiKey = config.api.key
    const endpoint = config.api.endpoints.getByIds

    const ids = idsToFetch.join(",")
    const url = `${endpoint}?api_key=${apiKey}&ids=${ids}&bundle=${bundle}`

    try {
      const response = await fetch(url)
      const data = await response.json() as GiphyResponse

      if (data.meta.status !== 200) {
        throw new Error(data.meta.msg)
      }

      const newItems = data.data.filter((item) => !items.some((i) => i.id === item.id))
      setItems([...items, ...newItems])
      setError(null)
    } catch (error) {
      console.error("An error occurred while fetching favourite items.", error)
      setError("An error occurred while fetching favourite items.")
    }
  }, [favouriteIds, setItems, items, setError])

  useEffect(() => {
    fetchFavourites()
  }, [favouriteIds, fetchFavourites, items, setError, setItems])

  return (
    <section className="grid-container">
      {items.length ? (
        <div className="trending-search-grid">
          {items.map((item, index) => (
            <GifItem
              key={item.id}
              item={item}
              index={index}
              favouriteIds={favouriteIds}
              setfavouriteIds={setfavouriteIds}
            />
          ))}
        </div>
      ): (
        <p className="no-items-message">No favourite items to display.</p>
      )}
    </section>
  )
}

export default FavouritesGrid