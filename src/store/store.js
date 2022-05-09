import { createStore } from "vuex";

// firebase imports
import { auth } from "../firebase/index.js";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
} from "firebase/auth";

const store = createStore({
    // global state
    state: {
        user: null,
        authIsReady: false,
    },
    // to change/update/mutate state
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        setAuthIsReady(state, payload) {
            state.authIsReady = payload;
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
    },
});

// when auth-state change run function, runs only intially due to unsub
const unsub = onAuthStateChanged(auth, (user) => {
    store.commit("setAuthIsReady", true);
    store.commit("setUser", user);
    unsub();
});

// export store
export default store;
