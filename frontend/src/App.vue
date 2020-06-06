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
      <v-container>
        <v-row>
          <v-col cols="3"></v-col>
          <v-col cols="9">
            <v-card color="#3c3f57" class="rounded-card">
              <Searchtool/>
            </v-card>
          </v-col>
        </v-row>


      </v-container>
      <HelloWorld/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import Searchtool from "./components/searchtool";

export default {
  name: 'App',

  components: {
    HelloWorld,
    Searchtool
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

