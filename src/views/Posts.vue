<template>
    <Popup v-if="error" :msg="error" :error="true" />
    <RollerLoader v-if="loading" :color="{ dark: true }" class="m-auto" />

    <section class="posts" v-if="!loading && postsData">
        <router-link :to="{ name: 'Create_post' }" class="flex justify-center mb-12">
            <PushButton
                :data="{ text: 'Create Post', url: 'reddit.com' }"
                :theme="{ dark: true }"
            />
        </router-link>
        <div v-for="post in postsData" class="posts__wrapper">
            <Post :postData="post" />
        </div>
    </section>
</template>

<script>
// components
import Post from "../components/posts/Post.vue";
import LargeHeader from "../components/headers/LargeHeader.vue";
import PushButton from "../components/buttons/PushButton.vue";
import RollerLoader from "../components/loader/RollerLoader.vue";
import Popup from "../components/modal/Popup.vue";

// hooks
import useGetPosts from "../hooks/get/posts/useGetPosts";

export default {
    components: {
        Post,
        LargeHeader,
        PushButton,
        RollerLoader,
        Popup,
    },
    setup() {
        const { getPosts, postsData, loading, error } = useGetPosts();

        getPosts();

        return {
            postsData,
            loading,
            error,
        };
    },
};
</script>

<style lang="scss" scoped>
.posts {
    @apply mt-16;

    &__wrapper {
        .post {
            @apply mb-12;
        }
    }
}

@media screen and (max-width: 1400px) {
    /* column header */
    .posts__header {
        @apply hidden;
    }
}
</style>
