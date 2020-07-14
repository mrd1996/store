<template>
  <v-app>
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
      rel="stylesheet"
    />

    <v-content style="background-color: #232537">
      <v-container fluid>
        <v-row dense class="pa-0">
          <v-col cols="12" sm="6" class="pa-0">
            <v-card class="mx-auto pa-0 ma-0" color="transparent" flat>
              <v-card-text class="pb-0">
                <div class="grey--text">{{ game.info.id }} - {{ game.info.rdate }}</div>
                <p class="display-1 white--text">{{ game.info.name }} | {{ game.info.rating }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="pt-0">
          <v-col cols="12" sm="6" class="pt-0">
            <v-card class="mx-auto pt-0" color="transparent" flat>
              <v-card-text>
                <v-img :src="game.info.image"></v-img>
                <br />
                <p class="headline grey--text">{{ game.info.desc }}</p>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6">
            <v-card class="mx-auto" color="#3c3f57">
              <v-card
                @click="$router.push(`/game/${game.id}`)"
                dark
                flat
                color="black"
                class="pa-2"
              >
                <span
                  v-if="game.sale[0].discount"
                  class="subtitle-1 pa-1 rounded-card font-weight-regular mr-3"
                  style="color: #a4d007; background: #4c6b22; position:relative; z-index:2"
                >{{ game.sale[0].discount }}</span>
                <span
                  v-if="game.sale[0].salePrice"
                  class="heading-6 pa-1 font-weight-bold"
                  style="position:relative; z-index:2"
                >{{ game.sale[0].salePrice }}€</span>
                <span
                  v-else
                  class="heading-6 pa-1 font-weight-bold"
                  style="position:relative; z-index:2"
                >{{ game.info.price }}€</span>
                <v-icon
                  v-if="game.inLibrary"
                  medium
                  class="float-right"
                  style="z-index:2"
                >mdi-bookmark</v-icon>
                <v-icon v-if="game.inWishlist" medium class="float-right" style="z-index:2">mdi-star</v-icon>

                <div
                  style="background-color: rgba(70, 72, 82, 0.6); position: absolute; height: 100%; width: 100%; left:0; top:0"
                ></div>
              </v-card>

              <v-card-text>
                <div class="ml-5 grey--text title text-center">
                  <v-icon color="grey">mdi-gamepad-variant-outline</v-icon>
                  {{ game.info.avgPlayTime }} h
                  <v-icon class="ml-6" color="grey">mdi-trophy-variant-outline</v-icon>
                  {{ game.info.trophys }}
                </div>
                <div class="mt-2 ml-3">
                  <v-icon
                    v-for="plt in game.platforms"
                    :key="plt.plt"
                    color="#7a7d91"
                  >{{platIcon[plt.plt]}}</v-icon>
                </div>
                <v-card-text class="title grey--text">
                  Categories
                  <v-chip-group active-class="deep-purple accent-4 white--text" column>
                    <v-chip
                      :key="category.id"
                      v-for="category in  game.categories"
                      @click="$router.push({name: 'store', params: {propCat: category.cat}})"
                      class="crumb-color"
                      color="#232537"
                    >{{category.category}}</v-chip>
                  </v-chip-group>
                </v-card-text>
                <v-card-text class="title grey--text">
                  Genres
                  <v-chip-group active-class="deep-purple accent-4 white--text" column>
                    <v-chip
                      :key="genres.id"
                      v-for="genres in  game.genres"
                      @click="$router.push({name: 'store', params: {propGen: genres.gen}})"
                      class="crumb-color"
                      color="#232537"
                    >{{genres.genre}}</v-chip>
                  </v-chip-group>
                </v-card-text>
              </v-card-text>
              <v-row>
                <v-col cols="6">
                  <v-card-text class="title grey--text">Developer</v-card-text>
                  <v-card-actions>
                    <v-btn
                      v-for="(devs,i) in game.devs"
                      :key="i"
                      text
                      color="#232537"
                      class="title"
                      @click="$router.push({name: `dev`, params: {id: devs.dev, name:devs.developer}})"
                    >{{ devs.developer }}</v-btn>
                  </v-card-actions>
                </v-col>
                <v-col cols="6">
                  <v-card-text class="title grey--text mb-0">Publisher</v-card-text>
                  <v-card-actions>
                    <v-btn
                      v-for="(pubs,i) in game.publishers"
                      :key="i"
                      text
                      color="#232537"
                      class="title"
                      @click="$router.push({name: `pub`, params: {id: pubs.pub, name:pubs.publisher}})"
                    >{{ pubs.publisher }}</v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
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
      game: { info: { id: "", site: "" } },
      platIcon: {
        plt_mac: "mdi-apple",
        plt_windows: "mdi-microsoft-windows",
        plt_linux: "mdi-linux"
      }
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
