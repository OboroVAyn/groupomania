<template>
  <div class="wrapper">
    <div class="logo">
      <LogoComponent class="groupomania" />
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Lato;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #4e5166;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #4e5166;

    &.router-link-exact-active {
      color: #fd2d01;
    }
  }
}
.groupomania {
  width: 30%;
}
</style>

<script>
import LogoComponent from "./components/LogoComponent.vue";
export default {
  name: "App",
  components: {
    LogoComponent,
  },
};
</script>
