<template>
  <div class="flex bg-theme_dark_purple">
    <Tickertape :initial="true" />
    <Tickertape :initial="false" />
  </div>
</template>

<script>
// components
import Tickertape from "./TickertapeCoin.vue";
export default {
  components: {
    Tickertape,
  },
};
</script>

<style scoped></style>
