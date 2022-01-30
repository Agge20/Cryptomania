<template>
  <div
    class="min-h-full custom-shadow bg-theme_gray w-80 transition duration-150 cursor-pointer flex flex-col justify-start items-end m-2"
  >
    <div>
      <img class="object-cover" :src="article.image" />
    </div>
    <div class="p-3">
      <h3 class="font-montserrat text-2xl font-semibold">
        {{ article.title }}
      </h3>
      <p>Desc lorem adsakdas okdpkl askpdalöksdlöakdkls</p>
    </div>
    <a
      :href="article.url"
      target="_blank"
      alt=""
      class="text-theme_orange mb-3 mr-5 uppercase font-medium p-2 rounded-sm hover:font-semibold transition hover:opacity-80 duration-200 hover:scale-110 hover:bg-theme_orange hover:text-theme_white"
      >Read More</a
    >
  </div>
</template>

<script>
export default {
  props: ["article"],
};
</script>

<style scoped></style>
