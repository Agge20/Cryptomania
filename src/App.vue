<template>
  <main data-server-rendered="true" class="flex flex-col">
    <Navigation />
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
}
</style>
