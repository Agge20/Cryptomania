<template>
  <section class="flex items-start">
    <div
      class="w-96 flex items-center justify-center whitespace-nowrap relative left-0 bg-transparent"
    >
      <LargeHeader
        :text="{ data: 'THE MARKET' }"
        :theme="{ light: true }"
        class="rotate-90 vertical-column-header"
      />
    </div>
    <div class="bg-theme_white overflow-auto">
      <table class="w-full table-fixed ml-2">
        <thead>
          <tr class="text-left">
            <th>Name</th>
            <th>Price</th>
            <th>Change</th>
            <th>High</th>
            <th>Low</th>
            <th>Marketcap</th>
            <th class="text-right pr-4">Rank</th>
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

<style scoped>
@import url("../../index.css");
table {
  min-width: 800px;
}

/*  Tailwind */
@layer components {
  .market-col-header {
    @apply text-2xl leading-4;
  }
  th:first-child {
    @apply pl-2;
  }

  tr {
    @apply table-row;
  }
  tr:first-of-type th:first-child {
    @apply bg-theme_white sticky left-0;
  }
  @media screen and (max-width: 1400px) {
    /* column header */
    section > div:first-child {
      @apply hidden;
    }
  }
  @media screen and (max-width: 800px) {
    tr:first-of-type th:first-child {
      @apply pl-0;
    }
  }
}
</style>
