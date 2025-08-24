<script setup lang="ts">
import { ElDialog } from 'element-plus'
import type { UiDialogEmits, UiDialogProps } from './types'
import 'element-plus/es/components/dialog/style/css'
import 'element-plus/es/components/overlay/style/css'
import 'element-plus/es/components/scrollbar/style/css'

const props = withDefaults(defineProps<UiDialogProps>(), {
  fullscreen: true,
  showClose: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  appendToBody: true,
})

const emit = defineEmits<UiDialogEmits>()

const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
const { modelValue, ...restProps } = props
</script>

<template>
  <el-dialog v-model="visible" v-bind="restProps" :class="['ui-dialog', $style.dialog]" :modal-class="$style.mask">
    <template #header>
      <slot name="header" />
    </template>
    <slot />
  </el-dialog>
</template>

<style module>
.dialog {
  border-radius: var(--button-radius);
}
.mask {
  backdrop-filter: blur(4px);
}

:global(.el-dialog__header) {
  min-height: 40px;
}
:global(.el-dialog__headerbtn) {
  width: 40px;
  height: 40px;
  top: 10px;
  right: 10px;
}

:global(.el-dialog__close) {
  font-size: 24px !important;
  color: var(--color-text-black) !important;
}
</style>
