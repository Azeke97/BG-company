<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import { adminApi } from "~/shared/api";
import type { Category, Product } from "~/shared/types/admin";
import ProductFormDialog from "~/widgets/admin/product-form-dialog/ProductFormDialog.vue";

definePageMeta({ layout: "admin" });

const tableLoading = ref(false);
const saving = ref(false);
const categories = ref<Category[]>([]);
const products = ref<Product[]>([]);
const dialogVisible = ref(false);
const editing = ref<Product | null>(null);

const dialogTitle = computed(() =>
  editing.value ? `Редактирование: ${editing.value.title}` : "Новый товар",
);

const formatMoney = (value: number) =>
  new Intl.NumberFormat("ru-RU").format(value);

const load = async () => {
  tableLoading.value = true;
  try {
    const [productsRes, categoriesRes] = await Promise.all([
      adminApi.listProducts(),
      adminApi.listCategories(),
    ]);
    products.value = productsRes.items;
    categories.value = categoriesRes.items;
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

const openEdit = (item: Product) => {
  editing.value = {
    ...item,
    images: [...item.images],
  };
  dialogVisible.value = true;
};

const saveProduct = async (payload: {
  title: string;
  slug: string;
  description: string | null;
  price: number;
  oldPrice: number | null;
  sku: string | null;
  stock: number;
  isActive: boolean;
  categoryId: string | null;
  images: string[];
}) => {
  saving.value = true;
  try {
    if (editing.value) {
      await adminApi.updateProduct(editing.value.id, payload);
      ElMessage.success("Товар обновлён");
    } else {
      await adminApi.createProduct(payload);
      ElMessage.success("Товар создан");
    }
    dialogVisible.value = false;
    await load();
  } catch (error) {
    ElMessage.error(String((error as Error).message || error));
  } finally {
    saving.value = false;
  }
};

const setArchived = async (item: Product, archived: boolean) => {
  try {
    await adminApi.updateProduct(item.id, { isActive: !archived });
    ElMessage.success(
      archived ? "Товар перенесён в архив" : "Товар опубликован",
    );
    await load();
  } catch (error) {
    ElMessage.error(String((error as Error).message || error));
  }
};

const removeProduct = async (item: Product) => {
  try {
    await ElMessageBox.confirm(
      `Удалить товар "${item.title}"?`,
      "Подтверждение",
      {
        type: "warning",
        confirmButtonText: "Удалить",
        cancelButtonText: "Отмена",
      },
    );
    await adminApi.deleteProduct(item.id);
    ElMessage.success("Товар удалён");
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
        <h1 :class="$style.title">Товары</h1>
        <p :class="$style.caption">
          Создание, редактирование, публикация и медиа
        </p>
      </div>
      <ElButton type="primary" @click="openCreate">Добавить товар</ElButton>
    </div>

    <ElCard shadow="never">
      <ElTable :data="products" :loading="tableLoading">
        <ElTableColumn prop="title" label="Название" min-width="220" />
        <ElTableColumn label="Категория" min-width="180">
          <template #default="{ row }">{{
            row.category?.name || "—"
          }}</template>
        </ElTableColumn>
        <ElTableColumn label="Цена" min-width="140">
          <template #default="{ row }">
            <strong>{{ formatMoney(row.price) }}</strong>
            <span v-if="row.oldPrice" :class="$style.oldPrice">
              {{ formatMoney(row.oldPrice) }}
            </span>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="stock" label="Остаток" min-width="110" />
        <ElTableColumn label="Медиа" min-width="90">
          <template #default="{ row }">{{ row.images.length }}</template>
        </ElTableColumn>
        <ElTableColumn label="Статус" min-width="120">
          <template #default="{ row }">
            <ElTag :type="row.isActive ? 'success' : 'info'">
              {{ row.isActive ? "Опубликован" : "Архив" }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="Действия" width="280" fixed="right">
          <template #default="{ row }">
            <ElSpace wrap>
              <ElButton size="small" @click="openEdit(row)">Изменить</ElButton>
              <ElButton
                size="small"
                :type="row.isActive ? 'warning' : 'success'"
                plain
                @click="setArchived(row, row.isActive)"
              >
                {{ row.isActive ? "В архив" : "Публиковать" }}
              </ElButton>
              <ElButton
                size="small"
                type="danger"
                plain
                @click="removeProduct(row)"
              >
                Удалить
              </ElButton>
            </ElSpace>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>

    <ProductFormDialog
      v-model:visible="dialogVisible"
      :title="dialogTitle"
      :model="editing"
      :categories="categories"
      :loading="saving"
      @submit="saveProduct"
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

.oldPrice {
  margin-left: 8px;
  color: #9ca3af;
  text-decoration: line-through;
}

@media (max-width: 900px) {
  .headRow {
    flex-direction: column;
  }
}
</style>
