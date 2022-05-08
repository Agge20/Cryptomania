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
                <div>
                    <p>$63 000</p>
                    <span>+2.3%</span>
                </div>
                <div>
                    <h4>Sentinment</h4>
                    <div>
                        <ThumbUp />
                        <div></div>
                        <ThumbDown />
                    </div>
                </div>
            </div>
            <div class="row-start-1 col-span-1">02</div>
            <div class="row-start-1 col-span-1">03</div>
            <div class="row-start-1 col-span-1">04</div>
            <div class="row-start-2 col-start-1 col-span-2">05</div>
            <div class="row-start-2 col-start-3">06</div>
            <div class="row-start-2">07</div>
        </div>
    </section>
</template>

<script>
// headers
import Header2 from "../components/headers/Header2.vue";

// icons
import Star from "../svg/Star.vue";
import ThumbUp from "../svg/ThumbUp.vue";
import ThumbDown from "../svg/ThumbDown.vue";

export default {
    components: {
        Header2,
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
        @apply grid grid-flow-col gap-4;
    }
    &__tl {
        @apply row-start-1 col-span-1;
        &-meta {
            @apply flex;
            > span:first-child {
                @apply ml-0;
            }
            > span {
                @apply m-2 
                bg-theme_dark_purple 
                text-theme_white 
                py-1.5 
                px-2
                rounded
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
                @apply bg-theme_dark_purple p-4;
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
        }
    }
}
</style>
