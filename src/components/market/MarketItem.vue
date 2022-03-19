<template>
  <td>
    <img :src="coinData.image" :alt="coinData.name" />
    <p>{{ coinData.name }}</p>
  </td>
  <td
    class="col-item"
    :class="{
      green: coinData.price_change_percentage_24h >= 0,
      red: coinData.price_change_percentage_24h < 0,
    }"
  >
    ${{ coinData.current_price }}
  </td>
  <td
    class="col-item"
    :class="{
      green: coinData.price_change_percentage_24h >= 0,
      red: coinData.price_change_percentage_24h < 0,
    }"
  >
    {{ coinData.price_change_percentage_24h }}%
  </td>
  <td class="col-item">${{ coinData.high_24h }}</td>
  <td class="col-item">${{ coinData.low_24h }}</td>
  <td class="col-item">${{ coinData.market_cap }}</td>
  <td class="col-item">
    {{ coinData.market_cap_rank }}
  </td>
</template>

<script>
export default {
  props: ["coinData"],
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
td {
  @apply min-w-full font-roboto;
}
td:first-child {
  @apply bg-theme_white sticky left-0 h-14 flex items-center p-2;
  img {
    @apply h-2/3;
  }
  p {
    @apply ml-2 font-medium;
  }
}
// rank
td:last-child {
  @apply text-left font-medium;
}
.col-item {
  @apply my-auto;
}

@media screen and (max-width: 800px) {
  /*  news cards */
  td:first-child {
    @apply pl-0;
  }
}
@media screen and (max-width: 1200px) {
  // rank
  td:last-child {
    @apply text-right pr-12;
  }
}
</style>
