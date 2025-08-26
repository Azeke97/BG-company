<script setup lang="ts">
// import ScrollToTop from '~/widgets/scroll-to-top/ScrollToTop.vue'
import { useAppHead } from "~/app/helpers/useAppHead";
import { AppHeader } from "~/widgets/header";
import { Footer } from "~/widgets/footer";

const style = useCssModule();

useAppHead();
</script>

<template>
  <div>
    <div :class="style.layoutDefault">
      <AppHeader />

      <div :class="style.pageContent">
        <slot />
      </div>

      <Footer />
    </div>

    <!--    <ScrollToTop />-->
  </div>
</template>

<style module>
.layoutDefault {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.pageContent {
  flex: 1;
}

.layoutDefault > * {
  width: 100%;
}
</style>
