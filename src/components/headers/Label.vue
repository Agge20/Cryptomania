<template>
    <label :for="for" :class="{ dark: theme.dark, light: theme.light }">{{ data }}</label>
</template>

<script>
export default {
    props: ["for", "data", "theme"],
};
</script>

<style lang="scss" scoped>
label {
    @apply text-xl font-medium font-montserrat mt-6 mb-1;
}
.dark {
    @apply text-theme_dark_purple;
}
.light {
    @apply text-theme_white;
}
</style>
