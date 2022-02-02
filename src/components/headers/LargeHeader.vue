<template>
  <transition name="fade-in">
    <h2 class="header-lg mb-8">{{ text.data }}</h2>
  </transition>
</template>

<script>
export default {
  props: ["text", "animate"],
};
</script>

<style scoped>
.fade-in-enter-from {
  opacity: 0;
  transform: scale(0.6);
}
.fade-in-enter-to {
  opacity: 1;
  transform: scale(1);
}
.fade-in-enter-active {
  transition: all 2s ease;
}
</style>
