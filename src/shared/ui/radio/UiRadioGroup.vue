<script setup lang="ts">
import { ElRadioGroup } from 'element-plus'
import type { UiRadioGroupProps } from '~/shared/ui/radio/types'

const props = defineProps<UiRadioGroupProps>()
const attrs = useAttrs()

const propsWithAttrs = computed(() => {
  return {
    ...props,
    ...attrs,
  }
})
</script>

<template>
  <ElRadioGroup
    v-bind="propsWithAttrs"
    :class="[$style.radioGroup, 'ui-radio-group']"
  >
    <slot />
  </ElRadioGroup>
</template>

<style module>
.radioGroup {
  :global(.ui-radio + .ui-radio) {
    margin-left: 1rem;
  }
}
</style>
