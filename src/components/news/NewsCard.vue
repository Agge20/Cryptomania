<template>
  <div
    class="w-full bg-theme_dark_purple flex flex-col items-start justify-between px-4 m-6"
  >
    <!-- image wrapper -->
    <div
      @mouseenter="leaveBorderAnimation(false)"
      @mouseleave="leaveBorderAnimation(true)"
      :class="{ border_animation_leave: playLeaveBorder }"
      class="-mt-6 overflow-hidden rounded-lg hover:outline-4 hover:outline hover:outline-theme_gold transition-all duration-300"
    >
      <img
        class="h-full hover:scale-110 transition-all duration-300"
        src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      />
    </div>
    <!-- content -->
    <div class="m-1 mt-4">
      <h3 class="text-theme_gold text-2xl font-montserrat">
        Nifty News: Olympic Games Beijing 2022 edition
      </h3>
      <p class="text-theme_white font-roboto mt-2">
        The news from TMX Group arrives as cryptocurrencies are increasingly
        gaining interest from investors and companies.
      </p>
      <div class="btn-wrapper">
        <LinkButton :text="{ data: 'Read More' }" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import LinkButton from "../LinkButton.vue";
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

<style scoped>
/* On screens that are 600px or more */
.border_animation_leave {
  animation: border-animation-out 0.3s ease-out;
}

.btn-wrapper {
  width: 50%;
}

@keyframes border-animation-out {
  0% {
    outline: solid var(--theme-gold) 4px;
  }
  100% {
    outline: solid var(--theme-gold) 0px;
  }
}
@media screen and (max-width: 1600px) {
  /* Link button wrapper */
  .btn-wrapper {
    width: 65% !important;
  }
}
</style>
