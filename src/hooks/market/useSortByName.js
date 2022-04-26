import { ref } from "vue";

const useSortByName = () => {
    const returnData = ref([]);
    const sortedData = ref([]);
    const desc = ref(false);
    const ascData = ref([]);
    const descData = ref([]);

    const sortByName = (data, shouldChangeDesc) => {
        // if user clicked name or it was a refetch
        shouldChangeDesc ? (desc.value = !desc.value) : null;
        sortedData.value = [...data];

        sortedData.value.sort((a, b) => a.name.localeCompare(b.name));
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
        sortByName,
    };
};

export default useSortByName;
