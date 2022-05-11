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
import Profile from "./views/Profile.vue";
import Posts from "./views/Posts.vue";
import Post from "./views/Post.vue";
import CreatePost from "./views/CreatePost.vue";

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
        {
            path: "/profile",
            name: "Profile",
            component: Profile,
        },
        {
            path: "/posts",
            name: "Posts",
            component: Posts,
        },
        {
            path: "/posts/post/:id",
            name: "Post",
            component: Post,
        },
        {
            path: "/create-post",
            name: "Create_post",
            component: CreatePost,
        },
    ],
});

createApp(App).use(router).use(store).mount("#app");
