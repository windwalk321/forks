import axios from 'axios'
import firebase from 'firebase/app'

export default {
  async fetchRepositoryForks ({ commit }, { owner, repository, page = 1, perPage }) {
    commit('setError', null)

    return axios
      .get(`https://api.github.com/repos/${owner}/${repository}/forks?page=${page}&per_page=${perPage}`)
      .then(response => {
        commit('setRepositoryForks', response.data)
      })
      .catch(error => {
        console.error(error)
        throw error
      })
  },

  async fetchRepositoryInfo ({ commit }, repository) {
    return axios
      .get(`https://api.github.com/search/repositories?q=${repository}`)
      .then(response => {
        commit('setRepositoryInfo', response.data.items[0])
      })
      .catch(error => {
        console.error(error)
        throw error
      })
  },

  async addToFavorite ({ commit }, item) {
    try {
      await firebase.database().ref('/favorite').push({ item })

      return commit('addToFavorite', item)
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  async fetchFavorite ({ commit }) {
    try {
      const favoriteItems = (await firebase.database().ref('/favorite').once('value')).val()
      const formatItems = Object.values(favoriteItems).map(c => c.item)

      return commit('setFavorite', formatItems)
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
