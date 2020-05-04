<template>
  <tr>
    <td>{{ fork.full_name }}</td>
    <td>{{ fork.owner.login}}</td>
    <td>{{ fork.stargazers_count }}</td>
    <td>
      <a :href="fork.html_url">{{ fork.html_url }}</a>
    </td>
    <td>
      <v-btn
        icon
        color="red"
        @click="toFavorite(fork)"
        :disabled="isFavorite"
      >
        <v-icon>mdi-heart-outline</v-icon>
      </v-btn>
    </td>
    <td v-if="isFavorite">
      <v-icon color="red">mdi-heart</v-icon>
    </td>
  </tr>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'SearchTableItem',

  props: {
    fork: Object
  },

  computed: {
    ...mapState(['favorite']),

    isFavorite () {
      return !!this.favorite.filter(item => item.id === this.fork.id).length
    }
  },

  methods: {
    ...mapActions(['addToFavorite']),

    async toFavorite (item) {
      try {
        this.addToFavorite(item)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
