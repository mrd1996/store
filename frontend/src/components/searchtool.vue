<template>
  <v-row no-gutters="">
    <v-col cols="9">
       <v-toolbar dense color="#3c3f57" class="pa-0 rempad tool-color rounded-card3" height="55" flat>

      <v-btn text dark class="text-none drop-btn pl-0"> Your Store
          <v-icon>mdi-menu-down</v-icon>
        </v-btn>

        <v-btn text dark class="text-none drop-btn"> Games
          <v-icon>mdi-menu-down</v-icon>
        </v-btn>

        <v-btn text dark class="text-none drop-btn"> Software
          <v-icon>mdi-menu-down</v-icon>
        </v-btn>

        <v-btn text dark class="text-none drop-btn"> Hardware
          <v-icon>mdi-menu-down</v-icon>
        </v-btn>

        <v-btn text dark class="text-none drop-btn"> Videos
          <v-icon>mdi-menu-down</v-icon>
        </v-btn>

        <v-btn text dark class="text-none drop-btn"> News
          <v-icon>mdi-menu-down</v-icon>
        </v-btn>

        <v-divider vertical></v-divider>

        <v-btn text dark class="text-none drop-btn light-blue--text font-weight-bold ml-3">
          <v-icon left >mdi-star-outline</v-icon> Wishlist
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
          </v-btn> -->
        <!-- </v-row> -->

    </v-toolbar>
    </v-col>
    <v-col cols="3">
      <v-row class="text-clr" align="center" no-gutters="">
         <v-text-field
                class="input-pad"
                hide-details
                placeholder="Search"
                dark
                flat
                filled
                background-color="#313249"
          ></v-text-field>

          <v-btn icon dark>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
      </v-row>

    </v-col>
  </v-row>

</template>


<script>
  export default {
    data () {
      return {
        dropdown_font: [
          { text: 'Arial' },
          { text: 'Calibri' },
          { text: 'Courier' },
          { text: 'Verdana' },
        ],
        dropdown_edit: [
          { text: '100%' },
          { text: '75%' },
          { text: '50%' },
          { text: '25%' },
          { text: '0%' },
        ],
        toggle_exclusive: 2,
        toggle_multiple: [1, 2, 3],
        items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
      }
    },
  }
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

.rounded-card3{
    border-top-left-radius: 10px !important;
    border-bottom-left-radius: 10px !important;
}



</style>