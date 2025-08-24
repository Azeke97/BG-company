<script setup lang="ts">
import HeroSection from './components/HeroSection.vue'
import MissionCarousel from './components/MissionCarousel.vue'
import ServicesSection from './components/ServicesSection.vue'
import PortfolioSection from './components/PortfolioSection.vue'
import TestimonialsSection from './components/TestimonialsSection.vue'
import ContactSection from './components/ContactSection.vue'
import Reveal from '~/shared/ui/reveal/Reveal.vue'

const services = [
  {
    title: 'Interior Design',
    text: 'Дизайн интерьеров под ваш стиль и задачи.',
    img: '/images/services/design.jpg',
  },
  {
    title: 'Home Renovation',
    text: 'Комплексные ремонты квартир и домов.',
    img: '/images/services/renovation.jpg',
  },
  {
    title: 'Custom Carpentry',
    text: 'Корпусная и мягкая мебель на заказ.',
    img: '/images/services/carpentry.jpg',
  },
]

const portfolio = [
  {
    title: 'Cozy Family Home',
    text: 'Тёплый и уютный ремонт для семьи.',
    img: '/images/portfolio/home.jpg',
  },
  {
    title: 'Elegant Office Space',
    text: 'Модернизация офиса под продуктивность.',
    img: '/images/portfolio/office.jpg',
  },
]

const testimonials = [
  {
    author: 'Ирина К.',
    role: 'Клиент',
    text: 'Идеи стали реальностью. Отличное качество и сроки!',
    img: '/images/testimonials/1.jpg',
  },
  {
    author: 'Алексей П.',
    role: 'Заказчик',
    text: 'Команда BG — это внимание к деталям и прозрачность.',
    img: '/images/testimonials/2.jpg',
  },
  {
    author: 'Динара Ж.',
    role: 'Клиент',
    text: 'Рекомендуем! Сделали всё “под ключ”.',
    img: '/images/testimonials/3.jpg',
  },
]

const contact = reactive({
  name: '',
  email: '',
  message: '',
})
const isSending = ref(false)
const isSent = ref(false)

async function submitContact() {
  if (isSending.value || isSent.value) return
  isSending.value = true
  try {
    // await $fetch('/api/contact', { method: 'POST', body: contact })
    await new Promise((r) => setTimeout(r, 600))
    isSent.value = true
  } finally {
    isSending.value = false
  }
}
</script>

<template>
  <div :class="$style.mp">
    <Reveal side="up" :once="false">
      <HeroSection id="home" />
    </Reveal>

    <Reveal side="right" :distance="40" :once="false">
      <MissionCarousel id="about" :interval="5600" height="520px" />
    </Reveal>

    <Reveal id="services" as="section" class="container" side="up" :stagger="true" :stagger-step="80" :once="false">
      <ServicesSection :items="services" />
    </Reveal>

    <Reveal side="left" :once="false">
      <PortfolioSection id="projects" :items="portfolio" />
    </Reveal>

    <Reveal side="down" :threshold="0.2" :once="false">
      <TestimonialsSection id="reviews" :items="testimonials" />
    </Reveal>

    <Reveal side="up" :once="false">
      <ContactSection
        id="contact"
        :name="contact.name"
        :email="contact.email"
        :message="contact.message"
        :sent="isSent"
        :loading="isSending"
        @update:name="(val) => (contact.name = val)"
        @update:email="(val) => (contact.email = val)"
        @update:message="(val) => (contact.message = val)"
        @submit="submitContact"
      />
    </Reveal>
  </div>
</template>

<style module>
.mp {
  display: block;
}
</style>
