<script setup lang="ts">
import { storeToRefs } from "pinia";
import { shopApi } from "~/shared/api";
import { addNotification } from "~/shared/libs/notifications";
import { useShopCartStore } from "~/features/shop-cart";

const modelValue = defineModel<boolean>({ required: true });

const { t } = useI18n();
const store = useShopCartStore();
const { items, total } = storeToRefs(store);

const checkoutLoading = ref(false);
const promoLoading = ref(false);
const promoCode = ref("");
const appliedPromo = ref<{
  code: string;
  eligibleSubtotal: number;
  discount: number;
  total: number;
} | null>(null);

const form = reactive({
  name: "",
  phone: "",
  comment: "",
});

const formatMoney = (value: number) =>
  new Intl.NumberFormat("ru-RU").format(value);

const normalizedPromoCode = computed(() =>
  promoCode.value.trim().toUpperCase(),
);
const discountTotal = computed(() => appliedPromo.value?.discount ?? 0);
const payableTotal = computed(() =>
  Math.max(total.value - discountTotal.value, 0),
);

const canSubmit = computed(() => {
  return (
    !checkoutLoading.value &&
    items.value.length > 0 &&
    form.name.trim().length > 1 &&
    form.phone.trim().length >= 6
  );
});

const resetForm = () => {
  form.name = "";
  form.phone = "";
  form.comment = "";
};

const resetPromo = (clearCode = false) => {
  appliedPromo.value = null;
  if (clearCode) {
    promoCode.value = "";
  }
};

const applyPromo = async () => {
  if (!normalizedPromoCode.value) {
    addNotification(t("shop.cart.promo.validation"), "warning");
    return;
  }

  promoLoading.value = true;
  try {
    const result = await shopApi.validatePromo({
      code: normalizedPromoCode.value,
      items: items.value.map((item) => ({
        productId: item.id,
        qty: item.qty,
      })),
    });

    appliedPromo.value = {
      code: result.code,
      eligibleSubtotal: result.eligibleSubtotal,
      discount: result.discount,
      total: result.total,
    };
    promoCode.value = result.code;

    addNotification(
      t("shop.cart.promo.applied", {
        code: result.code,
        discount: formatMoney(result.discount),
      }),
      "success",
      { duration: 2200 },
    );
  } catch (error) {
    resetPromo();
    const maybeResponseError = error as {
      data?: { statusMessage?: string };
      statusMessage?: string;
    };
    addNotification(
      maybeResponseError?.data?.statusMessage ||
        maybeResponseError?.statusMessage ||
        t("shop.cart.promo.error"),
      "error",
    );
  } finally {
    promoLoading.value = false;
  }
};

const submitOrder = async () => {
  if (!canSubmit.value) {
    addNotification(t("shop.cart.validation"), "warning");
    return;
  }

  checkoutLoading.value = true;
  try {
    const res = await shopApi.checkout({
      customer: {
        name: form.name.trim(),
        phone: form.phone.trim(),
        comment: form.comment.trim() || undefined,
      },
      items: items.value.map((item) => ({
        productId: item.id,
        qty: item.qty,
      })),
      promoCode: normalizedPromoCode.value || undefined,
    });

    addNotification(
      t("shop.cart.orderCreated", { number: res.item.number }),
      "success",
    );
    store.clear();
    resetForm();
    resetPromo(true);
    modelValue.value = false;
  } catch (error) {
    const maybeResponseError = error as {
      data?: { statusMessage?: string };
      statusMessage?: string;
      message?: string;
    };
    const message =
      maybeResponseError?.data?.statusMessage ||
      maybeResponseError?.statusMessage ||
      t("shop.cart.error");
    addNotification(message, "error");
  } finally {
    checkoutLoading.value = false;
  }
};

