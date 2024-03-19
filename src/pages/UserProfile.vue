<template>
  <Sidebar />
  <div class="profile">
    <div class="user-info">
      <img :src="this.avatar" alt="User Avatar" class="avatar" />
      <div>
        <h2>{{ user.user_name }}</h2>
        <p>{{ user.user_mail }}</p>
        <button @click="editProfile">Edit Profile</button>
      </div>
    </div>
    <div class="blog-posts">
      <h3>Paylaştığı Blog Yazıları</h3>
      <ul class="post-list">
        <li v-for="post in posts" class="post-item">
          <h4>{{ post.post_title }}</h4>
          <p>{{ truncate(post.post_content) }}</p>
          <router-link
            :to="`/postDetail/${post.post_id}`"
            v-if="post.post_content.length > 140"
            >... Devamını Oku</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import sidebar from "../components/sidebar/sidebar.vue";
import axios from "axios";
import { mapState } from "vuex";
export default {
  async created() {
    const string = this.$route.params.username;
    this.loadUserData(string);
    this.currentUserPosts(string);
  },
  name: "Profile",
  data() {
    return {
      user: {},
      posts: {},
      avatar: "https://via.placeholder.com/150",
    };
  },
  methods: {
    async loadUserData(string) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/profile/${string}`
        );
        this.user = response.data;
        console.log(response.data);
      } catch (error) {
        this.errors.push(error);
      }
    },
    async currentUserPosts(string) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/profile/posts/${string}`
        );
        this.posts = response.data;
        console.log(response.data);
      } catch (error) {}
    },
    editProfile() {
      // Profil düzenleme işlemleri
    },
    truncate(text) {
      if (text.length > 140) {
        return text.slice(0, 140) + "...";
      }
      return text;
    },
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.data.currentUser,
      postsAll: (state) => state.data.posts,
    }),
    userPosts() {
      // Kullanıcı ismi içeren postları filtrele
      return this.posts.filter((post) => post.post_sender_name === this.string);
    },
  },
  components: {
    Sidebar: sidebar,
  },
};
</script>

<style>
/* Genel Stiller */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f8f8f8;
}

.profile {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-left: 260px; /* Sayfayı sola yasla */
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
}

.user-info h2 {
  margin: 0;
  color: #333;
}

.user-info p {
  color: #666;
}

.user-info button {
  margin-top: 5px;
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.user-info button:hover {
  background-color: #0056b3;
}

.blog-posts h3 {
  margin-bottom: 10px;
  color: #333;
}

.post-list {
  padding: 0;
  list-style-type: none;
}

.post-item {
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.post-item:last-child {
  border-bottom: none;
}

.post-item h4 {
  margin-top: 0;
  margin-bottom: 10px;
}

.post-item p {
  margin: 0;
  text-align: left; /* Yazıyı sola yasla */
}
</style>
../components/sidebar.vue../components/sidebar.vue../components/sidebar/sidebar.vue../components/sidebar/sidebar.vue
