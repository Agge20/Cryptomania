<template>
  <div
    class="flex flex-wrap justify-center items-center custom-shadow h-10 bg-theme_gray overflow-hidden min-w-screen"
  >
    <transition-group name="tickerTape">
      <div
        :key="coin.symbol"
        v-if="coinData.length"
        class="sm:border-r-2 last:border-r-0 border-neutral-300 flex justify-start items-center p-2 w-auto font-montserrat font-medium"
        v-for="coin in coinData"
      >
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
      </div>
    </transition-group>
  </div>
</template>

<script>
// hooks
import useGetTickerTapeCoins from "../hooks/get/useGetTickerTapeCoins";

// vue imports
import { ref, watchEffect } from "vue";

export default {
  components: {},
  setup() {
    const { getCoins, coinData, loading } = useGetTickerTapeCoins();

    getCoins();

    // fetch the data every 5 seconds
    setInterval(() => {
      getCoins();
    }, 5000);

    return { coinData, loading };
  },
};
</script>

<style scoped>
.tickerTape-enter-from {
  background-color: #cccccc !important;
}

.tickerTape-enter-active {
  transition: all 2s ease;
}
</style>
