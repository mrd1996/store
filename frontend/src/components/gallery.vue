<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-card color="transparent" flat tile>
        <v-container fluid class="pa-0" >
          <v-row no>
            <!-- <v-col
              v-for="n in 9"
              :key="n"
              class="d-flex child-flex"
              cols="4"
            >
              <v-card flat  class="d-flex rounded-card">
                <v-img
                  :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                  :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
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
            </v-col> -->
               <v-col
              class="d-flex child-flex"
              cols="4"
            >
              <v-card flat  class="d-flex rounded-card">
                <v-img
                  src="https://steamcdn-a.akamaihd.net/steam/apps/546560/capsule_616x353.jpg?t=1584985275"
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
                <v-col
              class="d-flex child-flex"
              cols="4"
            >
              <v-card flat  class="d-flex rounded-card">
                <v-img
                  src="data:image/jpeg;base64,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"
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
                <v-col
              class="d-flex child-flex"
              cols="4"
            >
              <v-card flat  class="d-flex rounded-card">
                <v-img
                  src="data:image/jpeg;base64,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"
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
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>