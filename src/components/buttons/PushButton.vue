<template>
  <div
    class="push-btn"
    :class="{ dark: theme.dark, light: theme.light }"
    @mouseenter="() => animateArrow(true)"
    @mouseleave="() => animateArrow(false)"
  >
    <div class="push-btn__text">
      <h4>
        {{ data.text }}
      </h4>
    </div>
    <div class="push-btn__icon">
      <ChevronRightLarge
        class="text-theme_dark_purple"
        :class="{ animate: animate }"
      />
    </div>
  </div>
</template>

<script>
// vue imports
import { ref } from "vue";

// svg
import ChevronRightLarge from "../../svg/ChevronRightLarge.vue";
export default {
  props: ["data", "theme"],
  components: {
    ChevronRightLarge,
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

<style scoped lang="scss">
.push-btn {
  @apply flex cursor-pointer transition hover:scale-105;
  &__text {
    @apply p-2 flex items-center justify-center border-8 border-theme_dark_purple;
    h4 {
      @apply text-5xl uppercase font-bold font-montserrat text-center;
    }
  }
  &__icon {
    @apply h-full bg-theme_gold w-20 flex items-center justify-center;
  }
}
/* btn colors */
.dark {
  @apply bg-theme_dark_purple text-theme_white;
}
.white {
  @apply bg-theme_white text-theme_dark_purple;
}
.animate {
  animation: move-right 1s ease-out infinite;
}

@media screen and (max-width: 480px) {
  /*  text wrapper */
  .push-btn__text {
    @apply p-0;
    h4 {
      @apply text-3xl;
    }
  }
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
