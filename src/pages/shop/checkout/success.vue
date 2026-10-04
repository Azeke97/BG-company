<script setup lang="ts">
import { UiContainer } from "~/shared/ui";

const { t } = useI18n();
const route = useRoute();

const orderNumber = computed(() => {
  const value = route.query.order;
  return typeof value === "string" ? value : "";
});

useSeoMeta({
  title: () => t("shop.checkout.success.seoTitle"),
});
</script>

<template>
  <UiContainer>
    <section :class="$style.page">
      <Icon name="lucide:circle-check" :class="$style.icon" />

      <h1 :class="$style.title">{{ t("shop.checkout.success.title") }}</h1>

      <p v-if="orderNumber" :class="$style.text">
        {{ t("shop.checkout.success.orderNumber", { number: orderNumber }) }}
      </p>

      <p :class="$style.text">{{ t("shop.checkout.success.contactSoon") }}</p>

      <NuxtLinkLocale to="/shop" :class="$style.backLink">
        {{ t("shop.checkout.backToShop") }}
      </NuxtLinkLocale>
    </section>
  </UiContainer>
</template>

<style module>
.page {
  min-height: 420px;
  display: grid;
  place-items: center;
  justify-items: center;
  gap: 10px;
  text-align: center;
  padding-top: 104px;
  padding-bottom: 40px;
}

.icon {
  width: 48px;
  height: 48px;
  color: #177a35;
}

.title {
  margin: 0;
  font-size: 28px;
  color: #111827;
}

.text {
  margin: 0;
  color: #4b5563;
  max-width: 480px;
}

.backLink {
  margin-top: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 18px;
  border-radius: 8px;
  border: 1px solid #d9dfe8;
  color: #1f2937;
  text-decoration: none;
  font-weight: 500;
}

.backLink:hover {
  background: #f5f6f8;
}

@media (max-width: 768px) {
  .page {
    padding-top: 94px;
  }
}
</style>
