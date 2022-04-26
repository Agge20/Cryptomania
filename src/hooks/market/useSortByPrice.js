import { ref } from "vue";

const useSortByPrice = () => {
    const returnData = ref([]);
    const sortedData = ref([]);
    const desc = ref(false);
    const ascData = ref([]);
    const descData = ref([]);

    const sortByPrice = (data, shouldChangeDesc) => {
        // if user clicked name or it was a refetch
        shouldChangeDesc ? (desc.value = !desc.value) : null;
        sortedData.value = [...data];

        sortedData.value.sort((a, b) => {
            if (parseFloat(a.current_price) <= parseFloat(b.current_price)) {
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
        sortByPrice,
    };
};

export default useSortByPrice;
