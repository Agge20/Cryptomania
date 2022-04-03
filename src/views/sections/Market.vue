<template>
  <section class="market" ref="marketToScroll">
    <div class="market__header">
      <LargeHeader
        :text="{ data: 'THE MARKET' }"
        :theme="{ dark: true }"
        class="rotate-90 vertical-column-header"
      />
    </div>
    <div>
      <Error :msg="error" />
    </div>
    <div v-if="loading">
      <MarketSkeleton />
    </div>
    <div class="market__content">
      <div v-if="!loading" class="market__table">
        <table>
          <MarketHead @sort-by-change="sortByChange()" />
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
      <div class="market__pagination-wrapper">
        <Pagination
          @page-change="pageChange"
          :scrollToTop="scrollToTop"
          :currentPage="PAGE"
        />
      </div>
    </div>
  </section>
</template>

<script>
// vue imports
import { ref, watchEffect } from "vue";

// components
import LargeHeader from "../../components/headers/LargeHeader.vue";
import MarketItem from "../../components/market/MarketItem.vue";
import MarketHead from "../../components/market/MarketHead.vue";
import Pagination from "../../components/pagination/Pagination.vue";
import Error from "../../components/error/Error.vue";

// hooks
import useGetMarketData from "../../hooks/get/market/useGetMarketData";

// skeletons
import MarketSkeleton from "../../skeletons/MarketSkeleton.vue";

export default {
  components: {
    LargeHeader,
    MarketItem,
    MarketHead,
    MarketSkeleton,
    Pagination,
    Error,
  },
  setup(props, context) {
    const { getMarketData, marketData, loading, error } = useGetMarketData();
    const PAGE = ref(1);
    const sortOrder = ref(1);
    const originalData = ref([]);
    getMarketData(PAGE.value);
    // get market data every 30 seconds
    let dataTimer = setInterval(() => {
      getMarketData(PAGE.value);
    }, 30000);
    // fetch new coin data on pagination change
    const pageChange = (pageNum) => {
      PAGE.value = pageNum;
      // reset timer
      clearInterval(dataTimer);
      dataTimer = setInterval(() => {
        getMarketData(PAGE.value);
      }, 30000);
      // get data now
      getMarketData(PAGE.value);
    };
    const marketToScroll = ref("marketToScroll");
    const scrollToTop = () => {
      let top = marketToScroll.value.offsetTop;
      top = top - 120;
      window.scrollTo(0, top);
    };

    const sortByChange = async () => {
      /*
        1 = original data
        2 = descending data
        3 = ascending data
      */

      if (marketData.value.length) {
        console.log("sortOrder value: ", sortOrder.value);

        marketData.value.sort((a, b) => {
          if (a.price_change_percentage_24h > b.price_change_percentage_24h) {
            return 1;
          } else {
            return -1;
          }
        });

        switch (sortOrder.value) {
          case 1:
            originalData.value = marketData.value;
            break;
          case 2:
            marketData.value.reverse();
            console.log("ascending...");
            break;
          case 3:
            marketData.value = originalData.value;
            console.log("original data...", originalData.value);

            break;
        }
        if (sortOrder.value < 3) {
          sortOrder.value++;
        } else {
          sortOrder.value = 1;
        }
      }
    };

    return {
      marketData,
      loading,
      error,
      marketToScroll,
      PAGE,
      sortByChange,
      scrollToTop,
      pageChange,
    };
  },
};
</script>

<style lang="scss" scoped>
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
  &__content {
    @apply flex flex-col overflow-auto;
  }
  &__table {
    @apply bg-theme_white overflow-auto;
    table {
      @apply w-full table-fixed;
      min-width: 800px;

      tr {
        @apply table-row;
      }

      tbody {
        tr {
          @apply hover:opacity-80 cursor-pointer transition hover:scale-x-99 duration-100;
        }
      }
    }
  }
  &__pagination-wrapper {
    @apply w-full flex justify-center items-center bg-theme_dark_purple p-6;
  }
}

@media screen and (max-width: 1400px) {
  /* column header */
  .market__header {
    @apply hidden;
  }
}

@media screen and (max-width: 800px) {
  .market__table {
    table {
      @apply table-auto;
    }
  }
}
</style>
