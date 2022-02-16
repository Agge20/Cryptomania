<template>
  <div
    class="animate-pulse newscard p-4 w-72 rounded-md h-auto flex justify-center items-center bg-theme_gray text-theme_white xl:w-96"
  >
    <RollerLoader :color="{ dark: true }" />
  </div>
</template>

<script>
// loaders
import RollerLoader from "../../loader/RollerLoader.vue";

export default {
  components: {
    RollerLoader,
  },
};
</script>

<style scoped>
/* On screens that are 600px or more */
@media screen and (min-width: 1536px) {
  .newscard {
    min-width: 435px;
    min-height: 416px;
  }
  .fake-img {
    min-height: 268px;
  }
}
</style>
