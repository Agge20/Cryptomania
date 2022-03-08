<template>
  <Navigation />
  <main data-server-rendered="true" class="flex flex-col mx-auto">
    <router-view />
  </main>
</template>

<script>
import Navigation from "./components/navigation/Navigation.vue";

export default {
  components: { Navigation },
};
</script>

<style>
@import "./index.css";

main {
  max-width: 2000px;
  overflow: hidden;
  position: relative;
}

@media screen and (min-width: 2250px) {
  /* Link button wrapper */
  main {
    left: -192px;
  }
}
</style>
