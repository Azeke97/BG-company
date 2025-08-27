<script setup lang="ts">
import { ElCheckbox } from "element-plus";
import { useId, computed } from "vue";
import type { CheckboxProps } from "~/shared/ui/checkbox/types";

const props = defineProps<CheckboxProps>();
const emit = defineEmits<{
  (e: "update:modelValue", value: boolean | string | number): void;
}>();

const uid = useId();
const checkboxId = computed(() => props.id ?? `checkbox-${uid}`);
const hasError = computed(() => typeof props.error === "string" || props.error);
</script>

<template>
  <div :class="['ui-checkbox', { '-full': fullWidth, '-error': hasError }]">
    <ElCheckbox
      v-bind="props"
      :id="checkboxId"
      class="ui-checkbox__el"
      :name="props.name ?? checkboxId"
      :model-value="modelValue"
      :label="props.labelValue ?? true"
      :false-label="0"
      :indeterminate="indeterminate"
      :disabled="disabled"
      :readonly="readonly"
      :size="size"
      @update:model-value="(val) => emit('update:modelValue', val)"
    >
      <template v-if="label">
        <span class="ui-checkbox__label">{{ label }}</span>
      </template>
    </ElCheckbox>

    <p v-if="hasError" class="ui-checkbox__message -error">
      {{ typeof error === "string" ? error : "Ошибка" }}
    </p>
    <p v-else-if="hint" class="ui-checkbox__message -hint">
      {{ hint }}
    </p>
  </div>
</template>

<style scoped>
@import "./style.css";

.ui-checkbox {
  display: flex;
  flex-direction: column;
  font-size: var(--font-size-small);
}

.ui-checkbox__el {
  display: flex;
  align-items: center;
}

.ui-checkbox.-full {
  width: max-content;
}

.ui-checkbox__label {
  margin-left: 8px;
  font-size: 14px;
  color: var(--color-text-primary);
}

.ui-checkbox__message {
  font-size: var(--font-size-small);
  margin-top: 4px;
}

.ui-checkbox__message.-error {
  color: var(--el-color-danger);
}

.ui-checkbox__message.-hint {
  color: var(--color-text-secondary);
}
</style>
