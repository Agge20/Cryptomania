<template>
    <Navigation v-if="authIsReady" />
    <main data-server-rendered="true" class="flex flex-col mx-auto">
        <router-view v-if="authIsReady" />
        <RollerLoader v-if="!authIsReady" :color="{ dark: true }" class="m-auto" />
    </main>
    <Footer />
</template>

<script>
// vue imports
import { computed } from "vue";
import { useStore } from "vuex";

// components
import Navigation from "./components/navigation/Navigation.vue";
import RollerLoader from "./components/loader/RollerLoader.vue";
import Footer from "./components/footer/Footer.vue";

export default {
    components: { Navigation, RollerLoader, Footer },
    setup() {
        const store = useStore();

        return {
            authIsReady: computed(() => store.state.authIsReady),
        };
    },
};
</script>

<style>
@import "./index.css";
</style>
