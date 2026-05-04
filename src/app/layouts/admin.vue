<script setup lang="ts">
const route = useRoute();

const activeIndex = computed(() => {
  const path = route.path;
  if (path.startsWith("/admin/categories")) return "/admin/categories";
  if (path.startsWith("/admin/products")) return "/admin/products";
  if (path.startsWith("/admin/orders")) return "/admin/orders";
  if (path.startsWith("/admin/promos")) return "/admin/promos";
  if (path.startsWith("/admin/users")) return "/admin/users";
  return "/admin";
});
</script>

<template>
  <div :class="$style.adminLayout">
    <header :class="$style.header">
      <div :class="$style.headerTop">
        <strong>BG Admin</strong>
        <NuxtLink to="/" :class="$style.back">На сайт</NuxtLink>
      </div>
      <ElMenu
        mode="horizontal"
        :router="true"
        :default-active="activeIndex"
        :ellipsis="false"
        background-color="#111827"
        text-color="#e5e7eb"
        active-text-color="#ffffff"
      >
        <ElMenuItem index="/admin">Дашборд</ElMenuItem>
        <ElMenuItem index="/admin/categories">Категории</ElMenuItem>
        <ElMenuItem index="/admin/products">Товары</ElMenuItem>
        <ElMenuItem index="/admin/orders">Заказы</ElMenuItem>
        <ElMenuItem index="/admin/promos">Промокоды</ElMenuItem>
        <ElMenuItem index="/admin/users">Пользователи</ElMenuItem>
      </ElMenu>
    </header>
    <main :class="$style.main">
      <slot />
    </main>
  </div>
</template>

<style module>
.adminLayout {
  min-height: 100vh;
  background: #f5f6f8;
  color: #1f2937;
}

.header {
  position: sticky;
  top: 0;
  z-index: 30;
  background: #111827;
  color: #f9fafb;
  border-bottom: 1px solid #1f2937;
}

.headerTop {
  height: 52px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
}

.back {
  color: #f9fafb;
  text-decoration: none;
  opacity: 0.85;
}

.main {
  max-width: 1320px;
  margin: 0 auto;
  padding: 20px 16px;
}
</style>
