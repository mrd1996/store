<template>
  <v-card class="mx-auto rounded-card" flat color="#3c3f57" dark>
    <v-card-title class="d-block text-center subtitle-1 font-weight-medium">
      Browse Categories
      <!-- <v-icon>mdi-chevron-down</v-icon> -->
    </v-card-title>
    <v-divider></v-divider>
    <v-list nav dense color="#3c3f57" class="pa-5">
      <v-list-item-group v-model="item" v-on:currentCategory="$emit('input', $event.target.value)">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          @click="$router.push({name: 'store', params: {propCat: item.id}})"
        >
          <v-list-item-icon v-if="item.icon">
            <v-icon dense color="light-blue" v-text="item.icon"></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="item.categ"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import { getCategorys } from "../api";
export default {
  data: () => ({
    item: undefined,
    items: [
      {
        categ: "Multi-player",
        icon: "mdi-account-multiple",
        id: "ctg_Multi-player"
      },
      { categ: "Single-player", icon: "mdi-account", id: "ctg_Single-player" },
      { categ: "Co-op", icon: "mdi-transfer-up", id: "ctg_Co-op" },
      {
        categ: "Full controller support",
        icon: "mdi-google-controller",
        id: "ctg_Fullcontrollersupport"
      },
      {
        categ: "Vr support",
        icon: "mdi-safety-goggles",
        id: "ctg_SteamVRCollectibles"
      },
      { categ: "MMO", icon: "mdi-earth", id: "ctg_MMO" },
      { categ: "Mods", icon: "mdi-atom-variant", id: "ctg_Mods" }
    ]
  }),
  props: {
    home: Boolean
  },
  watch: {
    item: function() {
      if (!this.item && this.item !== 0) {
        this.$emit("cate", false);
        return;
      }

      this.$emit("cate", this.items[this.item].id);
    }
  },
  mounted() {
    if (!this.home) {
      getCategorys().then(data => {
        this.items = data;
      });
    }
  }
};
</script>

<style scoped>
.rounded-card {
  border-radius: 10px !important;
}
</style>