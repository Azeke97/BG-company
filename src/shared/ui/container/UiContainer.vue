<script setup lang="ts">
import type { UiContainerProps } from './types'

withDefaults(defineProps<UiContainerProps>(), {
  size: 'medium',
  noVerticalPadding: false,
})
</script>

<template>
  <div :class="[$style.container, $style[`-${size}`], { [$style.noVerticalPadding]: noVerticalPadding }]">
    <slot />
  </div>
</template>

<style module>
.container {
  padding: 2rem 16px;
  margin: 0 auto;
  width: 100%;
}

.-small {
  max-width: 862px;
}

.-medium {
  max-width: 1430px;
}

.noVerticalPadding {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
