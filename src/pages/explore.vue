<template>
  <div class="main-content">
    <sidebar />
    <blogsharing />
    <bloglisting />
    <explorefooter />
  </div>
</template>

<script>
import sidebar from "../components/sidebar/sidebar.vue";
import explorefooter from "../components/footer.vue";
import { mapState } from "vuex";
import bloglisting from "../components/blog/bloglisting.vue";
import blogsharing from "../components/blog/blogsharing.vue";

export default {
  data() {
    return {};
  },

  components: {
    sidebar,
    explorefooter,
    blogsharing,
    bloglisting,
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
.main-content {
  margin-left: 150px;
}
</style>
../components/blog/bloglisting.vue../components/blog/blogsharing.vue