watch(
  () => items.value.map((item) => `${item.id}:${item.qty}`).join("|"),
  () => {
    if (appliedPromo.value) {
      appliedPromo.value = null;
    }
  },
);
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
                  :disabled="checkoutLoading"
                  @click="store.decrement(item.id)"
                >
                  <Icon name="lucide:minus" :class="$style.controlIcon" />
                </button>

                <span :class="$style.qty">{{ item.qty }}</span>

                <button
                  type="button"
                  :class="$style.qtyBtn"
                  :disabled="checkoutLoading || item.qty >= item.stock"
                  @click="store.increment(item.id)"
                >
                  <Icon name="lucide:plus" :class="$style.controlIcon" />
                </button>

                <button
                  type="button"
                  :class="$style.removeBtn"
                  :disabled="checkoutLoading"
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

            <div v-if="discountTotal > 0" :class="$style.discountRow">
              <span>
                {{ t("shop.cart.discount") }}
                <small v-if="appliedPromo">({{ appliedPromo.code }})</small>
              </span>
              <strong>-{{ formatMoney(discountTotal) }} ₸</strong>
            </div>

            <div :class="$style.totalRow">
              <span>{{ t("shop.cart.total") }}</span>
              <strong>{{ formatMoney(payableTotal) }} ₸</strong>
            </div>
          </div>

          <button
            type="button"
            :class="$style.clearBtn"
            :disabled="checkoutLoading"
            @click="store.clear()"
          >
            {{ t("shop.cart.clear") }}
          </button>

          <div :class="$style.promoBox">
            <label :class="$style.field">
              <span>{{ t("shop.cart.promo.label") }}</span>
              <div :class="$style.promoRow">
                <input
                  v-model="promoCode"
                  type="text"
                  :placeholder="t('shop.cart.promo.placeholder')"
                  :class="$style.input"
                  :disabled="checkoutLoading || promoLoading"
                />
                <button
                  type="button"
                  :class="$style.promoApplyBtn"
                  :disabled="
                    checkoutLoading ||
                    promoLoading ||
                    !normalizedPromoCode ||
                    items.length === 0
                  "
                  @click="applyPromo"
                >
                  {{
                    promoLoading
                      ? t("shop.cart.promo.checking")
                      : t("shop.cart.promo.apply")
                  }}
                </button>
              </div>
            </label>

            <button
              v-if="appliedPromo"
              type="button"
              :class="$style.promoRemoveBtn"
              :disabled="checkoutLoading || promoLoading"
              @click="resetPromo(true)"
            >
              {{ t("shop.cart.promo.remove") }}
            </button>
          </div>

          <form :class="$style.checkoutForm" @submit.prevent="submitOrder">
            <label :class="$style.field">
              <span>{{ t("shop.cart.form.name") }}</span>
              <input
                v-model="form.name"
                type="text"
                :placeholder="t('shop.cart.form.namePlaceholder')"
                :class="$style.input"
                :disabled="checkoutLoading"
                required
              />
            </label>

            <label :class="$style.field">
              <span>{{ t("shop.cart.form.phone") }}</span>
              <input
                v-model="form.phone"
                type="tel"
                :placeholder="t('shop.cart.form.phonePlaceholder')"
                :class="$style.input"
                :disabled="checkoutLoading"
                required
              />
            </label>

            <label :class="$style.field">
              <span>{{ t("shop.cart.form.comment") }}</span>
              <textarea
                v-model="form.comment"
                :placeholder="t('shop.cart.form.commentPlaceholder')"
                :class="$style.textarea"
                rows="3"
                :disabled="checkoutLoading"
              />
            </label>

            <button
              type="submit"
              :class="$style.checkout"
              :disabled="!canSubmit"
            >
              {{
                checkoutLoading
                  ? t("shop.cart.form.submitting")
                  : t("shop.cart.form.submit")
              }}
            </button>
          </form>
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

.removeBtn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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

.discountRow {
  display: flex;
  justify-content: space-between;
  color: #0f766e;
}

.clearBtn {
  height: 38px;
  border: 1px solid #d7dde7;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
}

.clearBtn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.promoBox {
  display: grid;
  gap: 6px;
}

.promoRow {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 8px;
}

.promoApplyBtn {
  min-width: 86px;
  border: 1px solid #d4dbe6;
  border-radius: 8px;
  background: #fff;
  padding: 0 10px;
  font-size: 12px;
  cursor: pointer;
}

.promoApplyBtn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.promoRemoveBtn {
  justify-self: start;
  border: 0;
  background: transparent;
  color: #b42336;
  padding: 0;
  font-size: 12px;
  cursor: pointer;
}

.promoRemoveBtn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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

.checkout:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.checkoutForm {
  display: grid;
  gap: 8px;
}

.field {
  display: grid;
  gap: 4px;
  font-size: 12px;
  color: #4b5563;
}

.input,
.textarea {
  border: 1px solid #d6dde8;
  border-radius: 8px;
  padding: 9px 10px;
  font: inherit;
}

.input:disabled,
.textarea:disabled {
  background: #f3f5f8;
  color: #6b7280;
}
</style>
