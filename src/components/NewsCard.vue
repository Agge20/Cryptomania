<template>
  <div
    class="custom-shadow bg-theme_gray w-80 hover:scale-105 transition duration-150 cursor-pointer flex flex-col justify-end items-end m-2"
  >
    <div>
      <img
        class="object-cover"
        src="https://images.cointelegraph.com/images/840_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjEtMTEvMmY5ZWYxNWItMjZlMC00YTNkLThhOTktOGQ0N2EyNjBmMjFhLmpwZw==.jpg"
      />
    </div>
    <div class="p-3">
      <h3 class="font-montserrat text-2xl font-semibold">
        {{ article.title }}
      </h3>
      <p>Desc lorem adsakdas okdpkl askpdalöksdlöakdkls</p>
    </div>
    <a
      href="url"
      alt=""
      class="text-theme_orange mb-3 mr-5 uppercase font-medium hover:bg-theme_orange hover:text-theme_white p-2 rounded-sm hover:font-semibold"
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
