import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import config from "./config"
import { GifObject, TrendingResponse } from './types/Giphy'
import TrendingSearchGrid from './components/TrendingSearchGrid'
import Search from './components/Search'

const App: React.FC = () => {
  const [error, setError] = useState<string|null>(null)
  const [trendingItems, setTrendingItems] = useState<GifObject[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [searchItems, setSearchItems] = useState<GifObject[]>([])

  const { limit, bundle } = config.query

  const fetchTrendingItems = async () => {
    if (trendingItems.length > 0) return

    try {
      const limit = 36
      const bundle = "messaging_non_clips"
      const url = `${config.api.endpoints.trending}?api_key=${config.api.key}&limit=${limit}&bundle=${bundle}`

      const response = await fetch(url)
      const data = await response.json() as TrendingResponse

      if (data.meta.status !== 200) {
        throw new Error(data.meta.msg)
      }

      setTrendingItems(data.data)
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
      const data = await response.json() as TrendingResponse

      if (data.meta.status !== 200) {
        throw new Error(data.meta.msg)
      }

      setSearchItems(data.data)
    } catch (error) {
      console.error("An error occurred while fetching search items.", error)
      setError("An error occurred while fetching search items.")
    }
  }, [bundle, limit, searchQuery])

  // On initial render, fetch trending items
  useEffect(() => {
    fetchTrendingItems()
  }, [fetchTrendingItems])

  // When the search query changes, fetch search results
  useEffect(() => {
    fetchSearchItems()

    if (searchQuery) {
      fetchSearchItems()
    } else {
      setSearchItems([])
    }
  }, [fetchSearchItems, searchQuery])

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

      <Search setSearchQuery={setSearchQuery} />

      <TrendingSearchGrid items={items} />
    </main>
  )
}

export default App
