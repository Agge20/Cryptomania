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
import News from "./views/News.vue";
import Profile from "./views/Profile.vue";
import Posts from "./views/Posts.vue";
import PostPage from "./views/PostPage.vue";
import CreatePost from "./views/CreatePost.vue";

// route guard
const requireAuth = (to, from, next) => {
    let user = store.state.user;
    if (!user) {
        next({ name: "Home" });
    } else {
        next();
    }
};

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
            beforeEnter: requireAuth,
        },
        {
            path: "/news",
            name: "News",
            component: News,
        },
        {
            path: "/profile",
            name: "Profile",
            component: Profile,
            beforeEnter: requireAuth,
        },
        {
            path: "/posts",
            name: "Posts",
            component: Posts,
        },
        {
            path: "/posts/post/:id",
            name: "PostPage",
            component: PostPage,
        },
        {
            path: "/create-post",
            name: "Create_post",
            component: CreatePost,
            beforeEnter: requireAuth,
        },
    ],
});

createApp(App).use(router).use(store).mount("#app");
