<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import { adminApi } from "~/shared/api";
import type { User } from "~/shared/types/admin";

definePageMeta({ layout: "admin" });

const loading = ref(false);
const query = ref("");
const users = ref<User[]>([]);

const loadUsers = async () => {
  loading.value = true;
  try {
    const res = await adminApi.listUsers(query.value);
    users.value = res.items;
  } catch (error) {
    ElMessage.error(String((error as Error).message || error));
  } finally {
    loading.value = false;
  }
};

const toggleBlock = async (user: User) => {
  const targetState = !user.isBlocked;
  const action = targetState ? "заблокировать" : "разблокировать";
  try {
    await ElMessageBox.confirm(
      `${action.charAt(0).toUpperCase()}${action.slice(1)} пользователя ${user.email}?`,
      "Подтверждение",
      {
        type: "warning",
        confirmButtonText: "Подтвердить",
        cancelButtonText: "Отмена",
      },
    );
    await adminApi.updateUser(user.id, targetState);
    ElMessage.success(
      targetState ? "Пользователь заблокирован" : "Пользователь разблокирован",
    );
    await loadUsers();
  } catch (error) {
    if (String(error).includes("cancel")) return;
    ElMessage.error(String((error as Error).message || error));
  }
};

onMounted(() => {
  loadUsers();
});
</script>

<template>
  <div :class="$style.page">
    <div :class="$style.headRow">
      <div>
        <h1 :class="$style.title">Пользователи</h1>
        <p :class="$style.caption">Поиск и блокировка</p>
      </div>
      <ElSpace wrap>
        <ElInput
          v-model="query"
          clearable
          placeholder="email / имя / телефон"
          style="width: 280px"
          @keyup.enter="loadUsers"
        />
        <ElButton type="primary" :loading="loading" @click="loadUsers"
          >Найти</ElButton
        >
      </ElSpace>
    </div>

    <ElCard shadow="never">
      <ElTable :data="users" :loading="loading">
        <ElTableColumn prop="email" label="Email" min-width="220" />
        <ElTableColumn prop="name" label="Имя" min-width="140" />
        <ElTableColumn prop="phone" label="Телефон" min-width="150" />
        <ElTableColumn prop="role" label="Роль" min-width="100" />
        <ElTableColumn label="Заказы" min-width="100">
          <template #default="{ row }">{{ row._count.orders }}</template>
        </ElTableColumn>
        <ElTableColumn label="Статус" min-width="120">
          <template #default="{ row }">
            <ElTag :type="row.isBlocked ? 'danger' : 'success'">
              {{ row.isBlocked ? "Заблокирован" : "Активен" }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="Действия" width="70" align="center">
          <template #default="{ row }">
            <ElDropdown trigger="click" placement="bottom-end">
              <ElButton size="small" circle text>
                <Icon name="lucide:more-vertical" />
              </ElButton>
              <template #dropdown>
                <ElDropdownMenu>
                  <ElDropdownItem @click="toggleBlock(row as User)">
                    {{ row.isBlocked ? "Разблокировать" : "Блокировать" }}
                  </ElDropdownItem>
                </ElDropdownMenu>
              </template>
            </ElDropdown>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
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
  color: var(--el-text-color-secondary);
}

@media (max-width: 900px) {
  .headRow {
    flex-direction: column;
  }
}
</style>
