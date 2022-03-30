<template>
  <div class="pagination">
    <ChevronRightWhite
      class="pagination__chevron pagination__chevron--left hover:cursor-pointer"
      :class="{ animateLeft: animateLeft }"
      @click="paginate({ back: true })"
      @mouseenter="() => animateLeftArrow(true)"
      @mouseleave="() => animateLeftArrow(false)"
    />
    <div class="flex w-96 justify-center">
      <div class="pagination__numbers" v-if="showPageOne">
        <div
          class="pagination__number"
          @click="$emit('pageChange', 1), paginate({ page: 1 })"
        >
          {{ 1 }}...
        </div>
      </div>
      <div class="pagination__numbers" v-for="page in pageNumbers">
        <div
          :key="page"
          class="pagination__number"
          @click="$emit('pageChange', page), paginate({ page: page })"
        >
          {{ page }}
        </div>
      </div>
      <div class="pagination__numbers">
        <div
          class="pagination__number"
          @click="
            $emit('pageChange', highestPageNum),
              paginate({ page: highestPageNum })
          "
        >
          ...{{ highestPageNum }}
        </div>
      </div>
    </div>

    <ChevronRightWhite
      class="pagination__chevron hover:cursor-pointer"
      :class="{ animateRight: animateRight }"
      @click="paginate({ forward: true })"
      @mouseenter="() => animateRightArrow(true)"
      @mouseleave="() => animateRightArrow(false)"
    />
  </div>
</template>

<script>
// vue imports
import { ref, watchEffect } from "vue";

// svg
import ChevronRightWhite from "../../svg/ChevronRightWhite.vue";

export default {
  components: {
    ChevronRightWhite,
  },
  setup(props, context) {
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

    // check on lowestPage change
    watchEffect(() => {
      console.log("lowestPageChanged... ", lowestPageNum.value);
      //context.emit("pageChange", lowestPageNum.value);
    });

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
      highestPageNum,
      showPageOne,
      paginate,
      animateLeftArrow,
      animateRightArrow,
      animateLeft,
      animateRight,
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

.animateLeft {
  animation: move-left 1s ease-out infinite;
}

.animateRight {
  animation: move-right 1s ease-out infinite;
}

@keyframes move-left {
  0% {
    transform: translateX(0px) rotate(180deg) scale(1.5);
  }
  100% {
    transform: translateX(-6px) rotate(180deg) scale(1.5);
  }
}

@keyframes move-right {
  0% {
    transform: translateX(0px) scale(1.6);
  }
  100% {
    transform: translateX(6px) scale(1.6);
  }
}
</style>
