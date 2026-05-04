<script setup lang="ts">
import type { Category } from "~/shared/types/admin";

type CategoryFormModel = {
  name: string;
  slug: string;
  parentId: string | null;
  sortOrder: number;
  isActive: boolean;
};

const props = defineProps<{
  visible: boolean;
  title: string;
  model?: Category | null;
  categories: Category[];
  loading?: boolean;
}>();

const emit = defineEmits<{
  (event: "update:visible", value: boolean): void;
  (event: "submit", value: CategoryFormModel): void;
}>();

const form = reactive<CategoryFormModel>({
  name: "",
  slug: "",
  parentId: null,
  sortOrder: 0,
  isActive: true,
});

const formRef = ref();

const parentOptions = computed(() => {
  if (!props.model?.id) return props.categories;
  return props.categories.filter((item) => item.id !== props.model?.id);
});

watch(
  () => props.visible,
  (opened) => {
    if (!opened) return;
    form.name = props.model?.name ?? "";
    form.slug = props.model?.slug ?? "";
    form.parentId = props.model?.parentId ?? null;
    form.sortOrder = props.model?.sortOrder ?? 0;
    form.isActive = props.model?.isActive ?? true;
  },
);

const submit = async () => {
  await formRef.value?.validate();
  emit("submit", {
    name: form.name.trim(),
    slug: form.slug.trim(),
    parentId: form.parentId || null,
    sortOrder: Number(form.sortOrder) || 0,
    isActive: !!form.isActive,
  });
};
</script>

<template>
  <ElDialog
    :model-value="visible"
    :title="title"
    width="520"
    @close="emit('update:visible', false)"
  >
    <ElForm
      ref="formRef"
      :model="form"
      label-position="top"
      :rules="{
        name: [
          { required: true, message: 'Укажите название', trigger: 'blur' },
        ],
      }"
    >
      <ElFormItem label="Название" prop="name">
        <ElInput v-model="form.name" placeholder="Например: Кухни" />
      </ElFormItem>

      <ElFormItem label="Slug">
        <ElInput
          v-model="form.slug"
          placeholder="Оставьте пустым для автогенерации"
        />
      </ElFormItem>

      <ElFormItem label="Родительская категория">
        <ElSelect
          v-model="form.parentId"
          clearable
          placeholder="Без родителя"
          style="width: 100%"
        >
          <ElOption
            v-for="item in parentOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </ElSelect>
      </ElFormItem>

      <ElFormItem label="Порядок сортировки">
        <ElInputNumber v-model="form.sortOrder" :min="0" :step="1" />
      </ElFormItem>

      <ElFormItem>
        <ElSwitch
          v-model="form.isActive"
          active-text="Активна"
          inactive-text="Выключена"
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
