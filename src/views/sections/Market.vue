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
    <div class="w-full min-h-screen flex flex-col bg-theme_white">
      <div
        class="bg-theme_dark_purple text-theme_white text-4xl font-montserrat uppercase font-semibold pl-2 pb-0 pt-16 grid grid-cols-7 auto-cols-min"
      >
        <p class="market-col-header">Name</p>
        <p class="market-col-header">Price</p>
        <div class="flex flex-col items-start justify-start">
          <p class="market-col-header">Change</p>
          <span class="text-base">24H</span>
        </div>
        <div class="flex flex-col items-start justify-start">
          <p class="market-col-header">High</p>
          <span class="text-base">24H</span>
        </div>
        <div class="flex flex-col items-start justify-start">
          <p class="market-col-header">Low</p>
          <span class="text-base">24H</span>
        </div>
        <p class="market-col-header">Marketcap</p>
        <p class="market-col-header ml-auto mr-4">Rank</p>
      </div>
      <div v-for="coinData in marketData">
        <MarketItem :coinData="coinData" />
      </div>
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

@layer components {
  .market-col-header {
    @apply text-2xl leading-4;
  }
  @media screen and (max-width: 1400px) {
    /* column header */
    section > div:first-child {
      @apply hidden;
    }
  }
}
</style>
