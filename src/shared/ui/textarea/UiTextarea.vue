<script setup lang="ts">
import { ElInput } from 'element-plus'
import type { TextareaProps } from './types'
import { useId, computed } from 'vue'

const props = defineProps<TextareaProps>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const uid = useId()
const inputId = computed(() => props.id ?? `textarea-${uid}`)
const hasError = computed(() => typeof props.error === 'string' || props.error)

const handleInput = (value: string) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <div :class="['ui-textarea', { '-full': fullWidth, '-error': hasError }]">
    <label v-if="label" :for="inputId" class="ui-textarea__label">{{
      label
    }}</label>

    <ElInput
      :id="inputId"
      class="ui-textarea__el"
      type="textarea"
      :model-value="modelValue"
      :placeholder="placeholder"
      :autosize="autosize"
      :disabled="disabled"
      :maxlength="maxlength"
      :name="props.name ?? inputId"
      :readonly="readonly"
      @input="handleInput"
    />

    <p v-if="hasError" class="ui-textarea__message -error">
      {{ typeof error === 'string' ? error : 'Ошибка' }}
    </p>

    <p v-else-if="hint" class="ui-textarea__message -hint">
      {{ hint }}
    </p>
  </div>
</template>

<style scoped>
.ui-textarea {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ui-textarea.-full {
  width: 100%;
}

.ui-textarea__label {
  color: var(--color-text-primary);
  font-size: var(--font-size);
  font-weight: 400;
  margin-bottom: 6px;
}

.ui-textarea__message {
  font-size: var(--font-size-small);
  margin-top: 4px;
}

.ui-textarea__message.-error {
  color: var(--el-color-danger);
}

.ui-textarea__message.-hint {
  color: var(--color-text-secondary);
}

.ui-textarea__el :deep(.el-textarea) {
  display: inline-flex;
  width: 100%;
  font-size: var(--font-size-small);
}

.ui-textarea__el :deep(.el-textarea__inner) {
  width: 100%;
  padding: var(--input-padding);
  font-size: inherit;
  border: var(--border-width) var(--border-style) var(--color-border);
  border-radius: var(--button-radius);
  background-color: #fff;
  transition: border-color 0.2s ease;
  resize: vertical;
  box-sizing: border-box;
}

.ui-textarea__el :deep(.el-textarea__inner:hover) {
  border-color: var(--color-border-hover);
}

.ui-textarea__el :deep(.el-textarea__inner:focus) {
  border-color: var(--color-primary);
  outline: none;
}

.ui-textarea.-error .ui-textarea__el :deep(.el-textarea__inner) {
  border-color: var(--el-color-danger) !important;
}

.ui-textarea__el :deep(.el-textarea__inner::placeholder) {
  font-size: var(--font-size-small);
  font-weight: 400;
}
</style>
