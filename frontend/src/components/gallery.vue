<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-container fluid class="pa-0">
        <v-row no>
          <v-col
            v-for="game in currentPage"
            :key="game.id"
            class="d-flex child-flex"
            cols="4"
          >
            <v-hover v-slot:default="{ hover }">
              <v-card flat class="d-flex rounded-card">
                <v-img
                  :src="game.image"
                  :aspect-ratio="14 / 9"
                  class="grey lighten-2"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
                      style="height: 30%;"
                    >
                      <v-btn v-if="game.inLibrary" icon @click="remToLib(game)">
                        <v-icon large>mdi-bookmark</v-icon>
                      </v-btn>
                      <v-btn v-else icon @click="addToLib(game)">
                        <v-icon large>mdi-bookmark-outline</v-icon>
                      </v-btn>
                      <v-btn
                        v-if="game.inWishlist"
                        icon
                        @click="remToWish(game)"
                      >
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
            v-model="page"
            :length="pageTotal"
            dark
            total-visible="7"
            color="#3c3f57"
          ></v-pagination>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { getGames } from "../api";

const pageSize = 9;

export default {
  data() {
    return {
      pageList: [],
      currentPage: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      page: 1,
      pageTotal: 1,
    };
  },
  methods: {
    async getGamesList() {
      this.currentPage = await getGames(this.user.token);
    },
    addToLib(game) {
      this.addGameLibrary({
        id: this.user.uid,
        token: this.user.token,
        gameId: game.id,
      }).then(() => {
        getGames(this.user.token, this.page, pageSize).then(data => {
          this.currentPage = data.data;
          this.pageList[this.page] = data.data;
          this.pageTotal = Math.ceil(data.total / pageSize);
        });
      });
    },
    remToLib(game) {
      this.remGameLibrary({
        id: this.user.uid,
        token: this.user.token,
        gameId: game.id,
      }).then(() => {
        getGames(this.user.token, this.page, pageSize).then(data => {
          this.currentPage = data.data;
          this.pageList[this.page] = data.data;
          this.pageTotal = Math.ceil(data.total / pageSize);
        });
      });
    },
    addToWish(game) {
      this.addGameWishlist({
        id: this.user.uid,
        token: this.user.token,
        gameId: game.id,
      }).then(() => {
        getGames(this.user.token, this.page, pageSize).then(data => {
          this.currentPage = data.data;
          this.pageList[this.page] = data.data;
          this.pageTotal = Math.ceil(data.total / pageSize);
        });
      });
    },
    remToWish(game) {
      this.remGameWishlist({
        id: this.user.uid,
        token: this.user.token,
        gameId: game.id,
      }).then(() => {
        getGames(this.user.token, this.page, pageSize).then(data => {
          this.currentPage = data.data;
          this.pageList[this.page] = data.data;
          this.pageTotal = Math.ceil(data.total / pageSize);
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
      "remGameWishlist",
    ]),
  },
  mounted() {
    getGames(this.user.token, this.page, pageSize).then(data => {
      this.currentPage = data.data;
      this.pageList[this.page] = data.data;
      this.pageTotal = Math.ceil(data.total / pageSize);
    });
  },
  watch: {
    page: function() {
      if (this.pageList[this.page])
        return (this.currentPage = this.pageList[this.page]);
      getGames(this.user.token, this.page, pageSize).then(data => {
        this.currentPage = data.data;
        this.pageList[this.page] = data.data;
        this.pageTotal = Math.ceil(data.total / pageSize);
      });
    },
  },
  computed: {
    ...mapState(["user"]),
    ...mapState({ library: state => state.user.library }),
  },
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
</style>
