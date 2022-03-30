<template>
  <div class="pagination">
    <ChevronRightWhite
      v-if="lowestPageNum !== 1"
      class="pagination__chevron pagination__chevron--left hover:cursor-pointer"
      @click="
        paginate({ back: true }),
          $emit('pageChange', lowestPageNum),
          scrollToTop()
      "
    />
    <div class="flex justify-center">
      <div class="pagination__numbers" v-if="showPageOne">
        <div
          class="pagination__number"
          @click="$emit('pageChange', 1), paginate({ page: 1 })"
        >
          {{ 1 }}...
        </div>
      </div>
      <div
        class="pagination__numbers"
        v-for="(page, index) in pageNumbers"
        @click="scrollToTop()"
      >
        <div
          :key="page"
          class="pagination__number"
          :class="{ active: page === lowestPageNum }"
          @click="$emit('pageChange', page), paginate({ page: page })"
        >
          {{ page }}
        </div>
      </div>
      <div class="pagination__numbers">
        <div
          class="pagination__number"
          @click="
            paginate({ page: highestPageNum }),
              $emit('pageChange', highestPageNum),
              scrollToTop()
          "
        >
          ...{{ highestPageNum }}
        </div>
      </div>
    </div>

    <ChevronRightWhite
      v-if="lowestPageNum + 4 !== highestPageNum"
      class="pagination__chevron hover:cursor-pointer"
      @click="
        paginate({ forward: true }),
          $emit('pageChange', lowestPageNum),
          scrollToTop()
      "
    />
  </div>
</template>

<script>
// vue imports
import { ref } from "vue";

// svg
import ChevronRightWhite from "../../svg/ChevronRightWhite.vue";

export default {
  props: ["scrollToTop"],
  components: {
    ChevronRightWhite,
  },
  setup() {
    const highestPageNum = ref(120);
    const lowestPageNum = ref(1);
    const pageNumbers = ref([]);
    const showPageOne = ref(false);
    const animateLeft = ref(false);
    const animateRight = ref(false);

    // check if user had paginated before and set lowestPageNum to that if true
    if (localStorage.getItem("lowestPageNum")) {
      lowestPageNum.value = parseInt(localStorage.getItem("lowestPageNum"));
    }

    const paginate = (options) => {
      if (options.back) {
        if (lowestPageNum.value > 1) {
          lowestPageNum.value--;
          changePage();
        }
      } else if (options.forward) {
        if (lowestPageNum.value + 4 !== highestPageNum.value) {
          lowestPageNum.value++;
          changePage();
        }
      } else if (options.page === highestPageNum.value) {
        lowestPageNum.value = highestPageNum.value - 4;
        changePage();
      } else if (options.page + 4 > highestPageNum.value) {
        return;
      } else {
        lowestPageNum.value = options.page;
        changePage();
      }
    };

    const changePage = () => {
      localStorage.setItem("lowestPageNum", lowestPageNum.value);
      if (lowestPageNum.value > 10) {
        showPageOne.value = true;
      } else {
        showPageOne.value = false;
      }
      pageNumbers.value = [];

      for (let i = lowestPageNum.value; i < lowestPageNum.value + 4; i++) {
        pageNumbers.value.push(i);
      }
    };
    changePage();

    // arrow chevron animation
    const animateLeftArrow = (shouldAnimate) => {
      if (shouldAnimate) {
        animateLeft.value = true;
      } else {
        animateLeft.value = false;
      }
    };
    const animateRightArrow = (shouldAnimate) => {
      if (shouldAnimate) {
        animateRight.value = true;
      } else {
        animateRight.value = false;
      }
    };
    return {
      pageNumbers,
      lowestPageNum,
      highestPageNum,
      showPageOne,
      paginate,
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

// mobile pagination
@media screen and (max-width: 800px) {
  .pagination {
    max-width: 100vw;
    &__number {
      @apply bg-transparent text-theme_white m-0;
    }
    &__chevron {
      @apply m-2;
    }
  }
}
// vue dynamic classes
.active {
  @apply bg-theme_gold;
}
</style>
