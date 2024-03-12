<template>
  <adminsidebar />
  <nav class="navbar">
    <ul>
      <li><a href="/">Anasayfa</a></li>
      <li><a href="/admin">Admin Paneli</a></li>
      <li><a href="/blog">Blog</a></li>
      <li><a href="/contact">İletişim</a></li>
    </ul>
  </nav>
  <div></div>
  <div class="chart-wrapper">
    <div id="postsChart" class="chart-container"></div>
    <div></div>
  </div>
  <div></div>
</template>

<script>
import * as d3 from "d3";
import { ref } from "vue";
import adminsidebar from "../../components/AdminSidebar.vue";
export default {
  components: { adminsidebar },
  setup() {
    const blockedPostsCount = ref(0);
    const totalPosts = ref(0);
    const blockedCommentsCount = ref(0);
    const totalComments = ref(0);
    const totalUsers = ref(0);
    const blockedUsersCount = ref(0);

    fetch("http://localhost:3000/api/posts")
      .then((response) => response.json())
      .then((data) => {
        totalPosts.value = data.length;
        const blockedPosts = data.filter((post) => !post.post_display).length;
        blockedPostsCount.value = blockedPosts;
        redrawPostsChart();
      });
    fetch("http://localhost:3000/api/comments")
      .then((response) => response.json())
      .then((data) => {
        totalComments.value = data.length;
        const blockedComments = data.filter(
          (comment) => !comment.comment_display
        ).length;
        blockedCommentsCount.value = blockedComments;
        redrawCommentsChart();
      });

    fetch("http://localhost:3000/api/users")
      .then((response) => response.json())
      .then((data) => {
        totalUsers.value = data.length;
        const blockedUsers = data.filter((user) => !user.user_display).length;
        blockedUsersCount.value = blockedUsers;
        redrawUsersChart();
      });

    const redrawPostsChart = () => {
      const data = [
        { label: "Engellenmiş Blog", value: blockedPostsCount.value },
        { label: "Toplam Blog", value: totalPosts.value },
      ];

      const width = 300;
      const height = 300;
      const radius = Math.min(width, height) / 2;

      const color = d3.scaleOrdinal(d3.schemeCategory10);

      const svg = d3
        .select("#postsChart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      const pie = d3.pie().value((d) => d.value);

      const arc = d3.arc().innerRadius(0).outerRadius(radius);

      const path = svg
        .selectAll("path")
        .data(pie(data))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => color(i))
        .attr("stroke", "#fff")
        .style("stroke-width", "2px");

      // Etiketleri ekle
      svg
        .selectAll("text")
        .data(pie(data))
        .enter()
        .append("text")
        .text((d) => `${d.data.label}: ${d.data.value}`)
        .attr("transform", (d) => `translate(${arc.centroid(d)})`)
        .style("text-anchor", "middle")
        .style("font-size", "13px")
        .style("font-weight", "bold");
    };

    const redrawCommentsChart = () => {
      const data = [
        { label: "Engellenmiş Yorum", value: blockedCommentsCount.value },
        { label: "Toplam Yorum", value: totalComments.value },
      ];

      const width = 300;
      const height = 300;
      const radius = Math.min(width, height) / 2;

      const color = d3.scaleOrdinal(d3.schemePastel1);

      const svg = d3
        .select("#postsChart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      const pie = d3.pie().value((d) => d.value);

      const arc = d3.arc().innerRadius(0).outerRadius(radius);

      const path = svg
        .selectAll("path")
        .data(pie(data))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => color(i))
        .attr("stroke", "#fff")
        .style("stroke-width", "2px");

      // Etiketleri ekle
      svg
        .selectAll("text")
        .data(pie(data))
        .enter()
        .append("text")
        .text((d) => `${d.data.label}: ${d.data.value}`)
        .attr("transform", (d) => `translate(${arc.centroid(d)})`)
        .style("text-anchor", "middle")
        .style("font-size", "13px")
        .style("font-weight", "bold");
    };
    const redrawUsersChart = () => {
      const data = [
        { label: "Engellenmiş Kullanıcı", value: blockedUsersCount.value },
        { label: "Toplam Kullanıcı", value: totalUsers.value },
      ];

      const width = 300;
      const height = 300;
      const radius = Math.min(width, height) / 2;

      const color = d3.scaleOrdinal(d3.schemeAccent);

      const svg = d3
        .select("#postsChart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      const pie = d3.pie().value((d) => d.value);

      const arc = d3.arc().innerRadius(0).outerRadius(radius);

      const path = svg
        .selectAll("path")
        .data(pie(data))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => color(i))
        .attr("stroke", "#fff")
        .style("stroke-width", "2px");

      // Etiketleri ekle
      svg
        .selectAll("text")
        .data(pie(data))
        .enter()
        .append("text")
        .text((d) => `${d.data.label}: ${d.data.value}`)
        .attr("transform", (d) => `translate(${arc.centroid(d)})`)
        .style("text-anchor", "middle")
        .style("font-size", "13px")
        .style("font-weight", "bold");
    };

    return {
      blockedPostsCount,
      totalPosts,
    };
  },
};
</script>

<style>
.chart-wrapper {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-left: 250px;
  margin-top: 50px;
}
.chart-container {
  text-align: center;
  flex: 1;
  margin: 10px;
  margin-left: 50px;
  margin-right: 50px;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
}
</style>
