<template>
    <button>
        {{ text }}
    </button>
</template>

<script>
export default {
    props: ["text"],
    setup() {
        return {};
    },
};
</script>

<style lang="scss" scoped>
button {
    @apply rounded 
            p-2 
            font-montserrat 
            font-bold 
            border-theme_dark_purple 
            border-4 
            bg-theme_gold 
            text-2xl 
            mt-4;
    &:hover {
        @apply transition scale-105;
    }
}
</style>
