<script setup lang="ts">
import { shopApi } from "~/shared/api";
import { useShopUser } from "~/shared/helpers";
import { addNotification } from "~/shared/libs/notifications";
import {
  UiButton,
  UiCard,
  UiContainer,
  UiInput,
  UiTypography,
} from "~/shared/ui";

const { t } = useI18n();
const route = useRoute();
const localePath = useLocalePath();

const step = ref<"email" | "code">("email");
const email = ref("");
const code = ref("");
const devCode = ref<string | null>(null);
const requestLoading = ref(false);
const verifyLoading = ref(false);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const codeModel = computed({
  get: () => code.value,
  set: (value: string) => {
    code.value = value.replace(/\D/g, "").slice(0, 6);
  },
});

const extractErrorMessage = (error: unknown, fallback: string) => {
  const maybeResponseError = error as {
    data?: { statusMessage?: string };
    statusMessage?: string;
  };
  return (
    maybeResponseError?.data?.statusMessage ||
    maybeResponseError?.statusMessage ||
    fallback
  );
};

const requestCode = async () => {
  const normalizedEmail = email.value.trim().toLowerCase();
  if (!EMAIL_RE.test(normalizedEmail)) {
    addNotification(t("shop.login.errors.invalidEmail"), "warning");
    return;
  }

  requestLoading.value = true;
  try {
    const res = await shopApi.requestCode(normalizedEmail);
    email.value = normalizedEmail;
    devCode.value = res.devCode ?? null;
    step.value = "code";
  } catch (error) {
    addNotification(
      extractErrorMessage(error, t("shop.login.errors.requestFailed")),
      "error",
    );
  } finally {
    requestLoading.value = false;
  }
};

const backToEmail = () => {
  step.value = "email";
  code.value = "";
  devCode.value = null;
};

const verifyCode = async () => {
  if (code.value.length !== 6) {
    addNotification(t("shop.login.errors.invalidCode"), "warning");
    return;
  }

  verifyLoading.value = true;
  try {
    const res = await shopApi.verifyCode(email.value, code.value);
    useShopUser().value = res.user;

    const redirect =
      typeof route.query.redirect === "string" ? route.query.redirect : "";
    const target =
      redirect && redirect.startsWith("/shop") ? redirect : "/shop";
    await navigateTo(localePath(target));
  } catch (error) {
    addNotification(
      extractErrorMessage(error, t("shop.login.errors.verifyFailed")),
      "error",
    );
  } finally {
    verifyLoading.value = false;
  }
};

useSeoMeta({
  title: () => t("shop.login.seoTitle"),
});
</script>

<template>
  <UiContainer>
    <section :class="$style.page">
      <UiCard padding="24px" :class="$style.card">
        <UiTypography tag="h1" variant="h3" :class="$style.title">
          {{ t("shop.login.title") }}
        </UiTypography>

        <form
          v-if="step === 'email'"
          :class="$style.form"
          @submit.prevent="requestCode"
        >
          <UiInput
            v-model="email"
            type="email"
            :label="t('shop.login.emailLabel')"
            :placeholder="t('shop.login.emailPlaceholder')"
            :disabled="requestLoading"
            full-width
          />

          <UiButton
            native-type="submit"
            variant="primary"
            full
            :loading="requestLoading"
          >
            {{ t("shop.login.requestCodeButton") }}
          </UiButton>
        </form>

        <form v-else :class="$style.form" @submit.prevent="verifyCode">
          <p v-if="devCode" :class="$style.devCode">
            {{ t("shop.login.devCodeHint", { code: devCode }) }}
          </p>

          <UiInput
            v-model="codeModel"
            type="text"
            inputmode="numeric"
            maxlength="6"
            :label="t('shop.login.codeLabel')"
            :placeholder="t('shop.login.codePlaceholder')"
            :disabled="verifyLoading"
            full-width
          />

          <UiButton
            native-type="submit"
            variant="primary"
            full
            :loading="verifyLoading"
          >
            {{ t("shop.login.submitButton") }}
          </UiButton>

          <button
            type="button"
            :class="$style.changeEmailBtn"
            :disabled="verifyLoading"
            @click="backToEmail"
          >
            {{ t("shop.login.changeEmail") }}
          </button>
        </form>
      </UiCard>
    </section>
  </UiContainer>
</template>

<style module>
.page {
  display: grid;
  justify-content: center;
  padding-top: 104px;
  padding-bottom: 40px;
}

.card {
  width: 100%;
  max-width: 400px;
}

.title {
  margin: 0 0 18px;
  text-align: center;
}

.form {
  display: grid;
  gap: 14px;
}

.devCode {
  margin: 0;
  padding: 10px 12px;
  border-radius: var(--border-radius-small);
  background: var(--color-background-secondary);
  color: var(--color-text-secondary);
  font-size: var(--font-size-small);
}

.changeEmailBtn {
  justify-self: center;
  border: 0;
  background: transparent;
  color: var(--color-text-secondary);
  padding: 0;
  font-size: 13px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .page {
    padding-top: 94px;
  }
}
</style>
