<template>
  <div class="p-0 m-0 text-2xl grid grid-cols-7">
    <div class="h-14 flex items-center p-2 ml-2">
      <img class="h-2/3" :src="coinData.image" alt="" />
      <p class="ml-2 font-roboto font-medium">{{ coinData.name }}</p>
    </div>
    <p class="market-column-item">{{ coinData.current_price }}</p>
    <p class="market-column-item">{{ coinData.price_change_24h }}</p>
    <p class="market-column-item">$45390</p>
    <p class="market-column-item">$43390</p>
    <p class="market-column-item">$837312729282</p>
    <p class="market-column-item ml-auto mr-4">No. 1</p>
  </div>
</template>

<script>
export default {
  props: ["coinData"],
  setup() {
    return {};
  },
};
</script>

<style scoped>
@import url("../../index.css");

@layer components {
  .market-column-item {
    @apply my-auto;
  }
}
</style>
