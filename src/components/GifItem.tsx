import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { GifObject } from "../types/Giphy"
import FavouriteButton from "./FavouriteButton"

type Props = {
  item: GifObject
  index: number
  favouriteIds: string[]
  setfavouriteIds: Dispatch<SetStateAction<string[]>>
}

const colours = [
  "rgb(153, 51, 255)",
  "rgb(97, 87, 255)",
  "rgb(255, 102, 102)",
  "rgb(0, 204, 255)",
  "rgb(0, 255, 153)",
  "rgb(255 243 92)",
  "#02FF99"
]

const GifItem: React.FC<Props> = ({ item, index, favouriteIds, setfavouriteIds }) => {
  const [loading, setLoading] = useState(true)

  const image = item.images?.fixed_height_downsampled
  const colourIndex = index % colours.length

  useEffect(() => {
    const img = new Image()
    const url = item.images?.fixed_height_downsampled?.url
    if (!url) return

    img.src = url
    img.onload = () => setLoading(false)
  }, [item.images?.fixed_height_downsampled?.url])


  const width = image?.width
  const height = image?.height

  return image?.url ? (
    <div className="gif-item">
      <div className="gif-item-image-container" style={{ backgroundColor: colours[colourIndex] }}>
        {loading ? (
          <div
            className="gif-item-image-loader"
          >
            <div className="gif-item-spinner">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#FFFFFF" d="M304 48a48 48 0 1 0-96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0-96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0-96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1a48 48 0 1 0 67.9 67.9zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437a48 48 0 1 0 67.9-67.9 48 48 0 1 0-67.9 67.9z" /></svg>
            </div>
          </div>
        ) : (
          <img
            src={image.url}
            alt={item.title}
            width={width}
            height={height}
            className="gif-item-image"
          />
        )}
      </div>

      <FavouriteButton item={item} favouriteIds={favouriteIds} setfavouriteIds={setfavouriteIds} />
    </div>
  ) : null
}

export default GifItem