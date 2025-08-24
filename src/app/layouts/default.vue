<script setup lang="ts">
// import Header from '~/widgets/header/Header.vue'
// import { AppFooter } from '~/widgets/footer'
// import { initLangModules } from '~/app/lang'
// import ScrollToTop from '~/widgets/scroll-to-top/ScrollToTop.vue'

const style = useCssModule()
</script>

<template>
  <div>
    <div :class="style.layoutDefault">
      <!--      <Header :submenu="isHome" />-->

      <div :class="style.pageContent">
        <slot />
      </div>

      <!--      <AppFooter :show-edit="false" />-->
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
