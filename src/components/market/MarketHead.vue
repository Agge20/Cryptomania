<template>
  <thead>
    <tr>
      <th>Name</th>
      <th>Price</th>
      <th>
        Change
        <span>24H</span>
      </th>
      <th>
        High
        <span>24H</span>
      </th>
      <th>
        Low
        <span>24H</span>
      </th>
      <th>Marketcap</th>
      <th>Rank</th>
    </tr>
  </thead>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
thead {
  @apply pt-4 bg-theme_dark_purple;
  tr {
    @apply bg-theme_dark_purple
          text-theme_white
          h-24 text-2xl
          uppercase
          font-montserrat
          align-middle;
    th {
      @apply py-1 align-top pt-8;
      span {
        @apply block text-base font-medium leading-3;
      }
    }
    th:first-child {
      @apply pl-6;
    }
  }
}

tr:first-of-type {
  @apply text-left;
  // rank
  th:last-child {
    @apply text-center;
  }
}
tr {
  @apply table-row;
  th:first-child {
    @apply pl-2;
  }
}
tr:first-of-type th:first-child {
  @apply bg-theme_dark_purple sticky left-0;
}

@media screen and (max-width: 1200px) {
  thead {
    tr {
      @apply bg-theme_dark_purple text-theme_white h-24 text-base uppercase font-montserrat align-middle;
    }
  }
}

@media screen and (max-width: 800px) {
  tr:first-of-type th:first-child {
    @apply pl-4;
  }
}
</style>
