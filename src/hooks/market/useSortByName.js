import { ref } from "vue";

const useSortByName = () => {
    const returnData = ref([]);
    const sortedData = ref([]);
    const ascendingData = ref([]);
    const descendingData = ref([]);

    let originalData = [];
    let didRun = false;

    const sortByName = (data, sortOrder) => {
        console.log("sortOrder in sort by name: ", sortOrder);
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
        sortedData.value.sort((a, b) => a.name.localeCompare(b.name));
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
        sortByName,
    };
};

export default useSortByName;
