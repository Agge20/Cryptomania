<template>
    <section class="news-snap">
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
                    class="hidden m-8"
                />
                <div
                    class="flex mt-12 news-wrapper-inner"
                    ref="newsWrapperInner"
                >
                    <NewsCard class="basis-1/4" />
                    <NewsCard class="basis-1/4" />
                    <NewsCard class="basis-1/4" />
                    <NewsCard class="basis-1/4" />
                </div>
            </div>
            <div class="h-24 mt-20 flex justify-center more-news-wrapper">
                <PushButton
                    :data="{ text: 'More News?', url: 'reddit.com' }"
                    :theme="{ dark: true }"
                />
            </div>
        </div>
    </section>
</template>

<script>
// vue imports
import { watchEffect, ref } from "@vue/runtime-core";

// components
import NewsCard from "../../components/news/NewsCard.vue";
import LargeHeader from "../../components/headers/LargeHeader.vue";
import LinkButton from "../../components/buttons/LinkButton.vue";
import PushButton from "../../components/buttons/PushButton.vue";

// loaders
import DotsLoader from "../../components/loader/DotsLoader.vue";

// hooks
import useGetNews from "../../hooks/get/news/useGetNews";

export default {
    components: {
        NewsCard,
        LargeHeader,
        DotsLoader,
        LinkButton,
        PushButton,
    },
    setup() {
        const { newsSnapshot, getNewsSnapshot, loading, error } = useGetNews();
        const newsData = ref([]);
        const fakeNewsData = ref([1, 2, 3, 4, 5, 6]);

        // fetch news-snapshot data
        /*
    DISABLED: getNewsSnapshot();
    */

        watchEffect(() => {
            // when news data i fetched
            if (newsSnapshot.value.length) {
                // push one article from each news source
                newsSnapshot.value.forEach((article, index) => {
                    if (index < 6) {
                        newsData.value.push(article);
                    } else {
                        return;
                    }
                });
            }
        });
        return {
            newsData,
            fakeNewsData,
            loading,
            error,
        };
    },
};
</script>

<style lang="scss" scoped>
@import url("../../index.css");

// this styling is not formatted to BEM needs to be fixed

.news-snap {
    @apply margin-top-nav-h bg-theme_white flex;
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

.first-header-wrapper {
    padding-top: calc(var(--navbar-height) + 40px);
}
.first-header {
    margin-top: 160px;
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
        @apply flex-row flex-wrap justify-center;
    }
    /*  news cards */
    .news-wrapper-inner div {
        @apply w-1/2;
    }
}
@media screen and (max-width: 1400px) {
    /* column header */
    section > div:first-child {
        @apply hidden;
    }
    .news-wrapper {
        width: 100% !important;
    }
    .more-news-wrapper {
        margin-left: 0px !important;
        margin-right: 0px !important;
    }
    h2 {
        display: block !important;
    }

    /*  news cards */
    .news-wrapper-inner div {
        @apply w-96;
    }
}
@media screen and (max-width: 980px) {
    .news-wrapper-outer {
        @apply mx-auto;
    }

    /* news card inner wrapper */
    .news-wrapper-inner {
        @apply flex-col items-center m-0;
    }
}
@media screen and (max-width: 450px) {
    /*  news cards */
    .news-wrapper-inner {
        @apply items-start;
    }
    .news-wrapper-inner div {
        @apply m-0 mb-16 w-11/12;
    }
}

.margin-top-nav-h {
    margin-top: 120px;
}
</style>
