<template>
  <section class="mt-64 flex flex-col items-center justify-center">
    <LargeHeader
      :text="{ data: 'Latest News' }"
      :color="{ dark: true, white: false }"
      :animate="true"
    />
    <span v-if="error" class="mx-auto text-theme_red text-2xl">{{
      error
    }}</span>
    <div v-if="loading">
      <DotsLoader />
    </div>
    <div
      class="flex flex-wrap content-start flex-col lg:flex-row justify-center"
    >
      <div v-for="article in newsData" class="m-4 last:hidden xl:last:flex">
        <NewsCard :article="article" />
      </div>
    </div>
  </section>
</template>

<script>
import { watchEffect, ref } from "@vue/runtime-core";
// components
import NewsCard from "../../components/news/NewsCard.vue";
import LargeHeader from "../../components/headers/LargeHeader.vue";

// loaders
import DotsLoader from "../../components/loader/DotsLoader.vue";

// hooks
import useGetNews from "../../hooks/get/news/useGetNews";

export default {
  components: {
    NewsCard,
    LargeHeader,
    DotsLoader,
  },
  setup() {
    const { newsSnapshot, getNewsSnapshot, loading, error } = useGetNews();
    const newsData = ref([]);
    // fetch news-snapshot data
    /*
    DISABLED: getNewsSnapshot();
    */

    watchEffect(() => {
      // when news data i fetched
      if (newsSnapshot.value.length) {
        // push one article from each news source
        newsSnapshot.value.forEach((article, index) => {
          if (index < 4) {
            newsData.value.push(article);
          } else {
            return;
          }
        });
      }
    });
    return { newsData, loading, error };
  },
};
</script>

<style scoped>
@import url("../../index.css");

@layer components {
}
</style>
