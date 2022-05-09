<template>
    <RollerLoaderVue v-if="loading" :color="{ dark: true }" class="mx-auto my-auto" />
    <Error v-if="error" :msg="error" class="mx-auto my-auto" />
    <section class="details section-wide" v-if="!loading && !error">
        <div class="flex flex-row justify-start flex-wrap">
            <div class="details__tl details__td-wrapper">
                <div class="details__tl-meta">
                    <span>
                        <Star
                            @click="addFavorite(coinData.id)"
                            class="cursor-pointer hover:text-theme_gold"
                        />
                    </span>
                    <span v-if="coinData.market_cap_rank"> #{{ coinData.market_cap_rank }} </span>
                    <span v-if="coinData.hashing_algorithm">{{ coinData.hashing_algorithm }}</span>
                    <span v-if="coinData.genesis_date">{{ coinData.genesis_date }}</span>
                </div>
                <div class="details__tl-name">
                    <div>
                        <Header2 :text="{ data: `${coinData.name}` }" :theme="{ light: true }" />
                        <img :src="coinData.image.large" :alt="coinData.name" />
                    </div>
                    <h3>{{ coinData.symbol }}</h3>
                </div>
                <div class="details__tl-price flex-initial">
                    <p>${{ coinData.market_data.current_price.usd }}</p>
                    <span
                        :class="{
                            bg_green: coinData.market_data.price_change_percentage_24h >= 0,
                            bg_red: coinData.market_data.price_change_percentage_24h < 0,
                        }"
                    >
                        {{
                            coinData.market_data.price_change_percentage_24h >= 0
                                ? `+${coinData.market_data.price_change_percentage_24h}`
                                : coinData.market_data.price_change_percentage_24h
                        }}%
                    </span>
                </div>
                <div class="details__tl-sentiment" v-if="coinData.sentiment_votes_up_percentage">
                    <div>
                        <ThumbUp />
                        <div>
                            <span
                                :style="{ width: coinData.sentiment_votes_up_percentage + '%' }"
                            ></span>
                            <span
                                :style="{ width: coinData.sentiment_votes_down_percentage + '%' }"
                            ></span>
                        </div>
                        <ThumbDown />
                    </div>
                </div>
            </div>
            <div class="details__td-wrapper">
                <DetailsTableSixRows
                    :data="[
                        { td_left: 'Type', td_right: coinData.categories[0] },
                        {
                            td_left: 'Change',
                            td_right:
                                coinData.market_data.price_change_24h < 0
                                    ? coinData.market_data.price_change_24h
                                          .toString()
                                          .replace('-', '-$')
                                    : `$${coinData.market_data.price_change_24h}`,
                        },
                        {
                            td_left: 'Marketcap',
                            td_right: `$${coinData.market_data.market_cap.usd}`,
                        },
                        {
                            td_left: 'Fully diluted',
                            td_right: `$${coinData.market_data.fully_diluted_valuation.usd}`,
                        },
                        {
                            td_left: 'Total volume',
                            td_right: `$${coinData.market_data.total_volume.usd}`,
                        },
                        {
                            td_left: 'Country of origin',
                            td_right: coinData.country_origin,
                        },
                    ]"
                />
            </div>

            <div class="details__td-wrapper">
                <DetailsTableSixRows
                    :data="[
                        { td_left: 'All time high', td_right: `$${coinData.market_data.ath.usd}` },
                        {
                            td_left: 'Ath change(%)',
                            td_right:
                                coinData.market_data.ath_change_percentage.usd < 0
                                    ? coinData.market_data.ath_change_percentage.usd
                                          .toString()
                                          .replace('-', '-$')
                                    : `$${coinData.market_data.ath_change_percentage.usd}`,
                        },
                        {
                            td_left: 'Ath date',
                            td_right: returnDateFunc(coinData.market_data.ath_date.usd),
                        },
                        {
                            td_left: 'All time low',
                            td_right: `$${coinData.market_data.atl.usd}`,
                        },
                        {
                            td_left: 'Atl change(%)',
                            td_right:
                                coinData.market_data.atl_change_percentage.usd < 0
                                    ? coinData.market_data.atl_change_percentage.usd
                                          .toString()
                                          .replace('-', '-$')
                                    : `+${coinData.market_data.atl_change_percentage.usd}%`,
                        },
                        {
                            td_left: 'Atl date',
                            td_right: returnDateFunc(coinData.market_data.atl_date.usd),
                        },
                    ]"
                />
            </div>

            <div class="details__td-wrapper">
                <DetailsTableSixRows
                    :data="[
                        { td_left: 'High(24h)', td_right: `$${coinData.market_data.high_24h.usd}` },
                        { td_left: 'Low(24h)', td_right: `$${coinData.market_data.low_24h.usd}` },
                        {
                            td_left: 'Price change(7d)',
                            td_right: `${coinData.market_data.price_change_percentage_7d}%`,
                        },
                        {
                            td_left: 'Price change(14d)',
                            td_right: `${coinData.market_data.price_change_percentage_14d}%`,
                        },
                        {
                            td_left: 'Price change(30d)',
                            td_right: `${coinData.market_data.price_change_percentage_30d}%`,
                        },
                        {
                            td_left: 'Price change(1y)',
                            td_right: `${coinData.market_data.price_change_percentage_1y}%`,
                        },
                    ]"
                />
            </div>
        </div>
        <div class="flex flex-row justify-start flex-wrap">
            <div class="details__description" v-html="coinData.description.en"></div>

            <div class="details__td-wrapper">
                <DetailsTableFiveRows
                    :data="[
                        {
                            td_left: 'Marketcap change(24h)',
                            td_right:
                                coinData.market_data.market_cap_change_24h < 0
                                    ? coinData.market_data.market_cap_change_24h
                                          .toString()
                                          .replace('-', '-$')
                                    : `$${coinData.market_data.market_cap_change_24h}`,
                        },
                        {
                            td_left: 'Marketcap change(%24h)',
                            td_right: `${coinData.market_data.market_cap_change_percentage_24h}%`,
                        },
                        {
                            td_left: 'Total supply',
                            td_right: coinData.market_data.total_supply,
                        },
                        {
                            td_left: 'Max supply',
                            td_right: coinData.market_data.max_supply,
                        },
                        {
                            td_left: 'Circulating Supply',
                            td_right: coinData.market_data.circulating_supply,
                        },
                    ]"
                />
            </div>

            <div class="details__td-wrapper">
                <DetailsTableFiveRows
                    :data="[
                        {
                            td_left: 'Forks',
                            td_right: coinData.developer_data.forks,
                        },
                        {
                            td_left: 'Total issues',
                            td_right: coinData.developer_data.total_issues,
                        },
                        {
                            td_left: 'Resolved issues',
                            td_right: coinData.developer_data.closed_issues,
                        },
                        {
                            td_left: 'Repo additions(4w)',
                            td_right: `+${coinData.developer_data.code_additions_deletions_4_weeks.additions}`,
                        },
                        {
                            td_left: 'Repo deletions(4w)',
                            td_right:
                                coinData.developer_data.code_additions_deletions_4_weeks.deletions,
                        },
                    ]"
                />
            </div>
        </div>
    </section>
