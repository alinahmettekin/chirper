<template>
  <Header />
  <div v-if="this.currentUser.isAdmin == true" class="admin">
    <div class="admin_group">
      <h1 class="admin_group_title">Kullanıcılar</h1>
      <div class="admin_group_box">
        <div
          class="admin_group_box_content"
          :key="user.user_id"
          v-for="user in this.users"
        >
          <ul class="admin_group_box_content_list">
            <li class="admin_group_box_content_list_item">
              kullanıcı id:{{ user.user_id }}
            </li>
            <li class="admin_group_box_content_list_item">
              kullanıcı ismi:{{ user.user_name }}
            </li>
            <li class="admin_group_box_content_list_item">
              kullanıcı mail adresi:{{ user.user_mail }}
            </li>
            <li class="admin_group_box_content_list_item">
              kullanıcı parolası:{{ user.user_password }}
            </li>
            <li class="admin_group_box_content_list_item">
              kullanıcı yetkili mi ?:{{ user.user_admin }}
            </li>
          </ul>
          <div class="admin_group_box_content_process">
            <button :id="user.user_id" @click="deleteUser">sil</button>
            <button>düzenle</button>
            <button>kaydet</button>
          </div>
        </div>
      </div>
    </div>
    <div class="admin_group">
      <h1 class="admin_group_title">Gönderiler</h1>
      <div class="admin_group_box">
        <div
          class="admin_group_box_content"
          :key="post.user_id"
          v-for="post in this.posts"
        >
          <ul class="admin_group_box_content_list">
            <li class="admin_group_box_content_list_item">
              post id:{{ post.post_id }}
            </li>
            <li class="admin_group_box_content_list_item">
              gönderen id:{{ post.user_id }}
            </li>
            <li class="admin_group_box_content_list_item">
              gönderi tarihi:{{ post.post_datetime }}
            </li>
            <li class="admin_group_box_content_list_item">
              gönderi içeriği:{{ post.post_content }}
            </li>
            <li class="admin_group_box_content_list_item">
              gönderiyi gönderen:{{ post.user_name }}
            </li>
          </ul>
          <div class="admin_group_box_content_process">
            <button>sil</button>
            <button>düzenle</button>
            <button>kaydet</button>
          </div>
        </div>
      </div>
    </div>
    <div class="admin_group">
      <h1 class="admin_group_title">Yorumlar</h1>
      <div class="admin_group_box">
        <div
          class="admin_group_box_content"
          :key="comment.comment_id"
          v-for="comment in this.comments"
        >
          <ul class="admin_group_box_content_list">
            <li class="admin_group_box_content_list_item">
              Yorum id:{{ comment.comment_id }}
            </li>
            <li class="admin_group_box_content_list_item">
              Yorum hangi gönderiye yapılmış:{{ comment.comment_postid }}
            </li>
            <li class="admin_group_box_content_list_item">
              Yorum Tarihi:{{ comment.comment_datetime }}
            </li>
            <li class="admin_group_box_content_list_item">
              Yorum içeriği:{{ comment.comment_content }}
            </li>
            <li class="admin_group_box_content_list_item">
              Yorumu gönderen:{{ comment.comment_sender }}
            </li>
            <li
              class="admin_group_box_content_list_item"
              :id="comment.comment_id"
              :class="comment.comment_display ? 'green' : 'red'"
            >
              Yorum Aktif mi:{{ comment.comment_display }}
            </li>
          </ul>
          <div class="admin_group_box_content_process">
            <button>sil</button>
            <button
              :data="comment.comment_display"
              :id="comment.comment_id"
              @click="updateComment"
            >
              düzenle
            </button>
            <button>kaydet</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import header from "../components/header.vue";

export default {
  data() {
    return {};
  },
  components: {
    Header: header
  }
  ,
  computed: {
    ...mapState({
      currentUser: (state) => state.data.currentUser,
      posts: (state) => state.data.posts,
      comments: (state) => state.data.comments,
      users: (state) => state.data.users,
    }),
  },
  methods: {
    async deleteUser(e) {
      const userIdToDelete = e.target.id;
      axios
        .delete(`http://localhost:3000/users/${userIdToDelete}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(
            "Error:",
            error.response ? error.response.data : error.message
          );
        });
    },
    updateComment(e) {
      let dataValue = e.target.getAttribute("data");
      if (dataValue == "false") {
        dataValue = false;
      } else {
        dataValue = true;
      }
      console.log(dataValue);
      console.log(!dataValue);
      const commentIdToUpdate = e.target.id;
      const newCommentDisplayValue = !dataValue;
      axios
        .patch(
          `http://localhost:3000/update-comment-display/${commentIdToUpdate}`,
          { comment_display: newCommentDisplayValue }
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error updating comment display:", error.response.data);
        });
    },
  },
};
</script>
