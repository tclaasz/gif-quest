// GIF Object
interface GifObject {
  type: string;
  id: string;
  slug: string;
  url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  rating: string;
  content_url: string;
  user: User | null;
  source_tld: string;
  source_post_url: string;
  update_datetime: string;
  create_datetime: string;
  import_datetime: string;
  trending_datetime: string;
  images: Images;
  title: string;
  alt_text: string;
}

// User Object
interface User {
  avatar_url: string;
  banner_url: string;
  profile_url: string;
  username: string;
  display_name: string;
}

// Images Object
interface Images {
  fixed_height: ImageData;
  fixed_height_still: ImageData;
  // Add other image formats as needed
}

interface ImageData {
  url: string;
  width: string;
  height: string;
  size?: string;
  mp4?: string;
  mp4_size?: string;
  webp?: string;
  webp_size?: string;
}

// Meta Object
interface Meta {
  msg: string;
  status: number;
  response_id: string;
}

// Pagination Object
interface Pagination {
  offset: number;
  total_count: number;
  count: number;
}

// Successful Response (200 OK)
interface TrendingResponse {
  data: GifObject[];
  pagination: Pagination;
  meta: Meta;
}


export type { GifObject, User, Images, ImageData, Meta, Pagination, TrendingResponse }