<template>
    <section class="market" ref="marketToScroll">
        <div class="market__header">
            <LargeHeader
                :text="{ data: 'THE MARKET' }"
                :theme="{ dark: true }"
                class="rotate-90 vertical-column-header"
            />
        </div>
        <div>
            <Error :msg="error" />
        </div>
        <div v-if="loading">
            <MarketSkeleton />
        </div>
        <div class="market__content">
            <div v-if="!loading" class="market__table">
                <table>
                    <MarketHead
                        @sort-by-name="
                            clickedSortByName(true), resetSortOrders('name')
                        "
                        @sort-by-change="
                            clickedSortByChange(true), resetSortOrders('change')
                        "
                        @sort-by-marketcap="
                            clickedSortByMarketcap(),
                                resetSortOrders('marketcap')
                        "
                        @sort-by-price="clickedSortByPrice()"
                    />
                    <tbody>
                        <tr
                            v-for="(coinData, index) in marketData"
                            :class="{
                                'bg-theme_light_gray': index % 2 == 0,
                                'animate-pulse': loading,
                            }"
                        >
                            <MarketItem
                                :coinData="coinData"
                                :key="index"
                                :indexNum="index"
                            />
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="market__pagination-wrapper">
                <Pagination
                    @page-change="pageChange"
                    :scrollToTop="scrollToTop"
                    :currentpage="page"
                />
            </div>
        </div>
    </section>
</template>

<script>
// vue imports
import { ref, watchEffect } from "vue";

// components
import LargeHeader from "../../components/headers/LargeHeader.vue";
import MarketItem from "../../components/market/MarketItem.vue";
import MarketHead from "../../components/market/MarketHead.vue";
import Pagination from "../../components/pagination/Pagination.vue";
import Error from "../../components/error/Error.vue";

// hooks
import useGetMarketData from "../../hooks/get/market/useGetMarketData";
import useSortByChange from "../../hooks/market/useSortByChange";
import useSortByName from "../../hooks/market/useSortByName";
import useSortByMarketcap from "../../hooks/market/useSortByMarketcap";
import useSortByPrice from "../../hooks/market/useSortByPrice";
// skeletons
import MarketSkeleton from "../../skeletons/MarketSkeleton.vue";

