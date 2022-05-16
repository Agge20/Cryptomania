<template>
    <section class="profile" v-if="store.state.user">
        <div class="profile__content">
            <div>
                <Header4 :text="{ data: 'Welcome,' }" :theme="{ dark: true }" />

                <Header2 :text="{ data: store.state.user.email }" :theme="{ dark: true }" />
            </div>
            <Button class="mx-auto block" :text="'Logout'" @click="signOutNow" />
        </div>
        <div v-for="post in postsData" class="posts__wrapper">
            <Post :postData="post" />
        </div>
    </section>
</template>

<script>
// vue imports
import { onUnmounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

// firebase
import { signOut } from "firebase/auth";
import { auth } from "../firebase/index";

// components
import Post from "../components/posts/Post.vue";
import Header2 from "../components/headers/Header2.vue";
import Header4 from "../components/headers/Header4.vue";
import Button from "../components/buttons/Button.vue";

// hooks
import useGetUserPosts from "../hooks/get/posts/useGetUserPosts";

export default {
    components: {
        Post,
        Header2,
        Header4,
        Button,
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        const { getPosts, error, loading, postsData, unsubFromSnapshot } = useGetUserPosts();

        getPosts();

        const signOutNow = () => {
            signOut(auth)
                .then(() => {
                    store.commit("setUser", null);
                    router.push("/");
                })
                .catch((error) => {
                    console.log("error: ", error);
                });
        };

        // unsubsribe to snapShot on unmount
        onUnmounted(() => {
            if (postsData.value.length) {
                unsubFromSnapshot();
            }
        });
        return { store, signOutNow, postsData };
    },
};
</script>

<style lang="scss" scoped>
.profile {
    @apply flex flex-col items-center justify-center mt-16 w-full;
    * {
        @apply m-2;
    }
    &__image {
        @apply max-w-xxs 
        h-16 
        w-16 
        rounded-full 
        border-2 
        object-cover;
    }
    &__content {
        @apply break-words;
        h2,
        h4 {
            @apply my-0  text-left;
        }
        h4 {
            @apply text-left;
        }
    }
}

.post__wrapper {
    @apply w-full;
}

@media screen and (max-width: $breakpoint-mobile) {
    .profile {
        @apply flex-col  items-start;
        &__image {
            @apply max-w-xxs 
        h-32 
        w-32;
        }
        &__content {
            @apply w-full;
        }
    }
}
</style>
