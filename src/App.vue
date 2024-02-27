<template>  
  <RouterView />
</template>

<script>

export default {
  methods: {},
  mounted() {
    this.$store.dispatch("getPosts");
    this.$store.dispatch("getUsers");
    this.$store.dispatch("getComments");
    this.$store.dispatch("getCurrentUser");
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}

</style>