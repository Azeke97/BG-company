<script setup lang="ts">
import DesignIcon from "../assets/icons/design.svg";
import FixSmetaIcon from "../assets/icons/fix-smeta.svg";
import GuaranteeIcon from "../assets/icons/guarantee.svg";
import TariffsIcon from "../assets/icons/tariffs.svg";
const { t } = useI18n();

const info = [
  {
    icon: FixSmetaIcon,
    text: "Фиксированная смета",
  },
  {
    icon: GuaranteeIcon,
    text: "Гарантия 1 год",
  },
  {
    icon: TariffsIcon,
    text: "Прозрачные тарифы",
  },
  {
    icon: DesignIcon,
    text: "Дизайн-проект в комплекте",
  },
];
</script>

<template>
  <section class="hero">
    <div class="hero__inner container">
      <div class="hero__content">
        <h1 class="hero__title">
          {{ t("hero.title") }}
          <span>BG Company</span>
        </h1>
        <p class="hero__subtitle">
          {{ t("hero.desc") }}
        </p>

        <div class="hero__info">
          <div v-for="(item, idx) in info" :key="idx" class="hero__info-item">
            <component :is="item.icon" class="hero__info-icon" />
            <span class="hero__info-text">{{ item.text }}</span>
          </div>
        </div>

        <div class="hero__actions">
          <a href="#contact" class="btn btn--primary">{{
            t("hero.button.feedback")
          }}</a>
          <a href="#projects" class="btn btn--ghost">{{
            t("hero.button.portfolio")
          }}</a>
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
  background: url("../assets/images/hero.jpg") center/cover no-repeat;
  color: #fff;
}
.hero::after {
  content: "";
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
  font-weight: 500;
}
.hero__title span {
  color: #f6c453;
}
.hero__subtitle {
  opacity: 0.95;
  max-width: 720px;
  margin: 0 0 24px;
  font-size: 18px;
  line-height: 1.15;
}
.hero__info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin: 0 0 32px;
}
.hero__info-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.08);
  padding: 12px 16px;
  border-radius: 8px;
}
.hero__info-icon {
  font-size: 20px;
  flex-shrink: 0;
  color: #f6c453;
}
.hero__info-text {
  font-size: 14px;
  font-weight: 500;
}
.btn {
  display: inline-block;
  padding: 12px 20px;
  border-radius: 10px;
  border: 1px solid #fff;
  transition: 0.2s;
  text-decoration: none;
  color: #111;
  font-weight: 500;
  background: #fff;
}
.btn--primary {
  background: #f6c453;
  color: #111;
  border-color: #f6c453;
  font-weight: 500;
}
.btn--primary:hover {
  background: #fadb7e;
  border-color: #fadb7e;
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
