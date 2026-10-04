<script setup lang="ts">
import { ElDrawer } from "element-plus";
import type { UiDrawerEmits, UiDrawerProps } from "./types";
import "element-plus/es/components/drawer/style/css";
import "element-plus/es/components/overlay/style/css";

const props = withDefaults(defineProps<UiDrawerProps>(), {
  direction: "rtl",
  size: "420px",
  closeOnClickModal: true,
  closeOnPressEscape: true,
  appendToBody: true,
});

const emit = defineEmits<UiDrawerEmits>();

const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
const { modelValue, ...restProps } = props;
</script>

<template>
  <el-drawer
    v-model="visible"
    v-bind="restProps"
    :class="['ui-drawer', $style.drawer]"
    :modal-class="$style.mask"
  >
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>
    <slot />
  </el-drawer>
</template>

<style module>
.mask {
  backdrop-filter: blur(4px);
}

.drawer :global(.el-drawer__header) {
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text-black);
}

.drawer :global(.el-drawer__body) {
  padding-top: 0;
}
</style>
