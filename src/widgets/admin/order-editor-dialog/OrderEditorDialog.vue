<script setup lang="ts">
import type { Order, OrderStatus, PaymentStatus } from "~/shared/types/admin";

type OrderUpdateModel = {
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  adminComment: string | null;
};

const props = defineProps<{
  visible: boolean;
  order: Order | null;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (event: "update:visible", value: boolean): void;
  (event: "submit", value: OrderUpdateModel): void;
}>();

const form = reactive<OrderUpdateModel>({
  status: "NEW",
  paymentStatus: "PENDING",
  adminComment: null,
});

const statusOptions: Array<{ label: string; value: OrderStatus }> = [
  {
    label: "Новый",
    value: "NEW",
  },
  {
    label: "В обработке",
    value: "PROCESSING",
  },
  {
    label: "Оплачен",
    value: "PAID",
  },
  {
    label: "Завершён",
    value: "COMPLETED",
  },
  {
    label: "Отменён",
    value: "CANCELLED",
  },
];

const statusLabelMap: Partial<Record<OrderStatus, string>> = {
  NEW: "Новый",
  PROCESSING: "В обработке",
  PAID: "Оплачен",
  COMPLETED: "Завершён",
  CANCELLED: "Отменён",
  DRAFT: "Черновик",
  PENDING: "Ожидает",
};

const getStatusLabel = (status: OrderStatus | null) =>
  status ? statusLabelMap[status] || status : "—";

const paymentStatusLabelMap: Partial<Record<PaymentStatus, string>> = {
  PENDING: "Ожидает оплаты",
  PAID: "Оплачен",
  FAILED: "Не удалось",
  REFUNDED: "Возврат",
};

const getPaymentStatusLabel = (status: string) =>
  paymentStatusLabelMap[status as PaymentStatus] || status;

const formatDate = (value: string) => new Date(value).toLocaleString("ru-RU");

const paymentStatusOptions: Array<{ label: string; value: PaymentStatus }> = [
  {
    label: "Ожидает оплаты",
    value: "PENDING",
  },
  {
    label: "Оплачен",
    value: "PAID",
  },
  {
    label: "Не удалось",
    value: "FAILED",
  },
  {
    label: "Возврат",
    value: "REFUNDED",
  },
];

watch(
  () => props.visible,
  (opened) => {
    if (!opened) return;
    form.status = props.order?.status ?? "NEW";
    form.paymentStatus = props.order?.paymentStatus ?? "PENDING";
    form.adminComment = props.order?.adminComment ?? null;
  },
);

const submit = () => {
  emit("submit", {
    status: form.status,
    paymentStatus: form.paymentStatus,
    adminComment: form.adminComment?.trim() || null,
  });
};
</script>

<template>
  <ElDialog
    :model-value="visible"
    title="Редактирование заказа"
    width="520"
    @close="emit('update:visible', false)"
  >
    <div v-if="order">
      <ElDescriptions :column="1" border size="small">
        <ElDescriptionsItem label="Номер"
          >#{{ order.number }}</ElDescriptionsItem
        >
        <ElDescriptionsItem label="Покупатель">
          {{ order.user?.email || "Гость" }}
        </ElDescriptionsItem>
        <ElDescriptionsItem label="Сумма">{{ order.total }}</ElDescriptionsItem>
      </ElDescriptions>
    </div>

    <ElForm :model="form" label-position="top" style="margin-top: 12px">
      <ElFormItem label="Статус">
        <ElSelect v-model="form.status" style="width: 100%">
          <ElOption
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </ElSelect>
      </ElFormItem>

      <ElFormItem label="Статус оплаты">
        <ElSelect v-model="form.paymentStatus" style="width: 100%">
          <ElOption
            v-for="item in paymentStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </ElSelect>
      </ElFormItem>

      <ElFormItem label="Комментарий менеджера">
        <ElInput v-model="form.adminComment" type="textarea" :rows="4" />
      </ElFormItem>
    </ElForm>

    <div v-if="order?.statusHistory?.length" :class="$style.historyBlock">
      <h3 :class="$style.historyTitle">История статусов</h3>
      <ul :class="$style.historyList">
        <li v-for="entry in order.statusHistory" :key="entry.id">
          {{ formatDate(entry.createdAt) }}:
          {{ getStatusLabel(entry.fromStatus) }} →
          {{ getStatusLabel(entry.toStatus) }}
          <span v-if="entry.comment"> ({{ entry.comment }})</span>
        </li>
      </ul>
    </div>

    <div v-if="order?.payments?.length" :class="$style.historyBlock">
      <h3 :class="$style.historyTitle">Платежи</h3>
      <ul :class="$style.historyList">
        <li v-for="payment in order.payments" :key="payment.id">
          {{ formatDate(payment.createdAt) }}: {{ payment.provider }} /
          {{ payment.method }} — {{ payment.amount }} —
          {{ getPaymentStatusLabel(payment.status) }}
        </li>
      </ul>
    </div>

    <template #footer>
      <ElButton @click="emit('update:visible', false)">Отмена</ElButton>
      <ElButton type="primary" :loading="loading" @click="submit"
        >Сохранить</ElButton
      >
    </template>
  </ElDialog>
</template>

<style module>
.historyBlock {
  margin-top: 16px;
  padding-top: 12px;
  border-top: var(--el-border);
}

.historyTitle {
  margin: 0 0 8px;
  font-size: 14px;
  color: var(--el-text-color-primary);
}

.historyList {
  margin: 0;
  padding-left: 18px;
  font-size: 13px;
  color: var(--el-text-color-regular);
  display: grid;
  gap: 4px;
}
</style>
