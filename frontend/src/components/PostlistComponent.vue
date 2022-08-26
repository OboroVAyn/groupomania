<template>
  <div id="postList__wrapper">
    <p v-if="posts.length <= 0">No post to display!</p>
    <p class="list-title" v-if="getPost">THE POSTS</p>
    <div class="post-list" v-if="getPost">
      <div
        class="post-list-item"
        v-for="post of posts"
        :key="post._id"
        @click="getOnePost(post._id)"
      >
        <div>by: {{ post.lastName }} {{ post.firstName }}</div>
        <img
          alt="Daily's Post"
          :src="post.imageUrl"
          v-if="getOnePost(post.imageUrl)"
        />
        <div>{{ post.postText }}</div>
        <div>
          <button :class="{ isLiked: isLiked(post) }" @click="onLike(post)">
            Like ({{ post.likes }})
          </button>
        </div>
        <div
          v-if="post.userId === this.getUserIdConnected() || isAdmin"
          class="control-buttons"
        >
          <button @click="onModify(post._id)">MODIFY</button>
          <button @click="onDelete(post._id)">DELETE</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "postList",
  created() {
    this.getUser();
    this.getPost();
  },
  data() {
    return {
      posts: [],
      errorMsg: "",
      isAdmin: false,
    };
  },
  methods: {
    //method to obtain user info
    getUser() {
      const userId = this.getUserIdConnected();
      const token = this.getUserTokenConnected();
      axios
        .get("http://localhost:3000/api/auth/" + userId, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          this.isAdmin = data.isAdmin;
        })
        .catch(() => {
          this.errorMsg = "Error retrieving data";
        });
    },
    //method to return localstorage
    getUserConnected() {
      return JSON.parse(localStorage.getItem("user"));
    },
    //method to return userId from localstorage
    getUserIdConnected() {
      const user = this.getUserConnected();
      return user.userId;
    },
    //method to return token from localstorage
    getUserTokenConnected() {
      const token = this.getUserConnected();
      return token.token;
    },
    //method to get all post with axios.get
    getPost() {
      const token = this.getUserTokenConnected();
      axios
        .get("http://localhost:3000/api/post", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          this.posts = response.data;
        })
        .catch(() => {
          this.errorMsg = "Error retrieving data";
        });
    },
    //method to return one id
    getOnePost(id) {
      return id;
    },
    // method to delete a post with axios.delete
    onDelete(id) {
      const token = this.getUserTokenConnected();
      axios
        .delete("http://localhost:3000/api/post/" + id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then(() => {
          this.getPost();
        })
        .catch(() => {
          this.errorMsg = "Error deleting data";
        });
    },
    //Redirect to put page with id
    onModify(id) {
      this.$router.push({ path: "/post/" + id });
    },
    isLiked(post) {
      const userId = this.getUserIdConnected();

      return post.usersLiked.includes(userId);
    },
    // method to manage likes
    onLike(post) {
      const isLiked = this.isLiked(post);
      const token = this.getUserTokenConnected();
      const user = this.getUserIdConnected();

      axios
        .post(
          "http://localhost:3000/api/post/" + post._id + "/like",
          { userId: user, like: !isLiked },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((response) => {
          const data = response.data.post;
          post.likes = data.likes;
          post.usersLiked = data.usersLiked;
        });
    },
  },
};
</script>

<style lang="scss">
.isLiked {
  color: #ffd7d7;
}
.post-list {
  padding-top: 1%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: column;
  background-color: #4e5166;
}

.post-list-item {
  text-align: center;
  width: 220px;
  margin-bottom: 4%;
  background-color: white;
  img {
    max-width: 200px;
    max-height: 250px;
  }
  h4 {
    margin: 0;
    font-weight: 500;
  }
  p {
    margin: 0;
  }
  transition: all 0.1s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    box-shadow: 1px 1px 20px rgba(120, 120, 120, 0.3);
  }
}
button {
  background-color: #4e5166;
  color: white;
  cursor: pointer;
}
.list-title {
  text-align: center;
  margin: 2em auto;
  border: 2px solid #4e5166;
}
</style>
