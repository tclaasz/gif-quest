import { Dispatch, MouseEvent, SetStateAction } from "react"
import { GifObject } from "../types/Giphy"

type Props = {
  item: GifObject
  favouriteItems: GifObject[]
  setFavouriteItems: Dispatch<SetStateAction<GifObject[]>>
}

const FavouriteButton: React.FC<Props> = ({ item, favouriteItems, setFavouriteItems }) => {
  const isFavourite = favouriteItems?.some((favouriteItem) => favouriteItem.id === item.id)

  const handleClick = (e: MouseEvent) => {
    e.preventDefault()

    if (isFavourite) {
      const updatedFavourites = favouriteItems.filter((favouriteItem) => favouriteItem.id !== item.id)
      setFavouriteItems(updatedFavourites)
    } else {
      if (!favouriteItems) {
        setFavouriteItems([item])
      } else {
        setFavouriteItems([...favouriteItems, item])
      }
    }
  }

  return (
    <button className={`favourite-button${isFavourite ? " is-active" : ""}`} onClick={handleClick}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="favourite-button-icon heart-filled"><path d="m47.6 300.4 180.7 168.7c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9l180.7-168.7c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141-45.6-7.6-92 7.3-124.6 39.9l-12 12-12-12c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" /></svg>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="favourite-button-icon heart-outline"><path d="m225.8 468.2-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144 39.4-7.6 79.7 1.5 111.8 24.1 9 6.4 17.4 13.8 25 22.3 4.2-4.8 8.7-9.2 13.5-13.3 3.7-3.2 7.5-6.2 11.5-9 32.1-22.6 72.4-31.7 111.8-24.2C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1c-23.1-25.9-58-37.7-92-31.2-46.6 8.9-80.2 49.5-80.2 96.9v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268a102.7 102.7 0 0 0 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9-34-6.5-69 5.4-92 31.2l-.1.1-.1.1-17.8 20c-.3.4-.7.7-1 1.1-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" /></svg>
    </button>
  )
}

export default FavouriteButton
