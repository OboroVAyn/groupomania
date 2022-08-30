<template>
  <form @submit.prevent="postform">
    <div class="form-group">
      <label for="postText">Post Text</label>
      <textarea
        class="form-control"
        id="postText"
        rows="5"
        v-model="postText"
      ></textarea>
    </div>
    <div class="form-group">
      <input type="file" name="file" @change="uploadFile" />
      <img
        class="imagePreview"
        v-show="postImg != null"
        alt="imagePreview"
        :src="this.imagePreview"
      />
      <div v-show="postImg != null" @click="removing">DELETE</div>
    </div>
    <button>SUBMIT</button>
    <p v-if="errorMsg">{{ this.errorMsg }}</p>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "postForm",
  created() {
    this.getUser();
  },
  data() {
    return {
      postText: null,
      postImg: null,
      errorMsg: "",
      lastName: "",
      firstName: "",
      imagePreview: null,
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
          this.firstName = data.firstName;
          this.lastName = data.lastName;
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
    //method to get the correct file
    uploadFile(event) {
      if (event.target.files) {
        this.postImg = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(this.postImg);
        reader.onload = () => {
          this.imagePreview = reader.result;
        };
      }
    },
    removing() {
      return (this.postImg = null);
    },
    //method to create a new post with axios.post using data
    postform() {
      const user = JSON.parse(localStorage.getItem("user"));
      let data = new FormData();
      data.append("userId", user.userId);
      data.append("postText", this.postText);
      data.append("image", this.postImg);
      data.append("lastName", this.lastName);
      data.append("firstName", this.firstName);
      if (this.postText <= null) {
        alert("Veuillez remplir le champ postText");
      } else {
        axios
          .post("http://localhost:3000/api/post", data, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + user.token,
            },
          })
          .then((response) => {
            this.posts = response.data;
            this.$emit("switchTab", this.userId);
          })
          .catch(() => {
            this.errorMsg = "Error uploading data";
          });
      }
    },
  },
};
</script>

<style>
.imagePreview {
  max-width: 200px;
  max-height: 250px;
}
</style>
