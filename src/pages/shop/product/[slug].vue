<script setup lang="ts">
import { shopApi } from "~/shared/api";
import { addNotification } from "~/shared/libs/notifications";
import { useShopCartStore } from "~/features/shop-cart";
import {
  UiButton,
  UiCard,
  UiContainer,
  UiEmptyState,
  UiTag,
  UiTypography,
} from "~/shared/ui";

const { t } = useI18n();
const route = useRoute();
const localePath = useLocalePath();
const cartStore = useShopCartStore();

const slug = computed(() => {
  const value = route.params.slug;
  return typeof value === "string" ? value : "";
});

const { data, error } = await useAsyncData(
  () => `shop:product:${slug.value}`,
  () => shopApi.getProduct(slug.value),
  { watch: [slug] },
);

const product = computed(() => data.value?.item ?? null);
const notFound = computed(() => {
  const statusCode = (error.value as { statusCode?: number } | null)
    ?.statusCode;
  return statusCode === 404;
});

const activeImage = ref(0);

watch(
  () => product.value?.id,
  () => {
    activeImage.value = 0;
  },
);

const preview = computed(() => product.value?.images[activeImage.value] ?? "");

const formattedPrice = computed(() =>
  product.value
    ? new Intl.NumberFormat("ru-RU").format(product.value.price)
    : "",
);

const formattedOldPrice = computed(() => {
  if (!product.value?.oldPrice) {
    return "";
  }
  return new Intl.NumberFormat("ru-RU").format(product.value.oldPrice);
});

const attrEntries = computed(() => {
  if (!product.value?.attrs) {
    return [];
  }
  return Object.entries(product.value.attrs).filter(
    ([, value]) => value !== null && value !== undefined && value !== "",
  );
});

const addToCart = () => {
  if (!product.value || product.value.stock <= 0) {
    addNotification(t("shop.cart.stockUnavailable"), "warning");
    return;
  }

  cartStore.addItem(product.value);
  addNotification(t("shop.cart.added"), "success", { duration: 1600 });
};

const categoryHref = computed(() =>
  product.value?.category
    ? localePath(`/shop/${product.value.category.slug}`)
    : localePath("/shop"),
);

useSeoMeta({
  title: () =>
    product.value
      ? t("shop.product.seoTitle", { title: product.value.title })
      : t("shop.product.notFoundTitle"),
  description: () => product.value?.description || undefined,
});
</script>

<template>
  <UiContainer>
    <section v-if="notFound" :class="$style.notFound">
      <UiEmptyState
        icon="lucide:package-x"
        :title="t('shop.product.notFoundTitle')"
      >
        <NuxtLinkLocale to="/shop" :class="$style.backLink">
          {{ t("shop.checkout.backToShop") }}
        </NuxtLinkLocale>
      </UiEmptyState>
    </section>

    <section v-else-if="!product" :class="$style.skeleton" />

    <section v-else :class="$style.page">
      <NuxtLinkLocale :to="categoryHref" :class="$style.categoryLink">
        <Icon name="lucide:arrow-left" :class="$style.backIcon" />
        {{ product.category ? product.category.name : t("shop.title") }}
      </NuxtLinkLocale>

      <div :class="$style.layout">
        <div :class="$style.gallery">
          <div :class="$style.mainMedia">
            <img
              v-if="preview"
              :src="preview"
              :alt="product.title"
              :class="$style.mainImage"
            />
            <div v-else :class="$style.fallback">
              <Icon name="lucide:image" :class="$style.fallbackIcon" />
            </div>
          </div>

          <div v-if="product.images.length > 1" :class="$style.thumbs">
            <button
              v-for="(image, index) in product.images"
              :key="image + index"
              type="button"
              :class="[
                $style.thumbBtn,
                index === activeImage ? $style.thumbActive : '',
              ]"
              @click="activeImage = index"
            >
              <img
                :src="image"
                :alt="product.title"
                :class="$style.thumbImage"
              />
            </button>
          </div>
        </div>

        <div :class="$style.info">
          <UiTypography tag="h1" variant="h2" :class="$style.title">
            {{ product.title }}
          </UiTypography>

          <UiTag
            :variant="product.stock > 0 ? 'success' : 'danger'"
            :class="$style.stock"
          >
            {{
              product.stock > 0
                ? t("shop.stockIn", { count: product.stock })
                : t("shop.stockOut")
            }}
          </UiTag>

          <div :class="$style.priceRow">
            <strong :class="$style.price">{{ formattedPrice }} ₸</strong>
            <span v-if="formattedOldPrice" :class="$style.oldPrice">
              {{ formattedOldPrice }} ₸
            </span>
          </div>

          <UiButton
            variant="primary"
            :disabled="product.stock <= 0"
            :class="$style.cartBtn"
            @click="addToCart"
          >
            {{ product.stock > 0 ? t("shop.cart.add") : t("shop.stockOut") }}
          </UiButton>

          <p v-if="product.description" :class="$style.description">
            {{ product.description }}
          </p>

          <div v-if="attrEntries.length > 0" :class="$style.attrs">
            <UiTypography tag="h2" variant="h5" :class="$style.attrsTitle">
              {{ t("shop.product.attrsTitle") }}
            </UiTypography>
            <UiCard padding="0">
              <dl :class="$style.attrsList">
                <template v-for="[key, value] in attrEntries" :key="key">
                  <dt :class="$style.attrKey">{{ key }}</dt>
                  <dd :class="$style.attrValue">{{ value }}</dd>
                </template>
              </dl>
            </UiCard>
          </div>
        </div>
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

