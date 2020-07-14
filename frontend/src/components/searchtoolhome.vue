<template>
  <v-row no-gutters>
    <v-col cols="9">
      <v-toolbar
        dense
        color="#3c3f57"
        class="pa-0 rempad tool-color rounded-card3"
        height="55"
        flat
      >
        <v-select
          v-model="selectGenre"
          :items="genres"
          item-text="genres"
          item-value="id"
          dense
          flat
          dark
          class="text-none drop-btn pl-0 mt-6"
          background-color="#3c3f57"
          label="Genres"
          solo
          wid
        ></v-select>

        <v-btn
          @click="selectDev"
          text
          dark
          class="text-none drop-btn light-green--text text--darken-1 font-weight-bold ml-3"
        >
          <v-icon left>mdi-code-json</v-icon>Developer
        </v-btn>

        <v-divider vertical></v-divider>

        <v-btn
          @click="selectPub"
          text
          dark
          class="text-none drop-btn red--text font-weight-bold ml-3"
        >
          <v-icon left>mdi-briefcase-variant</v-icon>Publisher
        </v-btn>

        <v-btn
          @click="$router.push('/wishlist')"
          text
          dark
          class="text-none drop-btn light-blue--text font-weight-bold ml-3"
        >
          <v-icon left>mdi-star-outline</v-icon>Wishlist
        </v-btn>

        <!-- <v-row class="text-clr ml-3" align="center"> -->
        <!-- <v-text-field
                class="ml-2 input-pad"
                hide-details
                placeholder="Search"
                dark
                flat
                height="55"
          ></v-text-field>

          <v-btn icon dark>
            <v-icon>mdi-magnify</v-icon>
        </v-btn>-->
        <!-- </v-row> -->
      </v-toolbar>
    </v-col>
    <v-col cols="3">
      <v-row class="text-clr" align="center" no-gutters>
        <v-text-field
          class="input-pad"
          hide-details
          placeholder
          dark
          flat
          filled
          background-color="#313249"
        ></v-text-field>

        <v-btn icon dark>
          <!-- <v-icon>mdi-magnify</v-icon> -->
        </v-btn>
      </v-row>
    </v-col>
  </v-row>
</template>


<script>
import { getGenres } from "../api";
export default {
  data() {
    return {
      selectGenre: 0,
      selectPlatform: 0,
      genres: [{ genres: "Genres", id: false }],
      platforms: ["Platform", "Linux", "MacOS", "Windows"]
    };
  },
  mounted() {
    getGenres().then(data => {
      this.genres = [...this.genres, ...data];
    });
  },
  watch: {
    selectGenre: function() {
      this.$router.push({
        name: "store",
        params: { propGen: this.selectGenre }
      });
    }
  },
  methods: {
    selectDev() {
      this.$router.push({ name: "store", params: { propDev: true } });
    },
    selectPub() {
      this.$router.push({ name: "store", params: { propPub: true } });
    }
  }
};
</script>

<style >
.drop-btn {
  font-weight: 300 !important;
  /* font-family: 'Poppins', sans-serif; */
}

.text-clr {
  background-color: #313249;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.rempad {
  padding: 50px 50px !important;
}

.tool-color {
  background: linear-gradient(to right, #3c3f57 0%, #3c3f57 100%);
  /* background: linear-gradient(to right, #3c3f57 0%, #3c3f57 90%, #313249 90%, #313249 100%); */
}

.v-text-field > .v-input__control > .v-input__slot::before {
  border-style: none !important;
}
.v-text-field > .v-input__control > .v-input__slot::after {
  border-style: none !important;
}

.rounded-card3 {
  border-top-left-radius: 10px !important;
  border-bottom-left-radius: 10px !important;
}
</style>