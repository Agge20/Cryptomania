<template>
    <RollerLoader v-if="!newsData" :color="{ dark: true }" class="mx-auto my-12" />
    <section v-if="newsData" class="news-snap">
        <div class="news-snap__header first-header-wrapper">
            <LargeHeader
                :text="{ data: 'LATEST NEWS' }"
                :theme="{ dark: true }"
                class="rotate-90 first-header"
            />
        </div>
        <div class="news-wrapper-outer">
            <div class="news-wrapper">
                <LargeHeader
                    :text="{ data: 'LATEST NEWS' }"
                    :theme="{ dark: true }"
                    class="hidden pt-5"
                />
                <div class="flex mt-12 news-wrapper-inner" ref="newsWrapperInner">
                    <NewsCard v-for="article in newsData" class="basis-1/4" :article="article" />
                </div>
            </div>
            <div v-if="newsData.length" class="more-news-wrapper">
                <router-link :to="{ name: 'News' }">
                    <PushButton :data="{ text: 'More News?' }" :theme="{ dark: true }"
                /></router-link>
            </div>
        </div>
    </section>
</template>

<script>
// vue imports
import { watchEffect, ref } from "@vue/runtime-core";
import { useStore } from "vuex";

// firebase

// components
import NewsCard from "../../components/news/NewsCard.vue";
import LargeHeader from "../../components/headers/LargeHeader.vue";
import LinkButton from "../../components/buttons/LinkButton.vue";
import PushButton from "../../components/buttons/PushButton.vue";
import RollerLoader from "../../components/loader/RollerLoader.vue";

// loaders
import DotsLoader from "../../components/loader/DotsLoader.vue";

export default {
    components: {
        NewsCard,
        LargeHeader,
        DotsLoader,
        LinkButton,
        PushButton,
        RollerLoader,
    },
    setup() {
        const store = useStore();
        const newsData = ref([]);

        watchEffect(() => {
            // when news data i fetched
            if (store.state.staleNewsData) {
                // push one article from each news source
                store.state.staleNewsData.forEach((article, index) => {
                    if (index < 4) {
                        newsData.value.push(article);
                    } else {
                        return;
                    }
                });
            }
        });
        return {
            newsData,
            store,
        };
    },
};
</script>

<style lang="scss" scoped>
@import url("../../index.css");

// this styling is not formatted to BEM needs to be fixed

.news-snap {
    @apply bg-theme_white flex min-h-3xl w-full;
    &__header {
        @apply w-36 
        absolute 
        left-0
        flex
        items-start
        justify-center
        whitespace-nowrap;
    }
}

.more-news-wrapper {
    @apply h-24 mt-20 flex justify-center items-center w-full;
}

.first-header-wrapper {
    padding-top: calc(var(--navbar-height) + 60px);
}
.first-header {
    margin-top: 240px;
}

@media screen and (max-width: 2000px) {
    /* news card inner wrapper */
    .news-wrapper-inner {
        @apply flex-wrap justify-center;
    }
}
@media screen and (max-width: 1600px) {
    /* news card inner wrapper */
    .news-wrapper-inner {
        @apply flex-row 
        flex-wrap 
        justify-center;
    }
}
@media screen and (max-width: 1400px) {
    /* column header */
    section > div:first-child {
        @apply hidden;
    }
    .news-wrapper {
        @apply w-full pt-12;
    }
    .more-news-wrapper {
        margin-left: 0px !important;
        margin-right: 0px !important;
    }
    h2 {
        display: block !important;
    }
}
@media screen and (max-width: 980px) {
    .news-wrapper-outer {
        @apply mx-auto;
    }

    /* news card inner wrapper */
    .news-wrapper-inner {
        @apply flex-col items-center m-0 px-0;
    }
}
@media screen and (max-width: $breakpoint-mobile) {
    /*  news cards */
    .news-wrapper-inner {
        div {
            @apply m-0 mb-16;
        }
        div:first-child {
            @apply mt-6;
        }
    }
    .news-wrapper-outer {
        @apply w-full;
    }
}

.margin-top-nav-h {
    margin-top: 120px;
}
</style>
