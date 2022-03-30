<template>
  <div class="market__table">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>
            Change
            <span>24H</span>
          </th>
          <th>
            High
            <span>24H</span>
          </th>
          <th>
            Low
            <span>24H</span>
          </th>
          <th>Marketcap</th>
          <th>Rank</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in i"
          :class="{
            'bg-theme_light_gray': row % 2 == 0,
          }"
          class="animate-pulse"
        >
          <td colspan="7" class="opacity-0">loading...</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// vue imports
import { ref } from "vue";

// components
import MarketItem from "../components/market/MarketItem.vue";
import DotsLoader from "../components/loader/DotsLoader.vue";

export default {
  components: {
    MarketItem,
    DotsLoader,
  },
  setup() {
    const i = ref(100);

    return {
      i,
    };
  },
};
</script>

<style lang="scss" scoped>
table {
  min-width: 800px;
}

.market {
  @apply flex items-start;
  &__header {
    @apply w-96 
    flex 
    items-center
    justify-center
    whitespace-nowrap
    relative 
    left-0;
  }
  &__table {
    @apply bg-theme_white overflow-auto;
    table {
      @apply w-full table-fixed;
      thead {
        @apply pt-4 bg-theme_dark_purple;
        tr {
          @apply bg-theme_dark_purple 
          text-theme_white 
          h-24 text-2xl 
          uppercase 
          font-montserrat 
          align-middle;
          th {
            @apply py-1 align-top pt-8;
            span {
              @apply block text-base font-medium leading-3;
            }
          }
          th:first-child {
            @apply pl-6;
          }
        }
      }
      tbody {
        tr {
          @apply table-row h-16;
        }
        }
    }
  }
}
</style>
