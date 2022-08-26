<template>
  <form class="authform" @submit.prevent="signin">
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="formData.email" />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" id="password" v-model="formData.password" />
    </div>
    <button>SIGN IN</button>
    <p v-if="errorMsg">{{ this.errorMsg }}</p>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "signIn",

  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
      errorMsg: "",
    };
  },
  methods: {
    // Login with axios.post using formData
    signin() {
      axios
        .post("http://localhost:3000/api/auth/signin", this.formData)
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response.data));
          this.$router.push({ name: "postView" });
        })
        .catch(() => (this.errorMsg = "Utilisateur ou mot de passe incorrect"));
    },
  },
};
</script>
