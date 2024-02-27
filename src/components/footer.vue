<template>
  <div class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>About Us</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <div class="footer-section">
        <h3>Useful Links</h3>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>Contact Us</h3>
        <p>Email: info@example.com</p>
        <p>Phone: +1234567890</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2023 Your Website. All Rights Reserved.</p>
    </div>
  </div>
</template>

<style>
.footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 20px 0;
  width: 100%;
  position: absolute;
  bottom: 0;
}

.footer-content {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
}

.footer-section {
  flex: 1;
  padding: 0 20px;
}

.footer-section h3 {
  margin-bottom: 10px;
}

.footer-section ul {
  list-style-type: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 5px;
}

.footer-section a {
  color: #fff;
  text-decoration: none;
}

.footer-bottom {
  margin-top: 20px;
}
</style>
