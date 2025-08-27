<script setup lang="ts">
import "element-plus/theme-chalk/el-form-item.css";
import { ElFormItem } from "element-plus";
import type { UiFormItemProps } from "./types";

const props = defineProps<UiFormItemProps>();
</script>

<template>
  <ElFormItem v-bind="props">
    <slot />
  </ElFormItem>
</template>
