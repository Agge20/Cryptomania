<template>
    <Popup v-if="error" :msg="error" :error="true" />
    <RollerLoader v-if="loading" :color="{ dark: true }" class="m-auto" />

    <section class="posts" v-if="!loading && postsData">
        <div class="posts__header">
            <LargeHeader
                :text="{ data: 'TOP POSTS' }"
                :theme="{ dark: true }"
                class="vertical-column-header rotate-90 mt-0"
            />
        </div>
        <LargeHeader
            :text="{ data: 'TOP POSTS' }"
            :theme="{ dark: true }"
            class="posts__header--normal"
        />

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
    @apply mt-16  min-h-xl;
    &__header {
        @apply w-36
        absolute
        left-0
        mr-0
        whitespace-nowrap;
        &--normal {
            @apply mb-16 mx-auto hidden;
        }
    }
    &__wrapper {
        .post {
            @apply mb-12;
        }
    }
}

@media screen and (max-width: 1400px) {
    .posts {
        @apply mt-0;
        &__header {
            @apply rotate-90 
            mt-0;
            &--normal {
                @apply block;
            }
        }
    }
}
</style>
