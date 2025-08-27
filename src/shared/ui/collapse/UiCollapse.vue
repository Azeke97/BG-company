<script setup lang="ts">
import { ElCollapse } from "element-plus";
import type { CollapseModelValue } from "element-plus";
import "element-plus/es/components/collapse/style/css";
import type {
  UiCollapseEvents,
  UiCollapseProps,
} from "~/shared/ui/collapse/types";

const props = defineProps<UiCollapseProps>();

const emit = defineEmits<UiCollapseEvents>();

const model = computed({
  get: () => props.modelValue as CollapseModelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>

<template>
  <ElCollapse v-model="model" v-bind="$attrs">
    <slot />
  </ElCollapse>
</template>
