<template>
  <section class="flex items-center">
    <div
      class="w-96 flex items-center justify-center whitespace-nowrap relative left-0 bg-transparent"
    >
      <LargeHeader
        :text="{ data: 'THE MARKET' }"
        :theme="{ light: true }"
        class="rotate-90"
      />
    </div>
    <div
      class="border-2 border-theme_dark_purple w-full min-h-screen flex flex-col bg-theme_white"
    >
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
        <p class="market-col-header">Rank</p>
      </div>

      <MarketItem />
    </div>
  </section>
</template>

<script>
// components
import LargeHeader from "../../components/headers/LargeHeader.vue";
import MarketItem from "../../components/market/MarketItem.vue";

export default {
  components: {
    LargeHeader,
    MarketItem,
  },
  setup() {},
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
