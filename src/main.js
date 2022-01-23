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

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
  ],
});

createApp(App).use(router).use(store).mount("#app");
