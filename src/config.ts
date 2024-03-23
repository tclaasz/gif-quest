const config = {
  api: {
    key: "F956lwmnfUD02UnJ89SC2D8PnigZEPDZ",
    endpoints: {
      trending: "https://api.giphy.com/v1/gifs/trending",
      search: "https://api.giphy.com/v1/gifs/search",
      getByIds: "https://api.giphy.com/v1/gifs",
    },
  },
  query: {
    limit: 36,
    bundle: "messaging_non_clips",
  }
}

export default config