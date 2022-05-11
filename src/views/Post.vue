<template>
    <Popup v-if="error" :msg="error" :error="true" />
    <RollerLoader v-if="loading" :color="{ dark: true }" class="m-auto" />

    <section v-if="!loading && postData">
        <div class="post">
            <div>
                <div>
                    <p>{{ postData.userId }}</p>
                </div>
                <h2 class="post__title">{{ postData.title }}</h2>
                <div class="post__content" v-html="postData.textContent"></div>
            </div>
            <div class="post__sidebar">
                <div class="post__sidebar-votes">
                    <ThumbUp />
                    <ThumbDown />
                </div>
                <Chat class="post__sidebar-comments" />
            </div>
        </div>
    </section>
</template>

<script>
// vue imports
import { useRoute } from "vue-router";

// svg
import ThumbUp from "../svg/ThumbUp.vue";
import ThumbDown from "../svg/ThumbDown.vue";
import Chat from "../svg/Chat.vue";

// hooks
import useGetPost from "../hooks/get/posts/useGetPost";

// components
import RollerLoader from "../components/loader/RollerLoader.vue";
import Popup from "../components/modal/Popup.vue";

export default {
    components: {
        ThumbUp,
        ThumbDown,
        Chat,
        RollerLoader,
        Popup,
    },
    setup() {
        const route = useRoute();
        // hook
        const { getPost, postData, loading, error } = useGetPost();

        getPost(route.params.id);

        return {
            postData,
            loading,
            error,
        };
    },
};
</script>

<style lang="scss" scoped>
section {
    @apply pt-6;
}
.post {
    @apply max-w-3xl 
    bg-theme_dark_purple 
    mx-auto 
    p-6 
    flex 
    justify-between 
    w-full;
    &__title {
        @apply text-5xl text-theme_gold mb-4 font-montserrat font-semibold mt-0;
    }
    &__content {
        @apply text-theme_white font-roboto;
    }
    &__sidebar {
        @apply w-20 flex flex-col justify-between items-center pl-2;
        &-votes {
            @apply text-theme_white;
            svg {
                @apply h-8 w-9;
                &:first-child {
                    @apply mb-4;
                }
            }
        }
        &-comments {
            @apply text-theme_gold h-10 w-10;
        }
    }
}

@media screen and (max-width: $breakpoint-mobile) {
    /*  text wrapper */
    .post {
        @apply flex-col;
        &__title {
            @apply text-4xl;
        }

        &__sidebar {
            @apply flex-row w-full mt-4;
            &-votes {
                @apply text-theme_white flex items-center;
                svg {
                    @apply h-8 w-9;
                    &:first-child {
                        @apply mb-0 mr-2;
                    }
                }
            }
        }
    }
}
</style>
