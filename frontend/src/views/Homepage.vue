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
            <Categories home />
          </v-col>
          <v-col cols="10">
            <v-card color="#3c3f57" class="rounded-card" flat>
              <Searchtool />
            </v-card>
            <v-card color="#3c3f57" class="rounded-card mt-5" flat>
              <v-row no-gutters>
                <v-col cols="9">
                  <GameSlider />
                </v-col>
                <v-col cols="3">
                  <Description :wish="$store.state.user.wishlist" />
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2"></v-col>
          <v-col cols="10">
            <v-row no-gutters>
              <v-col cols="9">
                <v-card dark color="transparent d-flex align-center" flat>
                  <span class="title">Special Offers</span>
                  <v-btn
                    class="ml-auto text-none pa-0"
                    text
                    depressed
                    color="light-blue"
                    large
                    dark
                    @click="$router.push('/store')"
                  >
                    Browse All
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-btn>
                </v-card>
                <Gallery :method="galleryMethod" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
import Searchtool from "../components/searchtoolhome";
import Categories from "../components/categorieshome";
import GameSlider from "../components/gameslider";
import Description from "../components/description";
import Gallery from "../components/gallery";
import RegisterPage from "../components/RegisterPage";
import { getSales } from "../api";

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
    galleryMethod: getSales
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

