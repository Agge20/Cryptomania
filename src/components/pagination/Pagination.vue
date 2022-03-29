<template>
  <div class="pagination">
    <ChevronRightWhite class="pagination__chevron pagination__chevron--left" />
    <div class="pagination__numbers" v-for="page in pageNumbers">
      <div
        :key="page"
        class="pagination__number"
        @click="$emit('pageChange', page)"
      >
        {{ page }}
      </div>
    </div>
    <ChevronRightWhite class="pagination__chevron" />
  </div>
</template>

<script>
// vue imports
import { ref } from "vue";

// svg
import ChevronRightWhite from "../../svg/ChevronRightWhite.vue";

export default {
  components: {
    ChevronRightWhite,
  },
  setup() {
    const pageNumbers = ref([1, 2, 3, 4, 5]);
    return {
      pageNumbers,
    };
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
