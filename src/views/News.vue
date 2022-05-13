<template>
    <section class="news">
        <LargeHeader :text="{ data: 'News' }" :theme="{ dark: true }" />
        <div v-if="store.state.staleNewsData" class="news__card-wrapper">
            <NewsCard
                v-for="article in store.state.staleNewsData"
                class="basis-1/4"
                :article="article"
            />
        </div>
    </section>
</template>

<script>
// vue imports
import { useStore } from "vuex";

//components
import LargeHeader from "../components/headers/LargeHeader.vue";
import NewsCard from "../components/news/NewsCard.vue";

export default {
    components: {
        LargeHeader,
        NewsCard,
    },
    setup() {
        // vuex
        const store = useStore();

        return {
            store,
        };
    },
};
</script>

<style lang="scss" scoped>
.news {
    @apply w-full;
    &__card-wrapper {
        @apply flex flex-wrap justify-center;
        .news-card {
            @apply mx-2 my-8;
        }
    }
}

@media screen and (max-width: 980px) {
    /* news card inner wrapper */
    .news__card-wrapper {
        @apply flex-col items-center;
        .news-card {
            @apply mx-0;
        }
    }
}
</style>
