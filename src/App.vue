<template>
  <Navigation />
  <div class="background-theme-color"></div>
  <div class="dark_purple_column"></div>
  <main
    data-server-rendered="true"
    class="flex flex-col mx-auto bg-theme_white"
  >
    <router-view />
  </main>
</template>

<script>
import Navigation from "./components/navigation/Navigation.vue";

export default {
  components: { Navigation },
};
</script>

<style scoped>
main {
  max-width: 2000px;
  overflow: hidden;
}
</style>
