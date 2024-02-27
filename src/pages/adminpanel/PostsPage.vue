<template>
  <div @mouseenter="toggleSidebar" @mouseleave="toggleSidebar">
    <Sidebar />
  </div>
  <div
    v-if="this.currentUser.isAdmin == true"
    :style="{ 'margin-left': sidebarWidth }"
    v-for="post of posts"
    :key="post_id"
  >
    <div class="card">
      <div class="text">
        <span>{{ post.post_sender_name + " kullanıcısından" }}</span>
      </div>
      <div class="text">
        <span>{{ "post içeriği:  " + post.post_content }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { toggleSidebar, sidebarWidth } from "@/components/sidebar/state";
import sidebar from "@/components/sidebar/Sidebar.vue";
import axios from "axios";
import { mapState } from "vuex";

export default {
  async created() {
    this.getUsers();
  },
  data() {
    return {
      posts: [],
    };
  },
  setup() {
    return { toggleSidebar, sidebarWidth };
  },
  components: {
    Sidebar: sidebar,
  },
  methods: {
    async getUsers() {
      try {
        const response = await axios.get("http://localhost:3000/api/posts");
        this.posts = response.data;
      } catch (error) {
        console.log(error);
      }
    },
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
};
</script>
