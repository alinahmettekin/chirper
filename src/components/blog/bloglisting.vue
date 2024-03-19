<template>
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
            <router-link
              :to="`/profile/${post.post_sender_name}`"
              class="user-name"
              >{{ post.post_sender_name }}</router-link
            >
            <p class="blog-date">{{ post.post_datetime.slice(0, 10) }}</p>
          </div>
        </div>
        <router-link :to="`/postDetail/${post.post_id}`" class="blog-link">{{
          post.post_title
        }}</router-link>
        <p class="blog-preview">
          {{ post.post_content.substring(0, 250)
          }}{{ post.post_content.length > 250 ? "..." : "" }}
        </p>
        <router-link :to="`/postDetail/${post.post_id}`" class="read-more"
          >Devamını Oku</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return { photo: "https://via.placeholder.com/60" };
  },
  computed: {
    ...mapState({
      posts: (state) => state.data.posts,
      currentUser: (state) => state.data.currentUser,
    }),
  },
};
</script>

<style scoped>
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
  text-decoration: none;
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
</style>
