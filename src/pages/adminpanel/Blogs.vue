<template>
  <div v-show="this.currentUser.isAdmin === true">
    <adminsidebar />
    <nav class="navbar">
      <ul>
        <li><a href="/homepage">Anasayfa</a></li>
        <li><a href="/explore">Keşfet</a></li>
        <li><a href="/contact">İletişim</a></li>
      </ul>
    </nav>

    <div class="blog-list">
      <h2>Blog Gönderileri</h2>
      <div class="blog-cards">
        <div
          v-for="blog in this.posts"
          class="blog-card"
          :class="{ blocked: blog.post_display }"
        >
          <h3>{{ blog.post_title }}</h3>
          <p>{{ blog.post_content.substring(0, 20) }}...</p>
          <p>
            <strong>Yazar:</strong>
            <span
              class="user-button"
              @click="getProfile(blog.post_sender_name)"
              >{{ blog.post_sender_name }}</span
            >
          </p>
          <p><strong>Tarih:</strong> {{ blog.post_datetime }}</p>
          <p><strong>Yorum Sayısı:</strong> {{ blog.comments.length }}</p>
          <div class="blog-link">
            <span class="arrow">➤ .</span>
            <button @click="getBlog(blog.post_id)">Blog Sayfasına Git</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import adminsidebar from "../../components/sidebar/adminsidebar.vue";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      posts: (state) => state.data.posts,
      usersstate: (state) => state.data.users,
      comments: (state) => state.data.comments,
      currentUser: (state) => state.data.currentUser,
      blockedBlogs: (state) => state.data.blockedBlogs,
    }),
  },
  components: { adminsidebar },
  data() {
    return {};
  },
  methods: {
    editUser(id) {
      // Kullanıcı düzenleme işlemi
    },
    deleteUser(id) {
      // Kullanıcı silme işlemi
    },
    getBlog(value) {
      console.log(value);
      const postID = value;
      this.$store.dispatch("getcurrentPost", postID);
      this.$router.push({ name: "postDetail", params: { id: value } });
    },
    getProfile(value) {
      console.log(value);
      this.$router.push(`/profile/${value}`);
    },
  },
};
</script>

<style>
/* Stil Kodları */
.blog-card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  margin-left: 260px;
}

.blog-card.blocked {
  background-color: #ffcdd2; /* Kırmızı tonu */
}

.blog-card:not(.blocked) {
  background-color: #c8e6c9; /* Yeşil tonu */
}

.blog-cards {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
}

.blog-card {
  flex-basis: calc(33.33% - 20px);
  margin-right: 20px;
}

.user-button {
  cursor: pointer;
  color: red;
}

.user-button:hover {
  cursor: pointer;
  color: red;
  text-decoration: underline;
}
</style>
../../components/adminsidebar.vue../../components/sidebar/adminsidebar.vue
