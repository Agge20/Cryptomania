<template>
    <section class="profile" v-if="store.state.user">
        <img
            class="profile__image"
            src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="profile-page"
        />
        <div class="profile__content">
            <div>
                <Header4 :text="{ data: 'Welcome,' }" :theme="{ dark: true }" />

                <Header2 :text="{ data: store.state.user.email }" :theme="{ dark: true }" />
            </div>
            <div>
                <p>BTC:</p>
                <p>djsajdsadiua90d8a07dsa67d6a7d6a786da78d56a65dada9867da</p>
            </div>
            <Button :text="'Logout'" @click="signOutNow" />
        </div>
    </section>
</template>

<script>
// vue imports
import { useStore } from "vuex";
import { useRouter } from "vue-router";

// firebase
import { signOut } from "firebase/auth";
import { auth } from "../firebase/index";

// components
import Header2 from "../components/headers/Header2.vue";
import Header4 from "../components/headers/Header4.vue";
import Button from "../components/buttons/Button.vue";

export default {
    components: {
        Header2,
        Header4,
        Button,
    },
    setup() {
        const store = useStore();
        const router = useRouter();

        const signOutNow = () => {
            console.log("signoutran");
            signOut(auth)
                .then(() => {
                    store.commit("setUser", null);
                    router.push("/");
                })
                .catch((error) => {
                    console.log("error: ", error);
                });
        };

        return { store, signOutNow };
    },
};
</script>

<style lang="scss" scoped>
.profile {
    @apply flex items-start justify-center mt-16 w-full;
    * {
        @apply m-2;
    }
    &__image {
        @apply max-w-xxs 
        h-16 
        w-16 
        rounded-full 
        border-2 
        object-cover;
    }
    &__content {
        @apply break-words;
        h2,
        h4 {
            @apply my-0  text-left;
        }
        h4 {
            @apply text-left;
        }
    }
}

@media screen and (max-width: $breakpoint-mobile) {
    .profile {
        @apply flex-col  items-start;
        &__image {
            @apply max-w-xxs 
        h-32 
        w-32;
        }
        &__content {
            @apply w-full;
        }
    }
}
</style>
