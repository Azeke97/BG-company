<script setup lang="ts">
import { UiButton } from "~/shared/ui";

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
  <UiButton variant="secondary" outline @click="$emit('open')">
    <span :class="$style.inner">
      <span :class="$style.iconWrap">
        <Icon name="lucide:shopping-cart" :class="$style.icon" />
        <span v-if="count > 0" :class="$style.badge">{{ count }}</span>
      </span>

      <span :class="$style.content">
        <strong :class="$style.title">{{ t("shop.cart.title") }}</strong>
        <small :class="$style.total">{{ formatMoney(total) }} ₸</small>
      </span>
    </span>
  </UiButton>
</template>

<style module>
.inner {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.iconWrap {
  position: relative;
  width: 22px;
  height: 22px;
  flex: none;
}

.icon {
  width: 22px;
  height: 22px;
}

.badge {
  position: absolute;
  right: -8px;
  top: -8px;
  min-width: 16px;
  height: 16px;
  border-radius: 8px;
  padding: 0 4px;
  background: var(--color-primary);
  color: var(--color-text-white);
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
}

.total {
  font-size: 12px;
  color: var(--color-text-secondary);
}
</style>
