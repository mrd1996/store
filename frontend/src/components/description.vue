<template>
                 <v-card color="#3c3f57" flat dark class="pa-5">
                      <v-card-subtitle>Featured and Recomended</v-card-subtitle>
                     <v-card-text>
                      <!-- <div>Featured and Recomended</div> -->
                      <p class="display-1 white--text">
                        Grand Theft Auto V
                      </p>
                    </v-card-text>
                    <v-container fluid>
          <v-row class="mt-7">
            <!-- IMAGES -->
            <v-col
              class="d-flex child-flex pa-2"
              cols="6"
            >
              <v-card flat class="d-flex rounded-card6">
                <v-img
                  src="https://www.paraeles.pt/wp-content/uploads/2020/05/Download-gratuito-gta-v.jpg"
                  :aspect-ratio="13/9"
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
             <v-col
              class="d-flex child-flex pa-2"
              cols="6"
            >
              <v-card flat class="d-flex rounded-card6">
                <v-img
                  src="https://media.playstation.com/is/image/SCEA/gtav-v-listing-thumb-01-ps4-us-12sep14?$Icon$"
                  :aspect-ratio="13/9"
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
             <v-col
              class="d-flex child-flex pa-2"
              cols="6"
            >
              <v-card flat class="d-flex rounded-card6">
                <v-img
                  src="https://www.fdcomunicacao.com.br/wp-content/uploads/2019/11/gta-v-gta-vi.jpg"
                  :aspect-ratio="13/9"
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
             <v-col
              class="d-flex child-flex pa-2"
              cols="6"
            >
              <v-card flat class="d-flex rounded-card6">
                <v-img
                  src="https://cdn.vox-cdn.com/thumbor/ALObOjAcJ3a_Vop_IYD7_yc8kZE=/85x0:1014x619/1200x800/filters:focal(85x0:1014x619)/cdn.vox-cdn.com/assets/2894725/V_OGV_1280x720.jpg"
                  :aspect-ratio="13/9"
                  class="grey lighten-2"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>

              </v-card>
            </v-col>
            <!-- IMAGES -->
            <v-card-text>
                <div class="subtitle-1">Now Available
                  <v-chip class="crumb-color float-right" color="#232537" small>Action</v-chip>
                 </div>
                 <div class="mt-2">
                    <v-icon color="#7a7d91">mdi-steam</v-icon>
                    <v-icon color="#7a7d91" class="ml-2">mdi-microsoft-windows</v-icon>
                    <v-icon color="#7a7d91" class="ml-2">mdi-apple</v-icon>
                 </div>
                 <v-divider class="mt-5"></v-divider>
                 <v-card color="transparent" flat class="mt-2 headline d-flex align-center font-weight-medium" height="80%">
                   <div>
                   <span class="subtitle-1 light-green--text font-weight-regular mr-3">-33%</span> 24,55€
                   </div>
                    <v-btn class="ml-auto" depressed rounded color="light-blue" large="" dark>Wishlist</v-btn>
                 </v-card>
            </v-card-text>

          </v-row>
        </v-container>
      </v-card>
</template>

<script>
export default {

}
</script>

<style>
.rounded-card66{
    border-radius: 5x !important;
}

.crumb-color{
  color: #7a7d91 !important
}


</style>