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
  <signupcard />
</template>
<script>
import signupcard from "../../components/session/signupcard.vue";

export default {
  components: { signupcard },
};
</script>
