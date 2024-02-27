<template>
  <div @mouseenter="toggleSidebar" @mouseleave="toggleSidebar">
    <Sidebar />
  </div>
  <div
    :style="{ 'margin-left': sidebarWidth }"
    v-if="this.currentUser.isAdmin == true"
  >
    <div>
      <div class="card">
        <div class="title">Toplam Kullanıcı: {{ this.totalUsers }}</div>
        <div class="title">
          Admin olan kullanıcı:
          {{ this.users.filter((user) => user.user_admin).length }}
        </div>
      </div>
      <div class="card">
        <div class="title">Toplam Post Sayısı: {{ this.totalPosts }}</div>
        <div class="title"></div>
      </div>
      <div class="card" @click="getCommentsPage">
        <div class="title">Toplam Yorum Sayısı: {{ this.totalComments }}</div>
        <div class="title">
          Görüntülenmeyen Yorum Sayısı:
          {{
            this.comments.filter((comment) => comment.comment_display).length
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toggleSidebar, sidebarWidth } from "@/components/sidebar/state";
import sidebar from "@/components/sidebar/Sidebar.vue";
import { mapState } from "vuex";
export default {
  setup() {
    return { toggleSidebar, sidebarWidth };
  },
  components: {
    Sidebar: sidebar,
  },
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
  methods: {
    getCommentsPage() {
      this.$router.push("/admincomments");
    },
  },
};
</script>
<style>
.title {
  margin-top: 20px;
  margin-left: 20px;
  font-weight: bold;
  font-size: large;
}
</style>
