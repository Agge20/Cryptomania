<template>
  <section class="market">
    <div class="market__header">
      <LargeHeader
        :text="{ data: 'THE MARKET' }"
        :theme="{ light: true }"
        class="rotate-90 vertical-column-header"
      />
    </div>
    <div class="market__table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Change</th>
            <th>High</th>
            <th>Low</th>
            <th>Marketcap</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="coinData in marketData">
            <MarketItem :coinData="coinData" />
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
// vue imports
import { ref } from "vue";

// components
import LargeHeader from "../../components/headers/LargeHeader.vue";
import MarketItem from "../../components/market/MarketItem.vue";

// hooks
import useGetMarketData from "../../hooks/get/market/useGetMarketData";

export default {
  components: {
    LargeHeader,
    MarketItem,
  },
  setup() {
    const { getMarketData, marketData, loading, error } = useGetMarketData();
    const PAGE = ref(1);

    getMarketData(PAGE.value);
    return {
      marketData,
    };
  },
};
</script>

<style lang="scss" scoped>
@import url("../../index.css");
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
    left-0 
    bg-transparent;
  }
  &__table {
    @apply bg-theme_white overflow-auto;
    table {
      @apply w-full table-fixed ml-2;
      tr:first-of-type {
        @apply text-left;
        // rank 
        th:last-child {
          @apply text-right pr-4;
        }
      }
      tr {
        @apply table-row;
        th:first-child {
          @apply pl-2;
        }
      }
      tr:first-of-type th:first-child {
        @apply bg-theme_white sticky left-0;
      }
    }
  }
}

@media screen and (max-width: 1400px) {
  /* column header */
  .market__header {
    @apply hidden;
  }
}
@media screen and (max-width: 800px) {
  tr:first-of-type th:first-child {
    @apply pl-0;
  }
}
</style>
