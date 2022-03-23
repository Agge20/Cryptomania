<template>
  <div class="pagination">
    <ChevronRightWhite class="pagination__chevron pagination__chevron--left" />
    <div class="pagination__numbers">
      <div class="pagination__number">1</div>
      <div class="pagination__number">2</div>
      <div class="pagination__number">3</div>
      <div class="pagination__number">4</div>
      <div class="pagination__number">5</div>
    </div>
    <ChevronRightWhite class="pagination__chevron" />
  </div>
</template>

<script>
// svg
import ChevronRightWhite from "../../svg/ChevronRightWhite.vue";

export default {
  components: {
    ChevronRightWhite,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  @apply flex items-center;
  &__chevron {
    @apply scale-150;
    &--left {
      @apply rotate-180;
    }
  }
  &__numbers {
    @apply flex;
  }
  &__number {
    @apply w-12 h-12 bg-theme_white rounded-sm m-2 flex items-center justify-center font-bold;
    &:hover {
      @apply bg-theme_gold cursor-pointer;
    }
  }
}
</style>
