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
  <div class="form-container">
    <div class="site-info">
      <p class="site-name">Chirper</p>
      <p class="site-slogan">blog blog yaşamak</p>
    </div>
    <div class="form-control">
      <p class="title">Giriş Yap</p>
      <div class="input-field">
        <input
          class="input"
          type="name"
          name="email"
          id="email"
          placeholder="E-Mail"
          v-model="email"
        />
        <label class="label" for="input">E-posta adresinizi girin</label>
      </div>
      <div class="input-field">
        <input
          class="input"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          v-model="password"
        />
        <label class="label" for="input">Şifrenizi girin</label>
      </div>
      <a class="forgot-password">Şifrenizi mi unuttunuz?</a>
      <a @click="signUp()" class="signup">Hesabınız yok mu? Kayıt olun</a>
      <button @click="login" class="submit-btn">Giriş Yap</button>
    </div>
  </div>
</template>
<script>
import router from "../../router";
import { mapState } from "vuex";

export default {
  data() {
    return { currentUser: null };
  },
  methods: {
    login() {
      const authentication = {
        currentUserMail: this.email,
        currentUserPassword: this.password,
      };

      this.$store.commit("loginUser", authentication);
    },
    signUp() {
      router.push("/signUp");
    },
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.data.currentUser,
    }),
  },
};
</script>

<style scoped>
.navbar {
  background-color: #f8f9fa;
  color: #fff;
  padding: 10px 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.navbar ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-end;
}

.navbar li {
  margin-left: 20px;
  font-weight: bolder;
}

.navbar a {
  color: black;
  text-decoration: none;
}

.navbar a:hover {
  color: black;
  text-decoration: none;
  font-size: 1.1rem;
  display: block;
  background-color: #f8f9fa;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px; /* Navbar'ın yüksekliği kadar boşluk bırak */
}

.site-info {
  text-align: center;
}

.site-name {
  font-size: 36px;
  font-weight: bold;
}

.site-slogan {
  font-size: 18px;
  font-style: italic;
  color: #666;
}

.form-control {
  margin-top: 200px;
  margin-top: 20px;
  background-color: #ffffff;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  width: 400px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  padding: 25px;
  border-radius: 8px;
}
.title {
  font-size: 28px;
  font-weight: 800;
}
.input-field {
  position: relative;
  width: 100%;
}

.input {
  margin-top: 15px;
  width: 100%;
  outline: none;
  border-radius: 8px;
  height: 45px;
  border: 1.5px solid #ecedec;
  background: transparent;
  padding-left: 10px;
}
.input:focus {
  border: 1.5px solid #2d79f3;
}
.input-field .label {
  position: absolute;
  top: 25px;
  left: 15px;
  color: #ccc;
  transition: all 0.3s ease;
  pointer-events: none;
  z-index: 2;
}
.input-field .input:focus ~ .label,
.input-field .input:valid ~ .label {
  top: 5px;
  left: 5px;
  font-size: 12px;
  color: #2d79f3;
  background-color: #ffffff;
  padding-left: 5px;
  padding-right: 5px;
}
.submit-btn {
  margin-top: 30px;
  height: 55px;
  background: #f2f2f2;
  border-radius: 11px;
  border: 0;
  outline: none;
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  background: linear-gradient(180deg, #363636 0%, #1b1b1b 50%, #000000 100%);
  box-shadow: 0px 0px 0px 0px #ffffff, 0px 0px 0px 0px #000000;
  transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
  cursor: pointer;
}

.submit-btn:hover {
  box-shadow: 0px 0px 0px 2px #ffffff, 0px 0px 0px 4px #0000003a;
}
.forgot-password,
.signup {
  text-align: center;
  margin-top: 15px;
  color: #007bff;
  cursor: pointer;
}
</style>
./LogIn.vue../../router
