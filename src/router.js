import Vue from "vue";
import Router from "vue-router";
import VueRouter from "vue-router";
import CreateIssueComponent from "./components/CreateIssueComponent";
import SignUp from "./components/SignUpComponent";
// import store from "../src/store/store";
Vue.use(Router, VueRouter);

const router = new Router({
  mode: "history",
  routes: [
    // { path: "/", component: LandingPage },
    // { path: "/login", component: LoginComponent },
    // { path: "/signup", component: SignUpComponent },
    // { path: "/setprofile", component: UserProfileSetComponent },
    { path: "/issue", component: CreateIssueComponent },
    { path: "/signup", component: SignUp },
  ],
});
export default router;
