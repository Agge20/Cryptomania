<template>
    <Popup v-if="error" :msg="error" :error="true" />
    <RollerLoader v-if="loading" :color="{ dark: true }" class="m-auto" />

    <section class="posts" v-if="!loading && postsData">
        <div class="posts__header">
            <LargeHeader
                :text="{ data: 'TOP POSTS' }"
                :theme="{ dark: true }"
                class="rotate-90 vertical-column-header mt-0"
            />
        </div>
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
import Post from "../../components/posts/Post.vue";
import LargeHeader from "../../components/headers/LargeHeader.vue";
import PushButton from "../../components/buttons/PushButton.vue";
import RollerLoader from "../../components/loader/RollerLoader.vue";
import Popup from "../../components/modal/Popup.vue";

// hooks
import useGetPosts from "../../hooks/get/posts/useGetPosts";
import { watchEffect } from "@vue/runtime-core";

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
        watchEffect(() => {
            postsData.value = postsData.value.sort((a, b) => {
                if (parseFloat(a.likes) <= parseFloat(b.likes)) {
                    return 1;
                } else {
                    return -1;
                }
            });
        });
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
    &__header {
        @apply w-36
        absolute
        left-0
        mr-0
        whitespace-nowrap;
    }
    &__wrapper {
        .post {
            @apply mb-12;
        }
    }
}
</style>
