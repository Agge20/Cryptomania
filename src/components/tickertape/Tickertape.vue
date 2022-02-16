<template>
  <!-- slider-wrapper -->
  <div
    class="tickertape flex justify-center items-center custom-shadow h-10 min-w-screen"
  >
    <!-- refetch coin data after tickertape has been stopped from hover -->
    <div
      :key="coin.symbol"
      class="w-64 shrink-0 inline-block p-2 font-montserrat font-medium"
      v-for="coin in coinsData"
    >
      <TickertapeCoin :coin="coin" />
    </div>
  </div>
  <div class="mx-auto" v-if="error">
    <Error :msg="error" />
  </div>
</template>

<script>
// hooks
import useGetTickerTapeCoins from "../../hooks/get/useGetTickerTapeCoins";

// vue imports
import { ref, watchEffect } from "vue";

// components
import TickertapeCoin from "./TickertapeCoin.vue";
import DotsLoader from "../loader/DotsLoader.vue";
import Error from "../error/Error.vue";

export default {
  // initial prop-state decides if its the first tickertape that is rendered on page load
  props: ["initial"],
  components: { TickertapeCoin, DotsLoader, Error },
  setup({ initial }) {
    // interval milliseconds
    const SPEED = 45000;
    const { getCoins, coinsData, error } = useGetTickerTapeCoins();

    getCoins();
    setInterval(() => {
      getCoins();
    }, SPEED / 2);
    return { coinsData, error };
  },
};
</script>

<style scoped>
.tickertape {
  -webkit-animation: tickertape-animation 45s linear infinite 0s;
  -moz-animation: tickertape-animation 45s linear infinite 0s;
  -o-animation: tickertape-animation 45s linear infinite 0s;
  -ms-animation: tickertape-animation 45s linear infinite 0s;
  animation: tickertape-animation 45s linear infinite 0s;
}

@keyframes tickertape-animation {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    visibility: visible;
  }
  /* each ticker-tab is 256px wide */
  100% {
    -webkit-transform: translate3d(calc(-256px * 15), 0, 0);
    transform: translate3d(calc(-256px * 15), 0, 0);
  }
}
</style>
