<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" @click="getWishSale">
          <v-badge overlap :content="numSale" :value="numSale">
            <v-icon>mdi-bell-outline</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <v-list color="#03a9f4 " class="pa-0">
        <v-list-item
          class="pa-0 mt-0"
          v-for="(game) in wishsale"
          :key="game.id"
          @click="$router.push(`/game/${game.id}`)"
        >
          <v-card dark flat color="#313249" class="mx-auto mt-1 rounded-card-top" max-width="344">
            <v-card-text>
              <p class="body-1 display-1 text--white font-weight-bold" style>
                {{ game.name }}
                <span
                  v-if="game.discount"
                  class="subtitle-1 pa-1 rounded-card font-weight-regular mr-3 ml-2"
                  style="color: #a4d007; background: #4c6b22; position:relative; z-index:2"
                >{{ game.discount }}</span>
                <span
                  v-if="game.salePrice"
                  class="subtitle-1 pa-1 font-weight-bold"
                  style="position:relative; z-index:2"
                >{{ game.salePrice }}€</span>
              </p>
              <v-img class="rounded-card" :src="game.image"></v-img>
            </v-card-text>
          </v-card>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>


<script>
// import { mapState } from "vuex";

export default {
  data: () => ({
    wishsale: [],
    numSale: 0
  }),
  methods: {
    getWishSale() {
      this.wishsale = this.$store.state.user.wishlist.filter(
        game => game.salePrice
      );

      this.numSale = this.wishsale.length;
      console.log(this.wishsale);
    }
  }
};
</script>
<style scoped>
.rounded-card-top {
  border-bottom-right-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
}
.rounded-card {
  border-radius: 10px !important;
}
</style>