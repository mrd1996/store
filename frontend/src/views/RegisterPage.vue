<template>
  <v-app>
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
      rel="stylesheet"
    />

    <v-content style="background-color: #232537">
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="6">
            <v-form>
              <v-text-field v-model="username" dark filled label="username" single-line></v-text-field>
              <v-text-field v-model="email" dark filled label="email" single-line></v-text-field>
              <v-text-field v-model="password" dark filled label="password" single-line></v-text-field>
            </v-form>
            <v-btn dark @click="register">Register</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-form>
              <v-text-field v-model="emaill" dark filled label="email" single-line></v-text-field>
              <v-text-field v-model="passwordl" dark filled label="password" single-line></v-text-field>
            </v-form>
            <v-btn dark @click="login">Login</v-btn>
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
      emaill: "md",
      passwordl: "1",
      uid: "",
      token: ""
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
      await this.setLibrary({ id: this.user.uid, token: this.user.token });
      console.log(this.user.wishlist);
      console.log(this.user.library);

      this.$router.push("/");
      // console.log(this.uid);

      // console.log(await getUser(this.uid, this.token));
      // console.log(await wishlist(this.uid, this.token));
    },
    ...mapActions(["setUser", "setWishlist", "setLibrary"])
  }
};
</script>

<style></style>
