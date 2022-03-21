<template>
  <td
    :class="{
      'bg-theme_light_gray': indexNum % 2 == 0,
      'bg-theme_white': indexNum % 2 != 0,
    }"
  >
    <img :src="coinData.image" :alt="coinData.name" />
    <p>
      {{ coinData.name }}
      <span>{{ coinData.symbol }}</span>
    </p>
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
    {{
      coinData.price_change_percentage_24h >= 0
        ? `+${coinData.price_change_percentage_24h}`
        : coinData.price_change_percentage_24h
    }}%
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
  props: ["coinData", "indexNum"],
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
td {
  @apply font-roboto;
}
td:first-child {
  @apply sticky left-0 h-14 flex items-center p-2 pl-6;
  img {
    @apply h-2/3;
  }
  p {
    @apply ml-2 font-bold;
    span {
      @apply uppercase block text-base;
    }
  }
}
// rank
td:last-child {
  @apply text-center font-medium;
}
.col-item {
  @apply my-auto;
}

@media screen and (max-width: 800px) {
  td:first-child {
    @apply pl-2;
    width: 120px;
    height: auto;
    img {
      max-width: 26.66px;
    }
  }
}
</style>
