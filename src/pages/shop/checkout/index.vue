<script setup lang="ts">
import { storeToRefs } from "pinia";
import { shopApi } from "~/shared/api";
import { addNotification } from "~/shared/libs/notifications";
import { useShopUser } from "~/shared/helpers";
import { useShopCartStore } from "~/features/shop-cart";
import {
  UiButton,
  UiCard,
  UiContainer,
  UiEmptyState,
  UiInput,
  UiRadio,
  UiRadioGroup,
  UiTextarea,
  UiTypography,
} from "~/shared/ui";

const { t } = useI18n();
const localePath = useLocalePath();
const store = useShopCartStore();
const { items, total } = storeToRefs(store);

const shopUser = useShopUser();
const isHydrated = ref(false);
onMounted(async () => {
  isHydrated.value = true;

  if (shopUser.value) return;

  try {
    const res = await shopApi.shopMe();
    shopUser.value = res.user;
  } catch {
    await navigateTo(localePath("/shop/login?redirect=/shop/checkout"));
  }
});

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
  paymentMethod: "CASH" as "CASH" | "INVOICE",
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
      paymentMethod: form.paymentMethod,
    });

    store.clear();
    await navigateTo(
      localePath(`/shop/checkout/success?order=${res.item.number}`),
    );
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

useSeoMeta({
  title: () => t("shop.checkout.seoTitle"),
});
</script>

<template>
  <UiContainer>
    <section :class="$style.page">
      <UiTypography tag="h1" variant="h2" :class="$style.title">
        {{ t("shop.checkout.title") }}
      </UiTypography>

      <div v-if="!isHydrated" :class="$style.skeleton" />

      <UiCard v-else-if="items.length === 0" padding="0">
        <UiEmptyState
          icon="lucide:shopping-cart"
          :text="t('shop.checkout.empty')"
        >
          <NuxtLinkLocale to="/shop" :class="$style.backLink">
            {{ t("shop.checkout.backToShop") }}
          </NuxtLinkLocale>
        </UiEmptyState>
      </UiCard>

      <div v-else :class="$style.layout">
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
                <p :class="$style.lineTotal">
                  {{ item.qty }} × {{ formatMoney(item.price) }} ₸ =
                  <strong>{{ formatMoney(item.qty * item.price) }} ₸</strong>
                </p>
              </div>
            </UiCard>
          </li>
        </ul>

        <UiCard padding="16px" :class="$style.panel">
          <div :class="$style.promoBox">
            <div :class="$style.promoRow">
              <UiInput
                v-model="promoCode"
                :label="t('shop.cart.promo.label')"
                :placeholder="t('shop.cart.promo.placeholder')"
                :disabled="checkoutLoading || promoLoading"
                full-width
              />
              <UiButton
                variant="secondary"
                outline
                :loading="promoLoading"
                :disabled="
                  checkoutLoading ||
                  promoLoading ||
                  !normalizedPromoCode ||
                  items.length === 0
                "
                @click="applyPromo"
              >
                {{ t("shop.cart.promo.apply") }}
              </UiButton>
            </div>

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

          <form :class="$style.checkoutForm" @submit.prevent="submitOrder">
            <UiInput
              v-model="form.name"
              type="text"
              :label="t('shop.cart.form.name')"
              :placeholder="t('shop.cart.form.namePlaceholder')"
              :disabled="checkoutLoading"
              full-width
            />

            <UiInput
              v-model="form.phone"
              type="tel"
              :label="t('shop.cart.form.phone')"
              :placeholder="t('shop.cart.form.phonePlaceholder')"
              :disabled="checkoutLoading"
              full-width
            />

            <UiTextarea
              v-model="form.comment"
              :label="t('shop.cart.form.comment')"
              :placeholder="t('shop.cart.form.commentPlaceholder')"
              :rows="3"
              :disabled="checkoutLoading"
              full-width
            />

            <div :class="$style.field">
              <span :class="$style.fieldLabel">
                {{ t("shop.checkout.paymentMethod.label") }}
              </span>
              <UiRadioGroup
                v-model="form.paymentMethod"
                :disabled="checkoutLoading"
              >
                <UiRadio value="CASH">
                  {{ t("shop.checkout.paymentMethod.cash") }}
                </UiRadio>
                <UiRadio value="INVOICE">
                  {{ t("shop.checkout.paymentMethod.invoice") }}
                </UiRadio>
              </UiRadioGroup>
            </div>

            <UiButton
              native-type="submit"
              variant="primary"
              full
              :loading="checkoutLoading"
              :disabled="!canSubmit"
            >
              {{ t("shop.checkout.submit") }}
            </UiButton>
          </form>
        </UiCard>
      </div>
    </section>
  </UiContainer>
</template>

<style module>
.page {
  display: grid;
  gap: 18px;
  padding-top: 104px;
  padding-bottom: 40px;
}

.title {
  margin: 0;
}

.skeleton {
  min-height: 320px;
  border-radius: var(--border-radius);
  background: linear-gradient(
    90deg,
    var(--color-background-secondary) 0%,
    var(--color-background-inactive) 50%,
    var(--color-background-secondary) 100%
  );
  background-size: 200% 100%;
  animation: pulse 1.4s linear infinite;
}

@keyframes pulse {
  from {
    background-position: 0% 50%;
  }
  to {
    background-position: 200% 50%;
  }
}

.backLink {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: var(--input-height);
  padding: 0 18px;
  border-radius: var(--button-radius);
  border: 1px solid var(--color-border);
  color: var(--color-text-black);
  text-decoration: none;
  font-weight: 500;
  transition: background-color var(--transition-duration);
}

.backLink:hover {
  background: var(--color-background-hover);
}

.layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 380px;
  gap: 20px;
  align-items: start;
}

.list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 10px;
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
  align-content: center;
}

.name {
  margin: 0;
  font-size: 14px;
  color: var(--color-text-black);
}

.lineTotal {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 13px;
}

.panel {
  display: grid;
  gap: 14px;
}

.promoBox {
  display: grid;
  gap: 6px;
}

.promoRow {
  display: flex;
  align-items: flex-end;
  gap: 8px;
}

.promoRow > *:first-child {
  flex: 1;
  min-width: 0;
}

.promoRemoveBtn {
  justify-self: start;
  border: 0;
  background: transparent;
  color: var(--color-error);
  padding: 0;
  font-size: 12px;
  cursor: pointer;
}

.summary {
  display: grid;
  gap: 6px;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  padding: 10px 0;
}

.totalRow {
  display: flex;
  justify-content: space-between;
  color: var(--color-text-black);
}

.discountRow {
  display: flex;
  justify-content: space-between;
  color: var(--color-secondary);
}

.checkoutForm {
  display: grid;
  gap: 14px;
}

.field {
  display: grid;
  gap: 6px;
}

.fieldLabel {
  font-size: var(--font-size-small);
  color: var(--color-text-primary);
}

@media (max-width: 860px) {
  .layout {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 768px) {
  .page {
    padding-top: 94px;
  }
}
</style>
