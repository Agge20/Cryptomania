import { ref } from "vue";

const useSortByChange = () => {
    const returnData = ref([]);
    const sortedData = ref([]);
    const sortOrder = ref(2);
    let originalData = [];
    let didRun = false;

    const sortByChange = (data) => {
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

        switch (sortOrder.value) {
            // original data
            case 1:
                returnData.value = originalData;
                break;
            case 2:
                returnData.value = sortedData.value.reverse();
                break;
            case 3:
                returnData.value.reverse();
                break;
        }
        if (sortOrder.value < 3) {
            sortOrder.value++;
        } else {
            sortOrder.value = 1;
        }
    };
    return {
        returnData,
        sortByChange,
    };
};

export default useSortByChange;
