<template>
  <div class="container-login" v-if="this.$route.path == `/login`">
    <div class="heading-login">Giriş Yap</div>
    <div class="form-login">
      <input
        required=""
        class="input-login"
        type="email"
        name="email"
        id="email"
        placeholder="E-mail"
        v-model="email"
      />
      <input
        required=""
        class="input-login"
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        v-model="password"
      />
      <span class="forgot-password"><a href="#">Forgot Password ?</a></span>
      <input
        @click="login"
        class="login-button"
        type="submit"
        value="Giriş Yap"
      />
    </div>
    <div class="social-account-container">
      <span class="title" @click="signIn"
        >Hesabınız yoksa kayıt olmak için tıklayın</span
      >
    </div>
    <span class="agreement"><a href="#">Learn user licence agreement</a></span>
  </div>
</template>
<script>
import router from "../router";

export default {
  data() {
    return { currentUser: null };
  },
  components: {},
  methods: {
    login() {
      const authentication = {
        currentUserMail: this.email,
        currentUserPassword: this.password,
      };

      this.$store.commit("loginUser", authentication);
    },
    signIn() {
      router.push("/signIn");
    },
  },
};
</script>
<style>
.container-login {
  max-width: 350px;
  background: #f8f9fd;
  background: linear-gradient(
    0deg,
    rgb(255, 255, 255) 0%,
    rgb(244, 247, 251) 100%
  );
  border-radius: 40px;
  padding: 25px 35px;
  border: 5px solid rgb(255, 255, 255);
  box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 30px 30px -20px;
  margin: 20px;
}

.heading-login {
  text-align: center;
  font-weight: 900;
  font-size: 30px;
  color: rgb(16, 137, 211);
}

.form-login {
  margin-top: 20px;
}

.form-login .input-login {
  width: 100%;
  background: white;
  border: none;
  padding: 15px 20px;
  border-radius: 20px;
  margin-top: 15px;
  box-shadow: #cff0ff 0px 10px 10px -5px;
  border-inline: 2px solid transparent;
}

.form-login .input-login::-moz-placeholder {
  color: rgb(170, 170, 170);
}

.form-login .input-login::placeholder {
  color: rgb(170, 170, 170);
}

.form-login .input-login:focus {
  outline: none;
  border-inline: 2px solid #12b1d1;
}

.form-login .forgot-password {
  display: block;
  margin-top: 10px;
  margin-left: 10px;
}

.form-login .forgot-password a {
  font-size: 11px;
  color: #0099ff;
  text-decoration: none;
}

.form-login .login-button {
  display: block;
  width: 100%;
  font-weight: bold;
  background: linear-gradient(
    45deg,
    rgb(16, 137, 211) 0%,
    rgb(18, 177, 209) 100%
  );
  color: white;
  padding-block: 15px;
  margin: 20px auto;
  border-radius: 20px;
  box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 20px 10px -15px;
  border: none;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

.form-login .login-button:hover {
  transform: scale(1.03);
  box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 23px 10px -20px;
}

.form-login .login-button:active {
  transform: scale(0.95);
  box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 15px 10px -10px;
}

.social-account-container {
  margin-top: 25px;
  cursor: pointer;
}

.social-account-container .title {
  display: block;
  text-align: center;
  font-size: 10px;
  color: rgb(170, 170, 170);
}

.social-account-container .social-accounts {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 5px;
}

.social-account-container .social-accounts .social-button {
  background: linear-gradient(45deg, rgb(0, 0, 0) 0%, rgb(112, 112, 112) 100%);
  border: 5px solid white;
  padding: 5px;
  border-radius: 50%;
  width: 40px;
  aspect-ratio: 1;
  display: grid;
  place-content: center;
  box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 12px 10px -8px;
  transition: all 0.2s ease-in-out;
}

.social-account-container .social-accounts .social-button .svg {
  fill: white;
  margin: auto;
}

.social-account-container .social-accounts .social-button:hover {
  transform: scale(1.2);
}

.social-account-container .social-accounts .social-button:active {
  transform: scale(0.9);
}

.agreement {
  display: block;
  text-align: center;
  margin-top: 15px;
}

.agreement a {
  text-decoration: none;
  color: #0099ff;
  font-size: 9px;
}
</style>
