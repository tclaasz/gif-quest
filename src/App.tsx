import { useEffect, useState } from 'react'
import './App.css'
import config from "./config"
import { GifObject, TrendingResponse } from './types/Giphy'
import TrendingSearchGrid from './components/TrendingSearchGrid'

const App: React.FC = () => {
  const [trendingItems, setTrendingItems] = useState<GifObject[]>([])
  const [error, setError] = useState<string|null>(null)

  const fetchTrendingItems = async () => {
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
      console.log(data)
    } catch (error) {
      console.error("An error occurred while fetching trending items.", error)
      setError("An error occurred while fetching trending items.")
    }
  }

  useEffect(() => {
    fetchTrendingItems()
  }, [])

  return (
    <main>
      <h1>Gif Quest</h1>

      {error && (
        <div className="error-container">
          <p className="error">{error}</p>
        </div>
      )}

      <TrendingSearchGrid items={trendingItems} />
    </main>
  )
}

export default App
