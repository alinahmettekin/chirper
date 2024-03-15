<template>
  <div>
    <div class="blog-list">
      <Sidebar />
      <div class="main-content">
        <div class="share-section">
          <h2 class="share-vision">Blog Paylaş</h2>
          <div class="share-form">
            <label for="title">Başlık:</label>
            <input
              type="text"
              id="title"
              name="title"
              v-model="post_title"
              autocomplete="off"
              placeholder="Bir başlık ekleyin"
              required
            />

            <label for="content">İçerik:</label>
            <textarea
              id="content"
              name="content"
              rows="4"
              style="resize: none"
              placeholder="Blog yazmaya buradan başlayabilirsiniz"
              required
              v-model="post_content"
            ></textarea>

            <button @click="sendPost">Paylaş</button>
          </div>
        </div>
        <div class="blog-list">
          <h1 class="blog-title">Blog Keşfet</h1>
          <ul>
            <li
              :id="post.post_id"
              v-for="post in posts"
              :key="post.post_id"
              class="blog-item"
            >
              <div class="blog-header">
                <img :src="photo" alt="User Photo" class="user-photo" />
                <div class="user-info">
                  <p
                    :id="post.post_sender_name"
                    @click="getLink"
                    class="user-name"
                  >
                    {{ post.post_sender_name }}
                  </p>
                  <p class="blog-date">{{ post.post_datetime.slice(0, 10) }}</p>
                </div>
              </div>
              <router-link
                :to="`/postDetail/${post.post_id}`"
                class="blog-link"
                >{{ post.post_title }}</router-link
              >
              <p class="blog-preview">
                {{ post.post_content.substring(0, 250)
                }}{{ post.post_content.length > 250 ? "..." : "" }}
              </p>
              <router-link :to="`/postDetail/${post.post_id}`" class="read-more"
                >Devamını Oku</router-link
              >
              <ul class="comment-list">
                <li
                  v-if="
                    post.comments.length > 0 &&
                    post.comments[0].comment_content !== null &&
                    post.comments[0].comment_display === true
                  "
                  class="comment-item"
                >
                  <div class="comment-header">
                    <img :src="photo" alt="User Photo" class="user-photo" />
                    <div class="user-info">
                      <p class="user-name">
                        {{ post.comments[0].comment_sender_name }}
                      </p>
                      <p class="comment-date">
                        {{ post.comments[0].comment_datetime }}
                      </p>
                    </div>
                  </div>
                  <p class="comment-content">
                    {{ post.comments[0].comment_contents }}
                  </p>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from "../components/Sidebar.vue";
//import header from "../components/Header.vue";
import FooterComponent from "../components/footer.vue";
import axios from "axios";
import { mapState } from "vuex";

export default {
  data() {
    return {
      photo: "https://via.placeholder.com/60",
      commentType: "",
    };
  },

  components: {
    Sidebar: sidebar,
    FooterComponent,
  },

  computed: {
    ...mapState({
      posts: (state) => state.data.posts,
      currentUser: (state) => state.data.currentUser,
    }),
  },
  methods: {
    getLink(e) {
      console.log(e.target.id);
      this.$router.push(`profile/${e.target.id}`);
    },
    getPost(e) {
      console.log(e.target.id);
      const postID = e.target.id;
      this.$store.dispatch("getcurrentPost", postID);
      this.$router.push({ name: "postDetail", params: { id: e.target.id } });
    },

    getCurrentPost(e) {
      console.log(e.target.id);
      const postID = e.target.id;
      this.$store.dispatch("getcurrentPost", postID);
      this.$router.push({ name: "postDetail", params: { id: e.target.id } });
    },
    async sendPost() {
      var currentdate = new Date();
      var datetime =
        currentdate.getDate() +
        "-" +
        (currentdate.getMonth() + 1) +
        "-" +
        currentdate.getFullYear() +
        " " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds();
      const newPost = {
        post_sender: this.currentUser.user_id,
        post_content: this.post_content,
        post_datetime: datetime,
        post_title: this.post_title,
      };
      if (this.post_content && this.post_title) {
        try {
          const response = await axios.post(
            "http://localhost:3000/sendpost",
            newPost
          );

          if (response.status === 201) {
            alert("post başarıyla kaydedildi.");
            console.log("oldu");
          } else {
            alert("post kaydedilirken bir hata oluştu.");
            console.log("olmadı");
          }
        } catch (error) {
          console.error("İstek sırasında bir hata oluştu:", error);
          alert("post kaydedilirken bir hata oluştu.");
        }
        this.post = "";
      }
    },
    async sendComment(e) {
      var currentdate = new Date();
      var datetime =
        currentdate.getDate() +
        "-" +
        (currentdate.getMonth() + 1) +
        "-" +
        currentdate.getFullYear() +
        " " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds();
      const newComment = {
        comment_sender: this.currentUser.user_id,
        comment_content: this.comment,
        comment_datetime: datetime,
        comment_postid: e.target.id,
      };
      console.log(newComment);
      if (this.comment && typeof this.currentUser == "object") {
        try {
          const response = await axios.post(
            "http://localhost:3000/sendcomment",
            newComment
          );

          if (response.status === 201) {
            alert("comment başarıyla kaydedildi.");
          } else {
            alert("comment kaydedilirken bir hata oluştu.");
          }
        } catch (error) {
          console.error("İstek sırasında bir hata oluştu:", error);
          alert("comment kaydedilirken bir hata oluştu.");
        }
      }
    },
  },
};
</script>

<style scoped>
/* Styles for blog list */

.share-vision {
  text-align: center;
}
.blog-list {
  max-width: 1000px;
  margin-left: 150px;
  padding: 1px;
}

.blog-title {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.blog-item {
  border-bottom: 1px solid #ccc;
  padding: 20px 0;
  margin-bottom: 10px;
}

.user-photo {
  border-radius: 50%;
  margin-right: 10px;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-name {
  font-weight: bold;
  font-size: 22px;
  margin-bottom: 4px;
  cursor: pointer;
}
.user-name:hover {
  color: #007bff; /* Mouse üzerine gelince renk değiştir */
}

.blog-link {
  font-size: 1.2rem;
  font-weight: lighter;
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
  display: block;
  margin-bottom: 10px;
}

.blog-link:hover {
  color: #007bff;
}

.blog-meta {
  margin-bottom: 10px;
}

.blog-date {
  color: #666;
  font-size: 13px;
  margin-left: 10px;
}

.blog-preview {
  color: #333;
  line-height: 1.6;
  margin-bottom: 10px;
}

.read-more {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

.comment-list {
  margin-top: 20px;
  list-style-type: none;
  padding-left: 0;
}

.comment-item {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}

.comment-header {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.comment-header .user-photo {
  border-radius: 50%;
  margin-right: 10px;
}

.comment-header .user-info {
  display: flex;
  flex-direction: column;
}

.comment-header .user-info .user-name {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 4px;
}

.comment-header .user-info .comment-date {
  color: #666;
  font-size: 0.8rem;
}

.comment-content {
  color: #333;
  line-height: 1.6;
}
.share-section {
  margin-top: 25px;
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: 150px;
}

.share-section h2 {
  margin-bottom: 10px;
}

.share-form {
  display: flex;
  flex-direction: column;
}

.share-form label {
  margin-bottom: 5px;
}

.share-form input,
.share-form textarea {
  padding: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.share-form button {
  padding: 8px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.share-form button:hover {
  background-color: #0056b3;
}
</style>
