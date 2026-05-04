<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import { adminApi } from "~/shared/api";
import type { Category } from "~/shared/types/admin";
import CategoryFormDialog from "~/widgets/admin/category-form-dialog/CategoryFormDialog.vue";

definePageMeta({ layout: "admin" });

const loading = ref(false);
const tableLoading = ref(false);
const categories = ref<Category[]>([]);
const dialogVisible = ref(false);
const editing = ref<Category | null>(null);

const parentNameMap = computed(() => {
  const map = new Map<string, string>();
  for (const item of categories.value) map.set(item.id, item.name);
  return map;
});

const dialogTitle = computed(() =>
  editing.value ? `Редактирование: ${editing.value.name}` : "Новая категория",
);

const load = async () => {
  tableLoading.value = true;
  try {
    const res = await adminApi.listCategories();
    categories.value = res.items;
  } catch (error) {
    ElMessage.error(String((error as Error).message || error));
  } finally {
    tableLoading.value = false;
  }
};

const openCreate = () => {
  editing.value = null;
  dialogVisible.value = true;
};

const openEdit = (item: Category) => {
  editing.value = { ...item };
  dialogVisible.value = true;
};

const saveCategory = async (payload: {
  name: string;
  slug: string;
  parentId: string | null;
  sortOrder: number;
  isActive: boolean;
}) => {
  loading.value = true;
  try {
    if (editing.value) {
      await adminApi.updateCategory(editing.value.id, payload);
      ElMessage.success("Категория обновлена");
    } else {
      await adminApi.createCategory(payload);
      ElMessage.success("Категория создана");
    }
    dialogVisible.value = false;
    await load();
  } catch (error) {
    ElMessage.error(String((error as Error).message || error));
  } finally {
    loading.value = false;
  }
};

const removeCategory = async (item: Category) => {
  try {
    await ElMessageBox.confirm(
      `Удалить категорию "${item.name}"?`,
      "Подтверждение",
      {
        type: "warning",
        confirmButtonText: "Удалить",
        cancelButtonText: "Отмена",
      },
    );
    await adminApi.deleteCategory(item.id);
    ElMessage.success("Категория удалена");
    await load();
  } catch (error) {
    if (String(error).includes("cancel")) return;
    ElMessage.error(String((error as Error).message || error));
  }
};

onMounted(() => {
  load();
});
</script>

<template>
  <div :class="$style.page">
    <div :class="$style.headRow">
      <div>
        <h1 :class="$style.title">Категории</h1>
        <p :class="$style.caption">Иерархия, сортировка и активность</p>
      </div>
      <ElButton type="primary" @click="openCreate">Добавить категорию</ElButton>
    </div>

    <ElCard shadow="never">
      <ElTable :data="categories" :loading="tableLoading">
        <ElTableColumn prop="name" label="Название" min-width="180" />
        <ElTableColumn prop="slug" label="Slug" min-width="160" />
        <ElTableColumn label="Родитель" min-width="160">
          <template #default="{ row }">
            {{
              row.parentId
                ? parentNameMap.get(row.parentId) || row.parentId
                : "—"
            }}
          </template>
        </ElTableColumn>
        <ElTableColumn prop="sortOrder" label="Сортировка" min-width="120" />
        <ElTableColumn label="Товары" min-width="100">
          <template #default="{ row }">{{
            row._count?.products ?? 0
          }}</template>
        </ElTableColumn>
        <ElTableColumn label="Подкатегории" min-width="120">
          <template #default="{ row }">{{
            row._count?.children ?? 0
          }}</template>
        </ElTableColumn>
        <ElTableColumn label="Статус" min-width="110">
          <template #default="{ row }">
            <ElTag :type="row.isActive ? 'success' : 'info'">
              {{ row.isActive ? "Активна" : "Выключена" }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="Действия" width="180" fixed="right">
          <template #default="{ row }">
            <ElSpace>
              <ElButton size="small" @click="openEdit(row)">Изменить</ElButton>
              <ElButton
                size="small"
                type="danger"
                plain
                @click="removeCategory(row)"
              >
                Удалить
              </ElButton>
            </ElSpace>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>

    <CategoryFormDialog
      v-model:visible="dialogVisible"
      :title="dialogTitle"
      :model="editing"
      :categories="categories"
      :loading="loading"
      @submit="saveCategory"
    />
  </div>
</template>

<style module>
.page {
  display: grid;
  gap: 16px;
}

.headRow {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.title {
  margin: 0;
  font-size: 24px;
}

.caption {
  margin: 6px 0 0;
  color: #6b7280;
}

@media (max-width: 900px) {
  .headRow {
    flex-direction: column;
  }
}
</style>
