<script setup lang="ts">
import type { UiQuantityStepperProps } from "./types";

const props = withDefaults(defineProps<UiQuantityStepperProps>(), {
  min: 1,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

const canDecrement = computed(() => props.modelValue > props.min);
const canIncrement = computed(() =>
  props.max === undefined ? true : props.modelValue < props.max,
);

const decrement = () => {
  if (canDecrement.value) {
    emit("update:modelValue", props.modelValue - 1);
  }
};

const increment = () => {
  if (canIncrement.value) {
    emit("update:modelValue", props.modelValue + 1);
  }
};
</script>

<template>
  <div :class="$style.stepper">
    <button
      type="button"
      :class="$style.btn"
      :disabled="disabled || !canDecrement"
      @click="decrement"
    >
      <Icon name="lucide:minus" :class="$style.icon" />
    </button>

    <span :class="$style.value">{{ modelValue }}</span>

    <button
      type="button"
      :class="$style.btn"
      :disabled="disabled || !canIncrement"
      @click="increment"
    >
      <Icon name="lucide:plus" :class="$style.icon" />
    </button>
  </div>
</template>

<style module>
.stepper {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.btn {
  width: 28px;
  height: 28px;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-small);
  background: var(--color-background);
  display: grid;
  place-items: center;
  cursor: pointer;
  color: var(--color-text-black);
  padding: 0;
  transition: border-color var(--transition-duration);
}

.btn:hover:not(:disabled) {
  border-color: var(--color-primary);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.icon {
  width: 14px;
  height: 14px;
}

.value {
  min-width: 20px;
  text-align: center;
  font-weight: 600;
  color: var(--color-text-black);
}
</style>
