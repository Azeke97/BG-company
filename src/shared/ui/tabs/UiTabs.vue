<script setup lang="ts">
import { activeTabProvider } from '~/shared/ui/tabs/provider'
import type { UiTabsEvents, UiTabsProps } from '~/shared/ui/tabs/types'

const props = withDefaults(defineProps<UiTabsProps>(), {
  variant: 'primary',
})
const emit = defineEmits<UiTabsEvents>()

const setActiveTab = (name: string) => {
  if (name === props.modelValue) return
  emit('update:modelValue', name)
}

const activeTab = computed(() => props.modelValue)
const tabVariant = computed(() => props.variant)

provide(activeTabProvider, {
  activeTab,
  setActiveTab,
  variant: tabVariant,
})
</script>

<template>
  <div :class="[$style.tabs, 'ui-tabs']">
    <slot />
  </div>
</template>

<style module>
.tabs {
  display: flex;
  gap: 0.125rem;
}
</style>
