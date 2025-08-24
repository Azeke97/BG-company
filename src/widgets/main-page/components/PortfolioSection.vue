<script setup lang="ts">
import type { PortfolioItem } from '../types'
defineProps<{ items: PortfolioItem[] }>()
</script>

<template>
  <section class="pf">
    <div class="container">
      <h2 class="pf__title">Our Creative Portfolio</h2>
      <p class="pf__lead">Избранные проекты, демонстрирующие качество и инновации.</p>

      <div class="pf__list">
        <div v-for="p in items" :key="p.title" class="pf__row">
          <img :src="p.img" :alt="p.title" class="pf__img" />
          <div class="pf__info">
            <h3 class="pf__name">{{ p.title }}</h3>
            <p class="pf__text">{{ p.text }}</p>
          </div>
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
.pf {
  background: #eef1f6;
  padding: 64px 0;
}
.pf__title {
  text-align: center;
  font-size: 28px;
  margin: 0 0 8px;
}
.pf__lead {
  text-align: center;
  color: #666;
  margin: 0 0 28px;
}
.pf__list {
  display: grid;
  gap: 28px;
}
.pf__row {
  display: grid;
  grid-template-columns: 460px 1fr;
  gap: 24px;
  align-items: center;
}
.pf__img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 12px;
}
.pf__name {
  margin: 0 0 8px;
}
.pf__text {
  color: #444;
}
@media (max-width: 900px) {
  .pf__row {
    grid-template-columns: 1fr;
  }
  .pf__img {
    height: 220px;
  }
}
</style>
