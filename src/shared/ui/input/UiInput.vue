<script setup lang="ts">
import { ElInput } from 'element-plus'
import type { InputProps } from './types'
import { useId, computed } from 'vue'

const props = defineProps<InputProps>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const uid = useId()
const inputId = computed(() => props.id ?? `input-${uid}`)

const handleInput = (value: string) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <div :class="['ui-input', { '-full': fullWidth }]">
    <label v-if="label" :for="inputId" class="ui-input__label">{{
      label
    }}</label>

    <ElInput
      v-bind="$attrs"
      :id="inputId"
      class="ui-input__el"
      :name="props.name ?? inputId"
      :model-value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :clearable="clearable"
      :maxlength="maxlength"
      :type="type"
      :size="size"
      :readonly="readonly"
      @input="handleInput"
    />

    <p v-if="hint" class="ui-input__message -hint">{{ hint }}</p>
  </div>
</template>

<style scoped>
.ui-input {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: var(--font-size-small);
}

.ui-input.-full {
  width: 100%;
}

.ui-input__label {
  display: block;
  color: var(--color-text-primary);
  font-size: var(--font-size);
  font-weight: 400;
  margin-bottom: 6px;
}

.ui-input__message {
  font-size: var(--font-size-small);
  margin-top: 4px;
}

.ui-input__message.-error {
  color: var(--el-color-danger);
}

.ui-input__message.-hint {
  color: var(--color-text-secondary);
}

.ui-input__el :deep(.el-input) {
  display: inline-flex;
  width: 100%;
  font-size: var(--font-size-small);
}

.ui-input__el :deep(.el-input__wrapper) {
  display: flex;
  align-items: center;
  border: var(--border-width) var(--border-style) var(--color-border);
  border-radius: var(--button-radius);
  background-color: #fff;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
  width: 100%;
}

.ui-input__el :deep(.el-input__wrapper:hover) {
  border-color: var(--color-border-hover);
}

.ui-input__el :deep(.el-input__wrapper.is-focus) {
  border-color: var(--color-primary);
}

.ui-input.-error .ui-input__el :deep(.el-input__wrapper) {
  border-color: var(--el-color-danger) !important;
}

.ui-input__el :deep(.el-input__inner) {
  outline: none;
  border: none;
  width: 100%;
  font-size: inherit;
  background: transparent;
  padding: var(--input-padding);
}

.ui-input__el :deep(.el-input__prefix),
.ui-input__el :deep(.el-input__suffix) {
  color: #999;
}

.ui-input__el :deep(.el-input__clear) {
  opacity: 1 !important;
  color: var(--color-primary);
  font-size: 18px !important;
  pointer-events: auto !important;
  transition: var(--transition);
  padding-right: 2px;
  padding-top: 2px;
}

.ui-input__el :deep(.el-input__clear:hover) {
  color: var(--color-text-secondary);
}
</style>
