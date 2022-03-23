<template>
  <section class="market">
    <div class="market__header">
      <LargeHeader
        :text="{ data: 'THE MARKET' }"
        :theme="{ dark: true }"
        class="rotate-90 vertical-column-header"
      />
    </div>
    <div v-if="loading">
      <MarketSkeleton />
    </div>
    <div v-if="!loading" class="market__table">
      <table>
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
        <tbody>
          <tr
            v-for="(coinData, index) in marketData"
            :class="{
              'bg-theme_light_gray': index % 2 == 0,
              'animate-pulse': loading,
            }"
          >
            <MarketItem :coinData="coinData" :key="index" :indexNum="index" />
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
// vue imports
import { ref } from "vue";

// components
import LargeHeader from "../../components/headers/LargeHeader.vue";
import MarketItem from "../../components/market/MarketItem.vue";

// hooks
import useGetMarketData from "../../hooks/get/market/useGetMarketData";

// skeletons
import MarketSkeleton from "../../skeletons/MarketSkeleton.vue";

export default {
  components: {
    LargeHeader,
    MarketItem,
    MarketSkeleton,
  },
  setup() {
    const { getMarketData, marketData, loading, error } = useGetMarketData();
    const PAGE = ref(1);
    getMarketData(PAGE.value);
    // get market data every 20 seconds
    setInterval(() => {
      getMarketData(PAGE.value);
    }, 20000);
    return {
      marketData,
      loading,
    };
  },
};
</script>

<style lang="scss" scoped>
@import url("../../index.css");
table {
  min-width: 800px;
}

.market {
  @apply flex items-start;
  &__header {
    @apply w-96 
    flex 
    items-center
    justify-center
    whitespace-nowrap
    relative 
    left-0;
  }
  &__table {
    @apply bg-theme_white overflow-auto;
    table {
      @apply w-full table-fixed;
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
      tbody {
        tr {
          @apply hover:opacity-80 cursor-pointer;
        }
      }
    }
  }
}

@media screen and (max-width: 1400px) {
  /* column header */
  .market__header {
    @apply hidden;
  }
}

@media screen and (max-width: 1200px) {
  .market__table {
    table {
      thead {
        tr {
          @apply bg-theme_dark_purple text-theme_white h-24 text-base uppercase font-montserrat align-middle;
        }
      }
    }
  }
}

@media screen and (max-width: 800px) {
  .market__table {
    table {
      @apply table-auto;
    }
  }
  tr:first-of-type th:first-child {
    @apply pl-0;
  }
}
</style>
