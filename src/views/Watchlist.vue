<template>
    <Error v-if="error" :msg="error" />
    <RollerLoader v-if="loading" class="m-auto" :color="{ dark: true }" />
    <section v-if="!loading" class="watchlist">
        <LargeHeader :text="{ data: 'Watchlist' }" :theme="{ dark: true }" />
        <div class="watchlist__content">
            <div class="watchlist__table">
                <table>
                    <MarketHead
                        @sort-by-name="clickedSortByName(true)"
                        @sort-by-price="clickedSortByPrice(true)"
                        @sort-by-change="clickedSortByChange(true)"
                        @sort-by-marketcap="clickedSortByMarketcap(true)"
                    />
                    <tbody>
                        <tr
                            v-for="(coinData, index) in favoritesData"
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
        </div>
    </section>
</template>

<script>
// vue imports
import { ref } from "vue";
import { useRouter } from "vue-router";

// components
import LargeHeader from "../components/headers/LargeHeader.vue";
import MarketItem from "../components/market/MarketItem.vue";
import MarketHead from "../components/market/MarketHead.vue";
import Error from "../components/error/Error.vue";
import RollerLoader from "../components/loader/RollerLoader.vue";

// hooks
import useGetUserFavorites from "../hooks/get/user/useGetUserFavorites";
import useSortByChange from "../hooks/market/useSortByChange";
import useSortByName from "../hooks/market/useSortByName";
import useSortByMarketcap from "../hooks/market/useSortByMarketcap";
import useSortByPrice from "../hooks/market/useSortByPrice";

export default {
    components: {
        LargeHeader,
        MarketItem,
        MarketHead,
        Error,
        RollerLoader,
    },
    setup() {
        // hooks
        const { getUserFavorites, favoritesData, error, loading } = useGetUserFavorites();
        const { returnData: sortedNameData, sortByName } = useSortByName();
        const { returnData: sortedPriceData, sortByPrice } = useSortByPrice();
        const { returnData: sortedChangeData, sortByChange } = useSortByChange();
        const { returnData: sortedMarketcapData, sortByMarketcap } = useSortByMarketcap();

        const router = useRouter();

        const didRun = ref(false);
        const dataView = ref({});

        // get user favorites
        getUserFavorites();

        if (!didRun.value) {
            getUserFavorites();
        }
        // get market data every 30 seconds
        setInterval(async () => {
            await getUserFavorites();

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
        }, 5000);

        function goToCoin(id) {
            router.push({
                path: `/details/${id}`,
            });
        }

        const clickedSortByName = (shouldChangeDesc) => {
            dataView.value.option = "name";
            if (favoritesData.value.length > 0) {
                sortByName(favoritesData.value, shouldChangeDesc);
                favoritesData.value = sortedNameData.value;
            }
        };

        const clickedSortByPrice = (shouldChangeDesc) => {
            dataView.value.option = "price";
            if (favoritesData.value.length > 0) {
                sortByPrice(favoritesData.value, shouldChangeDesc);
                favoritesData.value = sortedPriceData.value;
            }
        };

        // sort the data by change 24h
        const clickedSortByChange = (shouldChangeDesc) => {
            dataView.value.option = "change";
            if (favoritesData.value.length > 0) {
                sortByChange(favoritesData.value, shouldChangeDesc);
                favoritesData.value = sortedChangeData.value;
            }
        };

        const clickedSortByMarketcap = (shouldChangeDesc) => {
            dataView.value.option = "marketcap";

            if (favoritesData.value.length > 0) {
                sortByMarketcap(favoritesData.value, shouldChangeDesc);
                favoritesData.value = sortedMarketcapData.value;
            }
        };

        return {
            favoritesData,
            loading,
            error,
            goToCoin,
            clickedSortByName,
            clickedSortByPrice,
            clickedSortByChange,
            clickedSortByMarketcap,
        };
    },
};
</script>

<style lang="scss" scoped>
section {
    @apply w-full;

    .watchlist {
        @apply flex items-start w-full;
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
}

@media screen and (max-width: 1400px) {
    /* column header */
    .watchlist__header {
        @apply hidden;
    }
}

@media screen and (max-width: 800px) {
    .watchlist__table {
        table {
            @apply table-auto;
        }
    }
}
</style>
