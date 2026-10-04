<script setup lang="ts">
import { UiContainer, UiTypography } from "~/shared/ui";

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

      <UiTypography tag="h1" variant="h2" :class="$style.title">
        {{ t("shop.checkout.success.title") }}
      </UiTypography>

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
  color: var(--color-success);
}

.title {
  margin: 0;
}

.text {
  margin: 0;
  color: var(--color-text-secondary);
  max-width: 480px;
}

.backLink {
  margin-top: 10px;
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

@media (max-width: 768px) {
  .page {
    padding-top: 94px;
  }
}
</style>
