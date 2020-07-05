<template>
  <v-app>
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
      rel="stylesheet"
    />

    <v-content style="background-color: #232537">
      <v-container fluid>
        <v-row>
          <v-col v-for="game in library" :key="game.id" cols="auto">
            <v-card class="mx-auto mt-2" max-width="344">
              <v-card-text>
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
                      v-for="category in  game.categories"
                    >{{category.category}}</v-chip>
                  </v-chip-group>
                </v-card-text>
                <v-card-text>
                  Genres
                  <v-chip-group active-class="deep-purple accent-4 white--text" column>
                    <v-chip :key="genres.id" v-for="genres in  game.genres">{{genres.genres}}</v-chip>
                  </v-chip-group>
                </v-card-text>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="deep-purple accent-4">{{ game.name }}</v-btn>
              </v-card-actions>
            </v-card>
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
    return {};
  },
  computed: mapState({
    library: function(state) {
      return state.user.library;
    }
  }),
  methods: {
    register() {
      register(this.username, this.email, this.password);
      console.log(this.username, this.email, this.password);

      return 1;
    },
    async login() {
      let data = await login(this.emaill, this.passwordl);
      this.uid = data.uid;
      this.token = data.token;
      await this.setUser({ email: this.emaill, password: this.passwordl });
      this.setWishlist({ id: this.user.uid, token: this.user.token });
      await this.setLibrary({ id: this.user.uid, token: this.user.token });
      console.log(this.user.wishlist);
      console.log(this.user.library);

      this.$router.push("/");
      // console.log(this.uid);

      // console.log(await getUser(this.uid, this.token));
      // console.log(await wishlist(this.uid, this.token));
    },
    ...mapActions(["setUser", "setWishlist", "setLibrary"])
  },
  mounted() {
    // getGame(this.user.token, this.$route.params.id).then(data => {
    //   this.game = data;
    // });
    console.log(this.library);
    console.log(this.$store.state.user.library);
  }
};
</script>

<style></style>
