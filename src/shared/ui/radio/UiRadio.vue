<script setup lang="ts">
import { ElRadio } from "element-plus";
import type { UiRadioProps } from "~/shared/ui/radio/types";

const props = defineProps<UiRadioProps>();
const attrs = useAttrs();

const propsWithAttrs = computed(() => {
  return {
    ...props,
    ...attrs,
  };
});
</script>

<template>
  <ElRadio v-bind="propsWithAttrs" :class="[$style.radio, 'ui-radio']">
    <slot />
  </ElRadio>
</template>

<style module>
.radio {
  cursor: pointer;

  :global(.el-radio__input) {
    margin-right: 0.25rem;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      width: 1.25rem;
      height: 1.25rem;
      border: 2px solid #e1e4eb;
      border-radius: 50%;
    }
  }

  :global(.el-radio__original) {
    visibility: hidden;
  }

  &:global(.is-checked) {
    cursor: auto;

    :global(.el-radio__input) {
      &::before {
        content: "";
        position: absolute;
        top: 5px;
        left: 5px;
        background-color: #00803d;
        width: 0.625rem;
        height: 0.625rem;
        border-radius: 50%;
        z-index: 1;
      }
    }
  }
}
</style>
