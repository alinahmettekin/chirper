<template>
  <div class="process">
    <Login />
    <SignIn />
  </div>
</template>

<script>
import login from "../components/login.vue";
import signIn from "../components/signIn.vue";
export default {
  data() {},
  components: {
    Login: login,
    SignIn: signIn,
  },
};
</script>
