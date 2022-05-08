<template>
    <section class="details section-wide">
        <div class="details__grid">
            <div class="details__tl">
                <div class="details__tl-meta">
                    <span>
                        <Star />
                    </span>
                    <span> #1 </span>
                    <span>SHA-254</span>
                    <span>2009-01-03</span>
                </div>
                <div class="details__tl-name">
                    <div>
                        <Header2 :text="{ data: 'Bitcoin' }" :theme="{ light: true }" />
                        <img
                            src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
                            alt=""
                        />
                    </div>
                    <h3>BTC</h3>
                </div>
                <div class="details__tl-price">
                    <p>$63 000</p>
                    <span>+2.3%</span>
                </div>
                <div class="details__tl-sentiment">
                    <Header4
                        :text="{ data: 'Sentiment' }"
                        :theme="{ dark: true }"
                        :mb="{ option: false }"
                    />
                    <div>
                        <ThumbUp />
                        <div>
                            <span></span>
                            <span></span>
                        </div>
                        <ThumbDown />
                    </div>
                </div>
            </div>
            <div class="row-start-1 row-end-1 col-span-3">
                <DetailsTableSixRows />
            </div>

            <div class="row-start-1 row-end-1 col-span-3">
                <DetailsTableSixRows />
            </div>

            <div class="row-start-1 row-end-1 col-span-3">
                <DetailsTableSixRows />
            </div>
            <div class="row-start-2 row-end-2 col-span-6">
                All Gaul is divided into three parts, one of which the Belgae inhabit, the Aquitani
                another, those who in their own language are called Celts, in our Gauls, the third.
                All these differ from each other in language, customs and laws. The river Garonne
                separates the Gauls from the Aquitani; the Marne and the Seine separate them from
                the Belgae. Of all these, the Belgae are the bravest, because they are furthest from
                the civilization and refinement of [our] Province, and merchants least frequently
                resort to them, and import those things which tend to effeminate the mind; and they
                are the nearest to the Germans, who dwell beyond the Rhine , with whom they are
                continually waging war; for which reason the Helvetii also surpass the rest of the
                Gauls in valor, as they contend with the Germans in almost daily battles, when they
                either repel them from their own territories, or themselves wage war on their
                frontiers. One part of these, which it has been said that the Gauls occupy, takes
                its beginning at the river Rhone ; it is bounded by the river Garonne, the ocean,
                and the territories of the Belgae; it borders, too, on the side of the Sequani and
                the Helvetii, upon the river Rhine , and stretches toward the north. The Belgae
                rises from the extreme frontier of Gaul, extend to the lower part of the river Rhine
                ; and look toward the north and the rising sun. Aquitania extends from the river
                Garonne to the Pyrenaean mountains and to that part of the ocean which is near
                Spain: it looks between the setting of the sun, and the north star.
            </div>

            <div class="row-start-2 row-end-2 col-span-3"><DetailsTableFiveRows /></div>

            <div class="row-start-2 row-end-2 col-span-3"><DetailsTableFiveRows /></div>
        </div>
    </section>
</template>

<script>
// headers
import Header2 from "../components/headers/Header2.vue";
import Header4 from "../components/headers/Header4.vue";

// components
import DetailsTableSixRows from "../components/details/DetailsTableSixRows.vue";
import DetailsTableFiveRows from "../components/details/DetailsTableFiveRows.vue";

// icons
import Star from "../svg/Star.vue";
import ThumbUp from "../svg/ThumbUp.vue";
import ThumbDown from "../svg/ThumbDown.vue";

export default {
    components: {
        Header2,
        Header4,
        DetailsTableSixRows,
        DetailsTableFiveRows,
        Star,
        ThumbUp,
        ThumbDown,
    },
    setup() {
        return {};
    },
};
</script>

<style lang="scss" scoped>
.details {
    @apply w-full;
    &__grid {
        @apply grid grid-rows-2 grid-cols-12 gap-8;
        > div {
            //border: solid red 2px;
        }
    }
    &__tl {
        @apply row-start-1 row-end-1 col-span-3;
        &-meta {
            @apply flex;
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
            @apply flex;
            > * {
                @apply bg-theme_dark_purple p-4 rounded-sm;
            }
            > div {
                @apply flex border-b-4 border-theme_gold;
                * {
                    @apply m-0 flex items-center;
                }
                img {
                    @apply h-16 ml-4;
                }
            }
            h3 {
                @apply h-16 ml-2 
                text-theme_white 
                uppercase 
                text-2xl
                font-montserrat
                font-medium;
            }
        }
        &-price {
            @apply w-full 
            mt-6 
            flex 
            items-center
            justify-between;
            p {
                @apply text-6xl;
            }
            span {
                @apply bg-theme_green
                text-4xl
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
            items-center
            justify-between
            mt-6;
            > div {
                @apply flex w-64;
                svg:first-of-type {
                    @apply text-theme_green;
                }
                svg:last-of-type {
                    @apply text-theme_red;
                }
                > div {
                    @apply w-full mx-2;

                    span {
                        @apply block h-full w-full;
                    }
                    span:first-child {
                        @apply bg-theme_green;
                    }
                    span:last-child {
                    }
                }
            }
        }
    }
}
</style>
