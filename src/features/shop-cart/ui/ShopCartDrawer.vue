<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useShopCartStore } from "~/features/shop-cart";

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
  <ElDrawer
    v-model="modelValue"
    :title="t('shop.cart.title')"
    direction="rtl"
    size="420px"
  >
    <div :class="$style.drawer">
      <div v-if="items.length === 0" :class="$style.empty">
        <Icon name="lucide:shopping-cart" :class="$style.emptyIcon" />
        <p :class="$style.emptyText">{{ t("shop.cart.empty") }}</p>
      </div>

      <div v-else :class="$style.listWrap">
        <ul :class="$style.list">
          <li v-for="item in items" :key="item.id" :class="$style.item">
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
                <button
                  type="button"
                  :class="$style.qtyBtn"
                  @click="store.decrement(item.id)"
                >
                  <Icon name="lucide:minus" :class="$style.controlIcon" />
                </button>

                <span :class="$style.qty">{{ item.qty }}</span>

                <button
                  type="button"
                  :class="$style.qtyBtn"
                  :disabled="item.qty >= item.stock"
                  @click="store.increment(item.id)"
                >
                  <Icon name="lucide:plus" :class="$style.controlIcon" />
                </button>

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
          </li>
        </ul>

        <div :class="$style.footer">
          <div :class="$style.summary">
            <div :class="$style.totalRow">
              <span>{{ t("shop.cart.subtotal") }}</span>
              <strong>{{ formatMoney(total) }} ₸</strong>
            </div>
          </div>

          <button type="button" :class="$style.clearBtn" @click="store.clear()">
            {{ t("shop.cart.clear") }}
          </button>

          <button type="button" :class="$style.checkout" @click="goToCheckout">
            {{ t("shop.cart.goToCheckout") }}
          </button>
        </div>
      </div>
    </div>
  </ElDrawer>
</template>

<style module>
.drawer {
  height: 100%;
}

.empty {
  min-height: 240px;
  display: grid;
  place-items: center;
  gap: 8px;
  text-align: center;
}

.emptyIcon {
  width: 30px;
  height: 30px;
  color: #8a93a2;
}

.emptyText {
  margin: 0;
  color: #4b5563;
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
  border: 1px solid #e7ebf1;
  border-radius: 8px;
  padding: 10px;
}

.thumb {
  width: 72px;
  aspect-ratio: 1 / 1;
  border-radius: 6px;
  overflow: hidden;
  background: #f4f6f9;
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
  color: #9ba3af;
}

.meta {
  display: grid;
  gap: 6px;
}

.name {
  margin: 0;
  font-size: 14px;
  color: #111827;
}

.price {
  margin: 0;
  font-weight: 600;
  color: #1f2937;
}

.controls {
  display: flex;
  align-items: center;
  gap: 6px;
}

.qtyBtn {
  width: 28px;
  height: 28px;
  border: 1px solid #d4dbe6;
  border-radius: 6px;
  background: #fff;
  display: grid;
  place-items: center;
  cursor: pointer;
}

.qtyBtn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.controlIcon {
  width: 14px;
  height: 14px;
}

.qty {
  min-width: 20px;
  text-align: center;
  font-weight: 600;
}

.removeBtn {
  margin-left: auto;
  border: 0;
  background: transparent;
  color: #b42336;
  cursor: pointer;
  font-size: 12px;
}

.lineTotal {
  margin: 0;
  color: #6b7280;
  font-size: 12px;
}

.footer {
  border-top: 1px solid #e5e9f0;
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
  color: #111827;
}

.clearBtn {
  height: 38px;
  border: 1px solid #d7dde7;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
}

.checkout {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  width: 100%;
  border-radius: 8px;
  border: 0;
  background: #f6c453;
  color: #1f2937;
  font-weight: 600;
  cursor: pointer;
}
</style>
