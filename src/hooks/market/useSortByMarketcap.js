import { ref } from "vue";

const useSortByMarketcap = () => {
    const returnData = ref([]);
    const sortedData = ref([]);
    let shouldAsc = true;

    const sortByMarketcap = (data, changeShouldAsc = true) => {
        // determine if user has clicked the sort or its the re-render, if re-render keep original state
        if (!changeShouldAsc) {
            returnData.value = sortedData.value;
        } else {
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
        }
    };
    return {
        returnData,
        sortByMarketcap,
    };
};

export default useSortByMarketcap;
