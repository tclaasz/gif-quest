import { Dispatch, SetStateAction } from "react"
import { GifObject } from "../types/Giphy"
import GifItem from "./GifItem"

type Props = {
  items: GifObject[]
  favouriteIds: string[]
  setfavouriteIds: Dispatch<SetStateAction<string[]>>
}

const TrendingSearchGrid: React.FC<Props> = ({ items, favouriteIds, setfavouriteIds }) => {
  return (
    <section className="grid-container">
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
    </section>
  )
}

export default TrendingSearchGrid