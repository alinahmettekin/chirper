import admin from "../pages/admin.vue";
import explore from "../pages/explore.vue";
import main from "../pages/main.vue";
import postDetail from "../pages/postDetail.vue";
import process from "../pages/process.vue";
import postView from "../pages/postView.vue";
import dashboard from "../pages/adminpanel/Dashboard.vue";
import commentspage from "../pages/adminpanel/CommentsPage.vue";
import postspage from "../pages/adminpanel/PostsPage.vue";
import userspage from "../pages/adminpanel/UsersPage.vue";

import admindashboard from "../pages/adminpanel/AdminDashboard.vue";
import adminusers from "../pages/adminpanel/AdminUsers.vue";
import admincomments from "../pages/adminpanel/AdminComments.vue";
import adminblogs from "../pages/adminpanel/AdminBlogs.vue";

import profilepage from "../pages/profile.vue";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "main",
    component: main,
  },
  {
    path: "/signIn",
    name: "signIn",
    component: process,
  },
  {
    path: "/login",
    name: "login",
    component: process,
  },
  {
    path: "/explore",
    name: "explore",
    component: explore,
  },
  {
    path: "/admin",
    name: "admin",
    component: admin,
  },
  // {
  //   path: "/postView",
  //   name: "postView",
  //   component: postView,
  // },
  {
    name: "postView",
    path: "/postView/:id",
    component: postView,
    props: (route) => ({ id: route.params.id }),
  },
  {
    path: "/postDetail/:id", // Burada :id dinamik bir parametreyi temsil eder
    name: "postDetail",
    component: postDetail,
    props: true, // Parametreleri props olarak iletmek için props: true kullanılır
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: dashboard,
  },
  {
    path: "/admincomments",
    name: "admincomments",
    component: commentspage,
  },
  {
    path: "/adminposts",
    name: "adminposts",
    component: postspage,
  },
  {
    path: "/adminusers",
    name: "adminusers",
    component: userspage,
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
    component: admindashboard,
  },

  {
    path: "/admin/comments",
    name: "admincomments",
    component: admincomments,
  },
  {
    path: "/admin/blogs",
    name: "adminblogs",
    component: adminblogs,
  },
  {
    path: "/admin/users",
    name: "adminusers",
    component: adminusers,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
