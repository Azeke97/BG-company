<script setup lang="ts"></script>

<template>
  <section class="hero">
    <div class="hero__inner container">
      <div class="hero__content">
        <h1 class="hero__title">Transform Your Space with <span>BG Company</span></h1>
        <p class="hero__subtitle">Ремонт под ключ · Натяжные потолки · Мебель на заказ. Астана.</p>
        <div class="hero__actions">
          <a href="#services" class="btn btn--primary">Заказать консультацию</a>
          <a href="#projects" class="btn btn--ghost">Портфолио</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.container {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 16px;
}
.hero {
  position: relative;
  padding: 96px 0;
  background: url('/images/hero.jpg') center/cover no-repeat;
  color: #fff;
}
.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
}
.hero__inner {
  position: relative;
  z-index: 1;
}
.hero__title {
  font-size: 44px;
  line-height: 1.15;
  margin: 0 0 12px;
}
.hero__title span {
  color: #ffd479;
}
.hero__subtitle {
  opacity: 0.95;
  max-width: 720px;
  margin: 0 0 24px;
  font-size: 18px;
}
.btn {
  display: inline-block;
  padding: 12px 20px;
  border-radius: 10px;
  border: 1px solid #fff;
  transition: 0.2s;
  text-decoration: none;
  color: #111;
  background: #fff;
}
.btn--primary {
  background: #111;
  color: #fff;
  border-color: #111;
}
.btn--primary:hover {
  opacity: 0.9;
}
.btn--ghost {
  background: transparent;
  color: #fff;
  border-color: #fff;
  margin-left: 12px;
}
.btn--ghost:hover {
  background: #fff;
  color: #111;
}
</style>
