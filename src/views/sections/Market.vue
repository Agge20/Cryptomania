<template>
    <section class="market" ref="marketToScroll">
        <div class="market__header">
            <LargeHeader
                :text="{ data: 'THE MARKET' }"
                :theme="{ dark: true }"
                class="rotate-90 vertical-column-header mt-0"
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
                        @sort-by-name="clickedSortByName(true)"
                        @sort-by-price="clickedSortByPrice(true)"
                        @sort-by-change="clickedSortByChange(true)"
                        @sort-by-marketcap="clickedSortByMarketcap(true)"
                    />
                    <tbody>
                        <tr
                            v-for="(coinData, index) in marketData"
                            :class="{
                                'bg-theme_light_gray': index % 2 == 0,
                                'animate-pulse': loading,
                            }"
                            @click="goToCoin(coinData.id)"
                        >
                            <MarketItem :coinData="coinData" :key="index" :indexNum="index" />
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="market__pagination-wrapper">
                <Pagination
                    @page-change="pageChange"
                    :scrollToTop="scrollToTop"
                    :currentPage="page"
                />
            </div>
        </div>
    </section>
</template>

<script>
// vue imports
import { ref } from "vue";
import { useRouter } from "vue-router";

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
        const { getMarketData, marketData, loading, error } = useGetMarketData();
        const { returnData: sortedNameData, sortByName } = useSortByName();
        const { returnData: sortedPriceData, sortByPrice } = useSortByPrice();
        const { returnData: sortedChangeData, sortByChange } = useSortByChange();
        const { returnData: sortedMarketcapData, sortByMarketcap } = useSortByMarketcap();

        const page = ref(1);
        const marketToScroll = ref("marketToScroll");
        const dataView = ref({});
        const didRun = ref(false);
        const router = useRouter();

        function goToCoin(id) {
            router.push({
                path: `/details/${id}`,
            });
        }

        // fetch marketData
        if (localStorage.getItem("lowestPageNum")) {
            page.value = parseInt(localStorage.getItem("lowestPageNum"));
        }

        if (!didRun.value) {
            getMarketData(page.value);
        }
        // get market data every 30 seconds
        let dataTimer = setInterval(async () => {
            await getMarketData(page.value);

            console.log("dataView value option: ", dataView.value.option);
            switch (dataView.value.option) {
                case "name":
                    clickedSortByName(false);
                    break;
                case "price":
                    clickedSortByPrice(false);
                    break;
                case "change":
                    clickedSortByChange(false);
                    break;
                case "marketcap":
                    clickedSortByMarketcap(false);
                    break;
            }
        }, 30000);

        // fetch new coin data on pagination change
        const pageChange = (pageNum) => {
            page.value = pageNum;
            // reset timer
            clearInterval(dataTimer);
            dataTimer = setInterval(() => {
                getMarketData(page.value);
            }, 30000);
            // get data now
            getMarketData(page.value);
        };

        const scrollToTop = () => {
            let top = marketToScroll.value.offsetTop;
            top = top - 120;
            window.scrollTo(0, top);
        };

        const clickedSortByName = (shouldChangeDesc) => {
            dataView.value.option = "name";
            if (marketData.value.length > 0) {
                sortByName(marketData.value, shouldChangeDesc);
                marketData.value = sortedNameData.value;
            }
        };

        const clickedSortByPrice = (shouldChangeDesc) => {
            dataView.value.option = "price";
            if (marketData.value.length > 0) {
                sortByPrice(marketData.value, shouldChangeDesc);
                marketData.value = sortedPriceData.value;
            }
        };

        // sort the data by change 24h
        const clickedSortByChange = (shouldChangeDesc) => {
            dataView.value.option = "change";
            if (marketData.value.length > 0) {
                sortByChange(marketData.value, shouldChangeDesc);
                marketData.value = sortedChangeData.value;
            }
        };

        const clickedSortByMarketcap = (shouldChangeDesc) => {
            dataView.value.option = "marketcap";

            if (marketData.value.length > 0) {
                sortByMarketcap(marketData.value, shouldChangeDesc);
                marketData.value = sortedMarketcapData.value;
            }
        };

        return {
            marketData,
            loading,
            error,
            marketToScroll,
            page,
            goToCoin,
            scrollToTop,
            pageChange,
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
    @apply flex items-start w-full;
    &__header {
        @apply w-36
        absolute
        left-0
        mr-0
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
