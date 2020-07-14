<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-container fluid class="pa-0">
        <v-row no>
          <v-col v-for="game in currentPage" :key="game.id" class="d-flex child-flex" cols="4">
            <v-hover v-if="pageTotal > 0" v-slot:default="{ hover }">
              <v-card
                flat
                class="rounded-bottom"
                style="background-color: rgb(60, 63, 87); overflow: hidden"
              >
                <v-card
                  @click="$router.push(`/game/${game.id}`)"
                  dark
                  flat
                  color="black"
                  class="pa-2"
                >
                  <span
                    v-if="game.discount"
                    class="subtitle-1 pa-1 rounded-card font-weight-regular mr-3"
                    style="color: #a4d007; background: #4c6b22; position:relative; z-index:2"
                  >{{ game.discount }}</span>
                  <span
                    v-if="game.salePrice"
                    class="heading-6 pa-1 font-weight-bold"
                    style="position:relative; z-index:2"
                  >{{ game.salePrice }}€</span>
                  <span
                    v-else
                    class="heading-6 pa-1 font-weight-bold"
                    style="position:relative; z-index:2"
                  >{{ game.price }}€</span>
                  <v-icon
                    v-if="game.inLibrary"
                    medium
                    class="float-right"
                    style="z-index:2"
                  >mdi-bookmark</v-icon>
                  <v-icon
                    v-if="game.inWishlist"
                    medium
                    class="float-right"
                    style="z-index:2"
                  >mdi-star</v-icon>

                  <div class="top-card" :style="`background-image: url(\'${game.image}');`"></div>
                  <div
                    style="background-color: rgba(70, 72, 82, 0.6); position: absolute; height: 100%; width: 100%; left:0; top:0"
                  ></div>
                </v-card>
                <v-img :src="game.image" :aspect-ratio="2.1" class="grey lighten-2">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="d-flex transition-fast-in-fast-out light-blue darken-2 v-card--reveal display-3 white--text"
                      style="height: 30%;"
                    >
                      <v-btn v-if="game.inLibrary" icon @click="remToLib(game)">
                        <v-icon large>mdi-bookmark</v-icon>
                      </v-btn>
                      <v-btn v-else icon @click="addToLib(game)">
                        <v-icon large>mdi-bookmark-outline</v-icon>
                      </v-btn>
                      <v-btn v-if="game.inWishlist" icon @click="remToWish(game)">
                        <v-icon large>mdi-star</v-icon>
                      </v-btn>
                      <v-btn v-else icon @click="addToWish(game)">
                        <v-icon large>mdi-star-outline</v-icon>
                      </v-btn>
                    </div>
                  </v-expand-transition>
                </v-img>
              </v-card>
            </v-hover>
          </v-col>

          <v-pagination
            v-if="pageTotal > 0"
            v-model="page"
            :length="pageTotal"
            dark
            total-visible="7"
            color="#3c3f57"
          ></v-pagination>
        </v-row>
        <v-row>
          <h1 v-if="pageTotal === 0" class="white--text ma-auto">No Results</h1>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from "vuex";
// import { getSales } from "../api";

export default {
  data() {
    return {
      pageList: [],
      currentPage: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      page: 1,
      pageTotal: 1,
      category: ""
    };
  },
  props: {
    method: { type: Function },
    pageSize: { type: Number, default: 9 }
  },
  methods: {
    async getGamesList() {
      this.currentPage = await this.method(this.user.token);
    },
    addToLib(game) {
      this.addGameLibrary({
        id: this.user.uid,
        token: this.user.token,
        gameId: game.id
      }).then(() => {
        this.method(this.user.token, this.page, this.pageSize).then(data => {
          this.setWishlist({ id: this.user.uid, token: this.user.token });
          this.currentPage = data.data;
          this.pageList[this.page] = data.data;
          this.pageTotal = Math.ceil(data.total / this.pageSize);
        });
      });
    },
    remToLib(game) {
      this.remGameLibrary({
        id: this.user.uid,
        token: this.user.token,
        gameId: game.id
      }).then(() => {
        this.method(this.user.token, this.page, this.pageSize).then(data => {
          this.currentPage = data.data;
          this.pageList[this.page] = data.data;
          this.pageTotal = Math.ceil(data.total / this.pageSize);
        });
      });
    },
    addToWish(game) {
      this.addGameWishlist({
        id: this.user.uid,
        token: this.user.token,
        gameId: game.id
      }).then(() => {
        this.method(this.user.token, this.page, this.pageSize).then(data => {
          this.setLibrary({ id: this.user.uid, token: this.user.token });
          this.currentPage = data.data;
          this.pageList[this.page] = data.data;
          this.pageTotal = Math.ceil(data.total / this.pageSize);
        });
      });
    },
    remToWish(game) {
      this.remGameWishlist({
        id: this.user.uid,
        token: this.user.token,
        gameId: game.id
      }).then(() => {
        this.method(this.user.token, this.page, this.pageSize).then(data => {
          this.currentPage = data.data;
          this.pageList[this.page] = data.data;
          this.pageTotal = Math.ceil(data.total / this.pageSize);
        });
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
    this.method(this.user.token, this.page, this.pageSize).then(data => {
      this.currentPage = data.data;
      this.pageList[this.page] = data.data;
      this.pageTotal = Math.ceil(data.total / this.pageSize);
    });
  },
  watch: {
    page: function() {
      if (this.pageList[this.page])
        return (this.currentPage = this.pageList[this.page]);
      this.method(this.user.token, this.page, this.pageSize).then(data => {
        this.currentPage = data.data;
        this.pageList[this.page] = data.data;
        this.pageTotal = Math.ceil(data.total / this.pageSize);
      });
    },
    method: function() {
      this.page = 1;
      this.pageList = [];
      this.method(this.user.token, this.page, this.pageSize).then(data => {
        this.currentPage = data.data;
        this.pageList[this.page] = data.data;
        this.pageTotal = Math.ceil(data.total / this.pageSize);
      });
    }
  },
  computed: {
    ...mapState(["user"]),
    ...mapState({ library: state => state.user.library })
  }
};
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.9;
  position: absolute;
  width: 100%;
}

.rounded-bottom {
  border-bottom-left-radius: 10px !important;
  border-bottom-right-radius: 10px !important;
}

.top-card {
  background-position: top center;
  width: 120%;
  height: 120%;
  position: absolute;
  top: 0;
  left: 0;
  background-size: cover;
  filter: blur(8px);
  transform: scaleY(-1);
}
</style>
