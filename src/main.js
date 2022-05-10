import { createApp } from "vue";

// import vue-router
import { createRouter, createWebHistory } from "vue-router";

// import vuex 4 store
import store from "./store/store.js";

import App from "./App.vue";

// global styling
import "./index.css";

// route views
import Home from "./views/Home.vue";
import Details from "./views/Details.vue";
import RegisterAndLogin from "./views/RegisterAndLogin.vue";
import Watchlist from "./views/Watchlist.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home,
        },
        {
            path: "/details/:id",
            name: "Details",
            component: Details,
        },
        {
            path: "/register-and-login",
            name: "Register_and_login",
            component: RegisterAndLogin,
        },
        {
            path: "/watchlist",
            name: "Watchlist",
            component: Watchlist,
        },
    ],
});

createApp(App).use(router).use(store).mount("#app");
