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
    </div>
    <button>SUBMIT</button>
    <p v-if="errorMsg">{{ this.errorMsg }}</p>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "postForm",

  data() {
    return {
      postText: null,
      postImg: null,
      errorMsg: "",
    };
  },
  methods: {
    //method to get the correct file
    uploadFile(event) {
      if (event.target.files) {
        this.postImg = event.target.files[0];
      }
    },
    //method to create a new post with axios.post using data
    postform() {
      const user = JSON.parse(localStorage.getItem("user"));
      let data = new FormData();
      data.append("userId", user.userId);
      data.append("postText", this.postText);
      data.append("image", this.postImg);
      if (this.postText <= null) {
        alert("Veuillez remplir le champ");
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
