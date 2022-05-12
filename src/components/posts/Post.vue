<template>
    <div class="mb-12">
        <div class="post" v-if="!loading">
            <div>
                <div class="post__meta">
                    <div class="flex flex-col">
                        <span class="text-theme_white text-xs italic"
                            >({{ format(postData.timestamp.toDate(), "yyyy-MM-dd") }})</span
                        >
                        <p class="post__meta-username">{{ postData.authorUsername }}:</p>
                    </div>
                    <button
                        v-if="store.state.user && store.state.user.uid === postData.authorId"
                        @click="handleDeletePost"
                        class="post__meta-delete"
                    >
                        DELETE POST
                    </button>
                </div>
                <h2 class="post__title">{{ postData.title }}</h2>
                <div class="post__content" v-html="postData.textContent"></div>
            </div>
            <div class="post__sidebar">
                <div class="post__sidebar-votes" v-if="!store.state.user">
                    <ThumbUp class="cursor-pointer" />
                    <span class="flex justify-center items-center my-2">{{ postData.likes }}</span>
                    <ThumbDown class="cursor-pointer" />
                </div>
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
                <Chat v-if="!showComments" class="post__sidebar-comments" @click="toggleComments" />
                <Chat
                    v-if="showComments"
                    class="post__sidebar-comments post__sidebar-comments--open"
                    @click="toggleComments"
                />
            </div>
        </div>
        <div class="comments" v-if="showComments">
            <Header4 :text="{ data: 'Comments' }" :theme="{ light: true }" />
            <div v-for="comment in postData.comments" class="comments__wrapper">
                <div class="comments__comment">
                    <button
                        v-if="store.state.user && store.state.user.uid === comment.authorId"
                        class="comments__comment-delete"
                        @click="handleDeleteComment(comment.commentId)"
                    >
                        DELETE
                    </button>
                    <span class="comments__comment-username">{{ comment.authorUsername }}:</span>
                    <span class="text-theme_white text-xs italic mb-2"
                        >{{ formatDistanceToNow(comment.timestamp.toDate()) }} ago</span
                    >
                    <p>{{ comment.comment }}</p>
                </div>
            </div>
            <form @submit.prevent="handleCreateComment" v-if="store.state.user">
                <Label :for="'write-comment'" :data="'Write a comment'" :theme="{ light: true }" />
                <textarea name="write-comment" v-model="commentData" maxlength="120"></textarea>
                <div>
                    <Button :text="'SEND COMMENT'" type="submit" />
                </div>
            </form>
        </div>
    </div>
</template>

<script>
// vue imports
import { onUnmounted, ref } from "vue";
// vuex
import { useStore } from "vuex";

// date-fns
import { formatDistanceToNow, format } from "date-fns";

// hooks
import useVotePost from "../../hooks/add/posts/useVotePost";
import useCheckIfVoted from "../../hooks/get/posts/useCheckIfVoted";
import useAddComment from "../../hooks/add/posts/useAddComment";
import useDeleteComment from "../../hooks/delete/posts/useDeleteComment";
import useDeletePost from "../../hooks/delete/posts/useDeletePost";

// firebase
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/index.js";

// components
import Header4 from "../headers/Header4.vue";
import Label from "../headers/Label.vue";
import Button from "../buttons/Button.vue";

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
        Header4,
        Label,
        Button,
    },
    setup(props) {
        const store = useStore();
        const showComments = ref(false);
        const commentData = ref("");
        let unsub;

        // hooks
        const {
            deleteComment,
            loading: deleteCommentLoading,
            error: deleteCommentError,
        } = useDeleteComment();
        const { deletePost, loading: deletePostLoading, error: deletePostError } = useDeletePost();
        const { addComment, loading: loadingAddingComment, creatingCommentError } = useAddComment();
        const { votePost } = useVotePost();
        const { checkIfVoted, loading, error, votedLiked, votedDisliked } = useCheckIfVoted();

        // if we have an user check if he has voted
        if (store.state.user) {
            checkIfVoted(props.postData.id);
        }
        // check user data
        if (store.state.user) {
            unsub = onSnapshot(doc(db, "users", store.state.user.uid), (docs) => {
                checkIfVoted(props.postData.id);
            });
        }

        const toggleComments = () => {
            showComments.value = !showComments.value;
        };

        const handleCreateComment = () => {
            addComment(props.postData.id, commentData.value);
            commentData.value = "";
        };

        const handleDeleteComment = (commentId) => {
            deleteComment(props.postData.id, commentId);
        };

        const handleDeletePost = () => {
            deletePost(props.postData.id);
        };

        const handleVote = async (shouldIncrement) => {
            if (shouldIncrement) {
                await votePost(props.postData.id, true);
            } else {
                await votePost(props.postData.id, false);
            }
        };

        // unsub from snapShot
        onUnmounted(() => unsub());

        return {
            store,
            loading,
            error,
            votedLiked,
            votedDisliked,
            showComments,
            commentData,
            handleVote,
            handleCreateComment,
            handleDeletePost,
            handleDeleteComment,
            toggleComments,
            formatDistanceToNow,
            format,
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
    &__meta {
        @apply flex flex-wrap items-center  mb-2;
        &-username {
            @apply text-theme_white font-roboto text-sm mr-2;
        }
        &-delete {
            @apply p-2 
            text-theme_white 
            bg-theme_red 
            font-bold 
            text-sm 
            rounded-md
            flex
            items-center
            hover:bg-theme_white 
            hover:text-theme_red;
        }
    }

    &__title {
        @apply text-5xl text-theme_gold mb-4 font-montserrat font-semibold mt-0;
    }
    &__content {
        @apply text-theme_white font-roboto;
    }
    &__sidebar {
        @apply w-20 flex flex-col justify-between items-end pl-2;
        &-votes {
            @apply text-theme_white mb-2;
            svg {
                @apply h-8 w-9;
            }
        }
        &-comments {
            @apply text-theme_white h-10 w-10 cursor-pointer;
            &--open {
                @apply text-theme_gold;
            }
        }
    }
}

.comments {
    @apply w-full 
    max-w-3xl 
    bg-theme_dark_purple 
    mx-auto
    flex
    flex-col
    items-start
    p-6;
    form {
        @apply w-full;
        textarea {
            @apply bg-theme_light_gray w-full;
        }
        div {
            @apply flex justify-end;
        }
    }
    &__wrapper {
        @apply text-theme_white 
        font-roboto;
    }
    &__comment {
        @apply p-2 
        flex
        flex-col
        items-start
        my-2
        border-l-2 
        border-theme_white;
        &-username {
            @apply text-theme_gold text-sm;
        }
        &-delete {
            @apply p-2 
            text-theme_white 
            bg-theme_red 
            font-bold 
            text-sm 
            rounded-md
            flex
            mb-2
            items-center
            hover:bg-theme_white 
            hover:text-theme_red;
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
