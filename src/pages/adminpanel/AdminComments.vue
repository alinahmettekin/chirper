<template>
  <div v-show="this.currentUser.isAdmin === true">
    <div>
      <AdminSidebar />
      <nav class="navbar">
        <ul>
          <li><a href="/">Anasayfa</a></li>
          <li><a href="/admin/dashboard">Admin Paneli</a></li>
          <li><a href="/blogsadmin">Blog</a></li>
          <li><a href="/contact">İletişim</a></li>
        </ul>
      </nav>

      <div class="comment-list">
        <h2>Yorumlar</h2>
        <div class="comment-cards">
          <div
            v-for="comment in this.comments"
            :key="comment.comment_id"
            class="comment-card"
            :class="{ blocked: !comment.comment_display }"
          >
            <p @click="">
              <strong>Yorum İçeriği: </strong>{{ comment.comment_content }}
            </p>
            <p>
              <strong>Yorum Sahibi: </strong>
              <span
                class="user-button"
                @click="getProfile(comment.user_name)"
                >{{ comment.user_name }}</span
              >
            </p>
            <p>
              <strong>Tarih: </strong>
              {{ comment.comment_datetime.substring(0, 10) }}
            </p>
            <p><strong>Blog Başlığı: </strong> {{ comment.post_title }}</p>
            <p><strong>Comment Type: </strong> {{ comment.comment_type }}</p>
            <div class="blog-link">
              <span class="arrow">➤ .</span>
              <button @click="getBlog(comment.comment_postid)">
                Blog Sayfasına Git
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminSidebar from "../../components/AdminSidebar.vue";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      posts: (state) => state.data.posts,
      users: (state) => state.data.users,
      comments: (state) => state.data.comments,
      currentUser: (state) => state.data.currentUser,
    }),
    totalUsers() {
      return this.users.length;
    },
    totalPosts() {
      return this.posts.length;
    },
    totalComments() {
      return this.comments.length;
    },
  },
  components: { AdminSidebar },
  data() {
    return {};
  },
  methods: {
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
.comment-card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  margin-left: 260px;
}

.comment-card.blocked {
  background-color: #ffcdd2; /* Kırmızı tonu */
}

.comment-card:not(.blocked) {
  background-color: #c8e6c9; /* Yeşil tonu */
}

.comment-cards {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
}

.comment-card {
  flex-basis: calc(33.33% - 20px);
  margin-right: 20px;
}
</style>
