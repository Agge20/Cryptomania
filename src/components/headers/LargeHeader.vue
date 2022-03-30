<template>
  <h2 class="header-lg" :class="{ dark: theme.dark, light: theme.light }">
    {{ text.data }}
  </h2>
</template>

<script>
export default {
  props: ["text", "animate", "theme"],
};
</script>

<style lang="scss" scoped>
h2 {
  @apply mb-8 mx-2;
}
.dark {
  @apply text-theme_dark_purple;
}
.light {
  @apply text-theme_white;
}
</style>
