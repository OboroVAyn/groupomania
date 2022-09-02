<template>
  <form @submit.prevent="putForm">
    <div @click="returnHome()" class="back-putform">BACK</div>
    <div class="form-group">
      <label for="postText">Post Text</label>
      <textarea
        class="form-control"
        id="postText"
        rows="5"
        v-model="posts.postText"
      >
      </textarea>
    </div>
    <div class="form-group">
      <label class="hidden-label" for="file">File</label>
      <input type="file" name="file" @change="uploadFile" />
      <img
        class="imagePreview"
        v-show="this.posts.imageUrl != null"
        alt="imagePreview"
        :src="previewImage"
      />
    </div>
    <div v-show="this.posts.imageUrl != null" @click="removing">DELETE</div>
    <button>SUBMIT</button>
    <p v-if="errorMsg">{{ this.errorMsg }}</p>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "postForm",
  created() {
    this.getPostOne();
  },
  data() {
    return {
      posts: [],
      errorMsg: "",
      previewImage: "",
    };
  },
  methods: {
    returnHome() {
      this.$router.push({ path: "/post" });
    },
    // We return id from postlistcomponent in order to charge the page with the correct parameter
    chargePostId() {
      return this.$route.params.id;
    },
    // axios.get use with id as parameter to load the correct file
    getPostOne() {
      let id = this.chargePostId();
      const user = JSON.parse(localStorage.getItem("user"));
      axios
        .get("http://localhost:3000/api/post/" + id, {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        })
        .then((response) => {
          this.posts = response.data;
          this.previewImage = response.data.imageUrl;
        })
        .catch(() => {
          alert("Error retrieving data");
        });
    },
    // method to get the correct file
    uploadFile(event) {
      if (event.target.files) {
        this.posts.imageUrl = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(this.posts.imageUrl);
        fileReader.onload = () => {
          this.previewImage = fileReader.result;
        };
      }
    },
    removing() {
      this.posts.imageUrl = null;
      this.previewImage = null;
    },
    // Modifying post with axios.put using axios.put and verifying postText not null
    putForm() {
      let id = this.chargePostId();
      const user = JSON.parse(localStorage.getItem("user"));
      let data = new FormData();
      data.append("postText", this.posts.postText);
      data.append("image", this.posts.imageUrl);
      if (this.posts.postText <= null) {
        alert("Veuillez remplir ce champ");
      } else {
        axios
          .put("http://localhost:3000/api/post/" + id, data, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + user.token,
            },
          })
          .then((response) => {
            this.posts = response.data;
            this.$router.push({ name: "postView" });
          })
          .catch(() => {
            this.errorMsg = "Error updating data";
          });
      }
    },
  },
};
</script>

<style>
input[type="file"] {
  color: rgba(0, 0, 0, 0);
}
.imagePreview {
  max-width: 200px;
  max-height: 250px;
}
</style>
