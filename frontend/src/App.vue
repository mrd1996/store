<template>
  <v-app>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <v-app-bar
      app
      color="#313249"
      dark
      flat
    >
       <v-app-bar-nav-icon></v-app-bar-nav-icon>

         <v-btn text class="text-none title-btn">Store</v-btn>

         <v-btn text class="text-none title-btn">Library</v-btn>

         <v-btn text class="text-none title-btn">Comunity</v-btn>

           <v-spacer></v-spacer>

     <v-btn large icon>
        <v-icon>mdi-gamepad-variant-outline</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-bell-outline</v-icon>
      </v-btn>

       <v-btn icon>
        <v-icon color="light-green">mdi-email-outline</v-icon>
      </v-btn>


    <v-avatar color="indigo" class="ml-3" size="36">
      <v-img
            class="elevation-6"
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-img>
    </v-avatar>

    <span class="ml-2 poppins font-weight-medium"> Lanmoto</span>
    </v-app-bar>


    <v-content style="background-color: #232537">
      <v-container fluid class="px-12">
        <v-row>
          <v-col cols="2">
            <Categories/>
          </v-col>
          <v-col cols="10">
            <v-card color="#3c3f57" class="rounded-card" flat>
              <Searchtool/>
            </v-card>
             <v-card color="#3c3f57" class="rounded-card mt-5" flat>
               <v-row no-gutters>
                  <v-col cols="9">
                  <GameSlider/>
                </v-col>
                <v-col cols="3">
                  <Description/>
                </v-col>
               </v-row>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
           <v-col cols="2">
          </v-col>
            <v-col cols="10">
               <v-row no-gutters>
                  <v-col cols="9">
                    <v-card dark color="transparent d-flex align-center" flat>
                        <span class="title">Special Offers</span>
                       <v-btn class="ml-auto text-none pa-0" text depressed  color="light-blue" large="" dark>Browse All <v-icon>mdi-chevron-right</v-icon></v-btn>
                    </v-card>
                      <Gallery/>

                </v-col>
               </v-row>
          </v-col>
        </v-row>


      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Searchtool from "./components/searchtool";
import Categories from "./components/categories";
import GameSlider from "./components/gameslider";
import Description from "./components/description";
import Gallery from "./components/gallery";

export default {
  name: 'App',

  components: {
    Searchtool,
    Categories,
    GameSlider,
    Description,
    Gallery
  },

  data: () => ({
    //
  }),
};
</script>

<style>
.title-btn {
  font-weight: 600 !important;
  font-size: 1.40rem !important;
  font-family: 'Poppins', sans-serif;
}

.poppins {
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem !important;
}

.rounded-card{
    border-radius: 10px !important;
}


</style>

