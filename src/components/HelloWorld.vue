<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Please type your code that we sent!
        </h1>

        <v-text-field placeholder="your code here"></v-text-field>
      </v-col>

      <v-col class="mb-4">
        <h1>Or click to Create issue</h1>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Login</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field
                      label="Email"
                      v-model="email"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      label="Password"
                      type="password"
                      v-model="pw"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex md6>
                    <p>Not user yet? Click here to sign up!</p>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="dialog = false"
                >Close</v-btn
              >
              <v-btn color="blue darken-1" flat @click="login">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return {
      dialog: false,
      email: "",
      pw: "",
    };
  },
  methods: {
    async login() {
      this.dialog = !this.dialog;
      const { data } = await axios.post("http://localhost:3000/login", {
        email: this.email,
        pw: this.pw,
      });
      if (data.token) {
        localStorage.setItem("token", data.token);
        this.$router.push("/issue");
      }
    },
  },
};
</script>
