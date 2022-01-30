<template>
  <div class="flex justify-center items-center">
    <div class="w-5 mr-1">
      <img :src="coin.image" :alt="coin.name" class="w-full" />
    </div>
    <span class="uppercase mr-1 text-theme_black">{{ coin.symbol }}</span>
    <span class="mr-1 text-theme_black">{{ coin.current_price }}$ </span>
    <span
      class="mr-1"
      :class="{
        green: coin.price_change_percentage_24h >= 0,
        red: coin.price_change_percentage_24h < 0,
      }"
    >
      <span v-if="coin.price_change_percentage_24h >= 0.1">+</span
      >{{ coin.price_change_percentage_24h }}%</span
    >
  </div>
</template>

<script>
export default {
  props: ["coin"],
};
</script>
