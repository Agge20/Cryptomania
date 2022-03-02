<template>
  <h2
    class="header-lg mb-8 mx-2"
    :class="{ dark: theme.dark, light: theme.light }"
  >
    {{ text.data }}
  </h2>
</template>

<script>
export default {
  props: ["text", "animate", "theme"],
};
</script>

<style scoped>
@import url("../../index.css");

@layer components {
  .dark {
    @apply text-theme_dark_purple;
  }
  .light {
    @apply text-theme_white;
  }
}
</style>
