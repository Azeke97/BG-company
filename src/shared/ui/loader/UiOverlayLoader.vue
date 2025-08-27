<script setup lang="ts">
import UiLoader from "~/shared/ui/loader/UiLoader.vue";
</script>

<template>
  <div :class="$style.overlay">
    <UiLoader />
  </div>
</template>

<style module>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-overlay-light);
}
</style>
