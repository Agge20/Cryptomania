<template>
    <h2 class="header-lg" :class="{ dark: theme.dark, light: theme.light }">
        {{ text.data }}
    </h2>
</template>

<script>
export default {
    props: ["text", "animate", "theme"],
};
</script>

<style lang="scss" scoped>
.header-lg {
    @apply mb-8 text-7xl text-center font-montserrat font-semibold uppercase;
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
