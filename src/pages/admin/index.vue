<script setup lang="ts">
import { ElMessage } from "element-plus";
import { adminApi } from "~/shared/api";
import type { Dashboard, OrderStatus } from "~/shared/types/admin";

definePageMeta({ layout: "admin" });

const dashboard = ref<Dashboard | null>(null);
const loading = ref(false);
const days = ref(14);

const statusLabel: Partial<Record<OrderStatus, string>> = {
  NEW: "Новый",
  PROCESSING: "В обработке",
  PAID: "Оплачен",
  COMPLETED: "Завершён",
  CANCELLED: "Отменён",
};

const formatMoney = (value: number) =>
  new Intl.NumberFormat("ru-RU").format(value);

const loadDashboard = async () => {
  loading.value = true;
  try {
    dashboard.value = await adminApi.getDashboard(days.value);
  } catch (error) {
    ElMessage.error(String((error as Error).message || error));
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadDashboard();
});
</script>

<template>
  <div :class="$style.page">
    <div :class="$style.headRow">
      <div>
        <h1 :class="$style.title">Дашборд</h1>
        <p :class="$style.caption">Ключевые показатели магазина</p>
      </div>
      <div :class="$style.actions">
        <ElSelect v-model="days" style="width: 180px">
          <ElOption :value="7" label="За 7 дней" />
          <ElOption :value="14" label="За 14 дней" />
          <ElOption :value="30" label="За 30 дней" />
          <ElOption :value="90" label="За 90 дней" />
        </ElSelect>
        <ElButton type="primary" :loading="loading" @click="loadDashboard"
          >Обновить</ElButton
        >
      </div>
    </div>

    <ElSkeleton v-if="loading && !dashboard" :rows="8" animated />

    <template v-else-if="dashboard">
      <div :class="$style.cards">
        <ElCard shadow="never">
          <ElStatistic title="Заказы" :value="dashboard.totals.orders" />
        </ElCard>
        <ElCard shadow="never">
          <ElStatistic title="Выручка" :value="dashboard.totals.revenue" />
        </ElCard>
        <ElCard shadow="never">
          <ElStatistic
            title="Дней в отчёте"
            :value="dashboard.range?.days || days"
          />
        </ElCard>
      </div>

      <ElRow :gutter="16">
        <ElCol :xs="24" :md="12">
          <ElCard shadow="never">
            <template #header>Продажи по дням</template>
            <ElTable :data="dashboard.salesByDay" size="small">
              <ElTableColumn prop="day" label="День" min-width="120" />
              <ElTableColumn prop="orders" label="Заказы" min-width="110" />
              <ElTableColumn label="Выручка" min-width="140">
                <template #default="{ row }">{{
                  formatMoney(row.revenue)
                }}</template>
              </ElTableColumn>
            </ElTable>
          </ElCard>
        </ElCol>

        <ElCol :xs="24" :md="12">
          <ElCard shadow="never">
            <template #header>Распределение статусов</template>
            <ElTable :data="dashboard.statusBreakdown" size="small">
              <ElTableColumn label="Статус" min-width="150">
                <template #default="{ row }">
                  {{ statusLabel[row.status as OrderStatus] || row.status }}
                </template>
              </ElTableColumn>
              <ElTableColumn prop="count" label="Количество" min-width="120" />
            </ElTable>
          </ElCard>
        </ElCol>
      </ElRow>

      <ElCard shadow="never">
        <template #header>Топ товаров</template>
        <ElTable :data="dashboard.topProducts" size="small">
          <ElTableColumn prop="title" label="Товар" min-width="260" />
          <ElTableColumn prop="qty" label="Кол-во" min-width="110" />
          <ElTableColumn label="Выручка" min-width="140">
            <template #default="{ row }">{{
              formatMoney(row.revenue)
            }}</template>
          </ElTableColumn>
        </ElTable>
      </ElCard>
    </template>
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

.actions {
  display: flex;
  gap: 10px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

@media (max-width: 900px) {
  .headRow {
    flex-direction: column;
  }

  .cards {
    grid-template-columns: 1fr;
  }
}
</style>
