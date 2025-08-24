<script setup lang="ts">
import { activeTabProvider } from '~/shared/ui/tabs/provider'
import UiTypography from '../typography/UiTypography.vue'
import type { ActiveTab, UiTabItemProps } from './types'

const props = defineProps<UiTabItemProps>()
const style = useCssModule()

const { activeTab, setActiveTab, variant } = inject<ActiveTab>(activeTabProvider)!
const isActive = computed(() => activeTab.value === props.name)

const baseClasses = computed(() => {
  if (props.unstyled) return []
  return [style.item, 'ui-tab-item', isActive.value ? '-active' : '', `-${variant.value}`, props.full ? style.full : '']
})
</script>

<template>
  <div :class="baseClasses" :data-tab-name="name" @click="setActiveTab(name)">
    <slot v-if="!label" />

    <UiTypography v-else :class="$style.label" variant="bodyLarge" :label="label" />
  </div>
</template>

<style module>
.item {
  padding: 0.625rem 1rem;
  text-align: center;
  color: var(--color-primary);
  cursor: pointer;
  border: 1px solid var(--color-border-secondary);
  border-radius: var(--border-radius-small);

  &:global(.-active) {
    color: var(--color-text);
    border-bottom: 2px solid var(--color-primary);
    cursor: auto;
  }

  &:global(.-secondary) {
    color: var(--color-text-secondary);
    background-color: var(--color-background-inactive);

    &:global(.-active) {
      color: var(--color-secondary);
      border: 1px solid var(--color-secondary);
      background: var(--color-background);
      cursor: auto;
    }
  }
}

.full {
  flex: 1;
  justify-content: center;
  display: flex;
}

.label {
  color: inherit;
}
</style>
