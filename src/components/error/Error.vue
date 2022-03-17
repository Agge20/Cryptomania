<template>
  <div>
    <span>{{ msg }}</span>
  </div>
</template>

<script>
export default {
  props: ["msg"],
};
</script>

<style lang="scss" scoped>
div {
  @apply border-2 text-2xl text-theme_red;
}
</style>
