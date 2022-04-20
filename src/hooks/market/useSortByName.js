import { ref } from "vue";

const useSortByName = () => {
    const returnData = ref([]);
    const sortedData = ref([]);
    const asc = ref(true);
    const ascData = ref([]);
    const descData = ref([]);

    const sortByName = (data, shouldChangeAsc = true) => {
        // on render save original data

        /*
            1 = original data
            2 = descending data
            3 = ascending data
        */
        sortedData.value = [...data];
        sortedData.value.sort((a, b) => a.name.localeCompare(b.name));
        ascData.value = [...sortedData.value];
        descData.value = [...ascData.value].reverse();

        if (shouldChangeAsc) {
            if (asc.value) {
                returnData.value = ascData.value;
                asc.value = false;
            } else {
                returnData.value = descData.value;
                asc.value = true;
            }
        }
    };
    return {
        returnData,
        sortByName,
    };
};

export default useSortByName;
