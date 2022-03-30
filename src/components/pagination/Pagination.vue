<template>
  <div class="pagination">
    <ChevronRightWhite
      class="pagination__chevron pagination__chevron--left hover:cursor-pointer"
      @click="paginate({ back: true })"
    />
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
    <ChevronRightWhite
      class="pagination__chevron hover:cursor-pointer"
      @click="paginate({ forward: true })"
    />
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
    const highestPageNum = ref(120);
    const lowestPageNum = ref(1);
    const pageNumbers = ref([]);

    if (localStorage.getItem("lowestPageNum")) {
      lowestPageNum.value = parseInt(localStorage.getItem("lowestPageNum"));
    }

    console.log("re-render...");

    const paginate = (options) => {
      if (options.back) {
        console.log("back ran");
        if (lowestPageNum.value > 1) {
          lowestPageNum.value--;
          changePage();
        }
      } else if (options.forward) {
        console.log("forward ran");
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
      console.log("lowestPageNum: ", lowestPageNum.value);
      console.log("localhost set...");
      localStorage.setItem("lowestPageNum", lowestPageNum.value);
      pageNumbers.value = [];

      for (let i = lowestPageNum.value; i < lowestPageNum.value + 4; i++) {
        pageNumbers.value.push(i);
      }
    };

    changePage();
    console.log("pageNumbers: ", pageNumbers.value);

    return {
      pageNumbers,
      highestPageNum,
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
</style>
