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
import putForm from "../components/PutformComponent.vue";

export default {
  name: "App",
  components: {
    postList,
    postForm,
    putForm,
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
@media screen and (min-width: 992px) {
  img {
    width: 20%;
  }
  #postText {
    width: 800px;
    height: 300px;
  }
  .post-list-item {
    display: flex;
    text-align: center;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: column;
    width: 220px;

    img {
      width: 200px;
      height: 150px;
      object-fit: contain;
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
}
@media screen and (max-width: 992px) and (min-width: 590px) {
  #postText {
    width: 580px;
    height: 250px;
  }
  .post-list-item {
    display: flex;
    align-items: center;
    text-align: center;
    flex-wrap: wrap;
    flex-direction: column;
    width: 220px;
    img {
      width: 195px;
      height: 150px;
      object-fit: contain;
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
}
</style>
