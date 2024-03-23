import { Dispatch, SetStateAction } from "react"
import { GifObject } from "../types/Giphy"
import GifItem from "./GifItem"

type Props = {
  favouriteItems: GifObject[]
  setFavouriteItems: Dispatch<SetStateAction<GifObject[]>>
}

const FavouritesGrid: React.FC<Props> = ({ favouriteItems, setFavouriteItems }) => {
  return (
    <section className="grid-container">
      <div className="trending-search-grid">
        {favouriteItems.map((item, index) => (
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

export default FavouritesGrid