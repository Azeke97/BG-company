<script setup lang="ts">
import { ElInput } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { useId, computed } from 'vue'
import type { InputProps } from './types'

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
    <label v-if="label" :for="inputId" class="ui-input__label">{{ label }}</label>

    <ElInput
      v-bind="props"
      :id="inputId"
      class="ui-input__el"
      :name="props.name ?? inputId"
      :model-value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :clearable="clearable"
      :maxlength="maxlength"
      :type="type"
      @input="handleInput"
    >
      <template #prefix>
        <span class="ui-input__prefix"><Search /></span>
      </template>
    </ElInput>
    <p v-if="hint" class="ui-input__message -hint">
      {{ hint }}
    </p>
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

.ui-input__prefix {
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  padding-left: 8px;
  font-size: 16px;
  display: none;
}
</style>
