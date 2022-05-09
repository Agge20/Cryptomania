<template>
    <div class="fixed w-screen z-50">
        <nav class="nav">
            <div class="nav__logo">
                <span>Cryptomania</span>
            </div>
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
                        <router-link :to="{ name: 'Home' }">
                            <li class="nav__link">
                                <Search />
                            </li>
                        </router-link>
                        <router-link :to="{ name: 'Home' }">
                            <li class="nav__link">
                                <News />
                            </li>
                        </router-link>
                        <router-link :to="{ name: 'Home' }">
                            <li class="nav__link">
                                <Watchlist />
                            </li>
                        </router-link>
                        <router-link :to="{ name: 'Home' }">
                            <li class="nav__link">
                                <QuestionMark />
                            </li>
                        </router-link>
                    </ul>
                </div>
            </transition>
            <div
                class="w-12 text-theme_white absolute top-4 right-2 transition duration-150 cursor-pointer lg:hidden z-20"
                @click="toggleNavbar"
            >
                <Burger v-if="!showNavbar" />
                <Close v-if="showNavbar" />
            </div>
            <!-- lg navigation -->
            <div class="hidden lg:block mx-auto">
                <ul class="flex flex-col justify-center items-center lg:flex-row">
                    <router-link :to="{ name: 'Home' }">
                        <li class="nav__link">Home</li>
                    </router-link>
                    <router-link :to="{ name: 'Home' }">
                        <li class="nav__link">Search</li>
                    </router-link>
                    <li class="nav__link">News</li>
                    <li class="nav__link">Watchlist</li>
                    <li class="nav__link">About</li>
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
import Home from "../../svg/Home.vue";
import Search from "../../svg/Search.vue";
import News from "../../svg/News.vue";
import Watchlist from "../../svg/Watchlist.vue";
import QuestionMark from "../../svg/QuestionMark.vue";

// components
import TickertapeWrapper from "../tickertape/TickertapeWrapper.vue";

// vue imports
import { ref } from "vue";

export default {
    components: {
        Burger,
        Close,
        Home,
        Search,
        News,
        Watchlist,
        QuestionMark,
        TickertapeWrapper,
    },

    setup() {
        const showNavbar = ref(false);

        const toggleNavbar = () => {
            console.log("showNavbar: ", showNavbar.value);
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
        return {
            showNavbar,
            toggleNavbar,
            expansionOngoing,
            expansionDone,
            expansionReturning,
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
