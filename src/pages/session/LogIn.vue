<template>
  <div>
    <nav class="navbar">
      <ul>
        <li><a href="/homepage">Anasayfa</a></li>
        <li><a href="/login">Giriş Yap</a></li>
        <li><a href="/signUp">Kayıt Ol</a></li>
        <li><a href="/explore">Keşfet</a></li>
        <li><a href="#">Hakkımızda</a></li>
      </ul>
    </nav>
  </div>
  <logincard />
</template>
<script>
import logincard from "../../components/session/logincard.vue";

export default {
  components: {
    logincard,
  },
};
</script>
