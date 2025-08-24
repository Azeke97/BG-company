<script setup lang="ts">
import type { ServiceCard } from '../types'
defineProps<{ items: ServiceCard[] }>()
</script>

<template>
  <section class="svc">
    <div class="container">
      <h2 class="svc__title">Comprehensive Renovation Services</h2>
      <p class="svc__lead">One-stop решение для вашего дома.</p>

      <div class="svc__grid">
        <article v-for="s in items" :key="s.title" class="svc__card">
          <img :src="s.img" :alt="s.title" class="svc__img" />
          <h3 class="svc__name">{{ s.title }}</h3>
          <p class="svc__text">{{ s.text }}</p>
        </article>
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
.svc {
  padding: 72px 0 40px;
}
.svc__title {
  text-align: center;
  font-size: 30px;
  margin: 0 0 8px;
}
.svc__lead {
  text-align: center;
  color: #666;
  margin: 0 0 32px;
}
.svc__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}
.svc__card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 16px;
}
.svc__img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 8px;
}
.svc__name {
  margin: 12px 0 6px;
  font-size: 18px;
}
.svc__text {
  color: #555;
}
@media (max-width: 900px) {
  .svc__grid {
    grid-template-columns: 1fr;
  }
  .svc__img {
    height: 200px;
  }
}
</style>
