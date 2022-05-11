<template>
    <Popup v-if="error" :msg="error" :error="true" />
    <RollerLoader v-if="loading" :color="{ dark: true }" class="m-auto" />

    <section v-if="!loading && postData">
        <Post :postData="postData" />
    </section>
</template>

<script>
// vue imports
import { useRoute } from "vue-router";

// hooks
import useGetPost from "../hooks/get/posts/useGetPost";

// components
import Post from "../components/posts/Post.vue";
import RollerLoader from "../components/loader/RollerLoader.vue";
import Popup from "../components/modal/Popup.vue";

export default {
    components: {
        Post,
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
</style>
