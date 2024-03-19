<template>
  <footer>
    <div class="container">
      <div class="footer-content">
        <p>&copy; {{ currentYear }} Chirper. Tüm hakları saklıdır.</p>
        <ul class="footer-links">
          <li v-for="(link, index) in footerLinks" :key="index">
            <a :href="link.url">{{ link.text }}</a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      currentYear: new Date().getFullYear(),
      footerLinks: [
        { text: "Hakkımızda", url: "#" },
        { text: "İletişim", url: "#" },
        { text: "KVKK", url: "#" },
      ],
    };
  },
};
</script>

<style>
footer {
  background-color: #333;
  color: white;
  padding: 20px 0;
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  display: inline-block;
  margin-right: 20px;
}

.footer-links li:last-child {
  margin-right: 0;
}

.footer-links a {
  color: white;
  text-decoration: none;
}

.footer-links a:hover {
  text-decoration: underline;
}
</style>
