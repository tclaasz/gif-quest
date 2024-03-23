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
type RenditionObject = {
  url: string;
  width: string;
  height: string;
  size?: string;
  mp4?: string;
  mp4_size?: string;
  webp?: string;
  webp_size?: string;
}

interface Images {
  fixed_height?: RenditionObject;
  fixed_height_still?: RenditionObject;
  fixed_height_downsampled?: RenditionObject;
  fixed_width?: RenditionObject;
  fixed_width_still?: RenditionObject;
  fixed_width_downsampled?: RenditionObject;
  fixed_height_small?: RenditionObject;
  fixed_height_small_still?: RenditionObject;
  fixed_width_small?: RenditionObject;
  fixed_width_small_still?: RenditionObject;
  downsized?: RenditionObject;
  downsized_still?: RenditionObject;
  downsized_large?: RenditionObject;
  downsized_medium?: RenditionObject;
  downsized_small?: {
    mp4: string;
    width: string;
    height: string;
    mp4_size: string;
  };
  original?: RenditionObject & {
    frames: string;
  };
  original_still?: RenditionObject;
  looping?: {
    mp4: string;
    width: string;
    height: string;
  };
  preview?: {
    mp4: string;
    width: string;
    height: string;
    mp4_size: string;
  };
  preview_gif?: {
    url: string;
    width: string;
    height: string;
  };
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
interface GiphyResponse {
  data: GifObject[];
  pagination: Pagination;
  meta: Meta;
}


export type { GifObject, User, RenditionObject, Images, ImageData, Meta, Pagination, GiphyResponse }