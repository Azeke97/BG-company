<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { shopApi } from "~/shared/api";
import { UiContainer } from "~/shared/ui";
import { ShopFilters } from "~/features/shop-filters";
import {
  ShopCartButton,
  ShopCartDrawer,
  useShopCartStore,
} from "~/features/shop-cart";
import { addNotification } from "~/shared/libs/notifications";
import ShopCatalogGrid from "./components/ShopCatalogGrid.vue";
import type {
  ShopCatalogResponse,
  ShopCatalogSort,
  ShopProductListItem,
} from "~/shared/types/shop";

const props = defineProps<{
  categorySlug?: string;
}>();

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const cartOpened = ref(false);
const cartStore = useShopCartStore();
const { count: cartCount, total: cartTotal } = storeToRefs(cartStore);

const ALLOWED_SORTS: ShopCatalogSort[] = [
  "new",
  "price_asc",
  "price_desc",
  "title_asc",
];

const defaultData: ShopCatalogResponse = {
  items: [],
  categories: [],
  selectedCategory: null,
  total: 0,
};

const routeSearch = computed(() => {
  return typeof route.query.q === "string" ? route.query.q.trim() : "";
});

const routeSort = computed<ShopCatalogSort>(() => {
  const raw = typeof route.query.sort === "string" ? route.query.sort : "";
  return ALLOWED_SORTS.includes(raw as ShopCatalogSort)
    ? (raw as ShopCatalogSort)
    : "new";
});

const search = ref(routeSearch.value);
const sort = ref<ShopCatalogSort>(routeSort.value);

watch([routeSearch, routeSort], ([nextSearch, nextSort]) => {
  if (search.value !== nextSearch) {
    search.value = nextSearch;
  }

  if (sort.value !== nextSort) {
    sort.value = nextSort;
  }
});

const requestParams = computed(() => ({
  q: routeSearch.value || undefined,
  sort: routeSort.value,
  categorySlug: props.categorySlug,
}));

const key = computed(
  () =>
    `shop:catalog:${props.categorySlug ?? "all"}:${requestParams.value.q ?? ""}:${requestParams.value.sort}`,
);

const { data, pending } = await useAsyncData(
  key,
  () => shopApi.getCatalog(requestParams.value),
  {
    default: () => defaultData,
    watch: [requestParams],
  },
);

const catalog = computed(() => data.value ?? defaultData);

const syncRouteQuery = async () => {
  const query: Record<string, string> = {};

  const normalizedSearch = search.value.trim();
  if (normalizedSearch) {
    query.q = normalizedSearch;
  }

  if (sort.value !== "new") {
    query.sort = sort.value;
  }

  await router.replace({
    path: route.path,
    query,
  });
};

const syncRouteQueryDebounced = useDebounceFn(syncRouteQuery, 250);

watch(search, () => {
  syncRouteQueryDebounced();
});

watch(sort, () => {
  syncRouteQuery();
});

const seoTitle = computed(() => {
  if (catalog.value.selectedCategory) {
    return t("shop.seo.categoryTitle", {
      category: catalog.value.selectedCategory.name,
    });
  }

  return t("shop.seo.catalogTitle");
});

const seoDescription = computed(() => {
  if (catalog.value.selectedCategory) {
    return t("shop.seo.categoryDescription", {
      category: catalog.value.selectedCategory.name,
    });
  }

  return t("shop.seo.catalogDescription");
});

useSeoMeta({
  title: () => seoTitle.value,
  description: () => seoDescription.value,
  ogTitle: () => seoTitle.value,
  ogDescription: () => seoDescription.value,
});

const addToCart = (item: ShopProductListItem) => {
  if (item.stock <= 0) {
    addNotification(t("shop.cart.stockUnavailable"), "warning");
    return;
  }

  cartStore.addItem(item);
  addNotification(t("shop.cart.added"), "success", { duration: 1600 });
};
</script>

<template>
  <UiContainer>
    <section :class="$style.catalog">
      <header :class="$style.header">
        <div>
          <h1 :class="$style.title">
            {{
              catalog.selectedCategory
                ? catalog.selectedCategory.name
                : t("shop.title")
            }}
          </h1>
          <p :class="$style.subtitle">{{ t("shop.subtitle") }}</p>
          <p :class="$style.counter">
            {{ t("shop.resultsCount", { count: catalog.total }) }}
          </p>
        </div>

        <ShopCartButton
          :count="cartCount"
          :total="cartTotal"
          @open="cartOpened = true"
        />
      </header>

      <ShopFilters
        :categories="catalog.categories"
        :selected-category-slug="catalog.selectedCategory?.slug ?? null"
        :search="search"
        :sort="sort"
        @update:search="search = $event"
        @update:sort="sort = $event"
      />

      <ShopCatalogGrid
        :items="catalog.items"
        :pending="pending"
        @add="addToCart"
      />
    </section>

    <ShopCartDrawer v-model="cartOpened" />
  </UiContainer>
</template>

<style module>
.catalog {
  display: grid;
  gap: 18px;
  padding-top: 104px;
  padding-bottom: 24px;
}

.header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
}

.title {
  margin: 0;
  font-size: 34px;
  color: #111827;
}

.subtitle {
  margin: 0;
  color: #4b5563;
  max-width: 740px;
}

.counter {
  margin: 0;
  color: #6b7280;
  font-size: 14px;
}

@media (max-width: 768px) {
  .catalog {
    padding-top: 94px;
  }

  .header {
    flex-direction: column;
    align-items: stretch;
  }

  .title {
    font-size: 28px;
  }
}
</style>