export default {
    components: {
        LargeHeader,
        MarketItem,
        MarketHead,
        MarketSkeleton,
        Pagination,
        Error,
    },
    setup() {
        // hooks
        const { getMarketData, marketData, loading, error } =
            useGetMarketData();
        const { returnData: sortedNameData, sortByName } = useSortByName();
        const { returnData: sortedPriceData, sortByPrice } = useSortByPrice();
        const { returnData: sortedChangeData, sortByChange } =
            useSortByChange();
        const { returnData: sortedMarketcapData, sortByMarketcap } =
            useSortByMarketcap();

        const savedData = ref([]);
        const page = ref(1);
        const sortOrderName = ref(1);
        const sortOrderChange = ref(1);
        const sortOrderPrice = ref(1);
        const initialData = ref([]);
        const marketToScroll = ref("marketToScroll");
        const dataView = ref({});
        const didRun = ref(false);
        // fetch marketData

        const saveInitialData = async () => {
            console.log("save initial data ran...");
            await getMarketData(page.value);
            initialData.value = [...marketData.value];
            console.log("initial data: ", initialData.value);
        };

        const resetSortOrders = (option) => {
            console.log("reset sort order ran...");
            if (option === "name") {
                sortOrderChange.value = 0;
                sortOrderPrice.value = 0;
            } else if (option === "price") {
                sortOrderChange.value = 0;
                sortOrderName.value = 0;
            } else if (option === "change") {
                sortOrderName.value = 0;
                sortOrderPrice.value = 0;
            } else {
                sortOrderName.value = 0;
                sortOrderPrice.value = 0;
                sortOrderChange.value = 0;
            }
        };

        if (!didRun.value) {
            saveInitialData();
            didRun.value = true;
        }
        // get market data every 30 seconds
        let dataTimer = setInterval(() => {
            console.log("dataView value: ", dataView.value.option);
            // set new fresh initial data

            async () => {
                await saveInitialData();
            };
            switch (dataView.value.option) {
                case "name":
                    clickedSortByName(false);
                    break;
                case "price":
                    clickedSortByName();
                    break;
                case "change":
                    clickedSortByChange(false);
                    break;
                case "marketcap":
                    clickedSortByMarketcap(false);
                    break;
            }
        }, 10000);

        // fetch new coin data on pagination change
        const pageChange = (pageNum) => {
            console.log("page CHANGE RAN...");
            page.value = pageNum;
            // reset timer
            clearInterval(dataTimer);
            dataTimer = setInterval(() => {
                getMarketData(page.value);
            }, 30000);
            // get data now
            getMarketData(page.value);
        };
        // scroll to top of market when paginated to another page
        const scrollToTop = () => {
            let top = marketToScroll.value.offsetTop;
            top = top - 120;
            window.scrollTo(0, top);
        };

        /* sorting hooks */
        const clickedSortByName = (increaseSortOrder) => {
            dataView.value.option = "name";
            if (increaseSortOrder) {
                if (sortOrderName.value < 3) {
                    sortOrderName.value++;
                } else {
                    sortOrderName.value = 1;
                }
            }

            if (marketData.value.length > 0) {
                sortByName(initialData.value, sortOrderName.value);
                marketData.value = [...sortedNameData.value];
            }
        };

        const clickedSortByPrice = () => {
            dataView.value.option = "price";
            if (initialData.value.length > 0) {
                sortByPrice(initialData.value);
                marketData.value = sortedPriceData.value;
            }
        };

        // sort the data by change 24h
        const clickedSortByChange = (increaseSortOrder) => {
            dataView.value.option = "change";
            if (increaseSortOrder) {
                if (sortOrderChange.value < 3) {
                    sortOrderChange.value++;
                } else {
                    sortOrderChange.value = 1;
                }
            }
            if (initialData.value.length > 0) {
                sortByChange(initialData.value, sortOrderChange.value);
                marketData.value = sortedChangeData.value;
            }
        };

        const clickedSortByMarketcap = (changeShouldAsc) => {
            dataView.value.option = "marketcap";
            if (initialData.value.length > 0) {
                sortByMarketcap(initialData.value, changeShouldAsc);
                marketData.value = sortedMarketcapData.value;
            }
        };

        return {
            marketData,
            loading,
            error,
            marketToScroll,
            page,
            dataView,
            scrollToTop,
            pageChange,
            resetSortOrders,
            clickedSortByName,
            clickedSortByPrice,
            clickedSortByChange,
            clickedSortByMarketcap,
        };
    },
};
</script>

<style lang="scss" scoped>
.market {
    @apply flex items-start;
    &__header {
        @apply w-36
        absolute
        left-0
        mr-0
        flex 
        items-center
        justify-center
        whitespace-nowrap;
    }
    &__content {
        @apply flex flex-col overflow-auto;
    }
    &__table {
        @apply bg-theme_white overflow-auto;
        table {
            @apply w-full table-fixed;
            min-width: 800px;

            tr {
                @apply table-row;
            }

            tbody {
                tr {
                    @apply hover:opacity-80 cursor-pointer transition hover:scale-x-99 duration-100;
                }
            }
        }
    }
    &__pagination-wrapper {
        @apply w-full flex justify-center items-center bg-theme_dark_purple p-6;
    }
}

@media screen and (max-width: 1400px) {
    /* column header */
    .market__header {
        @apply hidden;
    }
}

@media screen and (max-width: 800px) {
    .market__table {
        table {
            @apply table-auto;
        }
    }
}
</style>
