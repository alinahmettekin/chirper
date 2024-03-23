<template>
  <div class="sidebar">
    <h2 @click="homePage()">Chirper</h2>
    <h5>Blog Blog Yaşamak</h5>
    <nav>
      <ul>
        <li @click="homePage()"><a href="#">Anasayfa</a></li>
        <li @click="kesfet()"><a href="#">Keşfet</a></li>
        <li v-if="this.currentUser.isAdmin" @click="dashboard()">
          <a href="#">Dashboard</a>
        </li>
      </ul>
      <ul v-if="!isActive">
        <li @click="login()"><a href="#">Giriş Yap</a></li>
        <li @click="signIn()"><a href="#">Kayıt Ol</a></li>
      </ul>
      <ul>
        <li><h3 v-if="isActive" @click="logout()">ÇIKIŞ YAP</h3></li>
      </ul>
    </nav>
    <h3 class="admin-options" v-if="this.currentUser.isAdmin">Seçenekler</h3>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
import router from "../../router/index";

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
      console.log(this.currentUser);
    },
    kesfet() {
      router.push("/explore");
    },
    dashboard() {
      router.push("/admin/dashboard");
    },
    login() {
      router.push("/login");
    },
    signIn() {
      router.push("/signIn");
    },
    homePage() {
      router.push("/homepage");
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
    }, 100);
  },
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 250px;
  background-color: #f8f9fa;
  padding: 20px;
  overflow-y: auto;
  border-right: solid 1px;
}

.sidebar h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
}
.sidebar h2:hover {
  font-size: 2.5rem;
  margin-bottom: 20px;
  text-align: center;
  cursor: pointer;
  display: block;
  transition: background-color 0.3s;
  background-color: #e9ecef;
  border-radius: 10px;
}

.sidebar h3 {
  font-size: 1rem;
  margin-bottom: 20px;
  text-align: center;
}
.sidebar h3:hover {
  font-size: 1.2rem;
  margin-bottom: 20px;
  text-align: center;
  cursor: pointer;
  display: block;
  transition: background-color 0.3s;
  background-color: #e9ecef;
  border-radius: 10px;
}

.sidebar h5 {
  font-size: 0.9rem;
  margin-bottom: 20px;
  text-align: center;
}

.sidebar nav ul,
.sidebar .popular-posts {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.sidebar nav ul li,
.sidebar .popular-posts li {
  margin-bottom: 10px;
}

.sidebar nav ul li a,
.sidebar .popular-posts li a {
  display: block;
  padding: 5px 10px;
  color: #333;
  text-decoration: none;
  transition: background-color 0.3s;
}

.sidebar nav ul li a:hover,
.sidebar .popular-posts li a:hover {
  background-color: #e9ecef;
  font-size: 20px;
  color: black;
  border-radius: 10px;
  font-weight: bold;
}

.sidebar nav ul li h3,
.sidebar .popular-posts li h3 {
  display: block;
  padding: 5px 10px;
  color: #333;
  text-decoration: none;
  transition: background-color 0.3s;
  cursor: pointer;
}

.sidebar nav ul li h3:hover,
.sidebar .popular-posts li h3:hover {
  background-color: #e9ecef;
  cursor: pointer;
}

.post-date {
  float: right;
  font-size: 0.8rem;
  color: #666;
  margin-left: 10px;
}

.sidebar h3:hover {
  color: red;
}
</style>
./sidebar.vue../../router/index./sidebar.vue
