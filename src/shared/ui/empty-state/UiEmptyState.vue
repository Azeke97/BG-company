<script setup lang="ts">
import type { UiEmptyStateProps } from "./types";

withDefaults(defineProps<UiEmptyStateProps>(), {
  icon: "lucide:inbox",
});
</script>

<template>
  <div :class="$style.empty">
    <Icon :name="icon" :class="$style.icon" />
    <p v-if="title" :class="$style.title">{{ title }}</p>
    <p v-if="text" :class="$style.text">{{ text }}</p>
    <div v-if="$slots.default" :class="$style.action">
      <slot />
    </div>
  </div>
</template>

<style module>
.empty {
  min-height: 240px;
  display: grid;
  place-items: center;
  justify-items: center;
  gap: 8px;
  text-align: center;
  padding: 24px;
}

.icon {
  width: 34px;
  height: 34px;
  color: var(--color-text-secondary-light);
}

.title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-black);
}

.text {
  margin: 0;
  color: var(--color-text-secondary);
  max-width: 420px;
}

.action {
  margin-top: 6px;
}
</style>
