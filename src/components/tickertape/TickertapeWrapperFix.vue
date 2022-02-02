<template>
  <div class="flex bg-theme_dark_purple">
    <TickerTape :initial="true" />
    <TickerTape :initial="false" />
  </div>
</template>

<script>
// components
import TickerTape from "./TickerTape.vue";
export default {
  components: {
    TickerTape,
  },
};
</script>

<style scoped></style>
