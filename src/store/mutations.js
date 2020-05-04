export default {
  setRepositoryForks (state, payload) {
    state.repositoryForks = payload
  },

  setRepositoryInfo (state, payload) {
    state.repositoryInfo = payload
  },

  setSearchQuery (state, payload) {
    state.searchQuery = payload
  },

  addToFavorite (state, payload) {
    state.favorite.push(payload)
  },

  setFavorite (state, payload) {
    state.favorite = payload
  }
}
