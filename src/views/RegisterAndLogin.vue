<template>
    <section>
        <div>
            <LargeHeader :text="{ data: 'Login' }" :theme="{ dark: true }" />
            <form @submit.prevent="handleLogin">
                <Label :for="'email'" :data="'Email'" :theme="{ dark: true }" />
                <input
                    type="email"
                    name="email"
                    placeholder="example@mail.com"
                    v-model="loginEmail"
                />
                <Label :for="'password'" :data="'Password'" :theme="{ dark: true }" />
                <input type="password" name="password" v-model="loginPassword" />
                <Button :text="'Login'" />

                <Error v-if="loginError" :msg="loginError" />
            </form>
        </div>
        <div>
            <LargeHeader :text="{ data: 'Register' }" :theme="{ dark: true }" />
            <form @submit.prevent="handleRegister">
                <Label :for="'email'" :data="'Email'" :theme="{ dark: true }" />
                <input
                    type="email"
                    name="email"
                    placeholder="example@mail.com"
                    v-model="registerEmail"
                />
                <Label :for="'password'" :data="'Password'" :theme="{ dark: true }" />
                <input type="password" name="password" v-model="registerPassword" />
                <Button :text="'Register'" />
                <Error v-if="registerError" :msg="registerError" />
            </form>
        </div>
    </section>
</template>

<script>
// vue imports
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

// headers
import LargeHeader from "../components/headers/LargeHeader.vue";
import Label from "../components/headers/Label.vue";

// components
import Error from "../components/error/Error.vue";
import Button from "../components/buttons/Button.vue";

export default {
    components: {
        LargeHeader,
        Label,
        Error,
        Button,
    },
    setup() {
        const loginError = ref(null);
        const registerError = ref(null);

        // vuex
        const store = useStore();

        // vue-router
        const router = useRouter();

        // binds
        const loginEmail = ref("");
        const loginPassword = ref("");
        const registerEmail = ref("");
        const registerPassword = ref("");

        const handleRegister = async () => {
            try {
                await store.dispatch("register", {
                    email: registerEmail.value,
                    password: registerPassword.value,
                });
                loginEmail.value = registerEmail.value;
                loginPassword.value = registerPassword.value;
                registerEmail.value = "";
                registerPassword.value = "";
            } catch (err) {
                registerError.value = err.message;
            }
        };
        const handleLogin = () => {
            try {
                store.dispatch("login", {
                    email: loginEmail.value,
                    password: loginPassword.value,
                });
                loginEmail.value = "";
                loginPassword.value = "";
                router.push("/profile");
            } catch (err) {
                registerError.value = err.message;
            }
        };

        return {
            loginError,
            loginEmail,
            loginPassword,
            registerError,
            registerEmail,
            registerPassword,
            handleRegister,
            handleLogin,
        };
    },
};
</script>

<style lang="scss" scoped>
section {
    @apply w-full 
    flex flex-col 
    justify-center 
    flex-wrap 
    items-center  
    min-h-full;
}

div {
    h2:first-child {
        @apply mt-16;
    }
}
form {
    @apply flex flex-col p-12 pt-0 w-full max-w-2xl;
    input {
        @apply border-4 
            border-theme_dark_purple 
            outline-theme_gold 
            rounded
            p-2
            indent-2;
        &:focus {
            @apply border-2 border-theme_gold outline-none;
        }
    }
}
</style>
