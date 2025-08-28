<script setup lang="ts">
import HeroSection from "./components/HeroSection.vue";
import MissionCarousel from "./components/MissionCarousel.vue";
import ServicesSection from "./components/ServicesSection.vue";
import PortfolioSection from "./components/PortfolioSection.vue";
import TestimonialsSection from "./components/TestimonialsSection.vue";
import ContactSection from "./components/ContactSection.vue";
import Reveal from "~/shared/ui/reveal/Reveal.vue";
</script>

<template>
  <div :class="$style.mp">
    <Reveal side="up" :once="false">
      <HeroSection id="home" />
    </Reveal>

    <Reveal side="right" :distance="40" :once="false">
      <MissionCarousel id="about" :interval="4500" height="520px" />
    </Reveal>

    <Reveal
      id="services"
      as="section"
      class="container"
      side="up"
      :stagger="true"
      :stagger-step="80"
      :once="false"
    >
      <ServicesSection />
    </Reveal>

    <Reveal side="left" :once="false">
      <PortfolioSection id="projects" />
    </Reveal>

    <Reveal side="down" :threshold="0.2" :once="false">
      <TestimonialsSection id="reviews" />
    </Reveal>

    <Reveal side="up" :once="false">
      <ContactSection id="contact" />
    </Reveal>
  </div>
</template>

<style module>
.mp {
  display: block;
  padding-top: 100px;
}
</style>
