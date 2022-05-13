<template>
    <NewsSnapshot />
    <Market />
    <TopRatedPosts />
</template>

<script>
// sections
import NewsSnapshot from "../views/sections/NewsSnapshot.vue";
import Market from "../views/sections/Market.vue";
import TopRatedPosts from "../views/sections/TopRatedPosts.vue";

export default {
    components: {
        NewsSnapshot,
        Market,
        TopRatedPosts,
    },
    setup() {
        return {};
    },
};
</script>

<style scoped></style>
