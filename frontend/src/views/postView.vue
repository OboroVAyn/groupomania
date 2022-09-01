<template>
  <div class="container">
    <div class="nav">
      <div class="tab" @click="activeTab = 'postList'">All Post</div>

      <div class="tab" @click="activeTab = 'postForm'">Add Post</div>

      <div class="tab" @click="logout()">Logout</div>
    </div>

    <component @switchTab="switchTab(u)" :is="activeTab" />
  </div>
</template>

<script>
import postList from "../components/PostlistComponent.vue";
import postForm from "../components/PostformComponent.vue";

export default {
  name: "App",
  components: {
    postList,
    postForm,
  },
  data() {
    return { activeTab: "postList", userId: "" };
  },
  methods: {
    switchTab() {
      this.activeTab = "postList";
    },
    logout() {
      localStorage.clear();
      this.$router.push({ name: "authentificationView" });
    },
  },
};
</script>

<style lang="scss">
.logo {
  background-color: #4e5166;
  padding-top: 4px;
}
.nav {
  display: flex;
  justify-content: space-evenly;
  padding-bottom: 5%;
}
.tab {
  cursor: pointer;
  border-bottom: 2px solid #4e5166;
}
.tab:hover {
  color: #ffd7d7;
}
</style>
