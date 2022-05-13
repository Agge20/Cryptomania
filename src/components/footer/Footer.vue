<template>
    <footer class="footer">
        <h3>Cryptomania - Made by August R.R</h3>
    </footer>
</template>

<script>
export default {
    setup() {
        return {};
    },
};
</script>

<style lang="scss" scoped>
.footer {
    @apply min-h-xss
        bg-theme_dark_purple
        flex
        justify-center
        items-center
        mt-32
        p-6;
    h3 {
        @apply text-theme_white text-xl font-montserrat text-center;
    }
}
</style>
