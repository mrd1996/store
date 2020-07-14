<template>
  <v-app>
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
      rel="stylesheet"
    />

    <v-content style="background-color: #232537">
      <v-container>
        <h1 class="display-3 text-center white--text">{{$route.params.name}}</h1>
        <Gallery :method="galleryMethod" :pageSize="15" />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
/* eslint-disable no-unused-vars */
import { mapActions, mapState } from "vuex";
import {
  register,
  login,
  getUser,
  wishlist,
  getGame,
  library,
  getDevGames,
  getPubGames
} from "../api";
import Gallery from "../components/gallery";
export default {
  components: {
    Gallery
  },
  props: {
    name: String
  },
  data() {
    return {
      galleryMethod: getPubGames(this.$route.params.id)
    };
  },
  computed: mapState({
    library: function(state) {
      return state.user.library;
    }
  }),
  methods: {
    ...mapActions(["setUser", "setWishlist", "setLibrary"])
  }
};
</script>

<style></style>
