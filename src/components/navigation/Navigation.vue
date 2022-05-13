<template>
    <div class="fixed w-screen z-50">
        <nav class="nav">
            <router-link :to="{ name: 'Home' }">
                <div v-if="!showSearch" class="nav__logo">
                    <span>Cryptomania</span>
                </div>
            </router-link>

            <!-- mobile navigation -->
            <transition
                name="expand"
                @before-enter="expansionOngoing"
                @after-enter="expansionDone"
                @before-leave="expansionReturning"
            >
                <div
                    v-if="showNavbar"
                    class="bg-theme_dark_purple flex justify-center lg:min-h-0 lg:h-20 min-h-screen absolute right-0 lg:hidden z-10"
                >
                    <ul class="flex flex-col justify-center items-center lg:flex-row">
                        <router-link :to="{ name: 'Home' }">
                            <li class="nav__link">
                                <Home />
                            </li>
                        </router-link>

                        <router-link :to="{ name: 'News' }">
                            <li class="nav__link">
                                <News />
                            </li>
                        </router-link>
                        <router-link :to="{ name: 'Watchlist' }" v-if="store.state.user">
                            <li class="nav__link">
                                <WatchlistIcon />
                            </li>
                        </router-link>
                        <router-link :to="{ name: 'Posts' }">
                            <li class="nav__link">
                                <Document />
                            </li>
                        </router-link>
                    </ul>
                </div>
            </transition>
            <div class="nav__right-wrapper z-20">
                <CloseCircle
                    v-if="showSearch"
                    class="text-theme_white cursor-pointer"
                    @click="showSearch = !showSearch"
                />

                <Search
                    v-if="!showSearch"
                    class="text-theme_white cursor-pointer h-10 w-10"
                    @click="showSearch = !showSearch"
                />
                <div v-if="showSearch" class="flex flex-col mx-2 mt-1">
                    <input
                        v-model="searchInput"
                        class="border-2 border-theme_gold focus:outline-none rounded-sm"
                    />
                    <div v-if="finds" class="shadow-md border-l-2 bg-theme_white">
                        <div
                            @click="
                                () => {
                                    handleCoinRedirect(find.id);
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
                <router-link v-if="!store.state.user" :to="{ name: 'Register_and_login' }">
                    <User class="text-theme_white mr-2 transition hover:scale-105" />
                </router-link>
                <router-link v-if="store.state.user" :to="{ name: 'Profile' }">
                    <User class="text-theme_gold mr-2 transition hover:scale-105" />
                </router-link>
                <div class="nav__burger" @click="toggleNavbar">
                    <Burger v-if="!showNavbar" />
                    <Close v-if="showNavbar" />
                </div>
            </div>

            <!-- lg navigation -->
            <div class="hidden lg:block mx-auto">
                <ul class="flex flex-col justify-center items-center lg:flex-row">
                    <router-link :to="{ name: 'Home' }">
                        <li class="nav__link">Home</li>
                    </router-link>
                    <router-link :to="{ name: 'News' }">
                        <li class="nav__link">News</li>
                    </router-link>
                    <router-link :to="{ name: 'Watchlist' }" v-if="store.state.user">
                        <li class="nav__link">Watchlist</li>
                    </router-link>
                    <router-link :to="{ name: 'Posts' }">
                        <li class="nav__link">Posts</li>
                    </router-link>
                </ul>
            </div>
        </nav>
        <TickertapeWrapper />
    </div>
</template>

<script>
// svg imports
import Burger from "../../svg/Burger.vue";
import Close from "../../svg/Close.vue";
import CloseCircle from "../../svg/CloseCircle.vue";
import Home from "../../svg/Home.vue";
import Document from "../../svg/Document.vue";
import News from "../../svg/News.vue";
import WatchlistIcon from "../../svg/Watchlist.vue";
import QuestionMark from "../../svg/QuestionMark.vue";
import User from "../../svg/User.vue";
import Search from "../../svg/Search.vue";

// components
import TickertapeWrapper from "../tickertape/TickertapeWrapper.vue";

// views
import Watchlist from "../../views/Watchlist.vue";

// vue imports
import { ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
    components: {
        Burger,
        Close,
        CloseCircle,
        Home,
        Document,
        News,
        Search,
        WatchlistIcon,
        Watchlist,
        QuestionMark,
        TickertapeWrapper,
        User,
    },

    setup() {
        // vuex
        const store = useStore();
        //vue router
        const router = useRouter();
        const showNavbar = ref(false);
        const searchInput = ref("");
        const showSearch = ref(false);
        const finds = ref([]);

        // functions
        const toggleNavbar = () => {
            showNavbar.value = !showNavbar.value;
        };

        // remove the nav-links before animation starts
        const expansionOngoing = (el) => {
            el.children[0].style.display = "none";
        };
        // when expansion animation is done, show nav-links
        const expansionDone = (el) => {
            el.children[0].style.display = "flex";
        };
        // remove the nav-links before the closing animation runs
        const expansionReturning = (el) => {
            el.children[0].style.display = "none";
        };

        const handleCoinRedirect = (coinId) => {
            router.push(`/details/${coinId}`);
            showSearch.value = false;
        };

        watchEffect(() => {
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

        return {
            showNavbar,
            store,
            searchInput,
            showSearch,
            finds,
            toggleNavbar,
            expansionOngoing,
            expansionDone,
            expansionReturning,
            handleCoinRedirect,
        };
    },
};
</script>

<style lang="scss" scoped>
@import url("../../index.css");

.nav {
    @apply bg-theme_dark_purple h-20 p-5 flex lg:items-center z-10;
    &__logo {
        @apply h-20 absolute top-0 flex justify-center items-center uppercase text-theme_white font-montserrat font-medium text-xl z-10;
    }
    &__link {
        @apply text-theme_white 
    uppercase 
    font-semibold 
    font-montserrat 
    tracking-wide 
    text-xl 
    mx-6 
    my-2 
    lg:my-0 
    cursor-pointer 
    transition 
    duration-100 
    hover:scale-105;
    }
    &__right-wrapper {
        @apply absolute 
        top-4 
        right-2
        flex
        items-start;
    }
    &__burger {
        @apply w-12 
        text-theme_white 
        transition 
        duration-150 
        cursor-pointer 
        lg:hidden z-20;
    }
}

.expand-enter-from {
    min-width: 0;
}

.expand-enter-to {
    min-width: 80px;
}
.expand-enter-active {
    transition: 0.5s ease-out;
}
.expand-leave-from {
    min-width: 80px;
}
.expand-leave-to {
    min-width: 0;
}
.expand-leave-active {
    transition: 0.5s ease-out;
}
</style>
