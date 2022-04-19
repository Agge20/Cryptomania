import { ref } from "vue";

const useSortByChange = () => {
    const returnData = ref([]);
    const sortedData = ref([]);
    const ascendingData = ref([]);
    const descendingData = ref([]);
    let originalData = [];
    let didRun = false;

    const sortByChange = (data, sortOrder) => {
        console.log("sort order in sort by change: ", sortOrder);
        // on render save original data
        if (!didRun) {
            didRun = true;
            originalData = [...data];
        }
        /*
            1 = original data
            2 = descending data
            3 = ascending data
        */
        sortedData.value = [...data];
        sortedData.value.sort((a, b) => {
            if (
                parseFloat(a.price_change_percentage_24h) >=
                parseFloat(b.price_change_percentage_24h)
            ) {
                return 1;
            } else {
                return -1;
            }
        });
        ascendingData.value = sortedData.value;
        descendingData.value = [...ascendingData.value].reverse();

        switch (sortOrder) {
            // original data
            case 1:
                returnData.value = originalData;
                break;
            case 2:
                returnData.value = descendingData.value;
                break;
            case 3:
                returnData.value = ascendingData.value;
                break;
        }
    };
    return {
        returnData,
        sortByChange,
    };
};

export default useSortByChange;
