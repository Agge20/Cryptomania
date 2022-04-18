import { ref } from "vue";

const useSortByMarketcap = () => {
    const returnData = ref([]);
    const sortedData = ref([]);
    let shouldAsc = true;

    const sortByMarketcap = (data) => {
        // on render save original data
        /*
            1 = original data
            2 = descending data
            3 = ascending data
        */
        if (shouldAsc) {
            sortedData.value = [...data];
            sortedData.value.sort((a, b) => {
                if (parseFloat(a.market_cap) >= parseFloat(b.market_cap)) {
                    return 1;
                } else {
                    return -1;
                }
            });
            returnData.value = sortedData.value;
            shouldAsc = false;
        } else {
            returnData.value.reverse();
            shouldAsc = true;
        }
    };
    return {
        returnData,
        sortByMarketcap,
    };
};

export default useSortByMarketcap;
