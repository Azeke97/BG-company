<script setup lang="ts">
import { ElPopover } from 'element-plus'
import { withDefaults, defineProps, defineEmits } from 'vue'
import type { UiMarkerPopupProps, UiMarkerPopupEvents } from './types'
import MarkerIcon from '../marker-popup/assets/icons/marker-icon.svg'

const props = withDefaults(defineProps<UiMarkerPopupProps>(), {
  placement: 'top',
  width: 250,
  iconSize: 20,
})
const emit = defineEmits<UiMarkerPopupEvents>()
const { t } = useI18n()

const handleShow = () => emit('show')
const handleHide = () => emit('hide')

const computedContent = computed(() => {
  if (!props.content) return ''
  if (typeof props.content === 'function') {
    return props.content()
  }
  return t(props.content)
})
</script>

<template>
  <ElPopover :placement="props.placement" :width="props.width" trigger="click" @show="handleShow" @hide="handleHide">
    <template #reference>
      <MarkerIcon :width="props.iconSize" :height="props.iconSize" />
    </template>

    <template v-if="props.title" #title>
      {{ t(props.title) }}
    </template>

    <slot>
      <div v-html="computedContent"></div>
    </slot>
  </ElPopover>
</template>
