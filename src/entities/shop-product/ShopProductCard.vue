<script setup lang="ts">
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
  <article :class="$style.card">
    <div :class="$style.media">
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
      <span
        :class="[
          $style.stockBadge,
          item.stock > 0 ? $style.inStock : $style.outOfStock,
        ]"
      >
        {{
          item.stock > 0
            ? t("shop.stockIn", { count: item.stock })
            : t("shop.stockOut")
        }}
      </span>
    </div>

    <div :class="$style.body">
      <p v-if="item.category" :class="$style.category">
        {{ item.category.name }}
      </p>

      <h3 :class="$style.title">{{ item.title }}</h3>

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
        <button
          type="button"
          :class="$style.cartBtn"
          :disabled="item.stock <= 0"
          @click="$emit('add', item)"
        >
          {{ item.stock > 0 ? t("shop.cart.add") : t("shop.stockOut") }}
        </button>

        <NuxtLinkLocale :to="contactLink" :class="$style.cta">
          {{ t("shop.ctaConsult") }}
        </NuxtLinkLocale>
      </div>
    </div>
  </article>
</template>

<style module>
.card {
  display: flex;
  flex-direction: column;
  border: 1px solid #eceef2;
  border-radius: 8px;
  background: #fff;
  min-height: 100%;
}

.media {
  position: relative;
  aspect-ratio: 4 / 3;
  border-bottom: 1px solid #eceef2;
  overflow: hidden;
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
  background: linear-gradient(135deg, #f8f9fb 0%, #f1f3f6 100%);
}

.fallbackIcon {
  width: 28px;
  height: 28px;
  color: #9aa0ac;
}

.stockBadge {
  position: absolute;
  left: 10px;
  top: 10px;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.inStock {
  background: #eaf8ef;
  color: #177a35;
}

.outOfStock {
  background: #fdecef;
  color: #ad2235;
}

.body {
  padding: 14px;
  display: grid;
  gap: 10px;
}

.category {
  margin: 0;
  font-size: 12px;
  color: #666d7a;
}

.title {
  margin: 0;
  font-size: 18px;
  line-height: 1.3;
  color: #1f2937;
}

.description {
  margin: 0;
  color: #4f5867;
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
  color: #111827;
}

.oldPrice {
  font-size: 14px;
  color: #7c8493;
  text-decoration: line-through;
}

.cta {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 40px;
  border-radius: 8px;
  border: 1px solid #d9dfe8;
  color: #1f2937;
  background: #fff;
  text-decoration: none;
  font-weight: 500;
  font-size: 13px;
}

.cta:hover {
  background: #f5f6f8;
}

.actions {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 8px;
}

.cartBtn {
  min-height: 40px;
  border: 0;
  border-radius: 8px;
  background: #f6c453;
  color: #1f2937;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
}

.cartBtn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
