import explore from "../pages/Explore.vue";
import homepage from "../pages/Homepage.vue";
import postdetail from "../pages/PostDetail.vue";
import login from "../pages/session/LogIn.vue";
import signUp from "../pages/session/SignUp.vue";
import dashboard from "../pages/adminpanel/Dashboard.vue";
import users from "../pages/adminpanel/Users.vue";
import comments from "../pages/adminpanel/Comments.vue";
import blogs from "../pages/adminpanel/Blogs.vue";
import testing from "../pages/testing.vue";
import profilepage from "../pages/UserProfile.vue";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/homepage",
    name: "homepage",
    component: homepage,
  },

  {
    path: "/signUp",
    name: "signUp",
    component: signUp,
  },
  {
    path: "/login",
    name: "logIn",
    component: login,
  },
  {
    path: "/explore",
    name: "explore",
    component: explore,
  },

  {
    path: "/postDetail/:id", // Burada :id dinamik bir parametreyi temsil eder
    name: "postDetail",
    component: postdetail,
    props: true, // Parametreleri props olarak iletmek için props: true kullanılır
  },

  {
    path: "/profile/:username",
    name: "profilepage",
    component: profilepage,
    props: true,
  },

  {
    path: "/admin/dashboard",
    name: "admindashboard",
    component: dashboard,
  },

  {
    path: "/admin/comments",
    name: "admincomments",
    component: comments,
  },
  {
    path: "/admin/blogs",
    name: "adminblogs",
    component: blogs,
  },
  {
    path: "/admin/users",
    name: "adminusers",
    component: users,
  },
  {
    path: "/testing",
    name: "testing",
    component: testing,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
