<template>
  <v-row justify="center">
    <v-col cols="12" sm="6" md="4">
      <v-row class="mt-2">
        <v-text-field
          label="Solo"
          placeholder="owner/repository"
          v-model.trim="query"
          @keypress.enter="inputHandler"
          solo
        ></v-text-field>
        <v-btn
          height="48px"
          class="primary ml-2"
          @click="inputHandler"
        >Search!</v-btn>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'SearchForm',

  data: function () {
    return {
      error: null
    }
  },

  computed: {
    ...mapState(['searchQuery']),

    query: {
      get () {
        return this.searchQuery
      },
      set (value) {
        return this.$store.commit('setSearchQuery', value)
      }
    }
  },

  methods: {
    ...mapMutations(['setError', 'setSearchQuery']),

    inputHandler () {
      const regularString = /[-_\w]+\/[-_.\w]+/
      const owner = this.query.split('/')[0]
      const repository = this.query.split('/')[1]

      if (regularString.test(this.query)) {
        this.$router.push({ path: 'search', query: { owner, repository } })
      }
    },

    AddrToSearchQuery () {
      const owner = this.$route.query.owner
      const repository = this.$route.query.repository

      if (owner || repository) {
        this.setSearchQuery(`${owner}/${repository}`)
      } else {
        this.setSearchQuery('')
      }
    }
  },

  watch: {
    $route: function () {
      this.AddrToSearchQuery()
    }
  },

  created: function () {
    this.AddrToSearchQuery()
  }
}
</script>