.categoryLink {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: 14px;
  transition: color var(--transition-duration);
}

.categoryLink:hover {
  color: var(--color-primary);
}

.backIcon {
  width: 14px;
  height: 14px;
}

.layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 28px;
}

.gallery {
  display: grid;
  gap: 10px;
  align-content: start;
}

.mainMedia {
  aspect-ratio: 4 / 3;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  overflow: hidden;
  background: var(--color-background-secondary);
}

.mainImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.fallback {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}

.fallbackIcon {
  width: 36px;
  height: 36px;
  color: var(--color-text-secondary-light);
}

.thumbs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.thumbBtn {
  width: 64px;
  height: 64px;
  border-radius: var(--border-radius-small);
  overflow: hidden;
  border: 2px solid transparent;
  padding: 0;
  cursor: pointer;
  background: var(--color-background-secondary);
  transition: border-color var(--transition-duration);
}

.thumbActive {
  border-color: var(--color-primary);
}

.thumbImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.info {
  display: grid;
  gap: 12px;
  align-content: start;
}

.title {
  margin: 0;
}

.stock {
  justify-self: start;
}

.priceRow {
  display: flex;
  gap: 10px;
  align-items: baseline;
}

.price {
  font-size: 26px;
  color: var(--color-text-black);
}

.oldPrice {
  font-size: 16px;
  color: var(--color-text-secondary-light);
  text-decoration: line-through;
}

.cartBtn {
  justify-self: start;
}

.description {
  margin: 0;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.attrs {
  border-top: 1px solid var(--color-border);
  padding-top: 12px;
}

.attrsTitle {
  margin: 0 0 8px;
}

.attrsList {
  margin: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  font-size: 14px;
}

.attrKey,
.attrValue {
  margin: 0;
  padding: 10px 14px;
  border-bottom: 1px solid var(--color-border);
}

.attrsList > *:nth-last-child(-n + 2) {
  border-bottom: none;
}

.attrKey {
  font-weight: 600;
  color: var(--color-text-black);
  background: var(--color-background-secondary);
}

.attrValue {
  color: var(--color-text-secondary);
}

.skeleton {
  min-height: 420px;
  margin-top: 104px;
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

.notFound {
  min-height: 420px;
  margin-top: 104px;
  display: grid;
  place-items: center;
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

@media (max-width: 860px) {
  .layout {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 768px) {
  .page {
    padding-top: 94px;
  }
  .skeleton,
  .notFound {
    margin-top: 94px;
  }
}
</style>
