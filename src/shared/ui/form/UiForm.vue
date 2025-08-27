<script setup lang="ts" generic="T extends AnyRecord">
import type { AnyRecord, Nullable } from "~/shared/types";
import type { UiFormProps, UiFormEvents } from "./types";
import type { FormInstance, FormValidateCallback } from "element-plus";

const props = defineProps<UiFormProps<T>>();
defineEmits<UiFormEvents>();

const formRef = ref<Nullable<FormInstance>>(null);

const resetForm = () => {
  formRef.value?.resetFields();
};

const validateForm = async (callback?: FormValidateCallback) => {
  return await formRef.value?.validate(callback);
};

defineExpose({
  validateForm,
  resetForm,
});
</script>

<template>
  <ElForm v-bind="props" ref="formRef">
    <slot />
  </ElForm>
</template>
