<template>
  <div @mouseenter="toggleSidebar" @mouseleave="toggleSidebar">
    <Sidebar />
  </div>
  <div></div>
  <div
    v-if="this.currentUser.isAdmin == true"
    v-for="comment of comments"
    :key="comment_id"
    :style="{ 'margin-left': sidebarWidth }"
  >
    <div class="card">
      <div class="text">
        <span>{{ comment.user_name + "  kullanıcısından" }}</span>
      </div>
      <div class="text">
        <span>{{ "yorum içeriği: " + comment.comment_content }}</span>
        <p
          class="subtitle"
          v-if="comment.comment_display === true"
          color="green"
        >
          Yorum yayında
        </p>
        <p class="subtitle" v-if="comment.comment_display === false">
          Yorum yayında değil
        </p>
      </div>
    </div>
    <div class="paste-button">
      <button class="button-paste">Düzenle &nbsp; ▼</button>
      <div class="dropdown-content">
        <button></button>
        <a id="top" @click="toggleCommentDisplay(comment.comment_id)" href="#"
          >Display değerini değiştir</a
        >
        <a id="middle" href="#">Yorumu Sil</a>
        <a id="bottom" href="#"></a>
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
    this.getComments();
  },
  data() {
    return {
      comments: [],
    };
  },
  setup() {
    return { toggleSidebar, sidebarWidth };
  },
  components: {
    Sidebar: sidebar,
  },
  methods: {
    async toggleCommentDisplay(commentId) {
      try {
        await axios.patch(
          `http://localhost:3000/api/comments/comment/${commentId}`,
          {}
        );

        // Güncelleme başarılıysa sayfayı yenile
        window.location.reload();
      } catch (error) {
        console.error("Yorum durumu güncellenirken bir hata oluştu:", error);
      }
    },
    async getComments() {
      try {
        const response = await axios.get("http://localhost:3000/api/comments");
        this.comments = response.data;
        console.log(response.data);
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
  font-size: 0.6em;
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

.paste-button {
  position: relative;
  display: block;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  margin-left: 15px;
  margin-top: 5px;
}

.button-paste {
  background-color: #4caf50;
  color: #212121;
  padding: 10px 15px;
  font-size: 15px;
  font-weight: bold;
  border: 2px solid transparent;
  border-radius: 15px;
  cursor: pointer;
}

.dropdown-content {
  display: none;
  font-size: 13px;
  position: absolute;
  z-index: 1;
  min-width: 200px;
  background-color: #212121;
  border: 2px solid #4caf50;
  border-radius: 0px 15px 15px 15px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
}

.dropdown-content a {
  color: #4caf50;
  padding: 8px 10px;
  text-decoration: none;
  display: block;
  transition: 0.1s;
}

.dropdown-content a:hover {
  background-color: #4caf50;
  color: #212121;
}

.dropdown-content a:focus {
  background-color: #212121;
  color: #4caf50;
}

.dropdown-content #top:hover {
  border-radius: 0px 13px 0px 0px;
}

.dropdown-content #bottom:hover {
  border-radius: 0px 0px 13px 13px;
}

.paste-button:hover button {
  border-radius: 15px 15px 0px 0px;
}

.paste-button:hover .dropdown-content {
  display: block;
}
</style>
