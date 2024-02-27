<template>
  <header class="header">
    <h1 @click="ana" class="header_title">Chirper</h1>

    <h2>{{ displayName }}</h2>
    <ul class="header_list">
      <li @click="homePage" class="header_list_item">Anasayfa</li>
      <ul v-if="!isActive" class="header_list_box">
        <li @click="login" class="header_list_box_item">Giriş</li>
        <li @click="signIn" class="header_list_box_item">Kayıt</li>
      </ul>
      <li @click="kesfet" class="header_list_box_item">Keşfet</li>
      <li
        v-if="this.currentUser.isAdmin"
        @click="dashboard"
        class="header_list_box_item"
      >
        Dashboard
      </li>
      <li v-if="isActive" @click="logout" class="header_list_box_item">
        Logout
      </li>
    </ul>
  </header>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import router from "../router/index";

export default {
  data() {
    return { displayName: null, isActive: true, isAdmin: false };
  },
  methods: {
    ana() {
      console.log(this.isActive);
      console.log(this.displayName);
      console.log(typeof this.currentUser);
      console.log(this.currentUser.isAdmin);
    },
    kesfet() {
      router.push("/explore");
    },
    dashboard() {
      router.push("/dashboard");
    },
    login() {
      router.push("/login");
    },
    signIn() {
      router.push("/signIn");
    },
    homePage() {
      router.push("/");
    },
    getRenderItem() {
      if (this.currentUser && typeof this.currentUser == "object") {
        this.displayName = this.currentUser.user_name;
        this.isActive == true;
      } else {
        this.displayName = "";
        this.isActive = false;
      }
    },

    async logout() {
      try {
        const response = await axios.get("http://localhost:3000/oturumu-kapat"); // Sunucuya oturumu kapatma isteği gönderin
        if (response.status === 200) {
          // Oturum başarıyla sonlandırıldı
          this.isLoggedIn = false; // İstemci tarafında oturumu kapalı olarak işaretleyin
          this.$store.commit("logoutUser");
        } else {
          // Oturumu sonlandırma başarısız oldu
          console.error("Oturumu sonlandırma başarısız oldu");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.data.currentUser,
    }),
  },
  mounted() {
    setTimeout(() => {
      this.getRenderItem();
    }, 5000);
  },
};
</script>
