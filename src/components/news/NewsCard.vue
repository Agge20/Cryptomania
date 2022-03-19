<template>
  <div class="news-card">
    <!-- image wrapper -->
    <div
      @mouseenter="leaveBorderAnimation(false)"
      @mouseleave="leaveBorderAnimation(true)"
      :class="{ border_animation_leave: playLeaveBorder }"
      class="news-card__img"
    >
      <img
        src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      />
    </div>
    <!-- content -->
    <div class="news-card__content">
      <h3>Nifty News: Olympic Games Beijing 2022 edition</h3>
      <p>
        The news from TMX Group arrives as cryptocurrencies are increasingly
        gaining interest from investors and companies.
      </p>
      <div class="news-card__btn">
        <LinkButton :text="{ data: 'Read More' }" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import LinkButton from "../buttons/LinkButton.vue";
export default {
  props: ["article"],
  setup() {
    const playLeaveBorder = ref(false);
    const leaveBorderAnimation = (p) => {
      playLeaveBorder.value = p;
    };
    return {
      playLeaveBorder,
      leaveBorderAnimation,
    };
  },
  components: { LinkButton },
};
</script>

<style lang="scss" scoped>
.news-card {
  min-width: 350px;
  max-width: 500px;
  @apply w-full 
  bg-theme_dark_purple 
  flex 
  flex-col 
  items-start 
  justify-between 
  px-4 
  mx-6 
  mt-12;
  &__img {
    @apply -mt-6 
    overflow-hidden 
    rounded-xl 
    hover:outline-4 
    hover:outline 
    hover:outline-theme_gold 
    transition-all 
    duration-300;
    img {
      @apply h-full hover:scale-110 transition-all duration-300;
    }
  }
  &__content {
    @apply m-1 mt-4 text-theme_white;
    h3 {
      @apply text-2xl font-montserrat;
    }
    p {
      @apply font-roboto mt-2;
    }
  }
  &__btn {
    width: 65%;
  }
}

/* On screens that are 600px or more */
.border_animation_leave {
  animation: border-animation-out 0.3s ease-out;
}

@keyframes border-animation-out {
  0% {
    outline: solid var(--theme-gold) 4px;
  }
  100% {
    outline: solid var(--theme-gold) 0px;
  }
}

@media screen and (max-width: 2000px) {
  .news-card {
    flex-basis: 45% !important;
  }
}

@media screen and (max-width: 1600px) {
  /* Link button wrapper */
  .news-card__btn {
    width: 75% !important;
  }
}

@media screen and (max-width: 550px) {
  /*  news cards */
  .news-card {
    width: 95% !important;
    margin: 0 !important;
    margin-bottom: 64px !important;
  }
}
</style>
