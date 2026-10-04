<script setup lang="ts">
import { shopApi } from "~/shared/api";
import { addNotification } from "~/shared/libs/notifications";
import { useShopCartStore } from "~/features/shop-cart";
import { UiContainer } from "~/shared/ui";

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
      <Icon name="lucide:package-x" :class="$style.notFoundIcon" />
      <h1 :class="$style.notFoundTitle">
        {{ t("shop.product.notFoundTitle") }}
      </h1>
      <NuxtLinkLocale to="/shop" :class="$style.backLink">
        {{ t("shop.checkout.backToShop") }}
      </NuxtLinkLocale>
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
          <h1 :class="$style.title">{{ product.title }}</h1>

          <p :class="$style.stock">
            {{
              product.stock > 0
                ? t("shop.stockIn", { count: product.stock })
                : t("shop.stockOut")
            }}
          </p>

          <div :class="$style.priceRow">
            <strong :class="$style.price">{{ formattedPrice }} ₸</strong>
            <span v-if="formattedOldPrice" :class="$style.oldPrice">
              {{ formattedOldPrice }} ₸
            </span>
          </div>

          <button
            type="button"
            :class="$style.cartBtn"
            :disabled="product.stock <= 0"
            @click="addToCart"
          >
            {{ product.stock > 0 ? t("shop.cart.add") : t("shop.stockOut") }}
          </button>

          <p v-if="product.description" :class="$style.description">
            {{ product.description }}
          </p>

          <div v-if="attrEntries.length > 0" :class="$style.attrs">
            <h2 :class="$style.attrsTitle">
              {{ t("shop.product.attrsTitle") }}
            </h2>
            <ul :class="$style.attrsList">
              <li v-for="[key, value] in attrEntries" :key="key">
                <span :class="$style.attrKey">{{ key }}:</span>
                <span>{{ value }}</span>
              </li>
            </ul>
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
  color: #4b5563;
  text-decoration: none;
  font-size: 14px;
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
  border: 1px solid #eceef2;
  border-radius: 8px;
  overflow: hidden;
  background: #f4f6f9;
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
  color: #9aa0ac;
}

.thumbs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.thumbBtn {
  width: 64px;
  height: 64px;
  border-radius: 6px;
  overflow: hidden;
  border: 2px solid transparent;
  padding: 0;
  cursor: pointer;
  background: #f4f6f9;
}

.thumbActive {
  border-color: #f6c453;
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
  font-size: 28px;
  color: #111827;
}

.stock {
  margin: 0;
  font-size: 13px;
  color: #4b5563;
}

.priceRow {
  display: flex;
  gap: 10px;
  align-items: baseline;
}

.price {
  font-size: 26px;
  color: #111827;
}

.oldPrice {
  font-size: 16px;
  color: #7c8493;
  text-decoration: line-through;
}

.cartBtn {
  min-height: 44px;
  border: 0;
  border-radius: 8px;
  background: #f6c453;
  color: #1f2937;
  font-weight: 600;
  cursor: pointer;
  padding: 0 20px;
  justify-self: start;
}

.cartBtn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.description {
  margin: 0;
  color: #4f5867;
  line-height: 1.5;
}

.attrs {
  border-top: 1px solid #e5e9f0;
  padding-top: 12px;
}

.attrsTitle {
  margin: 0 0 8px;
  font-size: 16px;
  color: #1f2937;
}

.attrsList {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 6px;
  color: #4b5563;
  font-size: 14px;
}

.attrKey {
  font-weight: 600;
  color: #1f2937;
  margin-right: 6px;
}

.skeleton {
  min-height: 420px;
  margin-top: 104px;
  border-radius: 8px;
  background: linear-gradient(90deg, #f2f4f7 0%, #eceff4 50%, #f2f4f7 100%);
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
  justify-items: center;
  gap: 10px;
  text-align: center;
}

.notFoundIcon {
  width: 42px;
  height: 42px;
  color: #9aa0ac;
}

.notFoundTitle {
  margin: 0;
  font-size: 24px;
  color: #1f2937;
}

.backLink {
  color: #1f2937;
  text-decoration: underline;
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
