import { Dispatch, SetStateAction } from "react"
import { GifObject } from "../types/Giphy"
import GifItem from "./GifItem"

type Props = {
  items: GifObject[]
  favouriteItems: GifObject[]
  setFavouriteItems: Dispatch<SetStateAction<GifObject[]>>
}

const TrendingSearchGrid: React.FC<Props> = ({ items, favouriteItems, setFavouriteItems }) => {
  return (
    <section className="grid-container">
      <div className="trending-search-grid">
        {items.map((item, index) => (
          <GifItem
            key={item.id}
            item={item}
            index={index}
            favouriteItems={favouriteItems}
            setFavouriteItems={setFavouriteItems}
          />
        ))}
      </div>
    </section>
  )
}

export default TrendingSearchGrid