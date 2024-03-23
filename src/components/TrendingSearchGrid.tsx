import { GifObject } from "../types/Giphy"
import GifItem from "./GifItem"

type Props = {
  items: GifObject[]
}

const TrendingSearchGrid: React.FC<Props> = ({ items }) => {
  return (
    <section className="grid-container">
      <div className="trending-search-grid">
        {items.map((item, index) => (
          <GifItem key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  )
}

export default TrendingSearchGrid