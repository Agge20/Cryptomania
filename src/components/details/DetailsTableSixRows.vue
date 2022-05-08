<template>
    <table>
        <tbody>
            <tr class="bg-theme_light_gray">
                <td>Type</td>
                <td>Cryptocurrency</td>
            </tr>
            <tr>
                <td>Change</td>
                <td class="text-theme_green">+$2434</td>
            </tr>
            <tr class="bg-theme_light_gray">
                <td>Marketcap</td>
                <td>$123821319831</td>
            </tr>
            <tr>
                <td>Fully diluted</td>
                <td>$2123821319831</td>
            </tr>
            <tr class="bg-theme_light_gray">
                <td>Total volume</td>
                <td>$2123821319831</td>
            </tr>
            <tr>
                <td>Country of origin</td>
                <td>Sweden</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    props: ["data"],
    setup() {
        return {};
    },
};
</script>

<style lang="scss" scoped>
table {
    @apply w-full 
    border-y-2 
    border-theme_dark_gray;
    tr {
        @apply flex justify-between;
        td {
            @apply p-4
            font-roboto
            font-light;
        }
    }
}
</style>
