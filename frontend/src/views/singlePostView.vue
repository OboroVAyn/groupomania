<template>
  <div class="container">
    <putFormComponent />
  </div>
</template>

<script>
import putFormComponent from "../components/PutformComponent.vue";

export default {
  name: "App",
  components: {
    putFormComponent,
  },
  data() {
    return {};
  },
  methods: {
    switchTab() {
      this.activeTab = "singlePost";
    },
  },
};
</script>
