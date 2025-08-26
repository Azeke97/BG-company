<script setup lang="ts">
const props = defineProps<{
  name: string;
  email: string;
  message: string;
  sent?: boolean;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:name" | "update:email" | "update:message", v: string): void;
  (e: "submit"): void;
}>();
</script>

<template>
  <section class="ct">
    <div class="container">
      <h2 class="ct__title">Get in Touch</h2>

      <form
        v-if="!props.sent"
        class="ct__form"
        @submit.prevent="emit('submit')"
      >
        <input
          :value="props.name"
          class="ct__input"
          placeholder="Name"
          required
          @input="
            emit('update:name', ($event.target as HTMLInputElement).value)
          "
        />
        <input
          type="email"
          :value="props.email"
          class="ct__input"
          placeholder="Email"
          required
          @input="
            emit('update:email', ($event.target as HTMLInputElement).value)
          "
        />
        <textarea
          :value="props.message"
          class="ct__textarea"
          rows="5"
          placeholder="Message"
          @input="
            emit('update:message', ($event.target as HTMLTextAreaElement).value)
          "
        />
        <button
          class="btn btn--primary ct__btn"
          type="submit"
          :disabled="props.loading"
        >
          <span v-if="!props.loading">Submit</span>
          <span v-else>Sending…</span>
        </button>
      </form>

      <p v-else class="ct__ok">
        Спасибо! Мы свяжемся с вами в ближайшее время.
      </p>
    </div>
  </section>
</template>

<style scoped>
.container {
  max-width: 680px;
  margin: 0 auto;
  padding: 0 16px;
}
.ct {
  background: linear-gradient(170deg, #000 0%, #222 94%, #f6c453 120%);
  color: #fff;
  padding: 56px 0 72px;
}
.ct__title {
  text-align: center;
  font-size: 26px;
  margin: 0 0 22px;
}
.ct__form {
  display: grid;
  gap: 12px;
}
.ct__input,
.ct__textarea {
  width: 100%;
  border: 1px solid #333;
  background: #1d1d1d;
  color: #fff;
  border-radius: 10px;
  padding: 12px 14px;
  resize: none;
}
.ct__btn {
  width: 160px;
  margin: 8px auto 0;
}
.ct__ok {
  text-align: center;
  padding: 20px;
  background: #1d1d1d;
  border-radius: 10px;
}
.btn {
  padding: 12px 20px;
  border-radius: 10px;
  background: #fff;
  color: #111;
  border: 1px solid #fff;
  cursor: pointer;
}
.btn[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
