<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-container fluid class="pa-0">
        <v-row no>
          <v-col v-for="(dev, i) in currentPage" :key="i" class="d-flex child-flex" cols="4">
            <v-hover>
              <!-- <v-hover v-slot:default="{ hover }"> -->
              <v-card
                flat
                class="rounded-bottom d-flex align-center justify-center"
                style="background-color: rgb(60, 63, 87); overflow: hidden"
                height="240"
                v-bind:style="{ background: `linear-gradient(141deg, ${colors[randomNumber(0,4)]} 10%, blue)` }"
                @click="$router.push({name: type, params: {id: dev.id, name:dev[type]}})"
              >
                <p class="display-1 white--text">{{dev[type]}}</p>
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                  </v-row>
                </template>

                <!-- </v-img> -->
              </v-card>
            </v-hover>
          </v-col>

          <v-pagination v-model="page" :length="pageTotal" dark total-visible="7" color="#3c3f57"></v-pagination>
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
      category: "",
      colors: ["#0D324D", "#7F5A83", "#A71D31", "#3F0D12"]
    };
  },
  props: {
    method: { type: Function },
    pageSize: { type: Number, default: 9 },
    type: String
  },
  methods: {
    ...mapActions([
      "setUser",
      "setWishlist",
      "setLibrary",
      "addGameLibrary",
      "remGameLibrary",
      "addGameWishlist",
      "remGameWishlist"
    ]),
    randomNumber(min, max) {
      return Math.floor(Math.random() * max + min);
    }
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
    ...mapState(["user"])
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
