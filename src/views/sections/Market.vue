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
                        @sort-by-change="clickedSortByChange()"
                        @sort-by-name="clickedSortByName()"
                        @sort-by-marketcap="clickedSortByMarketcap()"
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
                    :currentPage="PAGE"
                />
            </div>
        </div>
    </section>
</template>

<script>
// vue imports
import { ref } from "vue";

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

        const PAGE = ref(1);
        const marketToScroll = ref("marketToScroll");
        // fetch marketData
        getMarketData(PAGE.value);

        // get market data every 30 seconds
        let dataTimer = setInterval(() => {
            getMarketData(PAGE.value);
        }, 3000000);

        // fetch new coin data on pagination change
        const pageChange = (pageNum) => {
            PAGE.value = pageNum;
            // reset timer
            clearInterval(dataTimer);
            dataTimer = setInterval(() => {
                getMarketData(PAGE.value);
            }, 30000);
            // get data now
            getMarketData(PAGE.value);
        };

        const scrollToTop = () => {
            let top = marketToScroll.value.offsetTop;
            top = top - 120;
            window.scrollTo(0, top);
        };
        const clickedSortByName = () => {
            if (marketData.value.length > 0) {
                sortByName(marketData.value);
                marketData.value = sortedNameData.value;
            }
        };

        const clickedSortByPrice = () => {
            if (marketData.value.length > 0) {
                sortByPrice(marketData.value);
                marketData.value = sortedPriceData.value;
            }
        };

        // sort the data by change 24h
        const clickedSortByChange = () => {
            if (marketData.value.length > 0) {
                sortByChange(marketData.value);
                marketData.value = sortedChangeData.value;
            }
        };

        const clickedSortByMarketcap = () => {
            if (marketData.value.length > 0) {
                sortByMarketcap(marketData.value);
                marketData.value = sortedMarketcapData.value;
            }
        };

        return {
            marketData,
            loading,
            error,
            marketToScroll,
            PAGE,
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
