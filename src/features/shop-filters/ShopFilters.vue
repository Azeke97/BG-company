<script setup lang="ts">
import { UiSearchInput, UiSelect } from "~/shared/ui";
import type { ShopCatalogSort, ShopCategorySummary } from "~/shared/types/shop";

const props = defineProps<{
  categories: ShopCategorySummary[];
  selectedCategorySlug: string | null;
  search: string;
  sort: ShopCatalogSort;
}>();

const emit = defineEmits<{
  (event: "update:search", value: string): void;
  (event: "update:sort", value: ShopCatalogSort): void;
}>();

const { t } = useI18n();

const sortOptions = computed(() => [
  {
    label: t("shop.sort.new"),
    value: "new",
  },
  {
    label: t("shop.sort.priceAsc"),
    value: "price_asc",
  },
  {
    label: t("shop.sort.priceDesc"),
    value: "price_desc",
  },
  {
    label: t("shop.sort.titleAsc"),
    value: "title_asc",
  },
]);

const shopQuery = computed(() => {
  const query: Record<string, string> = {};

  if (props.search.trim()) {
    query.q = props.search.trim();
  }

  if (props.sort !== "new") {
    query.sort = props.sort;
  }

  return query;
});

const categoryLink = (slug: string | null) => {
  return {
    path: slug ? `/shop/${slug}` : "/shop",
    query: shopQuery.value,
  };
};
</script>

<template>
  <section :class="$style.filters">
    <div :class="$style.topRow">
      <UiSearchInput
        :model-value="search"
        :placeholder="t('shop.searchPlaceholder')"
        :full-width="true"
        clearable
        @update:model-value="emit('update:search', $event)"
      />
      <UiSelect
        :model-value="sort"
        :label="t('shop.sortLabel')"
        :options="sortOptions"
        :full-width="true"
        @update:model-value="emit('update:sort', $event)"
      />
    </div>

    <nav :class="$style.categories" :aria-label="t('shop.categoriesLabel')">
      <NuxtLinkLocale
        :to="categoryLink(null)"
        :class="[$style.categoryLink, !selectedCategorySlug && $style.active]"
      >
        {{ t("shop.allCategories") }}
      </NuxtLinkLocale>

      <NuxtLinkLocale
        v-for="category in categories"
        :key="category.id"
        :to="categoryLink(category.slug)"
        :class="[
          $style.categoryLink,
          selectedCategorySlug === category.slug && $style.active,
        ]"
      >
        <span>{{ category.name }}</span>
        <small :class="$style.counter">{{ category.productsCount }}</small>
      </NuxtLinkLocale>
    </nav>
  </section>
</template>

<style module>
.filters {
  display: grid;
  gap: 12px;
}

.topRow {
  display: grid;
  gap: 12px;
  grid-template-columns: minmax(0, 1fr) minmax(220px, 280px);
}

.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.categoryLink {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 34px;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: 0 12px;
  text-decoration: none;
  color: var(--color-text-black);
  font-size: 14px;
  background: var(--color-background);
  transition:
    border-color var(--transition-duration),
    background-color var(--transition-duration);
}

.categoryLink:hover {
  border-color: var(--color-border-hover);
}

.counter {
  color: var(--color-text-secondary);
  font-size: 12px;
}

.active {
  border-color: var(--color-primary);
  background: color-mix(in srgb, var(--color-primary) 14%, white);
}

@media (max-width: 900px) {
  .topRow {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
