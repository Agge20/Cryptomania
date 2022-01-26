<template>
  <div class="bg-theme_gray flex">
    <!-- slider-wrapper -->
    <div
      class="tickertape flex justify-center items-center custom-shadow h-10 min-w-screen"
    >
      <!-- refetch coin data after tickertape has been stopped from hover -->
      <div
        :key="coin.symbol"
        v-if="coinData.length && showTickerslide"
        class="w-64 shrink-0 sm:border-r-2 last:border-r-0 border-neutral-300 inline-block p-2 font-montserrat font-medium"
        v-for="coin in coinData"
        @mouseleave="getCoins"
      >
        <TickerTapeCoin :coin="coin" />
      </div>
    </div>
  </div>
</template>

<script>
// hooks
import useGetTickerTapeCoins from "../../hooks/get/useGetTickerTapeCoins";

// vue imports
import { ref, watchEffect } from "vue";

// components
import TickerTapeCoin from "../tickertape/TickerTapeCoin.vue";

export default {
  components: { TickerTapeCoin },
  setup() {
    const { getCoins, coinData, loading } = useGetTickerTapeCoins();
    const showTickerslide = ref(true);

    getCoins();

    // fetch the data every 12 seconds
    setInterval(() => {
      getCoins();
    }, 35000);

    return { coinData, loading, showTickerslide, getCoins };
  },
};
</script>

<style scoped>
.tickertape {
  -webkit-animation: tickertape-animation 35s linear infinite 0s;
  -moz-animation: tickertape-animation 35s linear infinite 0s;
  -o-animation: tickertape-animation 35s linear infinite 0s;
  -ms-animation: tickertape-animation 35s linear infinite 0s;
  animation: tickertape-animation 35s linear infinite 0s;
}

.tickertape:hover {
  animation-play-state: paused;
  cursor: help;
}

@keyframes tickertape-animation {
  0% {
    -webkit-transform: translate3d(100vw, 0, 0);
    transform: translate3d(100vw, 0, 0);
    visibility: visible;
  }
  /* each ticker-tab is 256px wide */
  100% {
    -webkit-transform: translate3d(calc(-256px * 20), 0, 0);
    transform: translate3d(calc(-256px * 20), 0, 0);
  }
}
</style>
