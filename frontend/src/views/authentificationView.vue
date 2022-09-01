<template>
  <div class="container">
    <div class="nav">
      <div class="tab" @click="activeTab = 'Signin'">Sign In</div>

      <div class="tab" @click="activeTab = 'Signup'">Sign Up</div>
    </div>
    <component @switchTab="switchTab(e)" :is="activeTab" />
  </div>
</template>

<script>
import Signin from "../components/SigninComponent.vue";
import Signup from "../components/SignupComponent.vue";

export default {
  name: "App",
  components: {
    Signin,
    Signup,
  },
  data() {
    return { activeTab: "Signin", email: "" };
  },
  methods: {
    switchTab() {
      this.activeTab = "Signin";
    },
  },
};
</script>

<style>
.nav {
  display: flex;
  justify-content: space-evenly;
  padding-bottom: 5%;
}
.tab {
  cursor: pointer;
}
.authform {
  border: 2px solid black;
  padding-bottom: 2%;
  margin: 2em auto;
  max-width: 750px;
}
.form-group {
  display: flex;
  flex-direction: column;
  padding-top: 2%;
  align-items: center;
  color: #fd2d01;
}
.input-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
button {
  margin-top: 2%;
}
@media screen and (max-width: 590px) {
  .authform {
    border: 2px solid black;
    padding-bottom: 2%;
    margin: 2em auto;
    max-width: 750px;
  }
  .form-group {
    display: flex;
    flex-direction: column;
    padding-top: 8%;
    align-items: center;
    color: #fd2d01;
  }
  .input-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  button {
    margin-top: 2%;
    margin-bottom: 4%;
  }
}
</style>
