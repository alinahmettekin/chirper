<template>
  <adminsidebar />
  <nav class="navbar">
    <ul>
      <li><a href="/homepage">Anasayfa</a></li>
      <li><a href="/explore">Keşfet</a></li>
      <li><a href="/contact">İletişim</a></li>
    </ul>
  </nav>
  <div>
    <div class="chart-container">
      <div class="canvas-container">
        <canvas ref="chartPosts"></canvas>
      </div>
      <div class="canvas-container">
        <canvas ref="chartUsers"></canvas>
      </div>
      <div class="canvas-container">
        <canvas ref="chartComments"></canvas>
      </div>
    </div>
    <div>
      <div class="notifications-container">
        <h2>Bildirimler</h2>
        <div v-if="notifications.length === 0" class="no-notifications">
          Henüz bildirim yok
        </div>
        <div v-else class="notifications-list">
          <div
            v-for="notification in notifications"
            :key="notification.id"
            class="notification"
          >
            <div class="notification-icon">
              <i class="fas fa-exclamation-triangle"
                ><font-awesome-icon icon="exclamation-triangle"
              /></i>
            </div>
            <div class="notification-message">{{ notification.message }}</div>
            <div class="notification-time">{{ notification.time }}</div>
            <div class="notification-time">{{ notification.date }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Chart from "chart.js/auto";
import adminsidebar from "../../components/sidebar/adminsidebar.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  data() {
    return {
      posts_url: "http://localhost:3000/api/posts",
      users_url: "http://localhost:3000/api/users",
      comments_url: "http://localhost:3000/api/comments",
      notifications: [],
    };
  },
  components: { adminsidebar, FontAwesomeIcon },
  methods: {
    addNotification(message, count) {
      const now = new Date();
      const date = `${now.getDate().toString().padStart(2, "0")}.${(
        now.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}.${now.getFullYear()}`;
      const time = `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
      this.notifications.push({ id: Date.now(), message, date, time, count });
    },

    async fetchData(url) {
      const response = await axios.get(url);
      return response.data;
    },
    async drawCharts() {
      const posts = await this.fetchData(this.posts_url);
      const users = await this.fetchData(this.users_url);
      const comments = await this.fetchData(this.comments_url);

      const totalPosts = posts.length;
      const falsePosts = posts.filter((post) => !post.post_display).length;

      const totalUsers = users.length;
      const falseUsers = users.filter((user) => !user.user_display).length;

      const totalComments = comments.length;
      const falseComments = comments.filter(
        (comment) => !comment.comment_display
      ).length;
      const unkownComments = comments.filter(
        (comment) =>
          comment.comment_type !== "Normal" &&
          comment.comment_type !== "Küfürlü" &&
          comment.comment_type !== "Irkçı" &&
          comment.comment_type !== "Aşağılayıcı" &&
          comment.comment_type !== "Kötü Söylem" &&
          comment.comment_type !== null
      ).length;
      if (unkownComments >= 1) {
        this.addNotification(
          "Kategorize edilmemiş " + unkownComments + " adet yorum bulunuyor",
          unkownComments
        );
      }

      const ctxPosts = this.$refs.chartPosts.getContext("2d");
      const ctxUsers = this.$refs.chartUsers.getContext("2d");
      const ctxComments = this.$refs.chartComments.getContext("2d");

      const chartDataPosts = {
        labels: [
          "Toplam Blog: " + totalPosts,
          "Engellenmiş Blog: " + falsePosts,
        ],
        datasets: [
          {
            label: "Posts",
            data: [totalPosts, falsePosts],
            backgroundColor: [
              "rgba(102, 194, 165, 0.8)",
              "rgba(252, 141, 98, 0.8)",
            ],
          },
        ],
      };

      const chartDataUsers = {
        labels: [
          "Toplam Kullanıcı: " + totalUsers,
          "Engellenmiş Kulanıcı: " + falseUsers,
        ],
        datasets: [
          {
            label: "Users",
            data: [totalUsers, falseUsers],
            backgroundColor: [
              "rgba(102, 194, 165, 0.8)",
              "rgba(252, 141, 98, 0.8)",
            ],
          },
        ],
      };

      const chartDataComments = {
        labels: [
          "Toplam Yorum: " + totalComments,
          "Engellenmiş Yorum: " + falseComments,
        ],
        datasets: [
          {
            label: "Comments",
            data: [totalComments, falseComments],
            backgroundColor: [
              "rgba(102, 194, 165, 0.8)",
              "rgba(252, 141, 98, 0.8)",
            ],
          },
        ],
      };

      const chartOptions = {
        aspectRatio: 1.5,
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || "";
                if (label) {
                  label += ": ";
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y;
                }
                return label;
              },
            },
          },
        },
      };

      new Chart(ctxPosts, {
        type: "pie",
        data: chartDataPosts,
        options: chartOptions,
      });

      new Chart(ctxUsers, {
        type: "pie",
        data: chartDataUsers,
        options: chartOptions,
      });

      new Chart(ctxComments, {
        type: "pie",
        data: chartDataComments,
        options: chartOptions,
      });
    },
  },
  mounted() {
    this.drawCharts();
  },
};
</script>
<style scoped>
.chart-container {
  display: flex;
  margin-left: 230px;
  margin-top: 50px;
}

.canvas-container {
  flex: 1;
}
.notifications-container {
  margin-top: 50px;
  margin-left: 260px;
}

.notifications-list {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
}

.notification {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
}

.notification-icon {
  margin-right: 10px;
}

.notification-message {
  flex: 1;
}

.notification-time {
  margin-left: 10px;
}
</style>
