<script setup lang="ts">
import { ElDatePicker } from "element-plus";
import { useId, computed } from "vue";
import type { DatePickerProps } from "./types";
import { Calendar } from "@element-plus/icons-vue";

const props = defineProps<DatePickerProps>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string | Date | null): void;
}>();

const uid = useId();
const inputId = computed(() => props.id ?? `datepicker-${uid}`);
const hasError = computed(() => typeof props.error === "string" || props.error);
</script>

<template>
  <div
    :class="[
      'ui-datepicker',
      { '-error': hasError, '-size-sm': size === 'small' },
    ]"
  >
    <label v-if="label" :for="inputId" class="ui-datepicker__label">{{
      label
    }}</label>

    <ElDatePicker
      v-bind="props"
      :id="inputId"
      :model-value="modelValue"
      :prefix-icon="Calendar"
      :type="type || 'date'"
      value-format="yyyy-MM-dd"
      :placeholder="placeholder"
      :clearable="clearable"
      :disabled="disabled"
      :readonly="readonly"
      :size="size"
      :name="props.name ?? inputId"
      :class="{ 'is-error': hasError }"
      @update:model-value="(val) => emit('update:modelValue', val)"
    >
    </ElDatePicker>

    <p v-if="hasError" class="ui-input__error">
      {{ typeof error === "string" ? error : "Ошибка" }}
    </p>

    <p v-else-if="hint" class="ui-input__hint">
      {{ hint }}
    </p>
  </div>
</template>

<style scoped>
@import "./style.css";

.ui-datepicker {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ui-datepicker__label {
  display: block;
  color: var(--color-text-primary);
  font-size: var(--font-size);
  font-weight: 400;
  margin-bottom: 6px;
}

.ui-input__error {
  color: var(--el-color-danger);
  font-size: var(--font-size-small);
  margin-top: 4px;
}

.ui-input__hint {
  color: var(--color-text-secondary);
  font-size: var(--font-size-small);
  margin-top: 4px;
}
</style>
