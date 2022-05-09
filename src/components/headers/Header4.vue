<template>
    <h4 class="header-4" :class="{ dark: theme.dark, light: theme.light, no_mb: !mb.option }">
        {{ text.data }}
    </h4>
</template>

<script>
export default {
    props: ["text", "theme", "mb"],
};
</script>

<style lang="scss" scoped>
.header-4 {
    @apply mb-8 text-2xl text-center font-montserrat font-medium;
}
.no_mb {
    @apply mb-0;
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
