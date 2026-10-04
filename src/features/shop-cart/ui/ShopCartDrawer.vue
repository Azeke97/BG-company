<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useShopCartStore } from "~/features/shop-cart";
import {
  UiButton,
  UiCard,
  UiDrawer,
  UiEmptyState,
  UiQuantityStepper,
} from "~/shared/ui";

const modelValue = defineModel<boolean>({ required: true });

const { t } = useI18n();
const localePath = useLocalePath();
const store = useShopCartStore();
const { items, total } = storeToRefs(store);

const formatMoney = (value: number) =>
  new Intl.NumberFormat("ru-RU").format(value);

const goToCheckout = () => {
  modelValue.value = false;
  navigateTo(localePath("/shop/checkout"));
};
</script>

<template>
  <UiDrawer v-model="modelValue" :title="t('shop.cart.title')" size="420px">
    <div :class="$style.drawer">
      <UiEmptyState
        v-if="items.length === 0"
        icon="lucide:shopping-cart"
        :text="t('shop.cart.empty')"
      />

      <div v-else :class="$style.listWrap">
        <ul :class="$style.list">
          <li v-for="item in items" :key="item.id">
            <UiCard padding="10px" :class="$style.item">
              <div :class="$style.thumb">
                <img
                  v-if="item.image"
                  :src="item.image"
                  :alt="item.title"
                  :class="$style.image"
                />
                <Icon v-else name="lucide:image" :class="$style.fallbackIcon" />
              </div>

              <div :class="$style.meta">
                <p :class="$style.name">{{ item.title }}</p>
                <p :class="$style.price">{{ formatMoney(item.price) }} ₸</p>

                <div :class="$style.controls">
                  <UiQuantityStepper
                    :model-value="item.qty"
                    :min="0"
                    :max="item.stock"
                    @update:model-value="
                      (value) =>
                        value > item.qty
                          ? store.increment(item.id)
                          : store.decrement(item.id)
                    "
                  />

                  <button
                    type="button"
                    :class="$style.removeBtn"
                    @click="store.removeItem(item.id)"
                  >
                    {{ t("shop.cart.remove") }}
                  </button>
                </div>

                <p :class="$style.lineTotal">
                  {{ t("shop.cart.lineTotal") }}:
                  <strong>{{ formatMoney(item.qty * item.price) }} ₸</strong>
                </p>
              </div>
            </UiCard>
          </li>
        </ul>

        <div :class="$style.footer">
          <div :class="$style.summary">
            <div :class="$style.totalRow">
              <span>{{ t("shop.cart.subtotal") }}</span>
              <strong>{{ formatMoney(total) }} ₸</strong>
            </div>
          </div>

          <UiButton variant="secondary" outline full @click="store.clear()">
            {{ t("shop.cart.clear") }}
          </UiButton>

          <UiButton variant="primary" full @click="goToCheckout">
            {{ t("shop.cart.goToCheckout") }}
          </UiButton>
        </div>
      </div>
    </div>
  </UiDrawer>
</template>

<style module>
.drawer {
  height: 100%;
}

.listWrap {
  height: 100%;
  display: grid;
  grid-template-rows: 1fr auto;
  gap: 12px;
}

.list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 10px;
  align-content: start;
  overflow: auto;
}

.item {
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  gap: 10px;
}

.thumb {
  width: 72px;
  aspect-ratio: 1 / 1;
  border-radius: var(--border-radius-small);
  overflow: hidden;
  background: var(--color-background-secondary);
  display: grid;
  place-items: center;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fallbackIcon {
  width: 18px;
  height: 18px;
  color: var(--color-text-secondary-light);
}

.meta {
  display: grid;
  gap: 6px;
}

.name {
  margin: 0;
  font-size: 14px;
  color: var(--color-text-black);
}

.price {
  margin: 0;
  font-weight: 600;
  color: var(--color-text-black);
}

.controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.removeBtn {
  margin-left: auto;
  border: 0;
  background: transparent;
  color: var(--color-error);
  cursor: pointer;
  font-size: 12px;
  padding: 0;
}

.lineTotal {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 12px;
}

.footer {
  border-top: 1px solid var(--color-border);
  padding-top: 12px;
  display: grid;
  gap: 10px;
}

.summary {
  display: grid;
  gap: 6px;
}

.totalRow {
  display: flex;
  justify-content: space-between;
  color: var(--color-text-black);
}
</style>
