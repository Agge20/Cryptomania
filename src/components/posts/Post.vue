<template>
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
</template>

<script>
// svg
import ThumbUp from "../../svg/ThumbUp.vue";
import ThumbDown from "../../svg/ThumbDown.vue";
import Chat from "../../svg/Chat.vue";

export default {
    props: ["postData"],
    components: {
        ThumbUp,
        ThumbDown,
        Chat,
    },
};
</script>

<style lang="scss" scoped>
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
