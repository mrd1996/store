<template>
  <v-toolbar dense color="#3c3f57" class="pa-0 rempad tool-color" height="55">

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

      <v-spacer></v-spacer>

      <v-divider vertical></v-divider>

      <v-row class="text-clr" align="center">
        <v-text-field
              class="ml-2 input-pad"
              hide-details
              placeholder="Search"
              dark
              color="#313249"
              flat
              height="55"
        ></v-text-field>

       <v-btn icon dark>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      </v-row>

  </v-toolbar>
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
    background: linear-gradient(to right, #3c3f57 0%, #3c3f57 90%, #313249 90%, #313249 100%);
}

.v-text-field > .v-input__control > .v-input__slot::before {
    border-style: none !important;
}
.v-text-field > .v-input__control > .v-input__slot::after {
    border-style: none !important;
}


</style>