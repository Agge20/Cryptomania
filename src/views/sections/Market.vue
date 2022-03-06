<template>
  <section class="flex items-center">
    <div
      class="w-96 flex items-start justify-center whitespace-nowrap border-2 border-red-600"
    >
      <LargeHeader
        :text="{ data: 'THE MARKET' }"
        :theme="{ light: true }"
        class="rotate-90"
      />
    </div>
    <div class="border-2 border-theme_dark_purple min-w-full min-h-screen">
      <div class="h-24 bg-theme_dark_purple"></div>
      <div
        class="bg-theme_dark_purple text-theme_white text-4xl font-montserrat uppercase font-semibold px-8 py-4"
      ></div>
    </div>
  </section>
</template>

<script>
// components
import LargeHeader from "../../components/headers/LargeHeader.vue";
export default {
  components: {
    LargeHeader,
  },
  setup() {},
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
  @media screen and (max-width: 1400px) {
    /* column header */
    section > div:first-child {
      @apply hidden;
    }
  }
}
</style>
