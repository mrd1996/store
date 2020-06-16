<template>
  <v-app>
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
      rel="stylesheet"
    />
    <v-app-bar app color="#313249" dark flat>
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

      <span class="ml-2 poppins font-weight-medium">{{ user.username }}</span>
    </v-app-bar>

    <v-content style="background-color: #232537">
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="6">
            <v-form>
              <v-text-field
                v-model="username"
                dark
                filled
                label="username"
                single-line
              ></v-text-field>
              <v-text-field
                v-model="email"
                dark
                filled
                label="email"
                single-line
              ></v-text-field>
              <v-text-field
                v-model="password"
                dark
                filled
                label="password"
                single-line
              ></v-text-field>
            </v-form>
            <v-btn dark @click="register">Register</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-form>
              <v-text-field
                v-model="emaill"
                dark
                filled
                label="email"
                single-line
              ></v-text-field>
              <v-text-field
                v-model="passwordl"
                dark
                filled
                label="password"
                single-line
              ></v-text-field>
            </v-form>
            <v-btn dark @click="login">Login</v-btn>
            <p>{{ user.wishlist }}</p>
            <p>{{ user.library }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
/* eslint-disable no-unused-vars */
import { mapActions, mapState } from "vuex";
import { register, login, getUser, wishlist } from "../api";
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      emaill: "",
      passwordl: "",
      uid: "",
      token: "",
    };
  },
  computed: mapState(["user"]),
  methods: {
    register() {
      register(this.username, this.email, this.password);
      console.log(this.username, this.email, this.password);

      return 1;
    },
    async login() {
      let data = await login(this.emaill, this.passwordl);
      this.uid = data.uid;
      this.token = data.token;
      await this.setUser({ email: this.emaill, password: this.passwordl });
      this.setWishlist({ id: this.user.uid, token: this.user.token });
      this.setLibrary({ id: this.user.uid, token: this.user.token });
      // console.log(this.uid);

      // console.log(await getUser(this.uid, this.token));
      // console.log(await wishlist(this.uid, this.token));
    },
    ...mapActions(["setUser", "setWishlist", "setLibrary"]),
  },
};
</script>

<style></style>
