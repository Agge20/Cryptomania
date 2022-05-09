import { createStore } from "vuex";

const store = createStore({
    // global state
    state: {
        user: null,
    },
    // to change/update/mutate state
    mutations: {
        setUser(state, payload) {
            state.user = payload;
            console.log("user state changed... ", state.user);
        },
    },
    // to run async-functions code, (here we destructure the payload)
    actions: {
        signup(context, payload) {
            console.log("signup action...");

            // async code
            setTimeout(() => {
                context.commit("setUser", {
                    email,
                    password,
                });
            }, 2000);
        },
    },
});

// export store
export default store;
