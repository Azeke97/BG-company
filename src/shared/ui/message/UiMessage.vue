<script setup lang="ts">
import type { UiMessageProps } from "./types";

defineProps<UiMessageProps>();
</script>

<template>
  <div :class="[$style.message, `-${type}`, full ? '-full' : '']">
    <slot />
  </div>
</template>

<style module>
.message {
  padding: 1rem;
  border-width: 1px;
  border-style: solid;
  border-radius: 0.25rem;
  text-align: center;

  &:global(.-error) {
    color: var(--color-text-error-dark);
    background-color: var(--color-background-error);
    border-color: var(--color-border-error);
  }

  &:global(.-full) {
    width: 100%;
  }
}
</style>
