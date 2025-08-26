<script setup lang="ts">
import { ElDialog, ElTooltip } from "element-plus";
import { LangSwitcher } from "~/widgets/header/components/lang-switcher";

const { t } = useI18n();

const modelValue = defineModel<boolean>({ required: true });

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "goTo", hash: string): void;
}>();

const close = () => emit("update:modelValue", false);
const goTo = (hash: string) => emit("goTo", hash);
</script>

<template>
  <ElDialog
    v-model="modelValue"
    fullscreen
    :show-close="true"
    :append-to-body="true"
    :lock-scroll="true"
    custom-class="mobile-menu-dialog"
  >
    <div class="mobile-menu">
      <NuxtLink to="/" class="mobile-menu__brand" @click="close">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="mobile-menu__icon"
        >
          <path d="M12 3l9 8h-3v9H6v-9H3z" fill="currentColor" />
        </svg>
        <span>{{ t("header.brand") }}</span>
      </NuxtLink>

      <button type="button" class="mobile-menu__item" @click="goTo('#home')">
        {{ t("header.menu.home") }}
      </button>

      <button
        type="button"
        class="mobile-menu__item"
        @click="goTo('#services')"
      >
        {{ t("header.menu.services") }}
      </button>

      <ElTooltip content="Раздел в разработке" placement="bottom">
        <button type="button" class="mobile-menu__item" @click.prevent>
          {{ t("header.menu.shop") }}
        </button>
      </ElTooltip>

      <button type="button" class="mobile-menu__cta" @click="goTo('#contact')">
        {{ t("header.menu.contact") }}
      </button>

      <LangSwitcher theme="light" />
    </div>
  </ElDialog>
</template>

<style scoped>
:global(.mobile-menu-dialog) {
  background: linear-gradient(
    to bottom,
    rgba(10, 10, 10, 0.98) 0%,
    rgba(20, 20, 22, 0.95) 50%,
    rgba(246, 196, 83, 0.25) 100%
  );
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

:global(.mobile-menu-dialog .el-dialog__body) {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0;
  overflow-y: auto;
}

.mobile-menu {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.mobile-menu__brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  color: #111;
  text-decoration: none;
  margin-bottom: 12px;
}
.mobile-menu__icon {
  width: 32px;
  height: 32px;
  color: #f6c453;
}
.mobile-menu__item {
  text-align: left;
  width: 100%;
  background: #f5f5f5;
  color: #111;
  border: 1px solid #eee;
  padding: 12px 14px;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
}
.mobile-menu__item.active {
  border-color: #f6c453;
  color: #111;
  box-shadow: 0 0 0 2px rgba(246, 196, 83, 0.25) inset;
}
.mobile-menu__cta {
  margin-top: 10px;
  background: #f6c453;
  color: #222;
  font-weight: 700;
  padding: 12px 16px;
  border-radius: 10px;
  cursor: pointer;
}
</style>
