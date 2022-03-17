<template>
  <td class="h-14 flex items-center p-2">
    <img class="h-2/3" :src="coinData.image" alt="" />
    <p class="ml-2 font-roboto font-medium">{{ coinData.name }}</p>
  </td>
  <td class="market-column-item font-roboto">{{ coinData.current_price }}</td>
  <td class="market-column-item font-roboto">
    {{ coinData.price_change_24h }}
  </td>
  <td class="market-column-item font-roboto">$45390</td>
  <td class="market-column-item font-roboto">$43390</td>
  <td class="market-column-item font-roboto">$837312729282</td>
  <td class="market-column-item font-roboto text-right pr-4">No. 1</td>
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
  td:first-child {
    @apply bg-theme_white sticky left-0;
  }
  td {
    @apply min-w-full;
  }

  .market-column-item {
    @apply my-auto;
  }
  @media screen and (max-width: 800px) {
    /*  news cards */
    td:first-child {
      @apply pl-0;
    }
  }
}
</style>
