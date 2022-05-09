<template>
    <h2 class="header-2" :class="{ dark: theme.dark, light: theme.light }">
        {{ text.data }}
    </h2>
</template>

<script>
export default {
    props: ["text", "theme"],
};
</script>

<style lang="scss" scoped>
.header-2 {
    @apply mb-8 text-5xl text-center font-montserrat font-semibold;
}
.dark {
    @apply text-theme_dark_purple;
}
.light {
    @apply text-theme_white;
}

@media screen and (max-width: $breakpoint-mobile) {
    .header-lg {
        @apply mb-8 mx-0;
    }
}
</style>
