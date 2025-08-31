<script setup lang="ts">
import HomeOne from "../assets/images/home-design-1.jpg";
import HomeTwo from "../assets/images/home-design-2.jpg";

interface PortfolioItem {
  title: string;
  text: string;
  img: string;
}

const { t } = useI18n();
const style = useCssModule();

const items: PortfolioItem[] = [
  {
    title: "mainPage.portfolio.items[0].title",
    text: "mainPage.portfolio.items[0].text",
    img: HomeOne,
  },
  {
    title: "mainPage.portfolio.items[1].title",
    text: "mainPage.portfolio.items[1].text",
    img: HomeTwo,
  },
];
</script>

<template>
  <section :class="style.portfolioSection">
    <div :class="style.container">
      <h2 :class="style.sectionTitle">{{ t("mainPage.portfolio.title") }}</h2>
      <p :class="style.sectionLead">{{ t("mainPage.portfolio.subtitle") }}</p>

      <div :class="style.list">
        <div
          v-for="(p, i) in items"
          :key="p.title"
          :class="[style.row, i % 2 === 1 && style.rowReverse]"
        >
          <img :src="p.img" :alt="t(p.title)" :class="style.image" />
          <div :class="style.info">
            <h3 :class="style.name">{{ t(p.title) }}</h3>
            <p :class="style.text">{{ t(p.text) }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style module>
.container {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 16px;
}

.portfolioSection {
  --accent: #f6c453;
  background: #eef1f6;
  padding: 64px 0;
}

.sectionTitle {
  text-align: center;
  font-size: 30px;
  margin: 0 0 8px;
  position: relative;
  font-weight: 600;
}
.sectionTitle::after {
  content: "";
  display: block;
  width: 72px;
  height: 4px;
  margin: 10px auto 0;
  background: var(--accent);
  border-radius: 999px;
}

.sectionLead {
  text-align: center;
  color: #666;
  margin: 0 0 28px;
}

.list {
  display: grid;
  gap: 28px;
}

.row {
  display: flex;
  gap: 24px;
  align-items: center;
}
.rowReverse {
  flex-direction: row-reverse;
}

.image {
  width: 460px;
  height: 240px;
  flex: 0 0 460px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03);
}

.info {
  flex: 1 1 auto;
  min-width: 0;
}

.name {
  margin: 0 0 8px;
  font-weight: 700;
  line-height: 1.2;
  position: relative;
  padding-left: 12px;
}
.name::before {
  content: "";
  position: absolute;
  left: 0;
  top: 4px;
  bottom: 4px;
  width: 4px;
  border-radius: 999px;
  background: var(--accent);
}

.text {
  color: #444;
}

@media (max-width: 900px) {
  .row,
  .rowReverse {
    flex-direction: column;
  }
  .image {
    width: 100%;
    height: 220px;
    flex: 0 0 auto;
  }
}
</style>
