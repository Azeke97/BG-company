<script setup lang="ts">
import type { Order, OrderStatus } from "~/shared/types/admin";

type OrderUpdateModel = {
  status: OrderStatus;
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

watch(
  () => props.visible,
  (opened) => {
    if (!opened) return;
    form.status = props.order?.status ?? "NEW";
    form.adminComment = props.order?.adminComment ?? null;
  },
);

const submit = () => {
  emit("submit", {
    status: form.status,
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

      <ElFormItem label="Комментарий менеджера">
        <ElInput v-model="form.adminComment" type="textarea" :rows="4" />
      </ElFormItem>
    </ElForm>

    <template #footer>
      <ElButton @click="emit('update:visible', false)">Отмена</ElButton>
      <ElButton type="primary" :loading="loading" @click="submit"
        >Сохранить</ElButton
      >
    </template>
  </ElDialog>
</template>
