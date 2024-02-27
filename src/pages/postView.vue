<template>
  <Header />
  <div class="currentPost">
    <div class="currentPost_post">
      <h1 class="currentPost_post_senderName">
        {{ this.currentPost.postgonderenisim }}
      </h1>
      <p class="currentPost_post_content">{{ this.currentPost.postcontent }}</p>
    </div>
    <div class="currentPost_comments">
      <h1 class="currentPost_comments_title">yorumlar</h1>

      <div
        :key="index"
        class="currentPost_comments_box"
        v-for="(comment, index) in this.currentPost.yorumlar"
      >
        <h2 class="currentPost_comments_box_sender">
          {{ comment.yorumYapanKişi }}
        </h2>
        <h2 class="currentPost_comments_box_content">
          {{ comment.yaptıgıYorum }}
        </h2>
      </div>
      <div class="explore_post_group">
        <input
          class="explore_post_group_input"
          type="text"
          placeholder="yorum yapın"
          v-model="comment"
        />
        <button
          :id="this.currentPost.postID"
          @click="selam"
          class="explore_post_group_button"
        >
          Cevapla
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import header from "../components/header.vue";

export default {
  data() {
    return { post: [] };
  },

  computed: {
    ...mapState({
      posts: (state) => state.data.posts,
      currentPost: (state) => state.data.currentPost,
      currentUser: (state) => state.data.currentUser,
    }),
  },
  components: {
    Header: header,
  },
  methods: {
    async selam(e) {
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
      console.log("postView", newComment);
      console.log("this.corrent", this.currentPost);
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
