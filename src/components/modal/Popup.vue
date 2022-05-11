<template>
    <div class="popup" :class="{ error: error, success: !error }">
        <h5>{{ msg }}</h5>
    </div>
</template>

<script>
export default {
    props: ["msg", "error"],
    setup() {
        return {};
    },
};
</script>

<style lang="scss" scoped>
.popup {
    @apply w-80 
    max-w-full
    h-auto 
    p-8 
    bg-theme_dark_purple 
    fixed 
    top-2 
    shadow-lg
    font-bold
    text-lg
    mx-auto
    left-0
    right-0
    text-theme_green
    font-montserrat
    text-center;
    animation: popup 5s forwards ease-in-out;
    margin-top: $navbar-height;
}

.error {
    @apply text-theme_red;
}

.success {
    @apply text-theme_green;
}

@keyframes popup {
    0% {
        transform: scale(0);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    10% {
        transform: scale(1);
    }
    90% {
        transform: scale(1);
    }
    100% {
        display: none;
        transform: scale(0);
    }
}
</style>
