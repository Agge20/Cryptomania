/*
import { ref } from "vue";

const useSortByMarketcap = () => {
    const returnData = ref([]);
    const sortedData = ref([]);
    let shouldAsc = true;

    const sortByMarketcap = (data, shouldChangeDesc) => {
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
*/

import { ref } from "vue";

const useSortByMarketcap = () => {
    const returnData = ref([]);
    const sortedData = ref([]);
    const desc = ref(false);
    const ascData = ref([]);
    const descData = ref([]);

    const sortByMarketcap = (data, shouldChangeDesc) => {
        // if user clicked name or it was a refetch
        shouldChangeDesc ? (desc.value = !desc.value) : null;
        sortedData.value = [...data];

        sortedData.value.sort((a, b) => {
            if (parseFloat(a.market_cap) >= parseFloat(b.market_cap)) {
                return 1;
            } else {
                return -1;
            }
        });
        descData.value = [...sortedData.value];
        ascData.value = [...descData.value].reverse();

        // if descending data
        if (desc.value) {
            returnData.value = descData.value;
        }
        // if ascending data
        else {
            returnData.value = ascData.value;
        }
    };
    return {
        returnData,
        sortByMarketcap,
    };
};

export default useSortByMarketcap;
