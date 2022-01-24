<template>
  <section class="mt-64 flex flex-col items-center justify-center">
    <h2 class="header-lg">Latest News</h2>
    <span v-if="error" class="mx-auto text-theme_red text-2xl">{{
      error
    }}</span>
    <div v-if="loading">loading articles...</div>
    <div class="flex">
      <div v-if="!loading" v-for="article in newsData[0]">
        <NewsCard :article="article" />
      </div>
    </div>
  </section>
</template>

<script>
import { watchEffect, ref } from "@vue/runtime-core";
// components
import NewsCard from "../../components/NewsCard.vue";

// hooks
import useGetNews from "../../hooks/get/news/useGetNews";

export default {
  components: {
    NewsCard,
  },
  setup() {
    const { news, loading, error, getNews } = useGetNews();

    const newsData = ref([]);
    // fetch news-snapshot data
    getNews();

    watchEffect(() => {
      newsData.value = news.value;
      console.log("newsData: ", newsData.value);
    });
    return { newsData, loading, error };
  },
};
</script>

<style scoped></style>
