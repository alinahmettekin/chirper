<template>
  <div v-show="this.currentUser.isAdmin === true">
    <div>
      <adminsidebar />
      <nav class="navbar">
        <ul>
          <li><a href="/homepage">Anasayfa</a></li>
          <li><a href="/explore">Keşfet</a></li>
          <li><a href="/admin/dashboard">Admin Paneli</a></li>
          <li><a href="/blogsadmin">Blog</a></li>
          <li><a href="/contact">İletişim</a></li>
        </ul>
      </nav>
      <div class="category-name">
        <button
          v-for="category in categories"
          :key="category"
          @click="selectCategory(category)"
          :style="{
            backgroundColor:
              category === selectedCategory ? 'lightblue' : 'blue',
          }"
        >
          {{
            category === "Tüm Yorumlar"
              ? "Tüm Yorumlar"
              : category === "Normal"
              ? "Normal"
              : category === "Küfürlü"
              ? "Küfürlü"
              : category === "Aşağılayıcı"
              ? "Aşağılayıcı"
              : category === "Irkçı"
              ? "Irkçı"
              : category === "Kötü Söylem"
              ? "Kötü Söylem"
              : "Bilinmeyen"
          }}
        </button>
      </div>

      <div class="comment-list">
        <h2>Yorumlar</h2>
        <div v-if="selectedCategory === 'Bilinmeyen'">
          <div class="comment-cards">
            <div
              v-for="comment in unknownCategoryComments"
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
                <button @click="getBlog(comment.comment_postid)">
                  Blog Sayfasına Git
                </button>
              </div>
              <div class="comment-actions">
                <button @click="toggleActionsMenu(comment)">İşlemler</button>
                <div v-if="comment.showActionsMenu" class="actions-menu">
                  <button
                    v-for="items in menuItems"
                    @click="updateCommentType(comment.comment_id, items)"
                  >
                    {{ items }}
                  </button>
                  <!-- Diğer seçenekler buraya eklenebilir -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="selectedCategory === 'Tüm Yorumlar'">
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
                <button @click="getBlog(comment.comment_postid)">
                  Blog Sayfasına Git
                </button>
              </div>
              <div class="comment-actions">
                <button @click="toggleActionsMenu(comment)">İşlemler</button>
                <div v-if="comment.showActionsMenu" class="actions-menu">
                  <button
                    v-for="items in menuItems"
                    @click="updateCommentType(comment.comment_id, items)"
                  >
                    {{ items }}
                  </button>
                  <!-- Diğer seçenekler buraya eklenebilir -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="comment-cards">
          <div
            v-for="comment in selectedCategoryComments"
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
              <button @click="getBlog(comment.comment_postid)">
                Blog Sayfasına Git
              </button>
            </div>
            <div class="comment-actions">
              <button @click="toggleActionsMenu(comment)">İşlemler</button>
              <div v-if="comment.showActionsMenu" class="actions-menu">
                <button
                  v-for="items in menuItems"
                  @click="updateCommentType(comment.comment_id, items)"
                >
                  {{ items }}
                </button>
                <!-- Diğer seçenekler buraya eklenebilir -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import adminsidebar from "../../components/sidebar/adminsidebar.vue";
import { mapState } from "vuex";
import axios from "axios";

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

    selectedCategoryComments() {
      return this.comments.filter(
        (comment) => comment.comment_type === this.selectedCategory
      );
    },
    unknownCategoryComments() {
      return this.comments.filter(
        (comment) =>
          comment.comment_type !== "Normal" &&
          comment.comment_type !== "Küfürlü" &&
          comment.comment_type !== "Irkçı" &&
          comment.comment_type !== "Kötü Söylem" &&
          comment.comment_type !== "Aşağılayıcı" &&
          comment.comment_type !== null
      );
    },
  },
  components: { adminsidebar },
  data() {
    return {
      selectedCategory: "Tüm Yorumlar",
      categories: [
        "Tüm Yorumlar",
        "Normal",
        "Küfürlü",
        "Aşağılayıcı",
        "Irkçı",
        "Kötü Söylem",
        "Bilinmeyen",
      ],
      menuItems: [
        "Normal",
        "Küfürlü",
        "Aşağılayıcı",
        "Irkçı",
        "Kötü Söylem",
        "Bilinmeyen",
      ],
      showActionsMenu: false,
    };
  },
  methods: {
    toggleActionsMenu(comment) {
      comment.showActionsMenu = !comment.showActionsMenu;
    },

    async updateCommentType(commentID, newType) {
      // Örnek olarak axios kullanarak API'ye istek gönderme
      try {
        const response = await axios.put(
          `http://localhost:3000/api/comments/updatecomment/${commentID}`,
          { commentID: commentID, comment_type: newType }
        );
        // Başarılı cevap alındığında
        console.log(response.data); // İşlem başarılı mesajı
        window.location.reload(true);
      } catch (error) {
        // Hata durumunda
        console.error(error); // Hata mesajını konsola yazdırma
      }
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
    selectCategory(category) {
      this.selectedCategory = category;
    },
  },
};
</script>

<style scoped>
/* Stil Kodları */
.blog-link {
  margin-top: 10px;
}
.comment-card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  margin-left: 260px;
}
.category-name {
  margin-left: 260px;
  margin-top: 30px;
}

.comment-card.blocked {
  background-color: #ffcdd2; /* Kırmızı tonu */
}

.comment-card:not(.blocked) {
  background-color: #c8e6c9; /* Yeşil tonu */
}

.comment-cards {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
}

.comment-card {
  flex-basis: calc(33.33% - 20px);
  margin-right: 20px;
}

.comment-actions {
  position: relative;
  margin-top: 5px;
}

.actions-menu {
  margin-top: 3px;
}
</style>
