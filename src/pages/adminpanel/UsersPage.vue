<template>
  <div @mouseenter="toggleSidebar" @mouseleave="toggleSidebar">
    <Sidebar />
  </div>
  <div
    v-if="this.currentUser.isAdmin == true"
    :style="{ 'margin-left': sidebarWidth }"
    v-for="user of usersinfo"
    :key="user_id"
  >
    <div class="card">
      <div class="text">
        <span>{{
          user.user_name +
          ": " +
          user.post_count +
          " post " +
          user.comment_count +
          " yorum"
        }}</span>
      </div>
      <div class="text">
        <span>{{ "Email: " + user.user_mail }}</span>
        <p class="subtitle" v-if="user.user_admin == true">
          Kullanıcı admin konumunda
        </p>
        <p class="subtitle" v-if="user.user_admin == false">
          Kullanıcı admin konumunda değil
        </p>
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
    this.getUsersInfo();
  },
  data() {
    return {
      usersinfo: [],
    };
  },
  setup() {
    return { toggleSidebar, sidebarWidth };
  },
  components: {
    Sidebar: sidebar,
  },
  methods: {
    async getUsersInfo() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/userscountinfo"
        );
        this.usersinfo = response.data;
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
<style>
.card {
  width: 500px;
  margin-left: 15px;
  margin-top: 15px;
  height: 130px;
  border-radius: 15px;
  background: rgba(105, 13, 197, 0.103);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.card::before {
  content: "";
  height: 100px;
  width: 100px;
  position: absolute;
  top: -40%;
  left: -20%;
  border-radius: 50%;
  border: 35px solid rgba(255, 255, 255, 0.102);
  transition: all 0.8s ease;
  filter: blur(0.5rem);
}

.text {
  flex-grow: 1;
  padding: 5px;
  display: flex;
  flex-direction: column;
  color: black;
  font-weight: 900;
  font-size: 1.2em;
}

.subtitle {
  font-size: 0.8em;
  font-weight: 300;
  color: red;
}

.icons {
  display: flex;
  justify-items: center;
  align-items: center;
  width: 250px;
  border-radius: 0px 0px 15px 15px;
  overflow: hidden;
}

.btn {
  border: none;
  width: 84px;
  height: 35px;
  background-color: rgba(247, 234, 234, 0.589);
  display: flex;
  align-items: center;
  justify-content: center;
}

.svg-icon {
  width: 25px;
  height: 25px;
  stroke: rgb(38, 59, 126);
}

.btn:hover {
  background-color: rgb(247, 234, 234);
}

.card:hover::before {
  width: 140px;
  height: 140px;
  top: -30%;
  left: 50%;
  filter: blur(0rem);
}
</style>
