<template>
    <section>
        <LargeHeader :text="{ data: 'Create Post' }" :theme="{ dark: true }" />

        <form @submit.prevent="handleLogin">
            <Label :for="'title'" :data="'Title'" :theme="{ dark: true }" />
            <input type="text" name="title" v-model="titleInput" />
            <Label :for="'password'" :data="'Text Content'" :theme="{ dark: true }" />
            <textarea v-model="textInput"></textarea>
            <Label :for="'category'" :data="'Coin Category:'" :theme="{ dark: true }" />
            <div>
                <div class="flex items-center bg-theme_dark_purple p-2 text-white rounded-sm mb-2">
                    <img class="w-5 h-5 mr-2" :src="selectedCategory.image" alt="" />
                    <p>{{ selectedCategory.name }}</p>
                </div>
                <input
                    name="category"
                    type="text"
                    placeholder="search crypto..."
                    v-model="searchInput"
                    class="w-full rounded-none"
                />
                <div v-if="finds" class="shadow-md border-l-2">
                    <div
                        @click="
                            () => {
                                selectedCategory = find;
                            }
                        "
                        v-for="find in finds.slice(0, 5)"
                        class="hover:bg-theme_light_gray flex items-center justify-start p-2 cursor-pointer"
                    >
                        <img class="w-8 h-8 mr-2" :src="find.image" alt="" />
                        <p>{{ find.name }}</p>
                    </div>
                </div>
            </div>

            <Button v-if="selectedCategory && titleInput.length > 0" :text="'CREATE POST'" />
        </form>
    </section>
</template>

<script>
// vue imports
import { watchEffect, ref } from "vue";
import { useStore } from "vuex";

// components
import Label from "../components/headers/Label.vue";
import Error from "../components/error/Error.vue";
import Button from "../components/buttons/Button.vue";
import LargeHeader from "../components/headers/LargeHeader.vue";

export default {
    components: {
        Label,
        Error,
        Button,
        LargeHeader,
    },
    setup() {
        // vuex
        const store = useStore();

        const selectedCategory = ref("");

        const titleInput = ref("");
        const textInput = ref("");
        const searchInput = ref("");
        const finds = ref([]);
        // watch the search input and loop through the stale data and find matches
        watchEffect(() => {
            console.log("selected category now: ", selectedCategory.value);
            finds.value = [];
            for (let i = 0; i < store.state.staleMarketData.length; i++) {
                for (let y = 0; y < store.state.staleMarketData[i].length; y++) {
                    if (
                        store.state.staleMarketData[i][y].id.includes(
                            searchInput.value.toLowerCase()
                        )
                    ) {
                        finds.value.push(store.state.staleMarketData[i][y]);
                    }
                }
            }
        });

        return { searchInput, titleInput, textInput, finds, selectedCategory };
    },
};
</script>

<style lang="scss" scoped>
form {
    @apply flex flex-col p-12 pt-0 w-full max-w-2xl;
    input,
    textarea {
        @apply border-2
            rounded
            p-2
            indent-2;
        &:focus {
            @apply border-2 border-theme_gold outline-none;
        }
    }
}

@media screen and (max-width: $breakpoint-mobile) {
    form {
        @apply p-2;
    }
}
</style>
