<template>
  <div id="CreateIssueComponent">
    <v-main>
      <v-container>
        <v-row align="center" justify="center" class="issue-form_box">
          <v-col cols="12" sm="8" md="4">
            <h1>CreateIssue</h1>
            {{ this.email }}
            <v-form>
              {{ this.issue }}
              <v-text-field v-model="issue" label="create issue"></v-text-field>
              <v-text-field v-model="option" label="type options"></v-text-field
              ><v-btn @click="addToOptions">addOption</v-btn>
              <v-text-field
                v-model="friend"
                type="email"
                label="type your friend's email"
              ></v-text-field
              ><v-btn @click="addToFriend">addFriends</v-btn>
            </v-form>
            <v-btn @click="uploadIssue">Submit</v-btn>
            <v-layout flex>
              <v-card md6>
                <v-card-title>options</v-card-title>
                <ul v-for="(option, i) in options" :key="i">
                  <li>{{ option }}</li>
                </ul>
              </v-card>
              <v-card md6>
                <v-card-title>Friends</v-card-title>
                <ul v-for="(friend, i) in friends" :key="i">
                  <li>{{ friend }}</li>
                </ul>
              </v-card>
            </v-layout>

            <v-combobox
              v-model="model"
              :items="items"
              :search-input.sync="search"
              hide-selected
              label="Add some tags"
              multiple
              persistent-hint
              small-chips
            >
            </v-combobox>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import axios from "axios";
import crypto from "crypto";
export default {
  name: "CreateIssueComponent",
  data() {
    return {
      step: 1,
      issue: "",
      options: [],
      friends: [],
      option: "",
      friend: "",
      email: "",
      keys: [],
      key: "",
      items: [],
      model: ["Vuetify"],
      search: null,
    };
  },
  methods: {
    addToOptions() {
      this.options.push(this.option);
      this.option = "";
      console.log(this.model);
    },
    async addToFriend() {
      this.friends.push(this.friend);
      this.friend = "";
      await this.generateRandomKey();
      this.keys.push(this.key);
      this.key = "";
      console.log(this.keys);
    },
    getUser() {
      axios
        .get("http://localhost:3000/user", {
          headers: { token: localStorage.getItem("token") },
        })
        .then((res) => {
          this.email = res.data.user.email;
          console.log(res);
        });
    },
    generateRandomKey() {
      this.key = crypto.randomBytes(20).toString("hex");
    },
    uploadIssue() {
      axios
        .post("http://localhost:3000/makeissue", {
          issue: this.issue,
          email: this.email,
          keys: this.keys,
          friends: this.friends,
          options: this.options,
        })
        .then((res, err) => {
          if (err) console.log(err);
          console.log(res);
        });
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>

<style scoped>
#CreateIssueComponent {
  color: white;
}
.issue-form_box {
  background-color: #beef00;
}
</style>
