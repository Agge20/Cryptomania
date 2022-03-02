<template>
  <router-link
    @mouseenter="() => animateArrow(true)"
    @mouseleave="() => animateArrow(false)"
    to="/"
    class="flex items-center justify-center my-4 py-2 px-4 bg-theme_gold text-theme_dark_purple rounded-lg font-bold font-montserrat text-xl transition hover:scale-105 duration-150"
    >{{ text.data }}<ChevronRight :class="{ animate: animate }"
  /></router-link>
</template>

<script>
// vue imports
import { ref } from "vue";

// svg
import ChevronRight from "../../svg/ChevronRight.vue";

export default {
  props: ["text"],
  components: {
    ChevronRight,
  },
  setup() {
    const animate = ref(false);
    const animateArrow = (shouldAnimate) => {
      if (shouldAnimate) {
        animate.value = true;
      } else {
        animate.value = false;
      }
    };
    return { animate, animateArrow };
  },
};
</script>

<style scoped>
.animate {
  animation: move-right 1s ease-out infinite;
}
@keyframes move-right {
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(6px);
  }
}
</style>
