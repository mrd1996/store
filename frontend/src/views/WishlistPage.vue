<template>
  <v-app>
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
      rel="stylesheet"
    />

    <v-content style="background-color: #232537">
      <v-container fluid>
        <v-row>
          <v-col v-for="game in wishlist" :key="game.id" cols="auto">
            <v-hover v-slot:default="{ hover }">
              <v-card class="mx-auto mt-2" max-width="390" height="100%">
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex justify-center transition-fast-in-fast-out red darken-2 v-card--reveal display-3 white--text"
                    style="height: 5%;"
                  >
                    <v-btn icon class="mt-1" @click="remToWish(game)">
                      <v-icon large>mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </v-expand-transition>
                <v-card-text @click="$router.push(`/game/${game.id}`)">
                  <div>{{ game.id }} - {{ game.rdate }}</div>
                  <p class="display-1 text--primary">{{ game.name }} | {{ game.rating }}</p>
                  <v-img :src="game.image"></v-img>
                  <br />
                  <p>{{ game.desc }}</p>
                  <div class="text--primary">
                    <v-icon>mdi-gamepad-variant-outline</v-icon>
                    {{ game.avgPlayTime }} h
                    <br />
                    <v-icon>mdi-trophy-variant-outline</v-icon>
                    {{ game.trophys }}
                  </div>
                  <v-card-text>
                    Categories
                    <v-chip-group active-class="deep-purple accent-4 white--text" column>
                      <v-chip
                        :key="category.id"
                        v-for="category in  game.categorys"
                        @click="$router.push({name: 'store', params: {propCat: category.id}})"
                      >{{category}}</v-chip>
                    </v-chip-group>
                  </v-card-text>
                  <v-card-text>
                    Genres
                    <v-chip-group active-class="deep-purple accent-4 white--text" column>
                      <v-chip :key="genres.id" v-for="genres in  game.genres">{{genres}}</v-chip>
                    </v-chip-group>
                  </v-card-text>
                </v-card-text>
                <v-btn text color="black accent-4">{{ game.devs[0] }}</v-btn>
                <br />
                <v-btn text color="black accent-4">{{ game.pubs[0] }}</v-btn>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
/* eslint-disable no-unused-vars */
import { mapActions, mapState } from "vuex";
import { register, login, getUser, wishlist, getGame, library } from "../api";
export default {
  data() {
    return {
      wishlist: this.$store.state.user.wishlist
    };
  },
  computed: mapState({
    ...mapState(["user"])
  }),
  methods: {
    remToWish(game) {
      this.remGameWishlist({
        id: this.user.uid,
        token: this.user.token,
        gameId: game.id
      }).then(data => {
        this.wishlist = this.user.wishlist;
      });
    },
    ...mapActions([
      "setUser",
      "setWishlist",
      "setLibrary",
      "addGameLibrary",
      "remGameLibrary",
      "addGameWishlist",
      "remGameWishlist"
    ])
  },
  mounted() {
    // getGame(this.user.token, this.$route.params.id).then(data => {
    //   this.game = data;
    // });
  }
};
</script>

<style></style>
