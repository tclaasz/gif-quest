import { GifObject } from "../types/Giphy"

type Props = {
  item: GifObject
}

const GifItem: React.FC<Props> = ({ item }) => {
  const image = item.images.fixed_height
  const { width, height } = image

  return (
    <div className="gif-item">
      <div className="gif-item-image-container">
        <img className="gif-item-image" src={item.images.fixed_height.url} alt={item.title} width={width} height={height} />
      </div>
    </div>
  )
}

export default GifItem