<template>
  <v-container>
    <v-row justify="center" v-if="isLoaded">
      <table class="results__table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Owner</th>
            <th>Stars</th>
            <th>Link</th>
            <th>To favorite</th>
            <th>favorite</th>
          </tr>
        </thead>
        <tbody>
          <table-item v-for="fork in repositoryForks" :key="fork.id" :fork="fork" />
        </tbody>
      </table>
      <v-pagination
        class="mt-2"
        :value="page"
        :length="maxPage"
        :total-visible="10"
        @input="onPageChange"
      ></v-pagination>
    </v-row>
    <v-row justify="center" v-else-if="!isLoaded">
      <v-progress-circular
        :size="50"
        :width="5"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TableItem from '@/components/SearchTableItem'

export default {
  name: 'Search',

  components: { TableItem },

  data: function () {
    return {
      isLoaded: false,
      perPage: 30
    }
  },

  computed: {
    ...mapState([
      'repositoryForks',
      'repositoryInfo'
    ]),

    page () {
      return Number(this.$route.query.page) || 1
    },

    maxPage () {
      return Math.ceil(this.repositoryInfo.forks_count / this.perPage)
    }
  },

  methods: {
    ...mapActions([
      'fetchRepositoryForks',
      'fetchRepositoryInfo',
      'fetchFavorite'
    ]),

    async getRepositoryData () {
      const query = {
        owner: this.$route.query.owner,
        repository: this.$route.query.repository,
        page: this.$route.query.page,
        perPage: this.perPage
      }

      await this.fetchRepositoryForks(query)
      await this.fetchRepositoryInfo(this.$route.query.repository)
    },

    onPageChange (page) {
      const owner = this.$route.query.owner
      const repository = this.$route.query.repository

      this.$router.push({ query: { owner, repository, page } })
    }
  },

  watch: {
    $route: async function () {
      this.isLoaded = false
      if (Object.keys(this.$route.query).length) {
        await this.getRepositoryData()
        this.isLoaded = true
      }
    }
  },

  created: async function () {
    if (Object.keys(this.$route.query).length) {
      await this.getRepositoryData()
      await this.fetchFavorite()
      this.isLoaded = true
    }
  }
}
</script>

<style scoped>
.results__table {
  border-collapse: collapse;
}

.results__table td, th {
  padding: 0.5rem;
  text-align: left;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
