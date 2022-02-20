<template>
  <section class="flex justify-between min-h-screen overflow-hidden">
    <div
      class="hidden bg-theme_dark_purple w-96 text-theme_white xl:flex justify-center items-center font-montserrat font-semibold text-7xl"
    >
      <div class="h-screen flex items-center justify-center">
        <h2 class="uppercase rotate-90 whitespace-nowrap animate-fadeInFast">
          Latest News
        </h2>
      </div>
    </div>
    <div
      class="flex flex-col items-center justify-center w-full mt-36 border-red-500 border-2"
    >
      <div v-if="loading">
        <div
          class="flex flex-wrap content-start flex-col lg:flex-row justify-end"
        >
          <div
            v-for="article in fakeNewsData"
            class="m-4 last:hidden xl:last:flex"
          >
            <NewsCardSkeleton :article="article" />
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-center">
        <div
          v-if="!loading"
          class="flex flex-wrap content-start flex-col lg:flex-row justify-end"
        >
          <div v-for="article in newsData" class="m-4 last:hidden xl:last:flex">
            <NewsCard :article="article" />
          </div>
          <span v-if="error" class="mx-auto text-theme_red text-2xl">{{
            error
          }}</span>
        </div>
        <div v-if="newsData.length">
          <div class="w-full flex justify-end pr-4 border-2 border-blue-600">
            <LinkButton
              :text="{ data: 'More News' }"
              class="w-56 h-3/4 flex justify-center"
            />
          </div>
        </div>
        <div
          v-else
          class="w-full flex justify-center pr-4 border-2 border-blue-600"
        >
          <LinkButton
            :text="{ data: 'More News' }"
            class="w-56 h-3/4 flex justify-center"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { watchEffect, ref } from "@vue/runtime-core";
// components
import NewsCard from "../../components/news/NewsCard.vue";
import LargeHeader from "../../components/headers/LargeHeader.vue";
import LinkButton from "../../components/LinkButton.vue";

// skeletons
import NewsCardSkeleton from "../../components/skeletons/news/NewsCardSkeleton.vue";

// loaders
import DotsLoader from "../../components/loader/DotsLoader.vue";

// hooks
import useGetNews from "../../hooks/get/news/useGetNews";

export default {
  components: {
    NewsCard,
    NewsCardSkeleton,
    LargeHeader,
    DotsLoader,
    LinkButton,
  },
  setup() {
    const { newsSnapshot, getNewsSnapshot, loading, error } = useGetNews();
    const newsData = ref([]);
    const fakeNewsData = ref([1, 2, 3, 4, 5, 6]);

    // fetch news-snapshot data
    getNewsSnapshot();
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
    return { newsData, fakeNewsData, loading, error };
  },
};
</script>

<style scoped>
@import url("../../index.css");

@layer components {
}
</style>
