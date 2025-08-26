<script setup lang="ts">
const emit = defineEmits<{
  (e: "click"): void;
}>();
</script>

<template>
  <button
    type="button"
    class="burger-button"
    aria-label="Open menu"
    @click="emit('click')"
  >
    <span />
    <span />
    <span />
  </button>
</template>

<style scoped>
.burger-button {
  display: none;
  width: 42px;
  height: 36px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  cursor: pointer;
}
.burger-button span {
  display: block;
  height: 2px;
  background: #fff;
  margin: 6px 8px;
  border-radius: 2px;
}

@media (max-width: 900px) {
  .burger-button {
    display: inline-block;
  }
}
</style>
