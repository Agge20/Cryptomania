import { ref } from "vue";

const useGetMarketData = () => {
  const marketData = ref([]);
  const modifiedMarketData = ref([]);
  const error = ref(null);
  const loading = ref(null);

  // get data
  const getMarketData = async (page) => {
    loading.value = true;
    // this url returns 100 coins based on page
    const URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${page}&sparkline=false`;

    try {
      // reset modified market data
      modifiedMarketData.value = [];
      error.value = null;

      const res = await fetch(URL);
      const data = await res.json();
      if (res.ok) {
        loading.value = false;
        error.value = null;
        marketData.value = data;

        for (let i = 0; i < marketData.value.length; i++) {
          // cut the 24_hour_change_percentage to 2 decimals
          let priceChange = marketData.value[i].price_change_percentage_24h;
          priceChange = priceChange.toString();
          let priceChangeSubstr = priceChange.substring(0, 4);

          modifiedMarketData.value.push({
            ...marketData.value[i],
            price_change_percentage_24h: priceChangeSubstr,
          });
        }
        marketData.value = modifiedMarketData.value;
        console.log("marketData: ", marketData.value);
      } else {
        loading.value = false;
        error.value =
          "We apologize as we could unfortunately not fetch the data.";
      }
    } catch (err) {
      loading.value = false;
      error.value = err;
    }
  };

  return {
    getMarketData,
    marketData,
    loading,
    error,
  };
};

export default useGetMarketData;
