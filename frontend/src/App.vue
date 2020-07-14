<template>
  <v-app>
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
      rel="stylesheet"
    />
    <v-app-bar color="#313249" dark flat>
      <v-app-bar-nav-icon @click="$router.push('/')"></v-app-bar-nav-icon>

      <v-btn @click="$router.push('/store')" text class="text-none title-btn">Store</v-btn>

      <v-btn @click="$router.push('/library')" text class="text-none title-btn">Library</v-btn>

      <v-btn @click="$router.push('/wishlist')" text class="text-none title-btn">Wishlist</v-btn>

      <v-spacer></v-spacer>

      <Btnsale />

      <v-avatar color="indigo" class="ml-3" size="36">
        <v-img
          class="elevation-6"
          src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
        ></v-img>
      </v-avatar>

      <span class="ml-2 poppins font-weight-medium">{{user.username}}</span>
    </v-app-bar>

    <router-view></router-view>
  </v-app>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
import Searchtool from "./components/searchtool";
import Btnsale from "./components/btnsale";
import Categories from "./components/categories";
import GameSlider from "./components/gameslider";
import Description from "./components/description";
import Gallery from "./components/gallery";
import RegisterPage from "./components/RegisterPage";
import { mapActions, mapState } from "vuex";

export default {
  name: "App",

  components: {
    Searchtool,
    Btnsale,
    Categories,
    GameSlider,
    Description,
    Gallery
  },

  data: () => ({
    //
  }),
  computed: mapState(["user"])
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

