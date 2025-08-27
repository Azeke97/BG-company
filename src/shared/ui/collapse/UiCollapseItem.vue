<script setup lang="ts">
import { ElCollapseItem } from "element-plus";
import "element-plus/es/components/collapse-item/style/css";
import type { UiCollapseItemProps } from "~/shared/ui/collapse/types";

const props = defineProps<UiCollapseItemProps>();
</script>

<template>
  <ElCollapseItem :name="props.name" v-bind="$attrs">
    <template #title>
      <slot name="title" />
    </template>
    <slot />
  </ElCollapseItem>
</template>
