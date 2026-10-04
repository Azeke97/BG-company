<script setup lang="ts">
import { ElMessage } from "element-plus";
import { adminApi } from "~/shared/api";

definePageMeta({ layout: false });

const form = reactive({
  email: "",
  password: "",
});

const formRef = ref();
const loading = ref(false);

const rules = {
  email: [
    {
      required: true,
      message: "Укажите email",
      trigger: "blur",
    },
    {
      type: "email" as const,
      message: "Некорректный email",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "Укажите пароль",
      trigger: "blur",
    },
  ],
};

const submit = async () => {
  await formRef.value?.validate();

  loading.value = true;
  try {
    await adminApi.login(form.email.trim(), form.password);
    await navigateTo("/admin");
  } catch {
    ElMessage.error("Неверный email или пароль");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div :class="$style.page">
    <ElCard :class="$style.card" shadow="never">
      <h1 :class="$style.title">Вход в админку</h1>
      <ElForm
        ref="formRef"
        :model="form"
        :rules="rules"
        label-position="top"
        @submit.prevent="submit"
      >
        <ElFormItem label="Email" prop="email">
          <ElInput
            v-model="form.email"
            type="email"
            placeholder="admin@bg.local"
            autocomplete="username"
            @keyup.enter="submit"
          />
        </ElFormItem>

        <ElFormItem label="Пароль" prop="password">
          <ElInput
            v-model="form.password"
            type="password"
            show-password
            autocomplete="current-password"
            @keyup.enter="submit"
          />
        </ElFormItem>

        <ElButton
          type="primary"
          :loading="loading"
          style="width: 100%"
          @click="submit"
        >
          Войти
        </ElButton>
      </ElForm>
    </ElCard>
  </div>
</template>

<style module>
.page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--el-bg-color-page);
  padding: 16px;
}

.card {
  width: 100%;
  max-width: 360px;
}

.title {
  margin: 0 0 20px;
  font-size: 20px;
  text-align: center;
}
</style>
