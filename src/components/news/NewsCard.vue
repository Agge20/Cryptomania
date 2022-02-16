<template>
  <div
    class="p-4 w-72 rounded-md min-h-full h-auto flex flex-col justify-between bg-theme_dark_purple text-theme_white"
  >
    <div class="-mt-8 flex justify-center">
      <img
        class="w-full mb-4 rounded-md shadow-xl"
        :src="article.image"
        :alt="article.title"
      />
    </div>
    <div>
      <span class="text-xs">Source: cointelegraph</span>
      <h4 class="text-xl text-theme_gold font-montserrat">
        {{ article.title }}
      </h4>
    </div>
    <a
      :href="article.url"
      target="_blank"
      class="font-montserrat w-2/3 uppercase py-2 px-4 mt-2 rounded-md bg-theme_gold text-theme_dark_purple font-bold text-xl text-center hover:scale-95 transiton duration-150"
    >
      Read More
    </a>
  </div>
</template>

<script>
export default {
  props: ["article"],
};
</script>

<style scoped></style>
