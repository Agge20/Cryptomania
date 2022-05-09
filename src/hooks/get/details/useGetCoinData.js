import { ref } from "vue";

const useGetCoinData = () => {
    const coinData = ref([]);
    const error = ref(null);
    const loading = ref(null);

    // get data
    const getCoinData = async (id) => {
        loading.value = true;
        // this url returns 100 coins based on page
        const URL = `https://api.coingecko.com/api/v3/coins/${id}`;

        try {
            error.value = null;

            const res = await fetch(URL);
            const data = await res.json();
            if (res.ok) {
                loading.value = false;
                error.value = null;
                coinData.value = data;
            } else {
                loading.value = false;
                error.value = "We apologize as we could unfortunately not fetch the data.";
            }
        } catch (err) {
            loading.value = false;
            error.value = err;
        }
    };

    return {
        getCoinData,
        coinData,
        loading,
        error,
    };
};

export default useGetCoinData;
