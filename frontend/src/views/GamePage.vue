<template>
  <v-app>
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
      rel="stylesheet"
    />

    <v-content style="background-color: #232537">
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="6">
            <v-card class="mx-auto" max-width="344">
              <v-card-text>
                <div>{{ game.info.id }} - {{ game.info.rdate }}</div>
                <p class="display-1 text--primary">{{ game.info.name }} | {{ game.info.rating }}</p>
                <v-img :src="game.info.image"></v-img>
                <br />
                <p>{{ game.info.desc }}</p>
                <div class="text--primary">
                  <v-icon>mdi-gamepad-variant-outline</v-icon>
                  {{ game.info.avgPlayTime }} h
                  <br />
                  <v-icon>mdi-trophy-variant-outline</v-icon>
                  {{ game.info.trophys }}
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
                <v-btn text color="deep-purple accent-4">{{ game.info.site.slice(25) }}</v-btn>
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
import { register, login, getUser, wishlist, getGame } from "../api";
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      emaill: "md",
      passwordl: "1",
      uid: "",
      token: "",
      game: { info: { id: "", site: "" } }
    };
  },
  computed: mapState(["user"]),
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
    getGame(this.user.token, this.$route.params.id).then(data => {
      this.game = data;
    });
  }
};
</script>

<style></style>
