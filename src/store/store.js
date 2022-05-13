import { ref, watchEffect } from "vue";
import { createStore } from "vuex";

// firebase imports
import { auth } from "../firebase/index.js";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase/index.js";

// hooks
import useGetNews from "../hooks/get/news/useGetNews.js";

const didRunStaleMarketData = ref(false);
const didRunStaleNewsData = ref(false);

const store = createStore({
    // global state
    state: {
        user: null,
        authIsReady: false,
        staleMarketData: [],
        staleNewsData: [],
    },
    // to change/update/mutate state
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        setAuthIsReady(state, payload) {
            state.authIsReady = payload;
        },
        setStaleMarketData(state, payload) {
            state.staleMarketData = payload;
        },
        setStaleNewsData(state, payload) {
            state.staleNewsData = payload;
        },
    },
    // to run async-functions code, (here we destructure the payload)
    actions: {
        async register(context, payload) {
            try {
                const res = await createUserWithEmailAndPassword(
                    auth,
                    payload.email,
                    payload.password
                );
                // if user was registered
                if (res) {
                    context.commit("setUser", res.user);
                    await setDoc(doc(db, "users", res.user.uid), {
                        favorites: [],
                        votedPosts: [],
                    });
                } else {
                    throw new Error("could not register user...");
                }
            } catch (err) {
                throw new Error(err);
            }
            // create the user document
        },
        async login(context, payload) {
            try {
                const res = await signInWithEmailAndPassword(auth, payload.email, payload.password);
                // if user was logged in
                console.log("RES: ", res);
                if (res.user) {
                    context.commit("setUser", res.user);
                    return "ok";
                } else {
                    throw new Error("could not login user");
                }
            } catch (err) {
                throw new Error(err);
            }
        },
        async setStaleMarketData(context) {
            if (!didRunStaleMarketData.value) {
                let massData = [];
                // fetch data once initially(used where fresh data is not required)
                for (let i = 1; i < 6; i++) {
                    try {
                        const res = await fetch(
                            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${i}&sparkline=false`
                        );

                        if (res.ok) {
                            const data = await res.json();
                            massData.push(data);
                        }
                    } catch (err) {
                        console.log(err);
                    }
                }
                context.commit("setStaleMarketData", massData);
            }
        },
        async setStaleNewsData(context) {
            const { getNewsSnapshot, newsSnapshot, loading, error } = useGetNews();
            if (!didRunStaleNewsData.value) {
                await getNewsSnapshot();

                if (!loading.value && !error.value) {
                    context.commit("setStaleNewsData", newsSnapshot.value);
                }
            }
        },
    },
});

// when auth-state change run function, runs only intially due to unsub
const unsub = onAuthStateChanged(auth, (user) => {
    store.commit("setAuthIsReady", true);
    store.commit("setUser", user);
    unsub();
});

const intialFunctions = async () => {
    try {
        await store.dispatch("setStaleMarketData");
        await store.dispatch("setStaleNewsData");
    } catch (err) {
        console.log(err);
    }
};

intialFunctions();

// export store
export default store;
