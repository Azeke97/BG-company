<script setup lang="ts">
import { adminApi } from "~/shared/api";
import { useAdminUser } from "~/shared/helpers";

const route = useRoute();
const adminUser = useAdminUser();

const activeIndex = computed(() => {
  const path = route.path;
  if (path.startsWith("/admin/categories")) return "/admin/categories";
  if (path.startsWith("/admin/products")) return "/admin/products";
  if (path.startsWith("/admin/orders")) return "/admin/orders";
  if (path.startsWith("/admin/promos")) return "/admin/promos";
  if (path.startsWith("/admin/users")) return "/admin/users";
  return "/admin";
});

const logout = async () => {
  try {
    await adminApi.logout();
  } finally {
    adminUser.value = null;
    await navigateTo("/admin/login");
  }
};
</script>

<template>
  <ElContainer :class="$style.layout">
    <ElAside width="220px" :class="$style.aside">
      <div :class="$style.brand">BG Admin</div>
      <ElMenu :router="true" :default-active="activeIndex" :class="$style.menu">
        <ElMenuItem index="/admin">Дашборд</ElMenuItem>
        <ElMenuItem index="/admin/categories">Категории</ElMenuItem>
        <ElMenuItem index="/admin/products">Товары</ElMenuItem>
        <ElMenuItem index="/admin/orders">Заказы</ElMenuItem>
        <ElMenuItem index="/admin/promos">Промокоды</ElMenuItem>
        <ElMenuItem index="/admin/users">Пользователи</ElMenuItem>
      </ElMenu>
    </ElAside>

    <ElContainer :class="$style.content">
      <ElHeader :class="$style.header">
        <ElSpace :size="16">
          <span v-if="adminUser" :class="$style.userEmail">
            {{ adminUser.email }}
          </span>
          <ElButton text @click="navigateTo('/')">На сайт</ElButton>
          <ElButton size="small" @click="logout">Выйти</ElButton>
        </ElSpace>
      </ElHeader>
      <ElMain :class="$style.main">
        <slot />
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>

<style module>
.layout {
  min-height: 100vh;
}

.aside {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  border-right: var(--el-border);
  background: var(--el-bg-color);
}

.brand {
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  font-size: 16px;
  font-weight: var(--el-font-weight-primary);
  color: var(--el-text-color-primary);
  border-bottom: var(--el-border);
}

.menu {
  border-right: none;
}

.content {
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-bottom: var(--el-border);
  background: var(--el-bg-color);
}

.userEmail {
  font-size: 13px;
  color: var(--el-text-color-secondary);
}

.main {
  background: var(--el-bg-color-page);
}
</style>
