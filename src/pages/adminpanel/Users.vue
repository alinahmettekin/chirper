<template>
  <div v-show="this.currentUser.isAdmin === true">
    <adminsidebar />
    <nav class="navbar">
      <ul>
        <li><a href="/homepage">Anasayfa</a></li>
        <li><a href="/explore">Blog</a></li>
        <li><a href="/contact">İletişim</a></li>
      </ul>
    </nav>
    <div class="user-list">
      <h2>Kullanıcılar</h2>
      <table>
        <thead>
          <tr>
            <th>UID</th>
            <th>Kullanıcı Adı</th>
            <th>Email</th>
            <th>Admin Durumu</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in this.users" :key="user.user_id">
            <td>{{ user.user_id }}</td>
            <td>{{ user.user_name }}</td>
            <td>{{ user.user_mail }}</td>
            <td>{{ user.user_admin }}</td>
            <td>
              <div>
                <button @click="toggleDropdown(user.user_id)">İşlemler</button>
                <div v-if="showDropdown === user.user_id" class="dropdown">
                  <button @click="editUser(user.user_id)">Düzenle</button>
                  <button @click="deleteUser(user.user_id)">
                    Kullanıcıyı Sil
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import adminsidebar from "../../components/sidebar/adminsidebar.vue";

import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      posts: (state) => state.data.posts,
      users: (state) => state.data.users,
      comments: (state) => state.data.comments,
      currentUser: (state) => state.data.currentUser,
    }),
    totalUsers() {
      return this.users.length;
    },
    totalPosts() {
      return this.posts.length;
    },
    totalComments() {
      return this.comments.length;
    },
    data() {
      return {
        showDropdown: null,
      };
    },
    methods: {
      editUser(id) {
        // Kullanıcı düzenleme işlemi
        this.showDropdown = null; // Dropdown'ı kapat
      },
      deleteUser(id) {
        // Kullanıcı silme işlemi
        this.showDropdown = null; // Dropdown'ı kapat
      },
      toggleDropdown(userId) {
        this.showDropdown = this.showDropdown === userId ? null : userId;
      },
    },
  },
  components: {
    adminsidebar,
  },
};
</script>

<style>
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

.user-list {
  margin: 20px;
  margin-top: 20px;
  margin-left: 260px;
  max-width: 1200px;
  width: 100%;
  overflow-x: auto;
  align-items: center;
}

table {
  margin-top: 20px;
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #f5f5f5;
}

button {
  padding: 5px 10px;
  margin-right: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

.dropdown {
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown button {
  width: 100%;
  text-align: left;
}

.dropdown button:hover {
  background-color: #ddd;
}
</style>
../../components/adminsidebar.vue../../components/sidebar/adminsidebar.vue
