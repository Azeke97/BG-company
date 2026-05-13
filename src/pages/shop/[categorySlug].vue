<script setup lang="ts">
import { ShopCatalog } from "~/widgets/shop-catalog";

const route = useRoute();

const categorySlug = computed(() => {
  const value = route.params.categorySlug;
  return typeof value === "string" ? value : "";
});
</script>

<template>
  <ShopCatalog :category-slug="categorySlug" />
</template>
