<template>
  <NewsSnapshot />
  <Market />
  </template>

<script>
// sections
import NewsSnapshot from "../views/sections/NewsSnapshot.vue";
import Market from "../views/sections/Market.vue";

export default {
  components: {
    NewsSnapshot,
    Market,
  },
  setup() {
    return {};
  },
};
</script>

<style scoped></style>
