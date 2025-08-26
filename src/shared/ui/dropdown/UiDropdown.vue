<script setup lang="ts">
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
import type { UiDropdownProps, UiDropdownEmits } from './types'
import 'element-plus/es/components/dropdown/style/css'
import 'element-plus/es/components/dropdown-menu/style/css'
import 'element-plus/es/components/dropdown-item/style/css'
import 'element-plus/es/components/popper/style/css'
import 'element-plus/es/components/scrollbar/style/css'

const props = withDefaults(defineProps<UiDropdownProps>(), {
  trigger: 'click',
  placement: 'bottom-end',
  hideOnClick: true,
  disabled: false,
  teleported: true,
})

const emit = defineEmits<UiDropdownEmits>()
const { t } = useI18n()

const menuStyle = computed(() => {
  if (!props.maxHeight) return null
  const v =
    typeof props.maxHeight === 'number'
      ? `${props.maxHeight}px`
      : props.maxHeight
  return {
    maxHeight: v,
    overflowY: 'auto',
  }
})
</script>

<template>
  <el-dropdown
    v-bind="$attrs"
    :trigger="props.trigger"
    :placement="props.placement"
    :hide-on-click="props.hideOnClick"
    :disabled="props.disabled"
    :teleported="props.teleported"
    :popper-class="'ui-dropdown__menu'"
    @command="(v) => emit('command', v as any)"
    @visible-change="(v: boolean) => emit('visible-change', v)"
  >
    <slot />

    <template #dropdown>
      <el-dropdown-menu v-if="props.items?.length" :style="menuStyle">
        <el-dropdown-item
          v-for="(item, idx) in props.items"
          :key="(item.command ?? item.label) + ':' + idx"
          :command="item.command ?? item.label"
          :disabled="item.disabled"
          :divided="item.divided"
        >
          <slot name="item" :item="item">{{ t(item.label) }}</slot>
        </el-dropdown-item>
      </el-dropdown-menu>

      <slot v-else name="dropdown" />
    </template>
  </el-dropdown>
</template>

<style module>
:global(.ui-dropdown__menu) {
  border: none !important;
}

:global(.el-dropdown-menu__item) {
  font-size: var(--font-size) !important;
  color: var(--color-text) !important;
  font-weight: var(--font-weight);
  padding: 12px 20px !important;
}

:global(.el-dropdown-menu__item:hover),
:global(.el-dropdown-menu__item:focus) {
  background-color: var(--color-background-hover) !important;
  color: var(--color-primary) !important;
}
</style>
