<script setup lang="ts">
import { ElSelect, ElOption } from 'element-plus'
import { Check } from '@element-plus/icons-vue'
import type { UiSelectProps } from './types'
import { useId } from 'vue'

const props = defineProps<UiSelectProps>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

const uid = useId()
const selectId = computed(() => props.id ?? `ui-select-${uid}`)

const hasError = computed(() => typeof props.error === 'string' || props.error)
const popperOptions = {
  modifiers: [
    {
      name: 'offset',
      options: { offset: [1, 2] },
    },
    {
      name: 'flip',
      enabled: false,
    },
  ],
}

const handleChange = (val: any) => emit('update:modelValue', val)

const isOptionSelected = (value: any) => {
  if (props.multiple && Array.isArray(props.modelValue)) {
    return props.modelValue.includes(value)
  }
  return props.modelValue === value
}
</script>

<template>
  <div :class="['ui-select', { '-error': hasError, '-full': fullWidth }]">
    <label v-if="label" :for="selectId" class="ui-select__label">{{ label }}</label>

    <ElSelect
      :id="selectId"
      class="ui-select__el"
      :model-value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :clearable="clearable"
      :filterable="filterable"
      :multiple="multiple"
      :size="size"
      :placement="'bottom'"
      :popper-class="'ui-select__dropdown'"
      :popper-options="popperOptions"
      @change="handleChange"
    >
      <ElOption
        v-for="option in options"
        :key="option.value"
        :label="option.label"
        :value="option.value"
        :disabled="option.disabled"
      >
        <template #default>
          <div class="ui-select__option-icon-wrapper" :class="{ '-selected': isOptionSelected(option.value) }">
            <Check class="ui-select__option-icon" :class="{ '-selected': isOptionSelected(option.value) }" />
            <span>{{ option.label }}</span>
          </div>
        </template>
      </ElOption>
    </ElSelect>

    <p v-if="hasError" class="ui-select__message -error">
      {{ typeof error === 'string' ? error : 'Ошибка' }}
    </p>
    <p v-else-if="hint" class="ui-select__message -hint">{{ hint }}</p>
  </div>
</template>

<style scoped>
@import './style.css';
.ui-select {
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
}

.ui-select.-full {
  width: 100%;
}

.ui-select__label {
  font-size: var(--font-size);
  color: var(--color-text-primary);
  font-weight: 400;
  margin-bottom: 8px;
}

.ui-select__message {
  font-size: var(--font-size-small);
  margin-top: 4px;
}

.ui-select__message.-error {
  color: var(--el-color-danger);
}

.ui-select__message.-hint {
  color: var(--color-text-secondary);
}
</style>
