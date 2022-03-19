<template>
  <div class="coin">
    <div class="coin__image">
      <img :src="coin.image" :alt="coin.name" />
    </div>
    <span class="coin__symbol">{{ coin.symbol }}</span>
    <span class="coin__price">${{ coin.current_price }}</span>
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

<style lang="scss" scoped>
.coin {
  @apply flex justify-center items-center;
  &__image {
    @apply w-5 mr-1;
    img {
      @apply w-full;
    }
  }
  &__symbol {
    @apply mr-1 text-theme_white uppercase;
  }
  &__price {
    @apply mr-1 text-theme_white;
  }
}
</style>
