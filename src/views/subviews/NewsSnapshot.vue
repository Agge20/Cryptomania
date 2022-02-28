<template>
  <section class="flex justify-between overflow-hidden margin-top-nav-h">
    <div
      class="py-96 w-96 bg-theme_dark_purple flex items-center justify-center whitespace-nowrap"
    >
      <LargeHeader
        :text="{ data: 'LATEST NEWS' }"
        :color="{ white: true }"
        class="rotate-90"
      />
    </div>
    <div class="w-full h-auto">
      <div class="w-full flex mt-12">
        <NewsCard class="basis-1/3" />
        <NewsCard class="basis-1/3" />
        <NewsCard class="basis-1/3" />
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
    return { newsData, fakeNewsData, loading, error };
  },
};
</script>

<style scoped>
@import url("../../index.css");

@layer components {
  @media screen and (max-width: 1600px) {
    /* news card inner wrapper */
    section > div:last-child div {
      @apply flex-row flex-wrap;
    }
    /*  news cards */
    section > div:last-child div > div {
      @apply w-1/2;
    }
  }
  @media screen and (max-width: 1400px) {
    /* column header */
    section > div:first-child {
      @apply hidden;
    }
    /* news card inner wrapper */
    section > div:last-child div {
      @apply flex-col items-center;
    }
    /*  news cards */
    section > div:last-child div > div {
      @apply w-96;
    }
  }
  @media screen and (max-width: 980px) {
    /* column header */
    section > div:first-child {
      @apply hidden;
    }
    /* news card inner wrapper */
    section > div:last-child div {
      @apply flex-col items-center;
    }
  }
  @media screen and (max-width: 450px) {
    /*  news cards */
    section > div:last-child div > div {
      @apply m-0 mb-16 w-11/12;
    }
  }
}

.margin-top-nav-h {
  margin-top: 120px;
}
</style>
