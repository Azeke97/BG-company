<script setup lang="ts">
import type {
  AppliesTo,
  Category,
  Product,
  Promo,
  PromoType,
} from "~/shared/types/admin";

type PromoFormModel = {
  code: string;
  type: PromoType;
  value: number;
  appliesTo: AppliesTo;
  categoryId: string | null;
  productIds: string[];
  startsAt: string | null;
  endsAt: string | null;
  usageLimit: number | null;
  used?: number;
};

const props = defineProps<{
  visible: boolean;
  title: string;
  isEdit?: boolean;
  model?: Promo | null;
  categories: Category[];
  products: Product[];
  loading?: boolean;
}>();

const emit = defineEmits<{
  (event: "update:visible", value: boolean): void;
  (event: "submit", value: PromoFormModel): void;
}>();

const formRef = ref();

const form = reactive<PromoFormModel>({
  code: "",
  type: "PERCENT",
  value: 10,
  appliesTo: "ALL",
  categoryId: null,
  productIds: [],
  startsAt: null,
  endsAt: null,
  usageLimit: null,
  used: 0,
});

const toDatetimeLocal = (value: string | null | undefined) => {
  if (!value) return "";
  const dt = new Date(value);
  if (Number.isNaN(dt.getTime())) return "";
  return dt.toISOString().slice(0, 16);
};

watch(
  () => props.visible,
  (opened) => {
    if (!opened) return;
    form.code = props.model?.code ?? "";
    form.type = props.model?.type ?? "PERCENT";
    form.value = props.model?.value ?? 10;
    form.appliesTo = props.model?.appliesTo ?? "ALL";
    form.categoryId = props.model?.categoryId ?? null;
    form.productIds = props.model?.productIds ?? [];
    form.startsAt = toDatetimeLocal(props.model?.startsAt);
    form.endsAt = toDatetimeLocal(props.model?.endsAt);
    form.usageLimit = props.model?.usageLimit ?? null;
    form.used = props.model?.used ?? 0;
  },
);

const submit = async () => {
  await formRef.value?.validate();

  emit("submit", {
    code: form.code.trim().toUpperCase(),
    type: form.type,
    value: Number(form.value) || 0,
    appliesTo: form.appliesTo,
    categoryId: form.appliesTo === "CATEGORY" ? form.categoryId || null : null,
    productIds: form.appliesTo === "PRODUCTS" ? form.productIds : [],
    startsAt: form.startsAt ? new Date(form.startsAt).toISOString() : null,
    endsAt: form.endsAt ? new Date(form.endsAt).toISOString() : null,
    usageLimit: form.usageLimit === null ? null : Number(form.usageLimit) || 0,
    used: props.isEdit ? Number(form.used) || 0 : undefined,
  });
};
</script>

<template>
  <ElDialog
    :model-value="visible"
    :title="title"
    width="620"
    @close="emit('update:visible', false)"
  >
    <ElForm
      ref="formRef"
      :model="form"
      label-position="top"
      :rules="{
        code: [{ required: true, message: 'Укажите код', trigger: 'blur' }],
        value: [
          { required: true, message: 'Укажите скидку', trigger: 'change' },
        ],
      }"
    >
      <ElRow :gutter="12">
        <ElCol :span="12">
          <ElFormItem label="Код" prop="code">
            <ElInput v-model="form.code" :disabled="isEdit" />
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="Тип скидки">
            <ElSelect v-model="form.type" style="width: 100%">
              <ElOption label="Процент" value="PERCENT" />
              <ElOption label="Фикс" value="FIXED" />
            </ElSelect>
          </ElFormItem>
        </ElCol>
      </ElRow>

      <ElRow :gutter="12">
        <ElCol :span="8">
          <ElFormItem label="Значение" prop="value">
            <ElInputNumber
              v-model="form.value"
              :min="0"
              :step="1"
              style="width: 100%"
            />
          </ElFormItem>
        </ElCol>
        <ElCol :span="8">
          <ElFormItem label="Область действия">
            <ElSelect v-model="form.appliesTo" style="width: 100%">
              <ElOption label="Вся витрина" value="ALL" />
              <ElOption label="Категория" value="CATEGORY" />
              <ElOption label="Товары" value="PRODUCTS" />
            </ElSelect>
          </ElFormItem>
        </ElCol>
        <ElCol :span="8">
          <ElFormItem label="Лимит использований">
            <ElInputNumber
              v-model="form.usageLimit"
              :min="0"
              :step="1"
              style="width: 100%"
            />
          </ElFormItem>
        </ElCol>
      </ElRow>

      <ElFormItem v-if="form.appliesTo === 'CATEGORY'" label="Категория">
        <ElSelect
          v-model="form.categoryId"
          clearable
          placeholder="Выберите категорию"
          style="width: 100%"
        >
          <ElOption
            v-for="item in categories"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </ElSelect>
      </ElFormItem>

      <ElFormItem v-if="form.appliesTo === 'PRODUCTS'" label="Товары">
        <ElSelect
          v-model="form.productIds"
          multiple
          filterable
          collapse-tags
          collapse-tags-tooltip
          placeholder="Выберите товары"
          style="width: 100%"
        >
          <ElOption
            v-for="item in products"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          />
        </ElSelect>
      </ElFormItem>

      <ElRow :gutter="12">
        <ElCol :span="12">
          <ElFormItem label="Начало действия">
            <ElInput v-model="form.startsAt" type="datetime-local" />
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="Конец действия">
            <ElInput v-model="form.endsAt" type="datetime-local" />
          </ElFormItem>
        </ElCol>
      </ElRow>

      <ElFormItem v-if="isEdit" label="Использовано">
        <ElInputNumber v-model="form.used" :min="0" :step="1" />
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
