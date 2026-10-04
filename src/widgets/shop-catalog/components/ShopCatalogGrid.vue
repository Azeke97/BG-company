<script setup lang="ts">
import { ShopProductCard } from "~/entities/shop-product";
import { UiCard, UiEmptyState } from "~/shared/ui";
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

  <UiCard v-else-if="items.length === 0" padding="0">
    <UiEmptyState
      icon="lucide:package-search"
      :title="t('shop.emptyTitle')"
      :text="t('shop.emptySubtitle')"
    />
  </UiCard>

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

.skeletonGrid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.skeletonCard {
  min-height: 390px;
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
