<template>
  <section class="overflow-hidden margin-top-nav-h">
    <div
      class="pt-96 w-96 flex items-start justify-center whitespace-nowrap absolute top-28 left-0 min-h-full"
    >
      <LargeHeader
        :text="{ data: 'LATEST NEWS' }"
        :theme="{ light: true }"
        class="rotate-90"
      />
    </div>
    <div class="flex justify-center items-flex flex-col">
      <div class="news-wrapper">
        <LargeHeader
          :text="{ data: 'LATEST NEWS' }"
          :theme="{ dark: true }"
          class="hidden mt-8"
        />
        <div class="flex mt-12 news-wrapper-inner" ref="newsWrapperInner">
          <NewsCard class="basis-1/4" />
          <NewsCard class="basis-1/4" />
          <NewsCard class="basis-1/4" />
          <NewsCard class="basis-1/4" />
        </div>
      </div>
      <div class="h-24 flex justify-center more-news-wrapper m-16">
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

<style scoped>
@import url("../../index.css");

.news-wrapper {
  width: calc(100% - 384px);
  margin-left: 384px;
}
.more-news-wrapper {
  margin-left: 384px;
}

@layer components {
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
    section > div:last-child div > div {
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
      margin-left: 0px !important;
    }
    h2 {
      display: block !important;
    }
    /* news card inner wrapper */
    section > div:last-child div {
      @apply items-center;
    }
    /*  news cards */
    section > div:last-child div > div {
      @apply w-96;
    }
  }
  @media screen and (max-width: 980px) {
    /* news card inner wrapper */
    .news-wrapper-inner {
      @apply flex-col items-center m-0;
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
