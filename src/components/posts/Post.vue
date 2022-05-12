<template>
    <div class="post" v-if="!loading">
        <div>
            <div>
                <p>{{ postData.userId }}</p>
            </div>
            <h2 class="post__title">{{ postData.title }}</h2>
            <div class="post__content" v-html="postData.textContent"></div>
        </div>
        <div class="post__sidebar">
            <div class="post__sidebar-votes" v-if="store.state.user">
                <ThumbUp
                    @click="handleVote(true)"
                    :class="{ green: votedLiked }"
                    class="cursor-pointer hover:text-theme_green"
                />
                <span class="flex justify-center items-center my-2">{{ postData.likes }}</span>
                <ThumbDown
                    @click="handleVote(false)"
                    :class="{ red: votedDisliked }"
                    class="cursor-pointer hover:text-theme_red"
                />
            </div>
            <Chat class="post__sidebar-comments" />
        </div>
    </div>
</template>

<script>
// vue imports
import { ref } from "vue";
// vuex
import { useStore } from "vuex";

// hooks
import useVotePost from "../../hooks/add/posts/useVotePost";
import useCheckIfVoted from "../../hooks/get/posts/useCheckIfVoted";

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
    setup(props) {
        const store = useStore();

        // hooks
        const { votePost } = useVotePost();
        const { checkIfVoted, votedLiked, votedDisliked, loading, error } = useCheckIfVoted();

        checkIfVoted(props.postData.id);

        const handleVote = async (shouldIncrement) => {
            if (shouldIncrement) {
                await votePost(props.postData.id, true);
            } else {
                await votePost(props.postData.id, false);
            }
        };

        return {
            store,
            votedLiked,
            votedDisliked,
            loading,
            error,

            handleVote,
        };
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
