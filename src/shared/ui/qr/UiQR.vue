<script setup lang="ts">
import type { UiQRProps } from "./types";

withDefaults(defineProps<UiQRProps>(), { size: "medium" });
</script>

<template>
  <div :class="[$style.wrapper, 'ui-qr', $style[`-${size}`]]">
    <img
      :src="`data:image/png;base64,${value}`"
      :class="$style.qr"
      alt="QR code"
    />
  </div>
</template>

<style module>
.qr {
  width: 100%;
  height: 100%;
}

.wrapper {
  --ui-qr-size: 170px;

  width: var(--ui-qr-size);
  height: var(--ui-qr-size);

  &.-small {
    --ui-qr-size: 100px;
  }
}
</style>
