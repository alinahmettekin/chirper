import { createApp } from "vue";
import { createStore } from "vuex";
import axios from "axios";
import router from "../router/index";

// Create a new store instance.
const store = createStore({
  state: {
    data: {
      users: {},
      comments: {},
      posts: {},
      currentPost: {},
      currentUser: "",
      blockedBlogs: {},
      blockedComments: {},
    },
  },
  mutations: {
    loginUser(state, authentication) {
      axios
        .post("http://localhost:3000/login", {
          user_mail: authentication.currentUserMail,
          user_password: authentication.currentUserPassword,
        })
        .then((response) => {
          router.push("/explore");
          console.log(response);
        })
        .catch((error) => {
          console.log("kullanıcı kimlik hatası");
          console.error(error);
        });
    },
    logoutUser(state) {
      router.push("/login");
    },
    setCurrentPost(state, currentPost) {
      state.data.currentPost = currentPost;
    },
    setPosts(state, posts) {
      state.data.posts = posts;
    },

    setComments(state, comments) {
      state.data.comments = comments;
    },
    setUsers(state, users) {
      state.data.users = users;
    },
    setCurrentUser(state, currentUser) {
      console.log("currentUser", currentUser);
      state.data.currentUser = currentUser;
    },
    setBlockedBlogs(state, blockedBlogs) {
      state.data.blockedBlogs = blockedBlogs;
    },
    setBlockedComments(state, blockedComments) {
      state.data.blockedComments = blockedComments;
    },
  },
  actions: {
    async getUsers(users) {
      try {
        const response = await axios.get("http://localhost:3000/api/users");
        // console.log(" CURRENTUSER", response.data);
        users = response.data;
        console.log("users", response.data);
        this.commit("setUsers", users);
      } catch (error) {
        console.error("API hatası:", error);
      }
    },
    async getComments(comments) {
      try {
        const response = await axios.get("http://localhost:3000/api/comments");
        // console.log(" CURRENTUSER", response.data);
        comments = response.data;
        console.log("comment", response.data);
        this.commit("setComments", comments);
      } catch (error) {
        console.error("API hatası:", error);
      }
    },
    async getPosts(posts) {
      try {
        const response = await axios.get("http://localhost:3000/api/posts");
        posts = response.data;
        this.commit("setPosts", posts);
        console.log("posts", response.data);
      } catch (error) {
        console.error("API hatası:", error);
      }
    },

    async getcurrentPost(currentPost, postID) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/posts/${postID}`
        );
        currentPost = response.data;
        this.commit("setCurrentPost", currentPost);
        console.log(response.data);
      } catch (error) {
        console.error("API hatası:", error);
      }
    },

    async getCurrentUser(currentUser) {
      try {
        const response = await axios.get("http://localhost:3000/profile");
        // console.log(" CURRENTUSER", response.data);

        currentUser.commit("setCurrentUser", response.data);
      } catch (error) {
        console.error("HENÜZ KULLANICI GİRİŞİ YAPILMAMIŞ OLABİLİR");
        console.error("API hatası:", error);
      }
    },
    async sendComment(newComment) {
      console.log(newComment);
    },

    async getBlockedBlogs(blockedBlogs) {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/posts/blocked/filtered"
        );
        blockedBlogs = response.data;
        this.commit("setBlockedBlogs", blockedBlogs);
        console.log("blockedBlogs", response.data);
      } catch (error) {
        console.error("API hatası:", error);
      }
    },

    async getBlockedComments(blockedCommments) {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/comments/blocked/filtered"
        );
        blockedCommments = response.data;
        this.commit("setBlockedComments", blockedCommments);
        console.log("blockedComments", response.data);
      } catch (error) {
        console.error("API hatası:", error);
      }
    },
  },
});

export default store;
