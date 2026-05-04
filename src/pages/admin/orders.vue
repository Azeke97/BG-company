<script setup lang="ts">
import { ElMessage } from "element-plus";
import { adminApi } from "~/shared/api";
import type { Order, OrderStatus } from "~/shared/types/admin";
import OrderEditorDialog from "~/widgets/admin/order-editor-dialog/OrderEditorDialog.vue";

definePageMeta({ layout: "admin" });

const loading = ref(false);
const saving = ref(false);
const orders = ref<Order[]>([]);
const search = ref("");
const statusFilter = ref<OrderStatus | "ALL">("ALL");
const dialogVisible = ref(false);
const selectedOrder = ref<Order | null>(null);

const statusLabel: Partial<Record<OrderStatus, string>> = {
  NEW: "Новый",
  PROCESSING: "В обработке",
  PAID: "Оплачен",
  COMPLETED: "Завершён",
  CANCELLED: "Отменён",
};

const getStatusLabel = (status: unknown) => {
  if (typeof status !== "string") return "—";
  return statusLabel[status as OrderStatus] || status;
};

const formatMoney = (value: number) =>
  new Intl.NumberFormat("ru-RU").format(value);

const filteredOrders = computed(() => {
  const q = search.value.trim().toLowerCase();
  return orders.value.filter((item) => {
    const byStatus =
      statusFilter.value === "ALL" || item.status === statusFilter.value;
    if (!byStatus) return false;

    if (!q) return true;
    return (
      item.number.toLowerCase().includes(q) ||
      (item.user?.email || "").toLowerCase().includes(q) ||
      (item.user?.name || "").toLowerCase().includes(q)
    );
  });
});

const load = async () => {
  loading.value = true;
  try {
    const res = await adminApi.listOrders();
    orders.value = res.items;
  } catch (error) {
    ElMessage.error(String((error as Error).message || error));
  } finally {
    loading.value = false;
  }
};

const openEditor = (order: Order) => {
  selectedOrder.value = { ...order };
  dialogVisible.value = true;
};

const saveOrder = async (payload: {
  status: OrderStatus;
  adminComment: string | null;
}) => {
  if (!selectedOrder.value) return;
  saving.value = true;
  try {
    await adminApi.updateOrder(selectedOrder.value.id, payload);
    ElMessage.success("Заказ обновлён");
    dialogVisible.value = false;
    await load();
  } catch (error) {
    ElMessage.error(String((error as Error).message || error));
  } finally {
    saving.value = false;
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
        <h1 :class="$style.title">Заказы</h1>
        <p :class="$style.caption">Просмотр, смена статусов и комментарии</p>
      </div>
      <ElSpace wrap>
        <ElInput
          v-model="search"
          placeholder="Номер заказа или email"
          clearable
          style="width: 260px"
        />
        <ElSelect v-model="statusFilter" style="width: 180px">
          <ElOption value="ALL" label="Все статусы" />
          <ElOption value="NEW" label="Новый" />
          <ElOption value="PROCESSING" label="В обработке" />
          <ElOption value="PAID" label="Оплачен" />
          <ElOption value="COMPLETED" label="Завершён" />
          <ElOption value="CANCELLED" label="Отменён" />
        </ElSelect>
      </ElSpace>
    </div>

    <ElCard shadow="never">
      <ElTable :data="filteredOrders" :loading="loading">
        <ElTableColumn label="Заказ" min-width="120">
          <template #default="{ row }">#{{ row.number }}</template>
        </ElTableColumn>
        <ElTableColumn label="Пользователь" min-width="220">
          <template #default="{ row }">{{
            row.user?.email || "Гость"
          }}</template>
        </ElTableColumn>
        <ElTableColumn label="Статус" min-width="130">
          <template #default="{ row }">
            <ElTag :type="row.status === 'CANCELLED' ? 'danger' : 'info'">
              {{ getStatusLabel(row.status) }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="Сумма" min-width="140">
          <template #default="{ row }">{{ formatMoney(row.total) }}</template>
        </ElTableColumn>
        <ElTableColumn prop="createdAt" label="Дата" min-width="190" />
        <ElTableColumn
          label="Комментарий"
          min-width="260"
          show-overflow-tooltip
        >
          <template #default="{ row }">{{ row.adminComment || "—" }}</template>
        </ElTableColumn>
        <ElTableColumn label="Действия" width="130" fixed="right">
          <template #default="{ row }">
            <ElButton size="small" @click="openEditor(row)">Изменить</ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>

    <OrderEditorDialog
      v-model:visible="dialogVisible"
      :order="selectedOrder"
      :loading="saving"
      @submit="saveOrder"
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
