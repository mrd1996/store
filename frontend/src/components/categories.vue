<template>
  <v-card class="mx-auto rounded-card" flat color="#3c3f57" dark>
    <v-card-title class="d-block text-center subtitle-1 font-weight-medium">
      Browse Categories
      <!-- <v-icon>mdi-chevron-down</v-icon> -->
    </v-card-title>
    <v-divider></v-divider>
    <v-list nav dense color="#3c3f57" class="pa-5">
      <v-list-item-group v-model="item">
        <v-list-item v-for="(item, i) in items" :key="i">
          <v-list-item-icon>
            <v-icon dense color="light-blue" v-text="item.icon"></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    item: 0,
    items: [
      { text: "Multi-player", icon: "mdi-account-multiple" },
      { text: "Singleplayer", icon: "mdi-account" },
      { text: "Co op", icon: "mdi-transfer-up" },
      { text: "Full controller support", icon: "mdi-google-controller" },
      { text: "Vr support", icon: "mdi-safety-goggles" },
      { text: "MMO", icon: "mdi-earth" },
      { text: "Mods", icon: "mdi-atom-variant" }
    ]
  })
};
</script>

<style scoped>
.rounded-card {
  border-radius: 10px !important;
}
</style>