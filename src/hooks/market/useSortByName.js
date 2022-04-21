import { ref } from "vue";

const useSortByName = () => {
    const returnData = ref([]);
    const sortedData = ref([]);
    const desc = ref(true);
    const ascData = ref([]);
    const descData = ref([]);
    const didRun = ref(false);

    const sortByName = (data, shouldChangeDesc) => {
        console.log(
            "sort by name ran...",
            "shouldChangeDesc? = ",
            shouldChangeDesc
        );
        // on render save original data

        /*
            1 = original data
            2 = descending data
            3 = ascending data
        */
        sortedData.value = [...data];

        sortedData.value.sort((a, b) => a.name.localeCompare(b.name));
        descData.value = [...sortedData.value];
        ascData.value = [...descData.value].reverse();
        // if descending data
        if (desc.value) {
            console.log("its now descending data...");

            returnData.value = descData.value;

            // if user clicked name or it was the re-fetch function
            if (shouldChangeDesc) {
                console.log("desc value is now: ", desc.value);

                desc.value = false;
            }
        }
        // if ascending data
        else {
            console.log("its now ascending data...");
            returnData.value = ascData.value;
            if (shouldChangeDesc) {
                console.log("asc value is now: ", desc.value);
                desc.value = true;
            }
        }
        didRun.value = true;
        console.log("returnData from useSortByName:... ", returnData.value);
    };
    return {
        returnData,
        sortByName,
    };
};

export default useSortByName;
