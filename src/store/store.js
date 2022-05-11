import { ref } from "vue";
import { createStore } from "vuex";

// firebase imports
import { auth } from "../firebase/index.js";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
} from "firebase/auth";

const didRun = ref(false);

const store = createStore({
    // global state
    state: {
        user: null,
        authIsReady: false,
        staleMarketData: [],
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
    },
    // to run async-functions code, (here we destructure the payload)
    actions: {
        async register(context, payload) {
            const res = await createUserWithEmailAndPassword(auth, payload.email, payload.password);
            // if user was registered
            if (res) {
                context.commit("setUser", res.user);
            } else {
                throw new Error("could not register user");
            }
        },
        async login(context, payload) {
            const res = await signInWithEmailAndPassword(auth, payload.email, payload.password);
            // if user was logged in
            if (res) {
                context.commit("setUser", res.user);
            } else {
                throw new Error("could not login user");
            }
        },
        async setStaleMarketData(context) {
            if (!didRun.value) {
                console.log("setStaleMarketData ran");
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
    } catch (err) {
        console.log(err);
    }
};

intialFunctions();

// export store
export default store;
