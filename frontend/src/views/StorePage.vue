<template>
  <v-app>
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
      rel="stylesheet"
    />

    <v-content style="background-color: #232537">
      <v-container fluid class="px-12">
        <v-row>
          <v-col cols="2">
            <Categories @cate="changeCategory" />
          </v-col>
          <v-col cols="10">
            <v-card color="#3c3f57" class="rounded-card" flat>
              <Searchtool @genre="changeGenre" @pub="changePub" @dev="changeDev" />
            </v-card>
            <Gallery v-if="!indev" :method="galleryMethod" :pageSize="15" />
            <GalleryDev
              v-if="indev && devType=='dev'"
              :type="devType"
              :method="galleryMethod"
              :pageSize="15"
            />
            <GalleryDev
              v-if="indev && devType=='pub'"
              :type="devType"
              :method="galleryMethod"
              :pageSize="15"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
import Searchtool from "../components/searchtool";
import Categories from "../components/categories";
import GameSlider from "../components/gameslider";
import Description from "../components/description";
import Gallery from "../components/gallery";
import GalleryDev from "../components/galleryDev";
import RegisterPage from "../components/RegisterPage";
import {
  getGames,
  getGamesFromCategory,
  getGamesV2,
  getDevelopers,
  getPubs
} from "../api";

export default {
  name: "App",

  components: {
    Searchtool,
    Categories,
    GameSlider,
    Description,
    Gallery,
    GalleryDev
  },

  data: () => ({
    galleryMethod: getGames,
    category: false,
    genre: false,
    platform: false,
    indev: false,
    devType: "dev",
    propCat: false,
    propGen: false
  }),
  created() {
    this.onRouteEnter();
  },
  methods: {
    changeCategory(category) {
      if (!category !== false) {
        category = false;
      }
      this.indev = false;
      this.category = category;
      this.galleryMethod = getGamesV2(this.category, this.genre);
    },
    changeGenre(genre) {
      this.indev = false;
      this.genre = genre;
      this.galleryMethod = getGamesV2(this.category, this.genre);
    },
    changeDev() {
      this.indev = true;
      this.devType = "dev";
      this.galleryMethod = getDevelopers;
    },
    changePub() {
      this.indev = true;
      this.devType = "pub";
      this.galleryMethod = getPubs;
    },
    onRouteEnter() {
      if (this.$route.params.propCat) {
        this.changeCategory(this.$route.params.propCat);
        return;
      }
      if (this.$route.params.propGen) {
        this.changeGenre(this.$route.params.propGen);
        return;
      }
      if (this.$route.params.propDev) {
        this.changeDev();
        return;
      }
      if (this.$route.params.propPub) {
        this.changePub();
        return;
      }
    }
  }
};
</script>

<style>
.title-btn {
  font-weight: 600 !important;
  font-size: 1.4rem !important;
  font-family: "Poppins", sans-serif;
}

.poppins {
  font-family: "Poppins", sans-serif;
  font-size: 0.9rem !important;
}

.rounded-card {
  border-radius: 10px !important;
}
</style>

