<script setup lang="ts">
import type { UiCardProps } from "./types";

withDefaults(defineProps<UiCardProps>(), {
  tag: "div",
  padding: "16px",
  hoverable: false,
});
</script>

<template>
  <component
    :is="tag"
    :class="[$style.card, { [$style.hoverable]: hoverable }]"
    :style="{ padding }"
  >
    <slot />
  </component>
</template>

<style module>
.card {
  display: block;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  background: var(--color-background);
  box-sizing: border-box;
}

.hoverable {
  transition:
    box-shadow var(--transition-duration),
    border-color var(--transition-duration);
}

.hoverable:hover {
  border-color: var(--color-border-hover);
  box-shadow: 0 8px 20px var(--color-shadow);
}
</style>
