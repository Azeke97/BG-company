<script setup lang="ts">
import type { Category, Product } from "~/shared/types/admin";

type ProductFormModel = {
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
};

const props = defineProps<{
  visible: boolean;
  title: string;
  model?: Product | null;
  categories: Category[];
  loading?: boolean;
}>();

const emit = defineEmits<{
  (event: "update:visible", value: boolean): void;
  (event: "submit", value: ProductFormModel): void;
}>();

const formRef = ref();
const imagesText = ref("");

const form = reactive<ProductFormModel>({
  title: "",
  slug: "",
  description: null,
  price: 0,
  oldPrice: null,
  sku: null,
  stock: 0,
  isActive: true,
  categoryId: null,
  images: [],
});

watch(
  () => props.visible,
  (opened) => {
    if (!opened) return;
    form.title = props.model?.title ?? "";
    form.slug = props.model?.slug ?? "";
    form.description = props.model?.description ?? null;
    form.price = props.model?.price ?? 0;
    form.oldPrice = props.model?.oldPrice ?? null;
    form.sku = props.model?.sku ?? null;
    form.stock = props.model?.stock ?? 0;
    form.isActive = props.model?.isActive ?? true;
    form.categoryId = props.model?.categoryId ?? null;
    form.images = Array.isArray(props.model?.images)
      ? [...props.model.images]
      : [];
    imagesText.value = form.images.join("\n");
  },
);

const submit = async () => {
  await formRef.value?.validate();
  const images = imagesText.value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  emit("submit", {
    title: form.title.trim(),
    slug: form.slug.trim(),
    description: form.description?.trim() || null,
    price: Number(form.price) || 0,
    oldPrice: form.oldPrice === null ? null : Number(form.oldPrice) || 0,
    sku: form.sku?.trim() || null,
    stock: Number(form.stock) || 0,
    isActive: !!form.isActive,
    categoryId: form.categoryId || null,
    images,
  });
};
</script>

<template>
  <ElDialog
    :model-value="visible"
    :title="title"
    width="680"
    @close="emit('update:visible', false)"
  >
    <ElForm
      ref="formRef"
      :model="form"
      label-position="top"
      :rules="{
        title: [
          { required: true, message: 'Укажите название', trigger: 'blur' },
        ],
        price: [{ required: true, message: 'Укажите цену', trigger: 'change' }],
      }"
    >
      <ElRow :gutter="12">
        <ElCol :span="12">
          <ElFormItem label="Название" prop="title">
            <ElInput v-model="form.title" />
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="Slug">
            <ElInput v-model="form.slug" placeholder="Авто, если пусто" />
          </ElFormItem>
        </ElCol>
      </ElRow>

      <ElFormItem label="Описание">
        <ElInput v-model="form.description" type="textarea" :rows="3" />
      </ElFormItem>

      <ElRow :gutter="12">
        <ElCol :span="8">
          <ElFormItem label="Цена" prop="price">
            <ElInputNumber
              v-model="form.price"
              :min="0"
              :step="1"
              style="width: 100%"
            />
          </ElFormItem>
        </ElCol>
        <ElCol :span="8">
          <ElFormItem label="Старая цена">
            <ElInputNumber
              v-model="form.oldPrice"
              :min="0"
              :step="1"
              style="width: 100%"
            />
          </ElFormItem>
        </ElCol>
        <ElCol :span="8">
          <ElFormItem label="Остаток">
            <ElInputNumber
              v-model="form.stock"
              :min="0"
              :step="1"
              style="width: 100%"
            />
          </ElFormItem>
        </ElCol>
      </ElRow>

      <ElRow :gutter="12">
        <ElCol :span="12">
          <ElFormItem label="SKU">
            <ElInput v-model="form.sku" />
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="Категория">
            <ElSelect
              v-model="form.categoryId"
              clearable
              placeholder="Без категории"
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
        </ElCol>
      </ElRow>

      <ElFormItem label="Медиа URL (по одному на строку)">
        <ElInput v-model="imagesText" type="textarea" :rows="4" />
      </ElFormItem>

      <ElFormItem>
        <ElSwitch
          v-model="form.isActive"
          active-text="Опубликован"
          inactive-text="В архиве"
        />
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
