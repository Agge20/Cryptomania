import { ref } from "vue";

const useGetTickerTapeCoins = () => {
  const coinData = ref([]);
  const modifiedCoinData = ref([]);
  const error = ref(null);
  const loading = ref(false);

  const getCoins = async (onlyPrice) => {
    // this url returns 10 of highest ranking coins
    const URL =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=9&page=1&sparkline=false";

    try {
      // reset coinData
      coinData.value = [];
      modifiedCoinData.value = [];
      loading.value = true;
      console.log("fetched coin-data");
      error.value = null;

      const res = await fetch(URL);
      const data = await res.json();
      if (res.ok) {
        error.value = null;
        loading.value = false;

        coinData.value = data;

        for (let i = 0; i < coinData.value.length; i++) {
          // cut the 24_hour_change_percentage to 2 decimals
          let priceChange = coinData.value[i].price_change_percentage_24h;
          priceChange = priceChange.toString();
          let priceChangeSubstr = priceChange.substring(0, 5);

          modifiedCoinData.value.push({
            ...coinData.value[i],
            price_change_percentage_24h: priceChangeSubstr,
          });
        }
        coinData.value = modifiedCoinData.value;
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
    coinData,
    loading,
  };
};

export default useGetTickerTapeCoins;
