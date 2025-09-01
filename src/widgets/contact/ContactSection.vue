<script setup lang="ts">
import { addNotification } from "~/shared/libs";

const { t } = useI18n();
const style = useCssModule();
const route = useRoute();

const contact = reactive({
  name: "",
  phone: "",
  email: "",
  message: "",
  page: route.path,
});

const isSending = ref(false);
const isSent = ref(false);

const stripLocalePrefix = (path: string) => {
  return path.replace(/^\/(ru|en|kz)(?=\/|$)/, "");
};

const pageText = computed(() => {
  const p = stripLocalePrefix(route.path) || "/";
  const keyMap: Record<string, string> = {
    "/": "pageNames.home",
    "/services": "pageNames.services",
    "/services/ceilings": "pageNames.ceilings",
    "/services/renovation": "pageNames.renovation",
    "/services/carpentry": "pageNames.carpentry",
  };
  const key = keyMap[p] || "pageNames.other";
  return t(key);
});

const submitContact = async () => {
  if (isSending.value || isSent.value) return;

  isSending.value = true;
  try {
    await $fetch("/api/contact", {
      method: "POST",
      body: {
        name: contact.name.trim(),
        phone: contact.phone.trim(),
        email: contact.email.trim(),
        message: contact.message.trim(),
        page: pageText.value,
      },
    });

    isSent.value = true;
    addNotification("Сообщение отправлено", "success");
  } catch (e) {
    console.error(e);
    addNotification("Ошибка отправки. Попробуйте ещё раз.", "error");
  } finally {
    isSending.value = false;
  }
};
</script>

<template>
  <section :class="style.section">
    <div :class="style.container">
      <h2 :class="style.title">{{ t("contact.title") }}</h2>

      <p :class="style.subtitle">{{ t("contact.subtitle") }}</p>

      <form v-if="!isSent" :class="style.form" @submit.prevent="submitContact">
        <input
          v-model="contact.name"
          :class="style.input"
          :placeholder="t('contact.placeholders.name')"
          required
          name="name"
        />

        <input
          v-model="contact.phone"
          :class="style.input"
          name="phone"
          :placeholder="t('contact.placeholders.phone')"
          inputmode="tel"
          pattern="^[0-9+()\\-\\s]{6,}$"
        />

        <input
          v-model="contact.email"
          type="email"
          :class="style.input"
          :placeholder="t('contact.placeholders.email')"
          required
          name="email"
        />

        <textarea
          v-model="contact.message"
          :class="style.textarea"
          name="message"
          rows="5"
          :placeholder="t('contact.placeholders.message')"
        />

        <i18n-t keypath="contact.consent" tag="p" :class="style.consent">
          <template #policy>
            <a
              href="#"
              target="_blank"
              rel="noopener"
              :class="style.consentLink"
            >
              {{ t("contact.policy") }}
            </a>
          </template>
        </i18n-t>

        <button
          :class="[style.btn, style.btnPrimary, style.submitBtn]"
          type="submit"
          :disabled="isSending"
        >
          <span v-if="!isSending">{{ t("contact.actions.submit") }}</span>
          <span v-else>{{ t("contact.actions.sending") }}</span>
        </button>
      </form>

      <p v-else :class="style.success">
        {{ t("contact.success") }}
      </p>
    </div>
  </section>
</template>

<style module>
.container {
  max-width: 680px;
  margin: 0 auto;
  padding: 0 16px;
}

.section {
  background-color: #000000;
  background-image: url("data:image/svg+xml,%3Csvg width='42' height='44' viewBox='0 0 42 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='Page-1' fill='none' fill-rule='evenodd'%3E%3Cg id='brick-wall' fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M0 0h42v44H0V0zm1 1h40v20H1V1zM0 23h20v20H0V23zm22 0h20v20H22V23z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  color: #fff;
  padding: 56px 0 72px;
}

.title {
  text-align: center;
  font-size: 26px;
  margin: 0 0 22px;
}

.form {
  display: grid;
  gap: 12px;
}

.input,
.textarea {
  width: 100%;
  border: 1px solid #333;
  background: #1d1d1d;
  color: #fff;
  border-radius: 10px;
  padding: 12px 14px;
  resize: none;
}

.submitBtn {
  width: 160px;
  margin: 8px auto 0;
}

.success {
  text-align: center;
  padding: 20px;
  background: #1d1d1d;
  border-radius: 10px;
}

.subtitle {
  text-align: center;
  margin: 0 0 18px;
  color: #d7d7d7;
  font-size: 15px;
}

.consent {
  margin: 6px 0 0;
  font-size: 14px;
  color: #bdbdbd;
  line-height: 1.4;
  text-align: center;
}

.consentLink {
  color: #f6c453;
  text-decoration: underline;
}

.btn {
  padding: 12px 20px;
  border-radius: 10px;
  background: #fff;
  color: #111;
  border: 1px solid #fff;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    background 0.15s ease,
    border-color 0.15s ease;
}

.btnPrimary {
  background: #fff;
  color: #111;
  border-color: #fff;
}

.btnPrimary:hover:not([disabled]) {
  background: #f6c453;
  border-color: #f6c453;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
}

.btn[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
