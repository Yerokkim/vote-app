<template>
  <div>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title>SignUp</v-card-title>
        <v-form ref="form">
          <v-alert type="error" v-if="pwAlert">
            Password is not same!
          </v-alert>
          <v-text-field v-model="name" label="NickName" required></v-text-field>
          <v-text-field v-model="email" label="E-mail" required></v-text-field>
          <v-text-field
            v-model="pw"
            type="password"
            label="password"
            required
          ></v-text-field>
          <v-text-field
            v-model="pwRepeat"
            label="password Repeat"
            type="password"
            required
          ></v-text-field>

          <v-btn color="success" class="mr-4" @click="signUp">
            Submit
          </v-btn>
        </v-form>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SignUpComponent",
  data() {
    return {
      pwAlert: false,
      email: "",
      pw: "",
      pwRepeat: "",
      name: "",
      // emailRules: [
      //   (v) => !!v || "Email is required",
      //   (v) => /.+@.+/.test(v) || "E-mail must be valid",
      // ],
      // passwordRules: [
      //   (v) => !!v || "Password is required",
      //   (v) => (v && v.length >= 5) || "Password must have 5+ characters",
      // ],
    };
  },
  methods: {
    signUp() {
      if (this.pw === this.pwRepeat) {
        const formData = {
          name: this.name,
          email: this.email,
          pw: this.pw,
          pwRepeat: this.pwRepeat,
        };
        axios
          .post("http://localhost:3000/signup", {
            name: formData.name,
            email: formData.email,
            pw: formData.pw,
            pwRepeat: formData.pwRepeat,
          })
          .then((res, err) => {
            if (err) console.log(err);
            console.log(res);
          });
      } else {
        this.pwAlert = true;
      }
    },
  },
};
</script>

<style scoped></style>
