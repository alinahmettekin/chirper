<template>
  <div>
    <div class="blog-list">
      <Sidebar />
      <div class="main-content">
        <div class="blog-list">
          <h1 class="blog-title">{{ this.post.post_title }}</h1>

          <div class="blog-header">
            <img :src="photo" alt="User Photo" class="user-photo" />
            <div class="user-info">
              <p :id="post.post_sender_name" @click="getLink" class="user-name">
                Yazar: {{ "   " + this.post.user_name }}
              </p>
              <p class="blog-date">{{ post.post_datetime.slice(0, 10) }}</p>
            </div>
          </div>

          <p
            class="blog-preview"
            v-html="formatContent(this.post.post_content)"
          ></p>

          <div>
            <h3 v-if="this.comments.length === 0">Henüz Bir Yorum Yok.</h3>
            <h3 v-else>Yorumlar</h3>
            <ul class="comment-list">
              <li
                v-for="comment in comments"
                :key="comment.comment_id"
                class="comment-item"
              >
                <div class="comment-header">
                  <img
                    :src="`https://via.placeholder.com/90`"
                    alt="User Photo"
                    class="user-photo"
                  />
                  <div class="user-info">
                    <router-link
                      :to="`/profile/${comment.user_name}`"
                      class="blog-link"
                      >{{ comment.user_name }}</router-link
                    >
                    <p class="comment-date">
                      {{ comment.comment_datetime.slice(0, 10) }}
                    </p>
                  </div>
                </div>
                <p class="comment-content">
                  {{ comment.comment_content }}
                </p>
              </li>
            </ul>
          </div>
          <div class="share-section">
            <h2 class="share-vision">Yorum Ekle</h2>
            <div class="share-form">
              <label for="content"></label>
              <textarea
                id="content"
                name="content"
                rows="4"
                style="resize: none"
                placeholder="..."
                required
                v-model="comment"
              ></textarea>

              <button @click="sendComment">Paylaş</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from "../components/Sidebar.vue";
//import header from "../components/Header.vue";
import axios from "axios";
import { mapState } from "vuex";
export default {
  async created() {
    const postId = this.$route.params.id;
    await this.getPostAsync(postId);
    await this.getCommentsAsync(postId);
  },
  data() {
    return {
      photo: "https://via.placeholder.com/60",
      post: {},
      comments: [],
    };
  },
  components: {
    Sidebar: sidebar,
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.data.currentUser,
    }),
    visibleComments() {
      return this.comments.filter((comments) => comment.comment_display);
    },
  },
  methods: {
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
        comment_postid: this.$route.params.id,
      };
      console.log("postView", newComment);

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
    formatContent(content) {
      //içerik formatlaması
      return content.replace(/\n/g, "<br>"); // yeni satır karakterlerini <br> etiketleriyle değiştirir
    },
    async getPostAsync(postId) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/posts/${postId}`
        );
        this.post = response.data;
        console.log(this.post);
      } catch (error) {
        this.errors.push(error);
      }
    },
    async getCommentsAsync(postId) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/comments/${postId}`
        );
        this.comments = response.data.comments;
        console.log(response.data.comments);
      } catch (error) {
        this.errors.push(error);
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
        comment_postid: this.$route.params.id,
      };
      console.log("postView", newComment);

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
  margin-top: 20px;
  margin-bottom: 20px;
}

.blog-item {
  border-bottom: 1px solid #ccc;
  padding: 20px 0;
}

.user-photo {
  border-radius: 50%;
  margin-right: 10px;
  margin-bottom: 20px;
}

.user-info {
  display: flex;
  align-items: center; /* Dikey hizalamayı ayarlar */
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
  margin-bottom: 40px;
  margin-top: 25px;
}

.read-more {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

.comment-list {
  margin-top: 20px;
  list-style-type: none;
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
  color: black;
  line-height: 1.6;
}
.share-section {
  margin-top: 25px;
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.share-section h2 {
  margin-bottom: 10px;
}

.share-form {
  display: flex;
  flex-direction: column;
}
.share-vision {
  display: flex;
  flex-direction: column;
  text-align: center;
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
