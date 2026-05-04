<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import { adminApi } from "~/shared/api";
import type { Category, Promo } from "~/shared/types/admin";
import PromoFormDialog from "~/widgets/admin/promo-form-dialog/PromoFormDialog.vue";

definePageMeta({ layout: "admin" });

const tableLoading = ref(false);
const saving = ref(false);
const promos = ref<Promo[]>([]);
const categories = ref<Category[]>([]);
const dialogVisible = ref(false);
const editing = ref<Promo | null>(null);

const dialogTitle = computed(() =>
  editing.value ? `Промокод: ${editing.value.code}` : "Новый промокод",
);

const categoryNameMap = computed(() => {
  const map = new Map<string, string>();
  for (const item of categories.value) map.set(item.id, item.name);
  return map;
});

const load = async () => {
  tableLoading.value = true;
  try {
    const [promoRes, categoryRes] = await Promise.all([
      adminApi.listPromos(),
      adminApi.listCategories(),
    ]);
    promos.value = promoRes.items;
    categories.value = categoryRes.items;
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

const openEdit = (item: Promo) => {
  editing.value = {
    ...item,
    productIds: [...item.productIds],
  };
  dialogVisible.value = true;
};

const savePromo = async (payload: {
  code: string;
  type: "PERCENT" | "FIXED";
  value: number;
  appliesTo: "ALL" | "CATEGORY" | "PRODUCTS";
  categoryId: string | null;
  productIds: string[];
  startsAt: string | null;
  endsAt: string | null;
  usageLimit: number | null;
  used?: number;
}) => {
  saving.value = true;
  try {
    if (editing.value) {
      await adminApi.updatePromo(editing.value.code, {
        type: payload.type,
        value: payload.value,
        appliesTo: payload.appliesTo,
        categoryId: payload.categoryId,
        productIds: payload.productIds,
        startsAt: payload.startsAt,
        endsAt: payload.endsAt,
        usageLimit: payload.usageLimit,
        used: payload.used,
      });
      ElMessage.success("Промокод обновлён");
    } else {
      await adminApi.createPromo(payload);
      ElMessage.success("Промокод создан");
    }
    dialogVisible.value = false;
    await load();
  } catch (error) {
    ElMessage.error(String((error as Error).message || error));
  } finally {
    saving.value = false;
  }
};

const removePromo = async (promo: Promo) => {
  try {
    await ElMessageBox.confirm(
      `Удалить промокод "${promo.code}"?`,
      "Подтверждение",
      {
        type: "warning",
        confirmButtonText: "Удалить",
        cancelButtonText: "Отмена",
      },
    );
    await adminApi.deletePromo(promo.code);
    ElMessage.success("Промокод удалён");
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
        <h1 :class="$style.title">Промокоды</h1>
        <p :class="$style.caption">Скидки, область действия, сроки и лимиты</p>
      </div>
      <ElButton type="primary" @click="openCreate">Добавить промокод</ElButton>
    </div>

    <ElCard shadow="never">
      <ElTable :data="promos" :loading="tableLoading">
        <ElTableColumn prop="code" label="Код" min-width="140" />
        <ElTableColumn label="Скидка" min-width="130">
          <template #default="{ row }">
            {{ row.type === "PERCENT" ? `${row.value}%` : row.value }}
          </template>
        </ElTableColumn>
        <ElTableColumn label="Область" min-width="180">
          <template #default="{ row }">
            <span v-if="row.appliesTo === 'ALL'">Вся витрина</span>
            <span v-else-if="row.appliesTo === 'CATEGORY'">
              Категория:
              {{
                row.categoryId
                  ? categoryNameMap.get(row.categoryId) || row.categoryId
                  : "—"
              }}
            </span>
            <span v-else>Товары: {{ row.productIds.length }}</span>
          </template>
        </ElTableColumn>
        <ElTableColumn label="Период" min-width="220">
          <template #default="{ row }">
            {{ row.startsAt || "—" }} → {{ row.endsAt || "—" }}
          </template>
        </ElTableColumn>
        <ElTableColumn label="Лимит / Использовано" min-width="170">
          <template #default="{ row }"
            >{{ row.usageLimit ?? "∞" }} / {{ row.used }}</template
          >
        </ElTableColumn>
        <ElTableColumn label="Действия" width="180" fixed="right">
          <template #default="{ row }">
            <ElSpace>
              <ElButton size="small" @click="openEdit(row)">Изменить</ElButton>
              <ElButton
                size="small"
                type="danger"
                plain
                @click="removePromo(row)"
              >
                Удалить
              </ElButton>
            </ElSpace>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>

    <PromoFormDialog
      v-model:visible="dialogVisible"
      :title="dialogTitle"
      :is-edit="!!editing"
      :model="editing"
      :categories="categories"
      :loading="saving"
      @submit="savePromo"
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
