<template>
  <h2 class="header-lg mb-8" :class="{ dark: color.dark, white: color.white }">
    {{ text.data }}
  </h2>
</template>

<script>
export default {
  props: ["text", "animate", "color"],
};
</script>

<style scoped>
@import url("../../index.css");

@layer components {
  .dark {
    @apply text-theme_dark_purple;
  }
  .white {
    @apply text-theme_white;
  }
}
</style>
