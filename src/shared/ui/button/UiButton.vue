<script setup lang="ts">
import { ElButton } from 'element-plus'
import type { UiButtonProps } from './types'
import ButtonLoader from '~/shared/ui/button/ButtonLoader.vue'
import UiLink from '../link/UiLink.vue'

const props = defineProps<UiButtonProps>()
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const isLink = computed(() => !!props.to)

const isDisabled = computed(() => props.disabled || props.loading)
const variantClass = computed(() => `-` + (props.variant ?? 'primary'))
const outLineClass = computed(() => {
  const map = {
    primary: 'secondary',
    secondary: 'primary',
  }

  const variant = props.variant ? map[props.variant] : 'secondary'
  return `-${variant}`
})

const buttonClass = computed(() => [
  'ui-button',
  props.outline ? outLineClass.value : variantClass.value,
  {
    'is-loading': props.loading,
    'is-disabled': isDisabled.value,
    '-outline': props.outline,
    '-full': props.full,
  },
])

const tag = computed(() => {
  if (isLink.value) return UiLink
  return 'button'
})

const handleClick = (event: MouseEvent) => {
  if (!isDisabled.value) {
    emit('click', event)
  }
}
</script>

<template>
  <ElButton
    :tag="tag"
    :to="to"
    :force-to="forceTo"
    :target="target"
    :type="type"
    :size="size"
    :round="round"
    :disabled="isDisabled"
    :loading="loading"
    :class="buttonClass"
    @click="handleClick"
  >
    <template #loading>
      <ButtonLoader class="ui-button-loader" />
    </template>

    <div class="ui-button-content">
      <span class="ui-button-label">
        <slot>{{ label }}</slot>
      </span>
    </div>
  </ElButton>
</template>

<style scoped>
.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  padding: var(--button-padding);
  border-radius: var(--button-radius);
  border: none;
  cursor: pointer;
  transition:
    background-color var(--transition-duration),
    color var(--transition-duration);
  position: relative;
  z-index: 0;
  overflow: hidden;
  text-decoration: none;
  user-select: none;
  line-height: 1;
  min-width: max-content;
  outline: none;
  height: var(--input-height);
}

.ui-button.-outline {
  background-color: transparent;
  color: var(--color-text-black);
  border-width: 2px;
  border-style: solid;
}

.ui-button.-primary {
  background-color: var(--color-primary);
  color: var(--color-text-white);

  &.-outline {
    background-color: transparent;
    color: var(--color-text-black);
    border-width: 2px;
    border-style: solid;
    border-color: var(--color-secondary);

    &:hover {
      color: var(--color-text-white);
    }
  }
}

.ui-button.-primary::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  right: 50%;
  background-color: var(--color-secondary);
  transition: all var(--transition-duration) ease-in-out;
  opacity: 0;
  visibility: hidden;
  z-index: -1;
}

.ui-button.-primary:hover::after {
  left: 0;
  right: 0;
  opacity: 1;
  visibility: visible;
}

.ui-button.-secondary {
  background-color: var(--color-secondary);
  color: var(--color-text-white);

  &.-outline {
    background-color: transparent;
    color: var(--color-text-black);
    border-width: 2px;
    border-style: solid;
    border-color: var(--color-primary);

    &:hover {
      color: var(--color-text-white);
    }
  }
}

.ui-button.-secondary::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  right: 50%;
  background-color: var(--color-primary);
  transition: all var(--transition-duration) ease-in-out;
  opacity: 0;
  visibility: hidden;
  z-index: -1;
}

.ui-button.-secondary:hover::after {
  left: 0;
  right: 0;
  opacity: 1;
  visibility: visible;
}

.ui-button-content {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.ui-button-label {
  display: inline-block;
  transition: opacity 0.2s ease;
}

.ui-button-loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.ui-button.is-loading {
  cursor: progress;
}

.ui-button.is-disabled {
  cursor: not-allowed;
  pointer-events: none;
  background-color: var(--color-background-inactive);
  color: var(--color-text-secondary-light);
}

.ui-button-label {
  transition: opacity 0.2s ease;
}

.ui-button.is-loading .ui-button-label {
  opacity: 0;
}

.ui-button.-full {
  width: 100%;
}
</style>
