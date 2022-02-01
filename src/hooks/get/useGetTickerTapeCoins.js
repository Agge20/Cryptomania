import { ref } from "vue";

const useGetTickerTapeCoins = () => {
  const coinsData = ref([]);
  const modifiedCoinData = ref([]);
  const error = ref(null);
  const loading = ref(false);

  // get data
  const getCoins = async () => {
    // this url returns 15 of highest ranking coins
    const URL =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false";
    // simulate delay

    try {
      // reset modified coin data
      modifiedCoinData.value = [];
      loading.value = true;
      error.value = null;

      const res = await fetch(URL);
      const data = await res.json();
      if (res.ok) {
        error.value = null;
        coinsData.value = data;

        for (let i = 0; i < coinsData.value.length; i++) {
          // cut the 24_hour_change_percentage to 2 decimals
          let priceChange = coinsData.value[i].price_change_percentage_24h;
          priceChange = priceChange.toString();
          let priceChangeSubstr = priceChange.substring(0, 4);

          modifiedCoinData.value.push({
            ...coinsData.value[i],
            price_change_percentage_24h: priceChangeSubstr,
          });
        }
        coinsData.value = modifiedCoinData.value;
        loading.value = false;
      } else {
        error.value =
          "We apologize as we could unfortunately not fetch the data.";
        loading.value = false;
      }
    } catch (err) {
      error.value = err;
      loading.value = false;
    }
  };

  return {
    getCoins,
    coinsData,
    loading,
    error,
  };
};

export default useGetTickerTapeCoins;
