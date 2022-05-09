<template>
    <table>
        <tbody>
            <tr class="bg-theme_light_gray">
                <td>{{ data[0].td_left }}</td>
                <td>{{ data[0].td_right }}</td>
            </tr>
            <tr>
                <td>{{ data[1].td_left }}</td>
                <td>{{ data[1].td_right }}</td>
            </tr>
            <tr class="bg-theme_light_gray">
                <td>{{ data[2].td_left }}</td>
                <td>{{ data[2].td_right }}</td>
            </tr>
            <tr>
                <td>{{ data[3].td_left }}</td>
                <td>{{ data[3].td_right }}</td>
            </tr>
            <tr class="bg-theme_light_gray">
                <td>{{ data[4].td_left }}</td>
                <td>{{ data[4].td_right }}</td>
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
