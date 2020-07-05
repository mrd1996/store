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
            <Categories />
          </v-col>
          <v-col cols="10">
            <v-card color="#3c3f57" class="rounded-card" flat>
              <Searchtool />
            </v-card>
            <Gallery :method="galleryMethod" />
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
import RegisterPage from "../components/RegisterPage";
import { getGames } from "../api";

export default {
  name: "App",

  components: {
    Searchtool,
    Categories,
    GameSlider,
    Description,
    Gallery
  },

  data: () => ({
    galleryMethod: getGames
  })
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

