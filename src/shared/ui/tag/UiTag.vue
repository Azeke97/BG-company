<script setup lang="ts">
import type { UiTagProps } from "./types";

withDefaults(defineProps<UiTagProps>(), {
  variant: "neutral",
});
</script>

<template>
  <span :class="[$style.tag, $style[`-${variant}`]]">
    <slot />
  </span>
</template>

<style module>
.tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.2;
  white-space: nowrap;
}

.-success {
  color: var(--color-success);
  background-color: color-mix(in srgb, var(--color-success) 15%, white);
}

.-danger {
  color: var(--color-error);
  background-color: color-mix(in srgb, var(--color-error) 12%, white);
}

.-neutral {
  color: var(--color-text-secondary);
  background-color: var(--color-background-secondary);
}
</style>
