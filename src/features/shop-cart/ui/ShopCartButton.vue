<script setup lang="ts">
defineProps<{
  count: number;
  total: number;
}>();

defineEmits<{
  (event: "open"): void;
}>();

const { t } = useI18n();

const formatMoney = (value: number) =>
  new Intl.NumberFormat("ru-RU").format(value);
</script>

<template>
  <button type="button" :class="$style.button" @click="$emit('open')">
    <span :class="$style.iconWrap">
      <Icon name="lucide:shopping-cart" :class="$style.icon" />
      <span v-if="count > 0" :class="$style.badge">{{ count }}</span>
    </span>

    <span :class="$style.content">
      <strong :class="$style.title">{{ t("shop.cart.title") }}</strong>
      <small :class="$style.total">{{ formatMoney(total) }} ₸</small>
    </span>
  </button>
</template>

<style module>
.button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #d9dfe8;
  background: #fff;
  border-radius: 8px;
  height: 42px;
  padding: 0 12px;
  cursor: pointer;
}

.iconWrap {
  position: relative;
  width: 22px;
  height: 22px;
}

.icon {
  width: 22px;
  height: 22px;
  color: #1f2937;
}

.badge {
  position: absolute;
  right: -8px;
  top: -8px;
  min-width: 16px;
  height: 16px;
  border-radius: 8px;
  padding: 0 4px;
  background: #f6c453;
  color: #111827;
  font-size: 11px;
  font-weight: 700;
  display: grid;
  place-items: center;
}

.content {
  display: grid;
  line-height: 1.1;
  text-align: left;
}

.title {
  font-size: 13px;
  color: #1f2937;
}

.total {
  font-size: 12px;
  color: #6b7280;
}
</style>
