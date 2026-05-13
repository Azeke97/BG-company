<script setup lang="ts">
import { ShopProductCard } from "~/entities/shop-product";
import type { ShopProductListItem } from "~/shared/types/shop";

defineProps<{
  items: ShopProductListItem[];
  pending?: boolean;
}>();
const emit = defineEmits<{
  (event: "add", item: ShopProductListItem): void;
}>();

const { t } = useI18n();
</script>

<template>
  <div v-if="pending" :class="$style.skeletonGrid">
    <div v-for="i in 6" :key="i" :class="$style.skeletonCard" />
  </div>

  <div v-else-if="items.length === 0" :class="$style.empty">
    <Icon name="lucide:package-search" :class="$style.emptyIcon" />
    <h2 :class="$style.emptyTitle">{{ t("shop.emptyTitle") }}</h2>
    <p :class="$style.emptySubtitle">{{ t("shop.emptySubtitle") }}</p>
  </div>

  <div v-else :class="$style.grid">
    <ShopProductCard
      v-for="item in items"
      :key="item.id"
      :item="item"
      @add="emit('add', $event)"
    />
  </div>
</template>

<style module>
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.empty {
  border: 1px solid #e4e8ee;
  border-radius: 8px;
  background: #fff;
  min-height: 280px;
  display: grid;
  place-items: center;
  text-align: center;
  padding: 20px;
}

.emptyIcon {
  width: 34px;
  height: 34px;
  color: #7a8392;
}

.emptyTitle {
  margin: 8px 0 4px;
  font-size: 20px;
  color: #1f2937;
}

.emptySubtitle {
  margin: 0;
  color: #5d6675;
}

.skeletonGrid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.skeletonCard {
  min-height: 390px;
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

@media (max-width: 1100px) {
  .grid,
  .skeletonGrid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .grid,
  .skeletonGrid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
