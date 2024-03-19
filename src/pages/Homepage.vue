<template>
  <div class="landing-page">
    <!-- Üst Kısım: Rota Yönlendirmeleri -->
    <nav class="navbar">
      <ul>
        <li><a href="/homepage">Anasayfa</a></li>
        <li><a href="/login">Giriş Yap</a></li>
        <li><a href="/signUp">Kayıt Ol</a></li>
        <li><a href="/explore">Keşfet</a></li>
        <li><a href="/about">Hakkımızda</a></li>
      </ul>
    </nav>

    <!-- Alt Kısım: Site Tanıtımı -->
    <div class="intro">
      <div class="intro-content">
        <h1>Chirper</h1>
        <p>Blog Blog Yaşamak</p>
        <p>Ahmet Furkan Ceyhan - Ahmet Tekin</p>
        <p>Süleyman Demirel Üniversitesi</p>
      </div>
    </div>
  </div>
  <div class="footer">
    <FooterComponent />
  </div>
</template>
<script>
import FooterComponent from "../components/footer.vue";

export default {
  components: {
    FooterComponent,
  },
};
</script>
<style>
body {
  font-family: "Arial", sans-serif;
  margin: 0;
  padding: 0;
}

.navbar {
  background-color: #f8f9fa;
  color: #fff;
  padding: 10px 20px;
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

.intro {
  margin-top: 100px;
  background-color: #f8f9fa;
  padding: 1px;
  text-align: center;
  display: flex;
}

.intro-content {
  max-width: 800px;
  margin: 0 auto;
}

.intro h1 {
  font-size: 3rem;
  margin-bottom: 20px;
  color: #333;
}

.intro p {
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 20px;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #0056b3;
}

.footer {
  margin-top: 500px;
}
</style>
`
