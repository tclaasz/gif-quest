import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import config from "./config"
import { GifObject, GiphyResponse } from './types/Giphy'
import TrendingSearchGrid from './components/TrendingSearchGrid'
import Search from './components/Search'
import ViewOptions from './components/ViewOptions'
import FavouritesGrid from './components/FavouritesGrid'

const viewOptions = ["trending", "favourites"] as const
export type View = typeof viewOptions[number]

const App: React.FC = () => {
  const favourites = useMemo(() =>{
    return JSON.parse(localStorage.getItem("favourites") || "[]") as string[]
  }, [])

  const [error, setError] = useState<string|null>(null)
  const [trendingItems, setTrendingItems] = useState<GifObject[]>([])
  const [searchInputValue, setSearchInputValue] = useState("")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [searchItems, setSearchItems] = useState<GifObject[]>([])
  const [favouriteIds, setfavouriteIds] = useState<string[]>(favourites)
  const [favouriteItems, setFavouriteItems] = useState<GifObject[]>([])
  const [view, setView] = useState<View>("trending")

  const { limit, bundle } = config.query

  const fetchTrendingItems = async () => {
    if (trendingItems.length > 0) return

    try {
      const url = `${config.api.endpoints.trending}?api_key=${config.api.key}&limit=${limit}&bundle=${bundle}`

      const response = await fetch(url)
      const data = await response.json() as GiphyResponse

      if (data.meta.status !== 200) {
        throw new Error(data.meta.msg)
      }

      setTrendingItems(data.data)
      setError(null)
    } catch (error) {
      console.error("An error occurred while fetching trending items.", error)
      setError("An error occurred while fetching trending items.")
    }
  }

  const fetchSearchItems = useCallback(async () => {
    if (!searchQuery) return

    try {
      const url = `${config.api.endpoints.search}?api_key=${config.api.key}&q=${encodeURIComponent(searchQuery)}&limit=${limit}&bundle=${bundle}`

      const response = await fetch(url)
      const data = await response.json() as GiphyResponse

      if (data.meta.status !== 200) {
        throw new Error(data.meta.msg)
      }

      setSearchItems(data.data)
      setError(null)
    } catch (error) {
      console.error("An error occurred while fetching search items.", error)
      setError("An error occurred while fetching search items.")
    }
  }, [bundle, limit, searchQuery])

  // On initial render, fetch trending items
  useEffect(() => {
    fetchTrendingItems()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // When the search query changes, fetch search results
  useEffect(() => {
    if (searchQuery) {
      fetchSearchItems()
    } else {
      setSearchItems([])
    }
  }, [fetchSearchItems, searchQuery])

  // Load favourite ids from local storage on initial render
  useEffect(() => {
    if (favourites) setfavouriteIds(favourites)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Save favourites to local storage when they change
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favouriteIds))
  }, [favouriteIds])

  // When there is a search query, use the search items otherwise use the trending items by default
  const items = useMemo(() => {
    return searchQuery ? searchItems : trendingItems
  }, [searchItems, searchQuery, trendingItems])

  return (
    <main>
      <h1>Gif Quest</h1>

      {error && (
        <div className="error-container">
          <p className="error">{error}</p>
        </div>
      )}

      {!!viewOptions.length && (
        <ViewOptions options={viewOptions} view={view} setView={setView} />
      )}

      {view === "trending" ? (
        <>
          <Search
            setSearchQuery={setSearchQuery}
            inputValue={searchInputValue}
            setInputValue={setSearchInputValue}
          />

          <TrendingSearchGrid
            items={items}
            favouriteIds={favouriteIds}
            setfavouriteIds={setfavouriteIds}
          />
        </>
      ) : (
        <FavouritesGrid
          items={favouriteItems}
          setItems={setFavouriteItems}
          favouriteIds={favouriteIds}
          setfavouriteIds={setfavouriteIds}
          setError={setError}
        />
      )}
    </main>
  )
}

export default App
