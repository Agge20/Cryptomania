<template>
  <div class="pagination">
    <ChevronRightWhite
      class="pagination__chevron pagination__chevron--left hover:cursor-pointer"
      @click="paginate(true)"
    />
    <div class="pagination__numbers" v-for="page in pageNumbers">
      <div
        :key="page"
        class="pagination__number"
        @click="$emit('pageChange', page), toggleActive(true)"
        :class="{ active: active }"
      >
        {{ page }}
      </div>
    </div>
    <div class="pagination__numbers">
      <div
        class="pagination__number"
        @click="
          $emit('pageChange', highestPageNum), toggleActive(true), lastPage()
        "
        :class="{ active: active }"
      >
        ...{{ highestPageNum }}
      </div>
    </div>
    <ChevronRightWhite
      class="pagination__chevron hover:cursor-pointer"
      @click="paginate(false)"
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
  setup() {
    const highestPageNum = ref(120);
    const lowestPageNum = ref(1);

    //

    const pageNumbers = ref([]);
    const active = ref(false);

    const paginate = (back) => {
      if (back) {
        console.log("back ran");
        if (lowestPageNum.value > 1) {
          lowestPageNum.value--;
        }
      } else {
        console.log("forward ran");
        if (lowestPageNum.value + 3 !== highestPageNum.value) {
          lowestPageNum.value++;
        }
      }
    };

    const lastPage = () => {
      console.log("last page ran");
      lowestPageNum.value = highestPageNum.value - 4;
      console.log("lowestPageNum now: ", lowestPageNum.value);
    };
    const toggleActive = (arg) => {
      console.log("toggle active ran");
      active.value = arg;
    };
    // on lowestPageNum change
    watchEffect(() => {
      pageNumbers.value = [];
      localStorage.setItem("lowestPageNum", lowestPageNum.value);
      console.log("watchEffect ran... lowestPageNum: ", lowestPageNum.value);
      for (let i = lowestPageNum.value; i < lowestPageNum.value + 4; i++) {
        pageNumbers.value.push(i);
      }
    });
    console.log("pageNumbers: ", pageNumbers.value);

    return {
      pageNumbers,
      active,
      highestPageNum,
      lastPage,
      paginate,
      toggleActive,
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
