<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-card color="transparent" flat tile>
        <v-container fluid class="pa-0" >
          <v-row no>
             <v-col
              v-for="game in currentPage"
              :key="game.id"
              class="d-flex child-flex"
              cols="4"
            >
              <v-card flat  class="d-flex rounded-card">
                <v-img
                  :src="game.image"
                  :aspect-ratio="14/9"
                  class="grey lighten-2"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-card>
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
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { getGames } from "../api/games";

const pageSize = 9;

export default {
  data(){
    return {
      pageList: [],
      currentPage: [1,2,3,4,5,6,7,8,9,10,11,12],
      page: 1,
      pageTotal: 1
    }
  },
  methods: {
    async getGamesList() {
      this.currentPage = await getGames()
    }
  },
  mounted() {
    getGames(this.page,pageSize).then(data => {
      this.currentPage = data.data;
      this.pageList[this.page] = data.data;
      this.pageTotal = Math.ceil(data.total / pageSize);
      });
  },
  watch:{
    page: function() {
      if (this.pageList[this.page]) return this.currentPage = this.pageList[this.page];
      getGames(this.page, pageSize).then(data => {
      this.currentPage = data.data;
      this.pageList[this.page] = data.data;
      this.pageTotal = Math.ceil(data.total / pageSize);
      });
    }
  }
}
</script>