</template>

<script>
// vue imports
import { useRoute } from "vue-router";
// headers
import Header2 from "../components/headers/Header2.vue";

// components
import DetailsTableSixRows from "../components/details/DetailsTableSixRows.vue";
import DetailsTableFiveRows from "../components/details/DetailsTableFiveRows.vue";

// icons
import Star from "../svg/Star.vue";
import ThumbUp from "../svg/ThumbUp.vue";
import ThumbDown from "../svg/ThumbDown.vue";

// hooks
import useGetCoinData from "../hooks/get/details/useGetCoinData.js";
import useAddFavorite from "../hooks/add/user/useAddFavorite";

// loaders
import RollerLoaderVue from "../components/loader/RollerLoader.vue";
import Error from "../components/error/Error.vue";

export default {
    components: {
        Header2,
        DetailsTableSixRows,
        DetailsTableFiveRows,
        Star,
        ThumbUp,
        ThumbDown,
        RollerLoaderVue,
        Error,
    },
    setup() {
        // hooks
        const { getCoinData, coinData, loading, error } = useGetCoinData();
        const { addFavorite } = useAddFavorite();
        // vue router
        const route = useRoute();

        getCoinData(route.params.id);

        // format date function
        const returnDateFunc = (date) => {
            let dateObj = new Date(date);
            let month = dateObj.getUTCMonth() + 1;
            let day = dateObj.getUTCDate();
            let year = dateObj.getUTCFullYear();

            const returnDate = year + "/" + month + "/" + day;

            return returnDate;
        };

        return {
            loading,
            error,
            coinData,
            returnDateFunc,
            addFavorite,
        };
    },
};
</script>

<style lang="scss" scoped>
.details {
    @apply w-full;
    &__td-wrapper {
        @apply flex-initial 
        ml-4
        mb-4 
        min-w-xs 
        w-full;
        max-width: 24%;
    }
    &__tl {
        &-meta {
            @apply flex ml-0;
            > span:first-child {
                @apply ml-0;
            }
            > span {
                @apply m-2
                mt-0 
                bg-theme_dark_purple 
                text-theme_white 
                py-1.5 
                px-2
                rounded-sm
                shadow
                font-roboto
                font-medium;

                svg {
                    @apply scale-90;
                }
            }
        }
        &-name {
            @apply flex flex-wrap mb-6;
            > * {
                @apply bg-theme_dark_purple p-4 rounded-sm;
            }
            > div {
                @apply flex 
                border-b-4 
                border-theme_gold 
                mb-2 
                mr-2;
                * {
                    @apply m-0 flex items-center;
                }
                img {
                    @apply h-16 ml-4;
                }
            }
            h3 {
                @apply h-16
                text-theme_white 
                uppercase 
                text-xl
                align-middle
                font-montserrat
                font-medium;
            }
        }
        &-price {
            @apply w-full 
            flex 
            flex-wrap
            items-center
            justify-between;
            * {
                @apply mb-6;
            }
            p {
                @apply text-6xl;
            }
            span {
                @apply text-4xl
                p-2
                text-theme_white
                rounded-sm;
            }
            p,
            span {
                @apply font-roboto
                font-medium;
            }
        }
        &-sentiment {
            @apply flex 
            flex-wrap
            items-center
            justify-between
            min-w-xs;
            > * {
                @apply mb-2;
            }
            h4 {
                @apply mr-2;
            }
            > div {
                @apply flex w-64;
                svg:first-of-type {
                    @apply text-theme_green;
                }
                svg:last-of-type {
                    @apply text-theme_red;
                }
                > div {
                    @apply flex w-full mx-2;

                    span {
                        @apply block h-full;
                    }
                    span:first-child {
                        @apply bg-theme_green;
                    }
                    span:last-child {
                        @apply bg-theme_red;
                    }
                }
            }
        }
    }
    &__description {
        @apply w-full max-w-1/2 min-w-xs pb-6;
    }
}

@media screen and (max-width: $breakpoint-mobile) {
    /*  text wrapper */
    .details__td-wrapper {
        @apply ml-0;
    }
}
</style>
