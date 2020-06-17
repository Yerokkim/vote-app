<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
    <!-- 
    <HelloWorld />
    <SignUpComponent /> -->
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
// import SignUpComponent from "./components/SignUpComponent";

export default {
  name: "App",

  components: {
    // HelloWorld,
    // SignUpComponent,
  },

  data: () => ({
    //
  }),
};
</script>
