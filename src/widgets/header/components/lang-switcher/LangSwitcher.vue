<script setup lang="ts">
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from "element-plus";
import { type AppLocales, languages } from "~/shared/constants";

const { locale, setLocale } = useI18n();

defineProps<{
  theme?: "light" | "dark";
}>();

const onCommand = (newLocale: string) => {
  if (languages.some((l) => l.code === newLocale)) {
    setLocale(newLocale as AppLocales);
  }
};
</script>

<template>
  <ElDropdown trigger="click" @command="onCommand">
    <button type="button" :class="[`lang-btn--${theme || 'dark'}`]">
      {{ locale.toUpperCase() }}
      <i class="el-icon-arrow-down el-icon--right" />
    </button>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem
          v-for="lang in languages"
          :key="lang.code"
          :command="lang.code"
          :disabled="lang.code === locale"
        >
          <span v-if="lang.code === 'ru'">🇷🇺</span>
          <span v-else-if="lang.code === 'en'">🇺🇸</span>
          <span v-else>🇰🇿</span>
          {{ lang.label }}
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<style scoped>
.lang-btn {
  appearance: none;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.04);
  color: #fff;
  padding: 8px 12px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
}
.lang-btn--dark {
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.04);
  color: #fff;
  padding: 8px 12px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
}
.lang-btn--dark:hover {
  background: rgba(255, 255, 255, 0.08);
}

.lang-btn--light {
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #fff;
  color: #222;
  padding: 8px 12px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
}
.lang-btn--light:hover {
  background: #f6f6f6;
}
</style>
