<template>
  <div class="share-section">
    <h2 class="share-vision">Blog Paylaş</h2>
    <div class="share-form">
      <label for="title"></label>

      <textarea
        type="text"
        id="title"
        name="title"
        v-model="inputTitleText"
        autocomplete="off"
        placeholder="Bloğunuz için bir başlık belirleyin"
        style="resize: none"
        required
      >
      </textarea>

      <label for="content"></label>
      <textarea
        id="content"
        name="content"
        rows="4"
        style="resize: none"
        placeholder="Blog yazmaya buradan başlayabilirsiniz"
        required
        v-model="inputContentText"
      ></textarea>

      <button @click="sendPost">Paylaş</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  data() {
    return {
      inputTitleText: "",
      inputContentText: "",
    };
  },
  computed: {
    ...mapState({
      posts: (state) => state.data.posts,
      currentUser: (state) => state.data.currentUser,
    }),
  },
  methods: {
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
        post_content: this.inputContentText,
        post_datetime: datetime,
        post_title: this.inputTitleText,
      };
      if (this.inputContentText && this.inputTitleText) {
        try {
          const response = await axios.post(
            "http://localhost:3000/sendpost",
            newPost
          );

          if (response.status === 201) {
            alert("post başarıyla kaydedildi.");
            location.reload();
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
  },
};
</script>
<style scoped>
.share-section {
  margin-top: 25px;
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: 150px;
  max-width: 1000px;
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

.share-vision {
  text-align: center;
}
</style>
