<script setup lang="ts">
import type { Testimonial } from '../types'
defineProps<{ items: Testimonial[] }>()
</script>

<template>
  <section class="ts">
    <div class="container">
      <h2 class="ts__title">What Our Clients Say</h2>
      <div class="ts__grid">
        <article v-for="t in items" :key="t.author" class="ts__card">
          <img :src="t.img" :alt="t.author" class="ts__img" />
          <h3 class="ts__h">{{ t.author }}</h3>
          <small v-if="t.role" class="ts__role">{{ t.role }}</small>
          <p class="ts__text">“{{ t.text }}”</p>
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
.ts {
  padding: 64px 0;
}
.ts__title {
  text-align: center;
  margin: 0 0 24px;
  font-size: 28px;
}
.ts__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}
.ts__card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
}
.ts__img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
}
.ts__h {
  margin: 10px 0 2px;
  font-size: 18px;
}
.ts__role {
  color: #777;
}
.ts__text {
  color: #444;
  margin-top: 8px;
}
@media (max-width: 900px) {
  .ts__grid {
    grid-template-columns: 1fr;
  }
}
</style>
