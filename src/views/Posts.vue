<template>
    <section class="posts">
        <router-link :to="{ name: 'Create_post' }">
            <PushButton
                :data="{ text: 'Create Post', url: 'reddit.com' }"
                :theme="{ dark: true }"
            />
        </router-link>
    </section>
</template>

<script>
// vue imports
import { useRouter } from "vue-router";

// components
import LargeHeader from "../components/headers/LargeHeader.vue";
import PushButton from "../components/buttons/PushButton.vue";

export default {
    components: {
        LargeHeader,
        PushButton,
    },
    setup() {
        const router = useRouter();

        return {};
    },
};
</script>

<style lang="scss" scoped>
.posts {
    @apply mt-16;
}
</style>
