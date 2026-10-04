<script setup lang="ts">
import { UiButton, UiCard, UiTag } from "~/shared/ui";
import type { ShopProductListItem } from "~/shared/types/shop";

const props = defineProps<{
  item: ShopProductListItem;
}>();
defineEmits<{
  (event: "add", item: ShopProductListItem): void;
}>();

const { t } = useI18n();
const localePath = useLocalePath();

const preview = computed(() => props.item.images[0] ?? "");
const contactLink = computed(() => `${localePath("/")}#contact`);
const productLink = computed(() =>
  localePath(`/shop/product/${props.item.slug}`),
);

const formattedPrice = computed(() =>
  new Intl.NumberFormat("ru-RU").format(props.item.price),
);

const formattedOldPrice = computed(() => {
  if (!props.item.oldPrice) {
    return "";
  }

  return new Intl.NumberFormat("ru-RU").format(props.item.oldPrice);
});
</script>

<template>
  <UiCard tag="article" padding="0" hoverable :class="$style.card">
    <NuxtLinkLocale :to="productLink" :class="$style.media">
      <img
        v-if="preview"
        :src="preview"
        :alt="item.title"
        :class="$style.image"
        loading="lazy"
      />
      <div v-else :class="$style.fallback">
        <Icon name="lucide:image" :class="$style.fallbackIcon" />
      </div>

      <span :class="$style.stockBadge">
        <UiTag :variant="item.stock > 0 ? 'success' : 'danger'">
          {{
            item.stock > 0
              ? t("shop.stockIn", { count: item.stock })
              : t("shop.stockOut")
          }}
        </UiTag>
      </span>
    </NuxtLinkLocale>

    <div :class="$style.body">
      <p v-if="item.category" :class="$style.category">
        {{ item.category.name }}
      </p>

      <h3 :class="$style.title">
        <NuxtLinkLocale :to="productLink" :class="$style.titleLink">
          {{ item.title }}
        </NuxtLinkLocale>
      </h3>

      <p v-if="item.description" :class="$style.description">
        {{ item.description }}
      </p>

      <div :class="$style.priceRow">
        <strong :class="$style.price">{{ formattedPrice }} ₸</strong>
        <span v-if="formattedOldPrice" :class="$style.oldPrice">
          {{ formattedOldPrice }} ₸
        </span>
      </div>

      <div :class="$style.actions">
        <UiButton
          variant="primary"
          :disabled="item.stock <= 0"
          full
          @click="$emit('add', item)"
        >
          {{ item.stock > 0 ? t("shop.cart.add") : t("shop.stockOut") }}
        </UiButton>

        <NuxtLinkLocale :to="contactLink" :class="$style.cta">
          {{ t("shop.ctaConsult") }}
        </NuxtLinkLocale>
      </div>
    </div>
  </UiCard>
</template>

<style module>
.card {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  overflow: hidden;
}

.media {
  position: relative;
  display: block;
  aspect-ratio: 4 / 3;
  border-bottom: 1px solid var(--color-border);
  overflow: hidden;
}

.titleLink {
  color: inherit;
  text-decoration: none;
}

.titleLink:hover {
  text-decoration: underline;
}

.image {
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
  background: var(--color-background-secondary);
}

.fallbackIcon {
  width: 28px;
  height: 28px;
  color: var(--color-text-secondary-light);
}

.stockBadge {
  position: absolute;
  left: 10px;
  top: 10px;
}

.body {
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.category {
  margin: 0;
  font-size: 12px;
  color: var(--color-text-secondary);
}

.title {
  margin: 0;
  font-size: 18px;
  line-height: 1.3;
  color: var(--color-text-black);
}

.description {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 14px;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.priceRow {
  display: flex;
  gap: 8px;
  align-items: baseline;
}

.price {
  font-size: 20px;
  color: var(--color-text-black);
}

.oldPrice {
  font-size: 14px;
  color: var(--color-text-secondary-light);
  text-decoration: line-through;
}

.actions {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 8px;
  margin-top: auto;
  padding-top: 4px;
}

.cta {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-height: var(--input-height);
  border-radius: var(--button-radius);
  border: 2px solid var(--color-secondary);
  color: var(--color-text-black);
  background: transparent;
  text-decoration: none;
  font-weight: 600;
  font-size: 13px;
  transition:
    background-color var(--transition-duration),
    color var(--transition-duration);
}

.cta:hover {
  background: var(--color-secondary);
  color: var(--color-text-white);
}
</style>
